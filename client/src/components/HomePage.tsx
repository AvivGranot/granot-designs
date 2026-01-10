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
import dafna from "@assets/dafna.jpeg";

// Import portfolio images for PC carousel
import pcPortfolio1 from "@assets/PC_Carousel_1_1758790862081.jpg";
import pcPortfolio2 from "@assets/PC_Carousel_2_1758790862081.png";
import pcPortfolio3 from "@assets/PC_Carousel_3_1758790862082.png";
import pcPortfolio4 from "@assets/PC_Carousel_4_1758790862082.jpg";
import pcPortfolio5 from "@assets/PC_Carousel_5_1758790862083.png";
import pcPortfolio6 from "@assets/PC_Carousel_6_1758790862083.png";
import pcPortfolio8 from "@assets/PC_Carousel_8_1758790862084.png";
import pcAbout1 from "@assets/PC_About_1_1758790964412.png";
import newPcPortfolio8 from "@assets/PC_Carousel_8_1758796224264.png";
import newPcPortfolio9 from "@assets/PC_Carousel_9_1758796541477.png";
import newPcPortfolio10 from "@assets/PC_Carousel_10_1758796936936.png";
import hodHasharon from "@assets/Hod_Hasharon.jpg";
import natanya from "@assets/natanya.png";

// Portfolio images arrays
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
  { src: dafna, alt: "פרוייקט דפנה - עיצוב נגרות מותאם אישית" },
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
  { src: hodHasharon, alt: "פרוייקט הוד השרון - מטבח מעוצב" },
  { src: pcAbout1, alt: "סקיצת עיצוב נגרות - תכנון מקצועי ויצירתי" },
  { src: natanya, alt: "פרוייקט נתניה - מטבח מעוצב" },
];

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Set document direction and lang
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'he');
  }, []);

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

  const portfolioImages = isMobile ? mobilePortfolioImages : pcPortfolioImages;

  return (
    <>
      {/* Fixed Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section id="hero">
        <HeroSection />
      </section>

      {/* Portfolio Section - Full Screen Carousel */}
      <section id="portfolio">
        <PortfolioCarousel images={portfolioImages} />
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Floating Contact Button (WhatsApp) */}
      <FloatingContactButton />

      {/* Floating Share Navigation */}
      <FloatingShareNav />

      {/* Mobile Overlay Menu */}
      <OverlayMenu />
    </>
  );
}
