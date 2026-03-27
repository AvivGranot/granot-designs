import { useState, useEffect } from 'react';

// Mobile hero carousel images
import mobileHeroImage1 from "@assets/portfolio1_1758398100598.webp";
import mobileHeroImage2 from "@assets/portfolio4_1758398446612.webp";
import mobileHeroImage3 from "@assets/10_1758706575877.webp";

// PC hero - static
import pcHeroImage from "@assets/PC_HomeScreen_1_1758787763058.webp";

const mobileHeroImages = [
  { src: mobileHeroImage1, alt: "מינימליסטי חדר שינה עם ארונות מובנים" },
  { src: mobileHeroImage2, alt: "פינת אוכל מעוצבת עם ארונות אחסון מובנים" },
  { src: mobileHeroImage3, alt: "עבודת נגרות מקצועית ומותאמת אישית" },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mobileHeroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isMobile]);

  const handleScrollToPortfolio = (e: React.MouseEvent) => {
    e.preventDefault();
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="h-screen w-full relative overflow-hidden" data-testid="section-hero">
      {isMobile ? (
        <div className="relative w-full h-full" data-testid="carousel-hero">
          {mobileHeroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity ease-in-out ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                transitionDuration: '2000ms',
                zIndex: index === currentIndex ? 1 : 0,
                pointerEvents: index === currentIndex ? 'auto' : 'none'
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                draggable={false}
              />
            </div>
          ))}
        </div>
      ) : (
        <img
          src={pcHeroImage}
          alt="גרנות עיצובים - מטבחים וריהוט פנים בעיצוב אישי"
          className="w-full h-full object-cover"
          style={{ display: 'block' }}
          fetchPriority="high"
          draggable={false}
        />
      )}

      <div className="hero-cta-container">
        <a
          href="#portfolio"
          onClick={handleScrollToPortfolio}
          className="hero-cta-button"
        >
          לעבודות שלנו
        </a>

        <div
          className="scroll-indicator"
          onClick={handleScrollToPortfolio}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleScrollToPortfolio(e as unknown as React.MouseEvent)}
          aria-label="גלול למטה לתיק עבודות"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
          <span className="scroll-indicator-text">גללו למטה</span>
        </div>
      </div>
    </div>
  );
}
