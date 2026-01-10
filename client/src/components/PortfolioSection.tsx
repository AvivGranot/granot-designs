import { useState, useCallback, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, Scrollbar, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

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

  // Global keyboard handler for lightbox
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
    <section
      id="portfolio"
      className="py-20 bg-black text-white"
      data-testid="section-portfolio"
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

        <div className="portfolio-carousel-wrapper">
          {/* Left Arrow */}
          <button
            className="portfolio-nav-prev"
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <Swiper
            modules={[Navigation, Pagination, Keyboard, Scrollbar, A11y]}
            slidesPerView="auto"
            centeredSlides={true}
            spaceBetween={24}
            speed={600}
            loop={true}
            grabCursor={true}
            navigation={{
              nextEl: '.portfolio-nav-next',
              prevEl: '.portfolio-nav-prev'
            }}
            pagination={{
              el: '.portfolio-pagination',
              type: 'bullets',
              clickable: true,
              dynamicBullets: true,
              dynamicMainBullets: 3
            }}
            scrollbar={{
              el: '.portfolio-scrollbar',
              draggable: true,
              hide: false,
              snapOnRelease: true
            }}
            keyboard={{
              enabled: true,
              onlyInViewport: true
            }}
            a11y={{
              prevSlideMessage: 'Previous slide',
              nextSlideMessage: 'Next slide'
            }}
            breakpoints={{
              320: {
                slidesPerView: 1.2,
                spaceBetween: 16,
                centeredSlides: true
              },
              640: {
                slidesPerView: 1.5,
                spaceBetween: 20
              },
              1024: {
                slidesPerView: 2.5,
                spaceBetween: 24
              },
              1400: {
                slidesPerView: 3,
                spaceBetween: 32
              }
            }}
            className="portfolio-swiper"
            data-testid="carousel-portfolio"
          >
            {portfolioItems.map((item, index) => (
              <SwiperSlide
                key={index}
                data-testid={`slide-portfolio-${index}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${index + 1} of ${portfolioItems.length}`}
              >
                <div
                  className="portfolio-slide-item"
                  onClick={() => openLightbox(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
                  aria-label={`View ${item.title} in fullscreen`}
                >
                  <div className="portfolio-slide-image-wrapper">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="portfolio-slide-image"
                      data-testid={`img-portfolio-${index}`}
                      loading={index < 3 ? "eager" : "lazy"}
                      decoding="async"
                      fetchPriority={index === 0 ? "high" : "auto"}
                      draggable={false}
                    />
                    {/* Hover overlay */}
                    <div className="portfolio-slide-overlay">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="M21 21l-4.35-4.35"/>
                        <path d="M11 8v6"/>
                        <path d="M8 11h6"/>
                      </svg>
                    </div>
                  </div>
                  <div className="portfolio-slide-caption">
                    <h3>{item.title}</h3>
                    <p>{item.alt}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Right Arrow */}
          <button
            className="portfolio-nav-next"
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          {/* Pagination Dots */}
          <div className="portfolio-pagination"></div>

          {/* Scrollbar */}
          <div className="portfolio-scrollbar"></div>
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
              aria-label="Close lightbox"
            >
              ×
            </button>
            <button
              className="lightbox-prev"
              onClick={() => navigateLightbox('prev')}
              aria-label="Previous image"
            >
              ‹
            </button>
            <img
              src={portfolioItems[lightboxIndex].image}
              alt={portfolioItems[lightboxIndex].alt}
            />
            <button
              className="lightbox-next"
              onClick={() => navigateLightbox('next')}
              aria-label="Next image"
            >
              ›
            </button>
            <div className="lightbox-info">
              <h3>{portfolioItems[lightboxIndex].title}</h3>
              <p>{portfolioItems[lightboxIndex].alt}</p>
              <span className="lightbox-counter">
                {lightboxIndex + 1} / {portfolioItems.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
