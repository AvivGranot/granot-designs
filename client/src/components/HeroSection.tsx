import { useState, useEffect, useCallback, useRef } from 'react';

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
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

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

  // Navigate to specific slide
  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Navigate to next/previous slide
  const navigate = useCallback((direction: 'prev' | 'next') => {
    if (direction === 'next') {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    } else {
      setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    }
  }, [heroImages.length]);

  // Autoplay effect with pause on hover
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // 5 seconds per slide

    return () => clearInterval(interval);
  }, [heroImages.length, isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') navigate('next');
      if (e.key === 'ArrowLeft') navigate('prev');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  // Touch/swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        navigate('next');
      } else {
        navigate('prev');
      }
    }
  };

  // Pause on hover
  const handleMouseEnter = () => {
    setIsPaused(true);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    setIsHovered(false);
  };

  const handleScrollToPortfolio = (e: React.MouseEvent) => {
    e.preventDefault();
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      className="h-screen w-full relative overflow-hidden group"
      data-testid="section-hero"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Images */}
      <div className="relative w-full h-full" data-testid="carousel-hero">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
            data-testid={`slide-hero-${index}`}
            style={{
              transitionDuration: '800ms',
              zIndex: index === currentIndex ? 1 : 0,
              pointerEvents: index === currentIndex ? 'auto' : 'none'
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-[10000ms] ease-linear"
              data-testid={`img-hero-${index}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                objectPosition: index === 2 ? '95% center' : 'center',
                transform: index === currentIndex ? 'scale(1.05)' : 'scale(1)'
              }}
              draggable={false}
              loading="eager"
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows - visible on hover */}
      <button
        className={`absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
        }`}
        onClick={() => navigate('prev')}
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>

      <button
        className={`absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}
        onClick={() => navigate('next')}
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex ? 'true' : 'false'}
          />
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
