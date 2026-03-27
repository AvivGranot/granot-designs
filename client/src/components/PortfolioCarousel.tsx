import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

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

  const [emblaRef, emblaApi] = useEmblaCarousel({
    direction: 'rtl',
    align: 'center',
    containScroll: 'trimSnaps',
    loop: false,
  });

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

  // RTL: left arrow = forward (next slide, higher index), right arrow = backward (prev slide)
  const scrollLeft = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollRight = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);

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
        <div className="embla-viewport" ref={emblaRef}>
          <div className="embla-container">
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
        </div>

        <div style={{ direction: 'ltr' }}>
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={scrollLeft}
            aria-label="שמאלה"
          >
            ‹
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={scrollRight}
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
            <div style={{ direction: 'ltr' }}>
              <button
                className="lightbox-prev"
                onClick={() => navigateLightbox('next')}
                aria-label="תמונה הבאה"
              >
                ‹
              </button>
            </div>
            <img
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
            />
            <div style={{ direction: 'ltr' }}>
              <button
                className="lightbox-next"
                onClick={() => navigateLightbox('prev')}
                aria-label="תמונה קודמת"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
