import { useEffect } from 'react';

/**
 * Custom hook to keep navbar always visible
 */
const useHideShowNavbar = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const header = document.querySelector('header');

    if (!header) return;

    // Set initial state - always visible
    header.style.transform = 'translateY(0)';
    header.style.transition = 'transform 0.3s ease-in-out';

    const handleScroll = () => {
      if (header) {
        // Always keep navbar visible
        header.style.transform = 'translateY(0)';
      }
    };

    // Use requestAnimationFrame for smooth performance
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });

    // Run once to set initial state
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);
};

export default useHideShowNavbar;