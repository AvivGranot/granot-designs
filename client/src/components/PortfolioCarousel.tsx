import { useState, useCallback, useEffect, useRef } from 'react';

interface PortfolioImage {
  src: string;
  alt: string;
}

interface PortfolioCarouselProps {
  images: PortfolioImage[];
}

export default function PortfolioCarousel({ images }: PortfolioCarouselProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  }, []);

  const navigateLightbox = useCallback((direction: 'prev' | 'next') => {
    if (direction === 'next') {
      setLightboxIndex((prev) => (prev + 1) % images.length);
    } else {
      setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  }, [images.length]);

  const scrollCarousel = useCallback((direction: 'left' | 'right') => {
    const strip = scrollRef.current;
    if (!strip) return;
    const items = strip.querySelectorAll('.portfolio-scroll-item');
    if (!items.length) return;

    // Find the currently most-visible item
    const stripRect = strip.getBoundingClientRect();
    const stripCenter = stripRect.left + stripRect.width / 2;
    let closestIndex = 0;
    let closestDist = Infinity;
    items.forEach((item, i) => {
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.left + rect.width / 2;
      const dist = Math.abs(itemCenter - stripCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closestIndex = i;
      }
    });

    // RTL: left arrow = next image (higher index), right arrow = previous image (lower index)
    const targetIndex = direction === 'left'
      ? Math.min(items.length - 1, closestIndex + 1)
      : Math.max(0, closestIndex - 1);

    items[targetIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigateLightbox('next');
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, closeLightbox, navigateLightbox]);

  return (
    <>
      <div className="portfolio-carousel-wrapper">
        <div className="portfolio-scroll-strip" ref={scrollRef}>
          {images.map((image, index) => {
            const isDafna = image.src.includes('dafna');
            return (
              <div
                key={index}
                className="portfolio-scroll-item"
                onClick={() => openLightbox(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
                aria-label={`הצג ${image.alt} במסך מלא`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading={index < 3 ? "eager" : "lazy"}
                  decoding="async"
                  draggable={false}
                  style={{
                    objectPosition: isDafna ? '60% center' : 'center'
                  }}
                />
                <div className="portfolio-grid-overlay">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                    <path d="M11 8v6"/>
                    <path d="M8 11h6"/>
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ direction: 'ltr' }}>
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={() => scrollCarousel('left')}
            aria-label="שמאלה"
          >
            ‹
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={() => scrollCarousel('right')}
            aria-label="ימינה"
          >
            ›
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="portfolio-lightbox" onClick={closeLightbox}>
          <div className="lightbox-overlay"></div>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label="סגור"
            >
              ×
            </button>
            <button
              className="lightbox-prev"
              onClick={() => navigateLightbox('prev')}
              aria-label="תמונה קודמת"
            >
              ‹
            </button>
            <img
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
            />
            <button
              className="lightbox-next"
              onClick={() => navigateLightbox('next')}
              aria-label="תמונה הבאה"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </>
  );
}
