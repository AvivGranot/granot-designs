import { useState, useCallback, useEffect, useRef } from 'react';
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
  const lightboxOpenRef = useRef(false);
  lightboxOpenRef.current = lightboxOpen;

  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);

  // Swipe (touch) or drag (mouse) to move. No arrow buttons.
  const [emblaRef, emblaApi] = useEmblaCarousel({
    direction: 'rtl',
    align: 'center',
    containScroll: 'trimSnaps',
    loop: false,
    dragFree: false,
  });

  useEffect(() => {
    if (!emblaApi) return;
    // Measured from the real position (Embla's own progress number is
    // unreliable in right-to-left): how far the strip has moved from its start.
    const update = () => {
      const root = emblaApi.rootNode();
      const track = emblaApi.containerNode();
      const total = track.scrollWidth - root.clientWidth;
      if (total <= 0) return setProgress(0);
      const moved = Math.abs(
        track.getBoundingClientRect().right - root.getBoundingClientRect().right
      );
      setProgress(Math.min(1, moved / total));
    };
    const down = () => setDragging(true);
    const up = () => setDragging(false);
    update();
    emblaApi.on('scroll', update).on('reInit', update);
    emblaApi.on('pointerDown', down).on('pointerUp', up);
    return () => {
      emblaApi.off('scroll', update).off('reInit', update);
      emblaApi.off('pointerDown', down).off('pointerUp', up);
    };
  }, [emblaApi]);

  // Auto-advance every 3s (same pace as the hero). Swiping or dragging still
  // works: it pauses while touched and for 5s after, pauses off-screen, and
  // goes back to the first image after the last. Skipped if the visitor asked
  // their device for reduced motion.
  useEffect(() => {
    if (!emblaApi) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    const root = emblaApi.rootNode();
    let visible = true;
    let touching = false;
    let resumeAt = 0;

    const observer =
      'IntersectionObserver' in window
        ? new IntersectionObserver(
            ([entry]) => {
              visible = entry.isIntersecting;
            },
            { threshold: 0.4 }
          )
        : null;
    observer?.observe(root);

    const down = () => {
      touching = true;
    };
    const up = () => {
      touching = false;
      resumeAt = Date.now() + 5000;
    };
    emblaApi.on('pointerDown', down).on('pointerUp', up);

    const timer = setInterval(() => {
      if (!visible || touching || lightboxOpenRef.current) return;
      if (Date.now() < resumeAt) return;
      if (emblaApi.canScrollNext()) emblaApi.scrollNext();
      else emblaApi.scrollTo(0);
    }, 3000);

    return () => {
      clearInterval(timer);
      observer?.disconnect();
      emblaApi.off('pointerDown', down).off('pointerUp', up);
    };
  }, [emblaApi]);

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
        <div className={`embla-viewport${dragging ? ' is-dragging' : ''}`}
          ref={emblaRef}>
          <div className="embla-container">
            {images.map((image, index) => {
              const isDafna = image.src.includes('dafna');
              const isWa2 = image.src.includes('_wa2_');
              const objectPosition = isDafna
                ? '60% center'
                : isWa2
                  ? '30% center'
                  : 'center';
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
                      objectPosition
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

        <div className="carousel-progress" aria-hidden="true">
          <div
            className="carousel-progress-fill"
            style={{ transform: `scaleX(${Math.max(progress, 0.08)})` }}
          />
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
