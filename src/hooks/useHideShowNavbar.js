import { useEffect } from 'react';

/**
 * Custom hook to hide navbar initially and when scrolled back to top on project pages,
 * show it when scrolling down as sticky navbar
 */
const useHideShowNavbar = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let lastScrollTop = window.scrollY;
    const header = document.querySelector('header');

    if (!header) return;

    // Set initial state - hidden at top
    if (window.scrollY < 100) {
      header.style.transform = 'translateY(-100%)';
      header.style.transition = 'transform 0.3s ease-in-out';
    }

    const handleScroll = () => {
      const currentScrollTop = window.scrollY;
      
      if (header) {
        // Show navbar when scrolling down
        if (currentScrollTop > 100 && currentScrollTop > lastScrollTop) {
          header.style.transform = 'translateY(0)';
          header.style.transition = 'transform 0.3s ease-in-out';
        } 
        // Hide navbar when scrolling up and near top
        else if (currentScrollTop <= 100 || currentScrollTop < lastScrollTop) {
          header.style.transform = 'translateY(-100%)';
        }
      }
      
      lastScrollTop = currentScrollTop;
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