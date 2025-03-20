import React, { useEffect } from "react";

const useStickyHeader = () => {
  useEffect(() => {
    const isSticky = () => {
      const header = document.querySelector(".bottom-navbar");
      const mobileNavbar = document.querySelector(".mobile-navbar");

      const scrollTop = window.scrollY;
      const isProjectPage = window.location.pathname.includes('/projecten/');

      // Don't handle sticky behavior on project pages (handled by useHideShowNavbar)
      if (!isProjectPage && scrollTop >= 250) {
        header?.classList.add(
          "container-fluid",
          "fixed",
          "top-0",
          "left-0",
          "w-full",
          "bg-background",
          "z-20",
          "animate-slideDown",
          "shadow-md"
        );
        mobileNavbar?.classList.add(
          "container-fluid",
          "fixed",
          "top-0",
          "left-0",
          "w-full",
          "bg-background",
          "z-20",
          "animate-slideDown"
        );
      } else if (!isProjectPage && scrollTop < 50) {
        header?.classList.remove(
          "fixed",
          "shadow-md"
        );
        mobileNavbar?.classList.remove(
          "fixed"
        );
      }
    };

    window.addEventListener("scroll", isSticky);
    return () => window.removeEventListener("scroll", isSticky);
  }, []);
};

export default useStickyHeader;
