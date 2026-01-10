import { useState, useEffect } from 'react';

interface PortfolioImage {
  src: string;
  alt: string;
}

interface PortfolioCarouselProps {
  images: PortfolioImage[];
}

export default function PortfolioCarousel({ images }: PortfolioCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 3 seconds per slide, same as hero

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="h-screen w-full relative overflow-hidden">
      <div className="relative w-full h-full">
        {images.map((image, index) => {
          const isDafna = image.src.includes('dafna');
          return (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity ease-in-out ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                transitionDuration: '2000ms',
                zIndex: index === currentIndex ? 1 : 0,
                pointerEvents: index === currentIndex ? 'auto' : 'none'
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  objectPosition: isDafna ? '60% center' : 'center'
                }}
                draggable={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
