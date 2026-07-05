import { useState, useCallback, useEffect } from 'react';
import { exhibitionPieces, ratioOf } from './variants/exhibition';
import type { Project } from './variants/data';

// Vertical 2-image rows of the full curated collection — replaces the carousel.
// Images are paired by orientation (portrait with portrait, landscape with
// landscape) and each row takes the average natural ratio of its pair, so
// tall photos get tall rows and wide photos get short wide rows with minimal
// cropping. No gap between images, like the old carousel strip.
const isPortrait = (p: Project) => ratioOf(p.src) < 1;

const rows: Project[][] = (() => {
  const pool = [...exhibitionPieces];
  const out: Project[][] = [];
  while (pool.length) {
    const first = pool.shift()!;
    const match = pool.findIndex((p) => isPortrait(p) === isPortrait(first));
    if (match >= 0) out.push([first, ...pool.splice(match, 1)]);
    else if (pool.length) out.push([first, pool.shift()!]);
    else out.push([first]);
  }
  return out;
})();

const flatPieces = rows.flat();

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
      setLightboxIndex((prev) => (prev + 1) % flatPieces.length);
    } else {
      setLightboxIndex((prev) => (prev - 1 + flatPieces.length) % flatPieces.length);
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

  let flatIndex = 0;

  return (
    <>
      <div>
        {rows.map((row) => {
          const rowRatio =
            row.reduce((sum, p) => sum + ratioOf(p.src), 0) / row.length;
          return (
            <div
              key={row[0].src}
              className={row.length === 2 ? 'grid grid-cols-2 gap-0' : 'grid grid-cols-1 gap-0'}
            >
              {row.map((image) => {
                const index = flatIndex++;
                return (
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
                      className="block w-full h-full object-cover"
                      style={{ aspectRatio: rowRatio }}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
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
              src={flatPieces[lightboxIndex].src}
              alt={flatPieces[lightboxIndex].alt}
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
