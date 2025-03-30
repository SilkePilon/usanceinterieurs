"use client";
import React, { useState, useEffect, useRef } from "react";
import Logo from "@/assets/icons/logo";
import Link from "next/link";
import MenuIcon from "@/assets/icons/menuIcon";
import CloseIcon from "@/assets/icons/closeIcon";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { createBucketClient } from "@cosmicjs/sdk";

const cosmic = createBucketClient({
  bucketSlug: "usance-production",
  readKey: "I3jedjwVkj48hIM1WRP6qGKIy2atHx0knIxGxWIDSrr5J7ODZ2",
});

const MobileNavbar = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [categories, setCategories] = useState([]);
  const mobileNavRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await cosmic.objects
          .find({
            type: "projects",
          })
          .props("metadata");

        const uniqueCategories = [...new Set(
          response.objects
            .map(project => project.metadata?.category?.value)
            .filter(Boolean)
        )];

        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleMenuClick = (e, href) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuActive(false);
    
    const targetId = href.replace('/#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    } else {
      window.location.href = href;
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuActive && mobileNavRef.current && !mobileNavRef.current.contains(event.target)) {
        setIsMenuActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuActive]);

  return (
    <div 
      ref={mobileNavRef} 
      className={`mobile-navbar bg-[#f9fffc] shadow-md transition-all duration-500 ease-in-out ${
        isMenuActive ? 'pb-4' : ''
      }`}
    >
      {/* Main header bar */}
      <div className="bg-[#f9fffc] relative px-2.5">
        <div className="container-fluid">
          <div className="flex items-center justify-between py-2">
            {/* Empty div to maintain spacing */}
            <div className="w-[24px]"></div>
            
            {/* Centered logo with larger size */}
            <Link href={"/"} className="text-primary-foreground">
              <Logo height={"35"} width={"200"} />
            </Link>
            
            {/* Menu toggle button */}
            <button 
              type="button"
              aria-expanded={isMenuActive ? "true" : "false"}
              aria-label="Toggle menu"
              onClick={() => setIsMenuActive(!isMenuActive)}
              className="text-primary-foreground transform hover:scale-110 transition-all duration-300 p-2 rounded-md"
            >
              {isMenuActive ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Expandable menu content - always present for animation */}
        <div 
          className={`overflow-hidden bg-[#f9fffc] transition-all duration-500 ease-in-out transform origin-top ${
            isMenuActive ? 'max-h-[1000px] opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-0'
          }`}
          style={{
            transitionProperty: "max-height, opacity, transform",
            willChange: "max-height, opacity, transform"
          }}
        >
          {/* Content with opacity transition for smoother effect */}
          <div className={`transition-opacity duration-500 ${isMenuActive ? 'opacity-100' : 'opacity-0'}`}>
            {/* Contact section */}
            <div className="py-4 border-b border-gray-200">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
                Contact
              </h3>
              <div className="space-y-3">
                <a
                  href="mailto:info@usanceinterieurs.nl"
                  className="flex items-center gap-3 px-3 py-2 text-sm text-primary-foreground group relative"
                >
                  <EnvelopeIcon className="h-5 w-5 text-primary-foreground" />
                  <span className="relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full">
                    info@usanceinterieurs.nl
                  </span>
                </a>
                <a
                  href="tel:0630305760"
                  className="flex items-center gap-3 px-3 py-2 text-sm text-primary-foreground group relative"
                >
                  <PhoneIcon className="h-5 w-5 text-primary-foreground" />
                  <span className="relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full">
                    Mariska 0630305760
                  </span>
                </a>
                <a
                  href="tel:0630211174"
                  className="flex items-center gap-3 px-3 py-2 text-sm text-primary-foreground group relative"
                >
                  <PhoneIcon className="h-5 w-5 text-primary-foreground" />
                  <span className="relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full">
                    Dennis 0630211174
                  </span>
                </a>
              </div>
            </div>

            {/* Navigation section */}
            <div className="py-4 border-b border-gray-200">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
                Navigation
              </h3>
              <div className="space-y-2">
                <div className="group">
                  <button
                    className="flex items-center gap-3 w-full px-3 py-2 text-sm text-primary-foreground text-left"
                    onClick={(e) => handleMenuClick(e, "/#about")}
                  >
                    <svg className="h-5 w-5 text-primary-foreground" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                    <span className="relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full">
                      Over ons
                    </span>
                  </button>
                </div>
                <div className="group">
                  <button
                    className="flex items-center gap-3 w-full px-3 py-2 text-sm text-primary-foreground text-left"
                    onClick={(e) => handleMenuClick(e, "/#services")}
                  >
                    <svg className="h-5 w-5 text-primary-foreground" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                    <span className="relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full">
                      Onze diensten
                    </span>
                  </button>
                </div>
                <div className="group">
                  <button
                    className="flex items-center gap-3 w-full px-3 py-2 text-sm text-primary-foreground text-left"
                    onClick={(e) => handleMenuClick(e, "/#reviews")}
                  >
                    <svg className="h-5 w-5 text-primary-foreground" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span className="relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full">
                      Reviews
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Project categories section */}
            {categories.length > 0 && (
              <div className="py-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
                  Projecten
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => {
                    const href = `/#${category.toLowerCase().replace(/\s+/g, '-')}`;
                    
                    return (
                      <div key={category} className="group">
                        <button
                          className="flex items-center gap-3 w-full px-3 py-2 text-sm text-primary-foreground text-left"
                          onClick={(e) => handleMenuClick(e, href)}
                        >
                          <svg className="h-5 w-5 text-primary-foreground" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                          </svg>
                          <span className="relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full">
                            {category}
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
