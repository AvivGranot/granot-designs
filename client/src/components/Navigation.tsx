import { useState, useEffect } from "react";

interface NavigationProps {
  onMenuToggle?: () => void;
  onToggle?: () => void;
}

export default function Navigation({ onMenuToggle, onToggle }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Listen for menu close events from OverlayMenu component
    const handleMenuClosed = () => {
      setIsMenuOpen(false);
    };

    // Listen for keyboard shortcut to open menu
    const handleKeyboardShortcut = (e: KeyboardEvent) => {
      if (e.key === '0' && !isMenuOpen) {
        e.preventDefault();
        handleMenuToggle();
      }
    };

    window.addEventListener('menuClosed', handleMenuClosed);
    document.addEventListener('keydown', handleKeyboardShortcut);
    
    return () => {
      window.removeEventListener('menuClosed', handleMenuClosed);
      document.removeEventListener('keydown', handleKeyboardShortcut);
    };
  }, [isMenuOpen]);

  const handleMenuToggle = () => {
    // Use the new onToggle prop for two-view system if provided
    if (onToggle) {
      onToggle();
      return;
    }
    
    // Legacy overlay functionality
    const newMenuState = !isMenuOpen;
    setIsMenuOpen(newMenuState);
    
    const menu = document.getElementById('overlayMenu');
    if (menu) {
      if (newMenuState) {
        menu.classList.add('active');
        menu.style.display = 'block';
        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
      } else {
        menu.classList.remove('active');
        setTimeout(() => {
          menu.style.display = 'none';
        }, 300);
        // Restore body scrolling
        document.body.style.overflow = '';
      }
    }
    
    if (onMenuToggle) {
      onMenuToggle();
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-transparent flex justify-between items-center p-5 z-[2000] transition-colors duration-300" data-testid="main-navigation">
      {/* Logo Container - Right side for RTL */}
      <div className="logo-container">
        <a href="/" className="text-2xl font-bold text-white no-underline tracking-wide">
          גרנות עיצובים
        </a>
      </div>
      
      {/* Navigation Toggle - Left side for RTL */}
      <button 
        className="w-14 h-5 border-2 border-white bg-transparent cursor-pointer transition-all duration-300 hover:border-opacity-70" 
        onClick={handleMenuToggle}
        data-testid="button-menu-toggle"
        type="button"
        aria-label="Open navigation menu"
      >
      </button>
    </header>
  );
}
