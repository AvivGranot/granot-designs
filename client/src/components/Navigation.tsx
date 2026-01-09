import { useState, useEffect, useMemo } from "react";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { useActiveSection } from "../hooks/useActiveSection";

interface NavigationProps {
  onMenuToggle?: () => void;
}

const navLinks = [
  { label: 'תיק עבודות', href: '#portfolio', sectionId: 'portfolio' },
  { label: 'אודות', href: '#about', sectionId: 'about' },
  { label: 'צור קשר', href: '#contact', sectionId: 'contact' }
];

export default function Navigation({ onMenuToggle }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll detection for header background
  const { isScrolled } = useScrollPosition(100);

  // Active section detection
  const sectionIds = useMemo(() => ['hero', 'portfolio', 'about', 'contact'], []);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    // Listen for menu close events from OverlayMenu component
    const handleMenuClosed = () => {
      setIsMenuOpen(false);
    };

    window.addEventListener('menuClosed', handleMenuClosed);

    return () => {
      window.removeEventListener('menuClosed', handleMenuClosed);
    };
  }, []);

  const handleMobileMenuToggle = () => {
    const newMenuState = !isMenuOpen;
    setIsMenuOpen(newMenuState);

    const menu = document.getElementById('overlayMenu');
    if (menu) {
      if (newMenuState) {
        menu.classList.add('active');
        menu.style.display = 'block';
        document.body.style.overflow = 'hidden';
      } else {
        menu.classList.remove('active');
        setTimeout(() => {
          menu.style.display = 'none';
        }, 300);
        document.body.style.overflow = '';
      }
    }

    if (onMenuToggle) {
      onMenuToggle();
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full flex justify-between items-center px-5 z-[2000] transition-all duration-300 ${
        isScrolled ? 'header-scrolled h-[60px] md:h-[70px]' : 'header-transparent h-[70px] md:h-[80px]'
      }`}
      data-testid="main-navigation"
    >
      {/* Logo Container - Right side for RTL */}
      <div className="logo-container">
        <a
          href="/"
          onClick={handleLogoClick}
          className="text-xl md:text-2xl font-bold text-white no-underline tracking-wide"
        >
          גרנות עיצובים
        </a>
      </div>

      {/* Desktop Navigation Links - Center/Left for RTL */}
      <nav className="nav-links" aria-label="Main navigation">
        {navLinks.map((link) => (
          <a
            key={link.sectionId}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className={`nav-link ${activeSection === link.sectionId ? 'active' : ''}`}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Mobile Hamburger Menu - Left side for RTL */}
      <button
        className="hamburger-mobile w-11 h-11 flex flex-col justify-center items-center gap-1.5 cursor-pointer bg-transparent border-none md:hidden"
        aria-label="פתח תפריט ניווט"
        onClick={handleMobileMenuToggle}
        data-testid="button-menu-toggle"
        type="button"
      >
        <span className="block w-6 h-0.5 bg-white transition-all"></span>
        <span className="block w-6 h-0.5 bg-white transition-all"></span>
        <span className="block w-6 h-0.5 bg-white transition-all"></span>
      </button>
    </header>
  );
}
