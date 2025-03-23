"use client";
import React, { useState, useEffect } from "react";
import Logo from "@/assets/icons/logo";
import Link from "next/link";
import MenuIcon from "@/assets/icons/menuIcon";
import CloseIcon from "@/assets/icons/closeIcon";
import { EnvelopeIcon, PhoneIcon, StarIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";
import { createBucketClient } from "@cosmicjs/sdk";

const cosmic = createBucketClient({
  bucketSlug: "usance-production",
  readKey: "I3jedjwVkj48hIM1WRP6qGKIy2atHx0knIxGxWIDSrr5J7ODZ2",
});

const MobileNavbar = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [categories, setCategories] = useState([]);

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
    setIsMenuActive(false);
    
    const targetId = href.replace('/#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="mobile-navbar">
      <div className="bg-background relative overflow-x-clip px-2.5">
        <div className="container-fluid">
          <div className="flex items-center justify-between py-2">
            {/* Empty div to maintain spacing */}
            <div className="w-[24px]"></div>
            
            {/* Centered logo with larger size */}
            <Link href={"/"} className="text-primary-foreground">
              <Logo height={"35"} width={"200"} />
            </Link>
            
            {/* Menu button on the right */}
            <div
              className="text-primary-foreground cursor-pointer transform hover:scale-110 transition-all duration-300 p-2 rounded-[4px]"
              onClick={() => setIsMenuActive(true)}
            >
              <MenuIcon />
            </div>
          </div>
        </div>
        <div>
          <nav
            className={`max-h-screen min-h-screen overflow-y-auto bg-background absolute transition-all duration-500 ease-in-out transform ${
              isMenuActive ? "right-0" : "sm:-right-full -right-[150%]"
            } top-0 z-50 py-6 px-6`}
          >
            <div className="w-80">
              {/* Header section with centered logo */}
              <div className="flex flex-col items-center relative pb-6 mb-8 border-b border-primary-foreground/10">
                <Link href={"/"} className="text-primary-foreground mb-2">
                  <Logo height={"35"} width={"200"} />
                </Link>
                <div 
                  className="absolute right-0 top-0 text-primary-foreground cursor-pointer transform hover:rotate-180 transition-all duration-300 p-2 rounded-full hover:bg-primary-foreground/10" 
                  onClick={() => setIsMenuActive(false)}
                >
                  <CloseIcon />
                </div>
              </div>

              {/* Menu items with improved spacing */}
              <ul className="space-y-8">
                {/* Contact items */}
                <li>
                  <a
                    href="mailto:info@usanceinterieurs.nl"
                    className="flex items-center gap-3 hover:bg-primary-foreground/5 p-3 rounded-lg text-primary-foreground transform transition-all duration-300 hover:translate-x-2 block w-full"
                  >
                    <EnvelopeIcon className="h-5 w-5" />
                    <span className="text-base">info@usanceinterieurs.nl</span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:0630305760"
                    className="flex items-center gap-3 hover:bg-primary-foreground/5 p-3 rounded-lg text-primary-foreground transform transition-all duration-300 hover:translate-x-2 block w-full"
                  >
                    <PhoneIcon className="h-5 w-5" />
                    <span className="text-base">Mariska 0630305760</span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:0630211174"
                    className="flex items-center gap-3 hover:bg-primary-foreground/5 p-3 rounded-lg text-primary-foreground transform transition-all duration-300 hover:translate-x-2 block w-full"
                  >
                    <PhoneIcon className="h-5 w-5" />
                    <span className="text-base">Dennis 0630211174</span>
                  </a>
                </li>

                {/* Main navigation */}
                <li>
                  <Link
                    href="/#about"
                    onClick={(e) => handleMenuClick(e, "/#about")}
                    className="flex items-center gap-3 hover:bg-primary-foreground/5 p-3 rounded-lg text-primary-foreground transform transition-all duration-300 hover:translate-x-2 block w-full"
                  >
                    <span className="text-base">Over ons</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#services"
                    onClick={(e) => handleMenuClick(e, "/#services")}
                    className="flex items-center gap-3 hover:bg-primary-foreground/5 p-3 rounded-lg text-primary-foreground transform transition-all duration-300 hover:translate-x-2 block w-full"
                  >
                    <span className="text-base">Onze diensten</span>
                  </Link>
                </li>

                {/* Project categories */}
                <li className="pt-4 border-t border-primary-foreground/10">
                  <span className="px-3 text-xs font-semibold text-primary-foreground/60 uppercase">
                    Projecten
                  </span>
                </li>
                {categories.map((category) => (
                  <li key={category}>
                    <Link
                      href={`/#${category.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={(e) => handleMenuClick(e, `/#${category.toLowerCase().replace(/\s+/g, '-')}`)}
                      className="flex items-center gap-3 hover:bg-primary-foreground/5 p-3 rounded-lg text-primary-foreground transform transition-all duration-300 hover:translate-x-2 block w-full"
                    >
                      <span className="text-base">{category}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
