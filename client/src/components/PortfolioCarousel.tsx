import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Mousewheel, Scrollbar } from 'swiper/modules';

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
  return (
    <div className="portfolio-carousel-container">
      <Swiper
        modules={[Keyboard, Mousewheel, Scrollbar]}
        direction="horizontal"
        slidesPerView={1}
        spaceBetween={0}
        mousewheel={true}
        keyboard={{ enabled: true }}
        speed={300}
        loop={true}
        loopAdditionalSlides={2}
        rewind={false}
        preloadImages={true}
        watchSlidesProgress={true}
        scrollbar={{
          el: '.swiper-scrollbar',
          hide: false,
          draggable: true,
        }}
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
                  loading="eager"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-scrollbar"></div>
      </Swiper>
    </div>
  );
}
