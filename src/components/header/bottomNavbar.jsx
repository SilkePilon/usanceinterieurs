"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Logo from "@/assets/icons/logo";
import { EnvelopeIcon, PhoneIcon, Bars3Icon } from "@heroicons/react/24/solid";
import Offcanvas from "./offCanvas";
import { createBucketClient } from "@cosmicjs/sdk";

const cosmic = createBucketClient({
  bucketSlug: "usance-production",
  readKey: "I3jedjwVkj48hIM1WRP6qGKIy2atHx0knIxGxWIDSrr5J7ODZ2",
});

const BottomNavbar = () => {
  const [offcanvaseActive, setOffcanvaseActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const navbarRef = useRef(null);
  const buttonRef = useRef(null);
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

        // Desired order of categories (same as main page)
        const desiredOrder = [
          "Meubelshowroom Concepts & Styling",
          "Retail Interieurontwerp", 
          "Bedrijven Interieurontwerp",
          "Particulieren Interieurontwerp",
          "Woninginterieur Renovatie",
          "bouwbegeleiding",
        ];

        // Sort categories by desired order
        const sortedCategories = uniqueCategories.sort(
          (a, b) => desiredOrder.indexOf(a) - desiredOrder.indexOf(b)
        );

        setCategories(sortedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  const handleMenuClick = (e, href) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(false);
    
    // Check if href is a hash link (starts with /#)
    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      
      // Check if we're already on the home page
      if (window.location.pathname === '/') {
        // We're on home page, scroll directly to the section
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      } else {
        // We're on a different page, navigate to home page with hash
        // The scrolling will be handled by the useEffect in the layout or page component
        window.location.href = href;
      }
    } else {
      // Regular navigation for non-hash links
      window.location.href = href;
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <>      <div 
        ref={navbarRef}
        className="bottom-navbar flex flex-col rounded-bl-2xl rounded-br-2xl bg-[#f9fffc] shadow-sm"
      >
        {/* Main navbar content */}
        <div className="flex justify-between items-center py-2 h-[84px] bg-[#f9fffc]">
          <div className="flex items-center h-full">
            <Link href="/" className="logo text-primary-foreground">
              <Logo height={"120"} width={"240"} />
            </Link>
          </div>
          <nav>
            <ul className="flex items-center">
              {/* Contact Information */}
              <div className="flex items-center gap-4">
                {/* Email */}
                <div className="flex items-center gap-2 group">
                  <EnvelopeIcon className="h-5 w-5 text-primary-foreground" />
                  <a
                    href="mailto:info@usanceinterieurs.nl"
                    className="text-primary-foreground text-sm relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full"
                    style={{ color: "black" }}
                  >
                    info@usanceinterieurs.nl
                  </a>
                </div>

                {/* Phone Number 1 */}
                <div className="flex items-center gap-2 group">
                  <PhoneIcon className="h-5 w-5 text-primary-foreground" />
                  <a
                    href="tel:0630305760"
                    className="text-primary-foreground text-sm relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full"
                    style={{ color: "black" }}
                  >
                    Mariska 0630305760
                  </a>
                </div>

                {/* Phone Number 2 */}
                <div className="flex items-center gap-2 group">
                  <PhoneIcon className="h-5 w-5 text-primary-foreground" />
                  <a
                    href="tel:0630211174"
                    className="text-primary-foreground text-sm relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full"
                    style={{ color: "black" }}
                  >
                    Dennis 0630211174
                  </a>
                </div>

                {/* Menu Toggle Button */}
                <div className="flex items-center gap-2 group">
                  <Bars3Icon className="h-5 w-5 text-primary-foreground" />
                  <button 
                    type="button" 
                    ref={buttonRef}
                    aria-expanded={isMenuOpen ? "true" : "false"}
                    aria-haspopup="true"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center gap-1 text-primary-foreground text-sm relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full"
                    style={{ color: "black" }}
                  >
                    Menu
                    <svg 
                      className={`h-4 w-4 text-primary-foreground transform transition-all duration-500 ${isMenuOpen ? 'rotate-180' : ''}`} 
                      viewBox="0 0 20 20" 
                      fill="currentColor" 
                      aria-hidden="true"
                    >
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </ul>
          </nav>        </div>
          {/* Expandable menu section - visible even when closed for animation purposes */}
        <div 
          className={`overflow-hidden bg-[#f9fffc] transition-all duration-700 ease-in-out ${
            isMenuOpen 
              ? 'max-h-[500px]' 
              : 'max-h-0'
          }`}
        >
          <div className="px-4 py-4">
            <div className="grid grid-cols-2 gap-4">              <div className="col-span-1">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Navigatie
                </h3>
                <div className="space-y-2">
                  <div className="group">
                    <button 
                      className="flex items-center gap-2 text-primary-foreground text-sm relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full px-3 py-2" 
                      onClick={(e) => handleMenuClick(e, "/over-ons")}
                    >
                      <svg className="h-5 w-5 text-primary-foreground" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                      Over ons
                    </button>
                  </div>

                  <div className="group">
                    <button 
                      className="flex items-center gap-2 text-primary-foreground text-sm relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full px-3 py-2" 
                      onClick={(e) => handleMenuClick(e, "/#reviews")}
                    >
                      <svg className="h-5 w-5 text-primary-foreground" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      Reviews
                    </button>
                  </div>
                </div>
              </div>
              
              {categories.length > 0 && (
                <div className="col-span-1">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Projecten
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="group">
                        <button
                          className="flex items-center gap-2 text-primary-foreground text-sm relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full px-3 py-2"
                          onClick={(e) => handleMenuClick(e, `/#${category.toLowerCase().replace(/\s+/g, '-')}`)}
                        >
                          <svg className="h-5 w-5 text-primary-foreground" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                          </svg>
                          {category}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Offcanvas
        setOffcanvaseActive={setOffcanvaseActive}
        offcanvaseActive={offcanvaseActive}
      />
    </>
  );
};

export default BottomNavbar;
