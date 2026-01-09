import { useEffect } from "react";

const menuItems = [
  { label: "תיק עבודות", sectionId: "portfolio" },
  { label: "אודות", sectionId: "about" },
  { label: "צרו קשר", sectionId: "contact" }
];

export default function OverlayMenu() {
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

    // Dispatch custom event to sync with Navigation component
    window.dispatchEvent(new CustomEvent('menuClosed'));
  };

  const handleSectionClick = (sectionId: string) => {
    // Close menu first
    handleMenuClose();

    // Scroll to section after a brief delay to allow menu animation
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleMenuClose();
      }
    };

    const handleKeyNavigation = (e: KeyboardEvent) => {
      // Number key shortcuts for quick navigation
      if (e.key === '1') {
        e.preventDefault();
        handleSectionClick('portfolio');
      } else if (e.key === '2') {
        e.preventDefault();
        handleSectionClick('about');
      } else if (e.key === '3') {
        e.preventDefault();
        handleSectionClick('contact');
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleKeyNavigation);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleKeyNavigation);
    };
  }, []);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleMenuClose();
    }
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

      {/* Main Navigation Menu */}
      <div className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 text-center">
        <h2 id="nav-title" className="sr-only">תפריט ראשי</h2>
        <ul className="space-y-10 text-white">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => handleSectionClick(item.sectionId)}
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
    </div>
  );
}
