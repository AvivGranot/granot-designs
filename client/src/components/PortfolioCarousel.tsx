import { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, Mousewheel, Scrollbar, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

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
    // Use realIndex for loop mode to get correct slide number
    setCurrentSlide(swiper.realIndex + 1);
  };

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className="portfolio-carousel-container">
      {/* Main Carousel */}
      <Swiper
        modules={[Navigation, Pagination, Keyboard, Mousewheel, Scrollbar, Autoplay]}
        direction="horizontal"
        slidesPerView="auto"
        spaceBetween={20}
        centeredSlides={true}
        mousewheel={true}
        keyboard={{ enabled: true }}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        loop={true}
        scrollbar={{
          el: '.swiper-scrollbar',
          hide: false,
          draggable: true,
        }}
        breakpoints={{
          320: {
            slidesPerView: "auto",
            spaceBetween: 20,
            centeredSlides: true,
          },
          1024: {
            slidesPerView: "auto",
            spaceBetween: 40,
            centeredSlides: true,
          }
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange}
        className="main-page-swiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="portfolio-carousel-slide">
            <div className="portfolio-section-carousel">
              <div className="portfolio-image-full">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="full-image"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-scrollbar"></div>
      </Swiper>

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
