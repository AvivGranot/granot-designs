import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation as SwiperNavigation, Pagination, Mousewheel, Keyboard, Scrollbar } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import OverlayMenu from "./OverlayMenu";

// Import background images for slides
import portfolioImage from "@assets/portfolio1_1758398100598.jpg";
import servicesImage from "@assets/services1_1758397244207.jpg";
import mobileServicesImage from "@assets/Mobile_About_1_1758785817261.png";
import aboutImage from "@assets/about1_1758398114481.jpeg";
import contactImage from "@assets/contact1_1758397217008.jpg";

// Import portfolio images for mobile carousel
import mobilePortfolio1 from "@assets/Mobile_Carousel_1_1758782507060.jpg";
import mobilePortfolio2 from "@assets/Mobile_Carousel_2_1758782507061.png";
import mobilePortfolio3 from "@assets/Mobile_Carousel_3_1758782507063.png";
import mobilePortfolio4 from "@assets/Mobile_Carousel_4_1758782507064.png";
import mobilePortfolio5 from "@assets/Mobile_Carousel_5_1758782511117.png";
import mobilePortfolio6 from "@assets/Mobile_Carousel_6_1758784141892.png";
import mobilePortfolio7 from "@assets/Mobile_Carousel_7_1758782511118.png";
import mobilePortfolio8 from "@assets/Mobile_Carousel_9_1758782511120.jpg";
import mobilePortfolio9 from "@assets/Mobile_Carousel_8_1758782511119.png";
import mobilePortfolio10 from "@assets/Mobile_Carousel_10_1758782511121.png";
import mobilePortfolio11 from "@assets/Mobile_About_1_1758798578200.png";

// Import portfolio images for PC carousel
import pcPortfolio1 from "@assets/PC_Carousel_1_1758790862081.jpg";
import pcPortfolio2 from "@assets/PC_Carousel_2_1758790862081.png";
import pcPortfolio3 from "@assets/PC_Carousel_3_1758790862082.png";
import pcPortfolio4 from "@assets/PC_Carousel_4_1758790862082.jpg";
import pcPortfolio5 from "@assets/PC_Carousel_5_1758790862083.png";
import pcPortfolio6 from "@assets/PC_Carousel_6_1758790862083.png";
import pcPortfolio7 from "@assets/PC_Carousel_7_1758790862084.png";
import pcPortfolio8 from "@assets/PC_Carousel_8_1758790862084.png";
import pcPortfolio9 from "@assets/PC_Carousel_9_1758790862084.png";
import pcPortfolio10 from "@assets/PC_Carousel_10_1758790862080.png";
import pcAbout1 from "@assets/PC_About_1_1758790964412.png";
import newPcPortfolio8 from "@assets/PC_Carousel_8_1758796224264.png";
import newPcPortfolio9 from "@assets/PC_Carousel_9_1758796541477.png";
import newPcPortfolio10 from "@assets/PC_Carousel_10_1758796936936.png";

// Portfolio images arrays for nested carousel
const mobilePortfolioImages = [
  { src: mobilePortfolio1, alt: "פרוייקט נגרות 1 - ארונות מטבח מודרניים" },
  { src: mobilePortfolio2, alt: "פרוייקט נגרות 2 - ספריה מובנית בסלון" },
  { src: mobilePortfolio3, alt: "פרוייקט נגרות 3 - ארון קיר בחדר שינה" },
  { src: mobilePortfolio4, alt: "פרוייקט נגרות 4 - יחידת טלוויזיה מעוצבת" },
  { src: mobilePortfolio5, alt: "פרוייקט נגרות 5 - פינת עבודה ביתית" },
  { src: mobilePortfolio6, alt: "פרוייקט נגרות 6 - ארונות אמבטיה" },
  { src: mobilePortfolio7, alt: "פרוייקט נגרות 7 - מטבח כפרי" },
  { src: mobilePortfolio8, alt: "פרוייקט נגרות 8 - ארון הזזה בחדר ילדים" },
  { src: mobilePortfolio9, alt: "פרוייקט נגרות 9 - ארונות משרד" },
  { src: mobilePortfolio10, alt: "פרוייקט נגרות 10 - פינת אוכל מובנית" },
  { src: mobilePortfolio11, alt: "פרוייקט נגרות 11 - חדר רחצה מעוצב ומינימליסטי" },
  { 
    type: "about", 
    title: "אודותינו", 
    content: `"עיצוב משפיע" - דוב גרנות, מייסד שותף, ובוגר בצלאל אקדמיה לאמנות ועיצוב פנים.<br /><br />גרנות עיצובים הינה נגריית בוטיק עם למעלה משלושים שנות ניסיון, ואלפי פרויקטים שעוצבו אישית, נבנו בקפידה, ונמסרו במרכז הארץ.<br /><br />אנו עובדים בשיתוף פעולה כדי לאפשר לתהליך היצירתי להתפתח באופן אורגני, לצד עיצוב קפדני של אלמנטים ברמת המאקרו והמיקרו. האתוס שלנו הוא לספק גישה משולבת וקוהרנטית לנגרות ועיצוב פנים.<br /><br />בברכה,<br />רו"ח נורית גרנות<br />מנכ"לית ומייסדת שותפה`,
    alt: "אודותינו - גרנות עיצובים" 
  }
];

