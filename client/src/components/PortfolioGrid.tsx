import { useState, useCallback, useEffect } from 'react';
import { exhibitionPieces } from './variants/exhibition';

// Vertical 2-column grid of the full curated collection — replaces the carousel.
// No gap between images, matching the seamless look of the old carousel strip.
export default function PortfolioGrid() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

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
      setLightboxIndex((prev) => (prev + 1) % exhibitionPieces.length);
    } else {
      setLightboxIndex((prev) => (prev - 1 + exhibitionPieces.length) % exhibitionPieces.length);
    }
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
      <div className="grid grid-cols-2 gap-0">
        {exhibitionPieces.map((image, index) => (
          <div
            key={image.src}
            onClick={() => openLightbox(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
            aria-label={`הצג ${image.alt} במסך מלא`}
            className="cursor-pointer"
          >
            <img
              src={image.src}
              alt={image.alt}
              loading={index < 4 ? 'eager' : 'lazy'}
              decoding="async"
              draggable={false}
              className="block w-full h-full aspect-[4/5] md:aspect-[4/3] object-cover"
            />
          </div>
        ))}
      </div>

      {/* Lightbox Modal — same look and RTL arrow logic as the old carousel */}
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
              src={exhibitionPieces[lightboxIndex].src}
              alt={exhibitionPieces[lightboxIndex].alt}
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
