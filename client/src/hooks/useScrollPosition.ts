import { useState, useEffect } from 'react';

interface ScrollPositionState {
  isScrolled: boolean;
  scrollY: number;
}

export function useScrollPosition(threshold: number = 100): ScrollPositionState {
  const [scrollPosition, setScrollPosition] = useState<ScrollPositionState>({
    isScrolled: false,
    scrollY: 0
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollPosition({
        isScrolled: currentScrollY > threshold,
        scrollY: currentScrollY
      });
    };

    // Set initial state
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrollPosition;
}
