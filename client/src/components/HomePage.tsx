import { useEffect, useState } from "react";

import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import OverlayMenu from "./OverlayMenu";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";
import FloatingContactButton from "./FloatingContactButton";
import FloatingShareNav from "./FloatingShareNav";
import PortfolioCarousel from "./PortfolioCarousel";

// Import portfolio images for mobile carousel
import mobilePortfolio1 from "@assets/Mobile_Carousel_1_1758782507060.webp";
import mobilePortfolio2 from "@assets/Mobile_Carousel_2_1758782507061.webp";
import mobilePortfolio4 from "@assets/Mobile_Carousel_4_1758782507064.webp";
import mobilePortfolio5 from "@assets/Mobile_Carousel_5_1758782511117.webp";
import mobilePortfolio6 from "@assets/Mobile_Carousel_6_1758784141892.webp";
import mobilePortfolio7 from "@assets/Mobile_Carousel_7_1758782511118.webp";
import mobilePortfolio8 from "@assets/Mobile_Carousel_9_1758782511120.webp";
import mobilePortfolio9 from "@assets/Mobile_Carousel_8_1758782511119.webp";
import mobilePortfolio10 from "@assets/Mobile_Carousel_10_1758782511121.webp";
import mobilePortfolio11 from "@assets/Mobile_About_1_1758798578200.webp";
import dafna from "@assets/dafna.webp";

// Import portfolio images for PC carousel
import pcPortfolio1 from "@assets/PC_Carousel_1_1758790862081.webp";
import pcPortfolio2 from "@assets/PC_Carousel_2_1758790862081.webp";
import pcPortfolio3 from "@assets/PC_Carousel_3_1758790862082.webp";
import pcPortfolio4 from "@assets/PC_Carousel_4_1758790862082.webp";
import pcPortfolio5 from "@assets/PC_Carousel_5_1758790862083.webp";
import pcPortfolio6 from "@assets/PC_Carousel_6_1758790862083.webp";
import pcPortfolio8 from "@assets/PC_Carousel_8_1758790862084.webp";
import pcAbout1 from "@assets/PC_About_1_1758790964412.webp";
import newPcPortfolio8 from "@assets/PC_Carousel_8_1758796224264.webp";
import newPcPortfolio10 from "@assets/PC_Carousel_10_1758796936936.webp";
import hodHasharon from "@assets/Hod_Hasharon.webp";
import natanya from "@assets/natanya.webp";

// Portfolio images arrays
const mobilePortfolioImages = [
  { src: mobilePortfolio1, alt: "פרוייקט נגרות 1 - ארונות מטבח מודרניים" },
  { src: mobilePortfolio2, alt: "פרוייקט נגרות 2 - ספריה מובנית בסלון" },
  { src: mobilePortfolio6, alt: "פרוייקט נגרות 6 - ארונות אמבטיה" },
  { src: mobilePortfolio7, alt: "פרוייקט נגרות 7 - מטבח כפרי" },
  { src: mobilePortfolio8, alt: "פרוייקט נגרות 8 - ארון הזזה בחדר ילדים" },
  { src: mobilePortfolio9, alt: "פרוייקט נגרות 9 - ארונות משרד" },
  { src: dafna, alt: "פרוייקט דפנה - עיצוב נגרות מותאם אישית" },
  { src: mobilePortfolio4, alt: "פרוייקט נגרות 4 - יחידת טלוויזיה מעוצבת" },
  { src: mobilePortfolio5, alt: "פרוייקט נגרות 5 - פינת עבודה ביתית" },
  { src: mobilePortfolio10, alt: "פרוייקט נגרות 10 - פינת אוכל מובנית" },
  { src: mobilePortfolio11, alt: "פרוייקט נגרות 11 - חדר רחצה מעוצב ומינימליסטי" },
];

const pcPortfolioImages = [
  { src: pcPortfolio1, alt: "חדר שינה מינימליסטי עם ארונות לבנים מובנים" },
  { src: pcPortfolio2, alt: "מטבח מודרני עם אי מעוצב ותאורה מעלית" },
  { src: newPcPortfolio10, alt: "מטבח בשלבי בנייה - ארונות ירוקים מעוצבים" },
  { src: hodHasharon, alt: "פרוייקט הוד השרון - מטבח מעוצב" },
  { src: natanya, alt: "פרוייקט נתניה - מטבח מעוצב" },
  { src: pcPortfolio5, alt: "מטבח לבן עם אקסנטים צבעוניים ושטיח גיאומטרי" },
  { src: pcPortfolio4, alt: "מטבח פתוח עם אי כחול ושולחן עגול מעץ" },
  { src: pcPortfolio3, alt: "מטבח שחור עם ארונות עליונים וגופי תאורה" },
  { src: pcPortfolio8, alt: "מטבח כחול עם אי לבן וכסאות בר מעץ" },
  { src: newPcPortfolio8, alt: "מטבח מודרני עם אי זהב וכסאות צהובים" },
  { src: pcPortfolio6, alt: "מטבח מודרני עם אי כחול ומשטח עץ טבעי" },
  { src: pcAbout1, alt: "סקיצת עיצוב נגרות - תכנון מקצועי ויצירתי" },
];

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'he');
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const portfolioImages = isMobile ? mobilePortfolioImages : pcPortfolioImages;

  return (
    <>
      <Navigation />

      <section id="hero">
        <HeroSection />
      </section>

      <section id="portfolio">
        <PortfolioCarousel images={portfolioImages} />
      </section>

      <AboutSection />
      <ContactSection />
      <FloatingContactButton />
      <FloatingShareNav />
      <OverlayMenu />
    </>
  );
}