const pcPortfolioImages = [
  { src: pcPortfolio1, alt: "חדר שינה מינימליסטי עם ארונות לבנים מובנים" },
  { src: pcPortfolio2, alt: "מטבח מודרני עם אי מעוצב ותאורה מעלית" },
  { src: pcPortfolio3, alt: "מטבח שחור עם ארונות עליונים וגופי תאורה" },
  { src: pcPortfolio4, alt: "מטבח פתוח עם אי כחול ושולחן עגול מעץ" },
  { src: pcPortfolio5, alt: "מטבח לבן עם אקסנטים צבעוניים ושטיח גיאומטרי" },
  { src: pcPortfolio6, alt: "מטבח מודרני עם אי כחול ומשטח עץ טבעי" },
  { src: pcPortfolio8, alt: "מטבח כחול עם אי לבן וכסאות בר מעץ" },
  { src: newPcPortfolio9, alt: "מטבח לבן עם אי כחול ותאורת קש מעוצבת" },
  { src: newPcPortfolio8, alt: "מטבח מודרני עם אי זהב וכסאות צהובים" },
  { src: newPcPortfolio10, alt: "מטבח בשלבי בנייה - ארונות ירוקים מעוצבים" },
  { src: pcAbout1, alt: "סקיצת עיצוב נגרות - תכנון מקצועי ויצירתי" },
  { 
    type: "about", 
    title: "אודותינו", 
    content: `"עיצוב משפיע" - דוב גרנות, מייסד שותף, ובוגר בצלאל אקדמיה לאמנות ועיצוב פנים.<br /><br />גרנות עיצובים הינה נגריית בוטיק עם למעלה משלושים שנות ניסיון, ואלפי פרויקטים שעוצבו אישית, נבנו בקפידה, ונמסרו במרכז הארץ.<br /><br />אנו עובדים בשיתוף פעולה כדי לאפשר לתהליך היצירתי להתפתח באופן אורגני, לצד עיצוב קפדני של אלמנטים ברמת המאקרו והמיקרו. האתוס שלנו הוא לספק גישה משולבת וקוהרנטית לנגרות ועיצוב פנים.<br /><br />בברכה,<br />רו"ח נורית גרנות<br />מנכ"לית ומייסדת שותפה`,
    alt: "אודותינו - גרנות עיצובים" 
  }
];

export default function HomePage() {
  const [isMainContentActive, setIsMainContentActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Set document direction and lang
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'he');
    
    // Toggle body class based on state
    if (isMainContentActive) {
      document.body.classList.add('main-content-active');
    } else {
      document.body.classList.remove('main-content-active');
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('main-content-active');
    };
  }, [isMainContentActive]);

  useEffect(() => {
    // Check screen size for mobile/desktop image switching
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);


  const toggleMainContent = () => {
    setIsMainContentActive(prev => !prev);
  };

  return (
    <>
      {/* Single Navigation at top level */}
      <Navigation onToggle={toggleMainContent} />
      {/* Hero View */}
      <div className="hero-view min-h-screen">
        <HeroSection />
      </div>
      {/* Main Content View */}
      <div className="main-content-view">
        <Swiper
          className="main-page-swiper"
          modules={[SwiperNavigation, Pagination, Mousewheel, Keyboard, Scrollbar]}
          direction="horizontal"
          slidesPerView="auto"
          spaceBetween={20}
          centeredSlides={true}
          centeredSlidesBounds={false}
          mousewheel={true}
          keyboard={{
            enabled: true,
          }}
          scrollbar={{
            el: '.swiper-scrollbar',
            hide: false,
            draggable: true,
          }}
          breakpoints={{
            // Mobile peek carousel configuration
            320: {
              slidesPerView: "auto",
              spaceBetween: 20,
              centeredSlides: true,
              centeredSlidesBounds: false,
            },
            // Desktop configuration - horizontal peek layout with centered slides
            1024: {
              slidesPerView: "auto",
              spaceBetween: 40,
              centeredSlides: true,
              centeredSlidesBounds: false,
            }
          }}
        >
          {/* Portfolio Slides and About Slide */}
          {(isMobile ? mobilePortfolioImages : pcPortfolioImages).map((item, index) => (
            <SwiperSlide key={index} className="portfolio-carousel-slide">
              {item.type === "about" ? (
                <section 
                  className="about-section-carousel bg-[#1a1a1a]" 
                  id={`about-${index + 1}`}
                  data-testid={`about-section-${index + 1}`}
                >
                  <div className="about-slide">
                    <div className="about-content">
                      <h2 className="about-title text-[24px] font-bold">{item.title}</h2>
                      <div className="about-text text-[14px] font-normal" dangerouslySetInnerHTML={{ __html: item.content }}></div>
                    </div>
                  </div>
                </section>
              ) : (
                <section 
                  className="portfolio-section-carousel bg-[#1a1a1a]" 
                  id={`portfolio-${index + 1}`}
                  data-testid={`portfolio-section-${index + 1}`}
                  style={{
                    backgroundImage: `url(${item.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  {/* Title above image - hide for first slide, 11th slide and about slide */}
                  {index !== 0 && index !== 10 && item.type !== "about" && (
                    <div className="portfolio-header-corner">
                      <h2 className="section-title-above ml-[0px] mr-[0px] pl-[0px] pr-[0px] pt-[0px] pb-[0px] text-[16px] font-semibold mt-[0px] mb-[0px]">תיק עבודות</h2>
                    </div>
                  )}
                </section>
              )}
            </SwiperSlide>
          ))}


          

          

          <div className="swiper-scrollbar"></div>
        </Swiper>
      </div>
      <OverlayMenu />
    </>
  );
}
