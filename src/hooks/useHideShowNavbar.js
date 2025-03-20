import { useEffect } from 'react';

/**
 * Custom hook to hide navbar initially and when scrolled back to top on project pages,
 * show it when scrolling down as sticky navbar
 */
const useHideShowNavbar = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let lastScrollTop = window.scrollY;
    const isProjectPage = window.location.pathname.includes('/projecten/');
    const header = document.querySelector('header');

    if (!header || !isProjectPage) return;

    // Set initial state
    if (window.scrollY < 100) {
      header.style.transform = 'translateY(-100%)';
      header.style.transition = 'transform 0.3s ease-in-out';
      header.style.position = 'absolute';
      header.style.backgroundColor = 'transparent';
    }

    const handleScroll = () => {
      const currentScrollTop = window.scrollY;
      
      if (header) {
        // When scrolling down past threshold
        if (currentScrollTop > 100) {
          header.style.transform = 'translateY(0)';
          header.style.position = 'fixed';
          header.style.backgroundColor = 'var(--background)';
          header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } 
        // When at top or near top
        else if (currentScrollTop <= 50) {
          // If we're scrolling up and near the top
          if (currentScrollTop < lastScrollTop) {
            header.style.transform = 'translateY(-100%)';
            header.style.boxShadow = 'none';
            
            // When completely at top
            if (currentScrollTop === 0) {
              header.style.position = 'absolute';
              header.style.backgroundColor = 'transparent';
            }
          }
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