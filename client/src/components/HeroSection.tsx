import { useState, useEffect } from 'react';

// Import hero portfolio images for mobile (original)
import mobileHeroImage1 from "@assets/portfolio1_1758398100598.jpg";
import mobileHeroImage3 from "@assets/portfolio4_1758398446612.jpg";
import newMobileHeroImage3 from "@assets/Mobile_HomeScreen_3_1758797360428.png";
import mobileHeroImage2 from "@assets/10_1758706575877.png";

// Import hero portfolio images for PC (new)
import pcHeroImage1 from "@assets/PC_HomeScreen_1_1758787763058.jpg";
import pcHeroImage2 from "@assets/PC_HomeScreen_2_1758787763059.png";
import newPcHeroImage3 from "@assets/PC_HomeScreen_3_1758796995508.png";
import pcHeroImage3 from "@assets/PC_HomeScreen_3_1758787763059.png";

const mobileHeroImages = [
  {
    src: mobileHeroImage1,
    alt: "מינימליסטי חדר שינה עם ארונות מובנים"
  },
  {
    src: mobileHeroImage3,
    alt: "פינת אוכל מעוצבת עם ארונות אחסון מובנים"
  },
  {
    src: newMobileHeroImage3,
    alt: "ארון קיר מעוצב לחדר שינה עם מראות מובנות"
  },
  {
    src: mobileHeroImage2,
    alt: "עבודת נגרות מקצועית ומותאמת אישית"
  }
];

const pcHeroImages = [
  {
    src: pcHeroImage1,
    alt: "חדר שינה מינימליסטי עם ארונות לבנים מובנים"
  },
  {
    src: pcHeroImage2,
    alt: "מטבח מודרני עם אי וארונות מעוצבים"
  },
  {
    src: newPcHeroImage3,
    alt: "מטבח מודרני עם אי זהב וסלון משולב"
  },
  {
    src: pcHeroImage3,
    alt: "מטבח לבן עם אקסנטים צבעוניים"
  }
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get the appropriate images array based on screen size
  const heroImages = isMobile ? mobileHeroImages : pcHeroImages;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 3000); // 3 seconds per slide

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const handleScrollToPortfolio = (e: React.MouseEvent) => {
    e.preventDefault();
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="h-screen w-full relative overflow-hidden" data-testid="section-hero">
      <div className="relative w-full h-full" data-testid="carousel-hero">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
            data-testid={`slide-hero-${index}`}
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
              data-testid={`img-hero-${index}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                objectPosition: index === 2 ? '95% center' : 'center'
              }}
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* CTA and Scroll Indicator */}
      <div className="hero-cta-container">
        {/* CTA Button */}
        <a
          href="#portfolio"
          onClick={handleScrollToPortfolio}
          className="hero-cta-button"
        >
          לעבודות שלנו
        </a>

        {/* Scroll Indicator */}
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
