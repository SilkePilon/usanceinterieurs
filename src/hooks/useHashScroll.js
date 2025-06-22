"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useHashScroll = () => {
  const router = useRouter();

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetId = hash.substring(1);
        
        // Retry function to find and scroll to element
        const attemptScroll = (attempts = 0) => {
          const element = document.getElementById(targetId);
          if (element) {
            // Add a small delay to ensure smooth scrolling works properly
            setTimeout(() => {
              element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }, 50);
          } else if (attempts < 15) {
            // Retry after a short delay if element not found (max 15 attempts = 1.5 seconds)
            setTimeout(() => attemptScroll(attempts + 1), 100);
          }
        };
        
        // Start attempting to scroll
        attemptScroll();
      }
    };

    // Handle hash on component mount
    scrollToHash();

    // Handle hash changes
    const handleHashChange = () => {
      scrollToHash();
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Cleanup
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [router]);

  return null;
};

export default useHashScroll;
