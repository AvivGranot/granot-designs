import { useState, useEffect } from "react";

const menuItems = [
  { label: "תיק עבודות", section: "portfolio" },
  { label: "שירותים", section: "services" },
  { label: "אודות", section: "about" },
  { label: "צרו קשר", section: "contact" }
];

const portfolioImages = [
  {
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
    caption: "מטבחים מותאמים אישית",
    alt: "מטבח מותאם אישית עם אלמנטים נגריים מעוצבים"
  },
  {
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
    caption: "ריהוט מובנה ייחודי",
    alt: "ספרייה מובנית בגימור עץ מפואר"
  },
  {
    image: "https://images.unsplash.com/photo-1549497538-303791108f95?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
    caption: "רהיטים בעבודת יד",
    alt: "שולחן אוכל מעץ בעבודת יד מקצועית"
  },
  {
    image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
    caption: "עבודות נגרות ארכיטקטוניות",
    alt: "מדרגות עץ מעוצבות עם קווים נקיים"
  },
  {
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
    caption: "פתרונות אחסון מעוצבים",
    alt: "ארון בגדים מותאם אישית עם פרטי עיצוב"
  },
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
    caption: "פרוייקטים חיצוניים",
    alt: "דק עץ חיצוני עם עיצוב מתוחכם"
  }
];

export default function OverlayMenu() {
  const [currentSection, setCurrentSection] = useState<string>('menu');
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleMenuClose = () => {
    const menu = document.getElementById('overlayMenu');
    if (menu) {
      menu.classList.remove('active');
      setTimeout(() => {
        menu.style.display = 'none';
      }, 300);
    }
    
    // Restore body scrolling
    document.body.style.overflow = '';
    
    // Reset to menu view
    setCurrentSection('menu');
    
    // Dispatch custom event to sync with Navigation component
    window.dispatchEvent(new CustomEvent('menuClosed'));
  };

  const handleSectionClick = (section: string) => {
    setCurrentSection(section);
  };

  const handleBackToMenu = () => {
    setCurrentSection('menu');
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % portfolioImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + portfolioImages.length) % portfolioImages.length);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleMenuClose();
      }
    };

    const handleKeyNavigation = (e: KeyboardEvent) => {
      if (currentSection === 'portfolio') {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          prevSlide();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          nextSlide();
        }
      }
      
      // Number key shortcuts
      if (e.key === '1') {
        e.preventDefault();
        handleSectionClick('portfolio');
      } else if (e.key === '2') {
        e.preventDefault();
        handleSectionClick('services');
      } else if (e.key === '3') {
        e.preventDefault();
        handleSectionClick('about');
      } else if (e.key === '4') {
        e.preventDefault();
        handleSectionClick('contact');
      } else if (e.key === '0') {
        e.preventDefault();
        handleBackToMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleKeyNavigation);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleKeyNavigation);
    };
  }, [currentSection]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleMenuClose();
    }
  };

  const renderPortfolioCarousel = () => (
    <div className="absolute inset-0 flex items-center justify-center p-10">
      <div className="relative w-full max-w-6xl h-4/5">
        <div className="relative w-full h-full overflow-hidden rounded-lg">
          {portfolioImages.map((item, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-10 right-10 bg-black/80 text-white px-8 py-5 text-2xl font-semibold tracking-wide rounded">
                {item.caption}
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-5 -translate-y-1/2 w-15 h-15 bg-black/70 border-2 border-white rounded-full text-white flex items-center justify-center transition-all hover:bg-white/20"
          data-testid="button-carousel-prev"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-5 -translate-y-1/2 w-15 h-15 bg-black/70 border-2 border-white rounded-full text-white flex items-center justify-center transition-all hover:bg-white/20"
          data-testid="button-carousel-next"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );

  const renderSection = (sectionType: string) => {
    const sectionData = {
      services: {
        image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
        title: "שירותים",
        description: "עיצוב ובנייה של פתרונות נגרות מותאמים אישית.\nמטבחים, ריהוט מובנה ורהיטים ייחודיים."
      },
      about: {
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
        title: "אודות",
        description: "בית מלאכה משפחתי לנגרות מעוצבת.\nשלושה דורות של מסורת ומקצועיות."
      },
      contact: {
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
        title: "צרו קשר",
        description: null
      }
    };

    const section = sectionData[sectionType as keyof typeof sectionData];
    if (!section) return null;

    return (
      <div className="absolute inset-0 flex items-center justify-center p-10">
        <div className="relative w-full max-w-6xl h-4/5">
          <img
            src={section.image}
            alt={section.title}
            className="w-full h-full object-cover rounded-lg"
            loading="lazy"
          />
          <div className="absolute bottom-10 right-10 text-white text-right max-w-md">
            <h2 className="text-6xl font-black mb-5 tracking-wide uppercase">
              {section.title}
            </h2>
            {section.description && (
              <p className="text-lg leading-relaxed font-light whitespace-pre-line">
                {section.description}
              </p>
            )}
            {sectionType === 'contact' && (
              <div className="mt-8">
                <div className="flex items-center gap-4 mb-5 text-xl font-normal">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M22 16.92V19a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012 3.18 2 2 0 014 1h2.08a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l2.27-.24a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>052-1234567</span>
                </div>
                <div className="flex items-center gap-4 text-xl font-normal">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>info@granot-design.co.il</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div 
      className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[1000] transition-opacity duration-300" 
      style={{ display: 'none' }}
      id="overlayMenu" 
      data-testid="overlay-menu"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="nav-title"
    >
      {/* Close Button */}
      <button
        onClick={handleMenuClose}
        className="absolute top-10 left-10 w-11 h-11 bg-transparent border-2 border-white rounded text-white text-2xl flex items-center justify-center transition-all hover:bg-white/10 font-light z-[1001]"
        data-testid="button-menu-close"
        aria-label="סגור תפריט"
      >
        &times;
      </button>
      
      {/* Back to Menu Button (shown in sections) */}
      {currentSection !== 'menu' && (
        <button
          onClick={handleBackToMenu}
          className="absolute top-10 right-10 bg-transparent border-2 border-white rounded text-white text-base font-semibold px-5 py-3 flex items-center gap-2 transition-all hover:bg-white/10 z-[1001]"
          data-testid="button-back-to-menu"
          aria-label="חזור לתפריט הראשי"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H6m6-6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          תפריט ראשי
        </button>
      )}

      {/* Main Navigation Menu */}
      {currentSection === 'menu' && (
        <div className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 text-center">
          <h2 id="nav-title" className="sr-only">תפריט ראשי</h2>
          <ul className="space-y-10 text-white">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button 
                  onClick={() => handleSectionClick(item.section)}
                  className="text-4xl font-black transition-all tracking-wide uppercase hover:text-gray-300 hover:-translate-y-1 hover:scale-105"
                  data-testid={`link-nav-${index}`}
                  tabIndex={0}
                  role="button"
                  aria-label={`${item.label} - לחץ ${index + 1}`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Portfolio Carousel */}
      {currentSection === 'portfolio' && renderPortfolioCarousel()}

      {/* Other Sections */}
      {currentSection !== 'menu' && currentSection !== 'portfolio' && renderSection(currentSection)}
    </div>
  );
}
