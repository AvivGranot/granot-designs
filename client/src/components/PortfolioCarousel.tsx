import { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, EffectFade } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface PortfolioImage {
  src: string;
  alt: string;
}

interface PortfolioCarouselProps {
  images: PortfolioImage[];
}

export default function PortfolioCarousel({ images }: PortfolioCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [totalSlides, setTotalSlides] = useState(images.length);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    setTotalSlides(images.length);
  }, [images]);

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentSlide(swiper.activeIndex + 1);
  };

  const goToSlide = (index: number) => {
    swiperRef.current?.slideTo(index);
  };

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className="portfolio-carousel-container">
      {/* Main Carousel */}
      <Swiper
        modules={[Navigation, Pagination, Keyboard, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={500}
        slidesPerView={1}
        keyboard={{ enabled: true }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange}
        className="portfolio-fullscreen-swiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className="portfolio-slide"
              style={{
                backgroundImage: `url(${image.src})`,
              }}
              role="img"
              aria-label={image.alt}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Side Navigation Dots */}
      <div className="portfolio-side-nav">
        {images.map((_, index) => (
          <button
            key={index}
            className={`side-nav-dot ${currentSlide === index + 1 ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`עבור לתמונה ${index + 1}`}
          />
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="portfolio-bottom-nav">
        <button
          className="carousel-nav-btn prev"
          onClick={handlePrev}
          aria-label="תמונה קודמת"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        <div className="slide-counter">
          <span className="current">{formatNumber(currentSlide)}</span>
          <span className="separator">/</span>
          <span className="total">{formatNumber(totalSlides)}</span>
        </div>

        <button
          className="carousel-nav-btn next"
          onClick={handleNext}
          aria-label="תמונה הבאה"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
