import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Mousewheel, Scrollbar, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
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
  const totalSlides = images.length;

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentSlide(swiper.realIndex + 1);
  };

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className="portfolio-carousel-container">
      <Swiper
        modules={[Keyboard, Mousewheel, Scrollbar, Autoplay]}
        direction="horizontal"
        slidesPerView={1}
        spaceBetween={0}
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

      <div className="portfolio-bottom-nav">
        <div className="slide-counter">
          <span className="current">{formatNumber(currentSlide)}</span>
          <span className="separator">/</span>
          <span className="total">{formatNumber(totalSlides)}</span>
        </div>
      </div>
    </div>
  );
}
