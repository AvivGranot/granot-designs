import { useState, useCallback, useEffect } from 'react';
import { exhibitionPieces, ratioOf } from './variants/exhibition';

// One image after another, each at its own true aspect ratio (no cropping,
// no twisting) in a contained, centered column — click any image to zoom to
// a large 90vw/80vh view for furniture/material detail.
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
      <div className="bg-white py-8 md:py-12">
        <div className="flex flex-col items-center gap-8 md:gap-12 px-4">
          {exhibitionPieces.map((image, index) => (
            <div
              key={image.src}
              onClick={() => openLightbox(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
              aria-label={`הצג ${image.alt} במסך מלא`}
              className="cursor-pointer w-full max-w-3xl"
            >
              <img
                src={image.src}
                alt={image.alt}
                loading={index < 4 ? 'eager' : 'lazy'}
                decoding="async"
                draggable={false}
                className="block w-full h-auto"
                style={{ aspectRatio: ratioOf(image.src) }}
              />
            </div>
          ))}
        </div>
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
