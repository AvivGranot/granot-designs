import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

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
    alt: "חדר שינה מינימליסטי עם ארונות קיר לבנים מובנים"
  },
  {
    image: portfolio13,
    alt: "מטבח מודרני עם אי מרכזי ותאורה תלויה אלגנטית"
  },
  {
    image: portfolio5,
    alt: "חדר רחצה יוקרתי עם חיפוי משושים שחור ועיצוב מינימליסטי"
  },
  {
    image: contact1,
    alt: "ספרייה מובנית עם תאי אחסון ואלמנטי עץ"
  },
  {
    image: portfolio4,
    alt: "פינת אוכל עם קיר אחסון מובנה ותאורה דקורטיבית"
  },
  {
    image: services1,
    alt: "מטבח כהה עם ארונות מעוצבים ופרטי זהב"
  },
  {
    image: portfolio11,
    alt: "חלל פנימי עם קירות מחופים בפסי עץ אנכיים"
  },
  {
    image: services2,
    alt: "כיור אמבטיה צף עם משטח שיש ועיצוב מודרני"
  }
];

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-20 bg-black text-white" data-testid="section-portfolio">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6" data-testid="text-portfolio-title">
            תיק עבודות
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto" data-testid="text-portfolio-subtitle">
            מבחר מפרוייקטים שביצענו - מהמטבח הביתי ועד לפרוייקטים מסחריים מורכבים
          </p>
        </div>
        
        <div className="portfolio-carousel-container relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            spaceBetween={30}
            centeredSlides={true}
            slidesPerView={1}
            slidesPerGroup={1}
            effect={'coverflow'}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            navigation={true}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            loop={true}
            className="portfolio-swiper"
            data-testid="carousel-portfolio"
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
          >
            {portfolioItems.map((item, index) => (
              <SwiperSlide key={index} data-testid={`slide-portfolio-${index}`}>
                <div className="swiper-slide-content relative">
                  <img 
                    src={item.image} 
                    alt={item.alt} 
                    className="w-full h-[70vh] object-cover rounded-lg shadow-2xl"
                    data-testid={`img-portfolio-${index}`}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                    <p className="text-white text-center text-lg font-medium" data-testid={`text-portfolio-alt-${index}`}>
                      {item.alt}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}