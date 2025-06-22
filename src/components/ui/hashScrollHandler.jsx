"use client";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const HashScrollHandler = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Function to handle scrolling to hash with retry logic
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash && pathname === '/') {
        // Remove the # from the hash
        const targetId = hash.substring(1);
        
        // Retry function to find and scroll to element
        const attemptScroll = (attempts = 0) => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          } else if (attempts < 10) {
            // Retry after a short delay if element not found (max 10 attempts)
            setTimeout(() => attemptScroll(attempts + 1), 100);
          }
        };
        
        // Start attempting to scroll after a small initial delay
        setTimeout(() => attemptScroll(), 200);
      }
    };

    // Handle hash on initial load
    handleHashScroll();

    // Handle hash changes (when navigating with hash)
    const handleHashChange = () => {
      handleHashScroll();
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Also listen for page load completion
    if (document.readyState === 'loading') {
      window.addEventListener('load', handleHashScroll);
    }
    
    // Cleanup
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('load', handleHashScroll);
    };
  }, [pathname]);

  return null; // This component doesn't render anything
};

export default HashScrollHandler;
