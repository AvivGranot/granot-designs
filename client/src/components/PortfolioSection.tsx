import { useState, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Keyboard, A11y } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import actual portfolio images
import portfolio1 from "@assets/portfolio1_1758397235379.jpg";
import portfolio4 from "@assets/portfolio4_1758397244209.jpg";
import portfolio5 from "@assets/portfolio5_1758397244200.png";
import portfolio11 from "@assets/portfolio11_1758397235381.png";
import portfolio13 from "@assets/portfolio13_1758397244206.png";
import contact1 from "@assets/contact1_1758397217008.jpg";
import services1 from "@assets/services1_1758397244207.jpg";
import services2 from "@assets/services2_1758397235378.jpg";

const portfolioItems = [
  {
    image: portfolio1,
    alt: "חדר שינה מינימליסטי עם ארונות קיר לבנים מובנים",
    title: "חדר שינה מעוצב"
  },
  {
    image: portfolio13,
    alt: "מטבח מודרני עם אי מרכזי ותאורה תלויה אלגנטית",
    title: "מטבח מודרני"
  },
  {
    image: portfolio5,
    alt: "חדר רחצה יוקרתי עם חיפוי משושים שחור ועיצוב מינימליסטי",
    title: "חדר רחצה יוקרתי"
  },
  {
    image: contact1,
    alt: "ספרייה מובנית עם תאי אחסון ואלמנטי עץ",
    title: "ספרייה מובנית"
  },
  {
    image: portfolio4,
    alt: "פינת אוכל עם קיר אחסון מובנה ותאורה דקורטיבית",
    title: "פינת אוכל"
  },
  {
    image: services1,
    alt: "מטבח כהה עם ארונות מעוצבים ופרטי זהב",
    title: "מטבח כהה"
  },
  {
    image: portfolio11,
    alt: "חלל פנימי עם קירות מחופים בפסי עץ אנכיים",
    title: "חיפוי קירות"
  },
  {
    image: services2,
    alt: "כיור אמבטיה צף עם משטח שיש ועיצוב מודרני",
    title: "כיור אמבטיה"
  }
];

export default function PortfolioSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

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
      setLightboxIndex((prev) => (prev + 1) % portfolioItems.length);
    } else {
      setLightboxIndex((prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length);
    }
  }, []);

  // Handle keyboard navigation for lightbox
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!lightboxOpen) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') navigateLightbox('next');
    if (e.key === 'ArrowLeft') navigateLightbox('prev');
  }, [lightboxOpen, closeLightbox, navigateLightbox]);

  return (
    <section
      id="portfolio"
      className="py-20 bg-black text-white"
      data-testid="section-portfolio"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6" data-testid="text-portfolio-title">
            תיק עבודות
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto" data-testid="text-portfolio-subtitle">
            מבחר מפרוייקטים שביצענו - מהמטבח הביתי ועד לפרוייקטים מסחריים מורכבים
          </p>
        </div>

        <div className="portfolio-carousel-wrapper relative">
          {/* Navigation Arrows */}
          <button
            className="portfolio-nav-btn portfolio-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300 opacity-70 hover:opacity-100 -translate-x-6 md:translate-x-0"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          <button
            className="portfolio-nav-btn portfolio-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300 opacity-70 hover:opacity-100 translate-x-6 md:translate-x-0"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>

          <Swiper
            modules={[Navigation, Pagination, Autoplay, Keyboard, A11y]}
            slidesPerView="auto"
            centeredSlides={true}
            spaceBetween={20}
            speed={600}
            loop={true}
            grabCursor={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            navigation={{
              nextEl: '.portfolio-next',
              prevEl: '.portfolio-prev'
            }}
            pagination={{
              el: '.portfolio-pagination',
              type: 'progressbar'
            }}
            keyboard={{
              enabled: true
            }}
            a11y={{
              prevSlideMessage: 'Previous slide',
              nextSlideMessage: 'Next slide'
            }}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 10 },
              768: { slidesPerView: 2, spaceBetween: 15 },
              1024: { slidesPerView: 3, spaceBetween: 20 }
            }}
            onSwiper={setSwiperInstance}
            className="portfolio-swiper"
            data-testid="carousel-portfolio"
          >
            {portfolioItems.map((item, index) => (
              <SwiperSlide key={index} data-testid={`slide-portfolio-${index}`}>
                <div
                  className="portfolio-slide-content relative cursor-pointer group"
                  onClick={() => openLightbox(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
                  aria-label={`View ${item.title} in lightbox`}
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-[50vh] md:h-[60vh] object-cover transition-transform duration-500 group-hover:scale-105"
                      data-testid={`img-portfolio-${index}`}
                      loading="eager"
                      draggable={false}
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8"/>
                          <path d="M21 21l-4.35-4.35"/>
                          <path d="M11 8v6"/>
                          <path d="M8 11h6"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-medium text-white">{item.title}</h3>
                    <p className="text-sm text-gray-400 mt-1">{item.alt}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Progress bar pagination */}
          <div className="portfolio-pagination mt-8 h-1 bg-white/20 rounded-full overflow-hidden max-w-md mx-auto"></div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 z-50 w-12 h-12 flex items-center justify-center text-white hover:text-gray-300 transition-colors"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18"/>
              <path d="M6 6l12 12"/>
            </svg>
          </button>

          {/* Previous button */}
          <button
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 w-14 h-14 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-all"
            onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          {/* Next button */}
          <button
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 w-14 h-14 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-all"
            onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>

          {/* Image container */}
          <div
            className="max-w-[90vw] max-h-[85vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={portfolioItems[lightboxIndex].image}
              alt={portfolioItems[lightboxIndex].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
              <h3 className="text-xl font-medium text-white text-center">
                {portfolioItems[lightboxIndex].title}
              </h3>
              <p className="text-gray-300 text-center mt-2">
                {portfolioItems[lightboxIndex].alt}
              </p>
              <p className="text-gray-500 text-center mt-2 text-sm">
                {lightboxIndex + 1} / {portfolioItems.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
