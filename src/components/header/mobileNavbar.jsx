"use client";
import React, { useState } from "react";
import Logo from "@/assets/icons/logo";
import Link from "next/link";
import MenuIcon from "@/assets/icons/menuIcon";
import CloseIcon from "@/assets/icons/closeIcon";
import { EnvelopeIcon, PhoneIcon, StarIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";

const MobileNavbar = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);

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
                <li>
                  <Link
                    href="/#about"
                    onClick={() => setIsMenuActive(false)}
                    className="flex items-center gap-3 hover:bg-primary-foreground/5 p-3 rounded-lg text-primary-foreground transform transition-all duration-300 hover:translate-x-2 block w-full"
                  >
                    <span className="text-base">Over ons</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#services"
                    onClick={() => setIsMenuActive(false)}
                    className="flex items-center gap-3 hover:bg-primary-foreground/5 p-3 rounded-lg text-primary-foreground transform transition-all duration-300 hover:translate-x-2 block w-full"
                  >
                    <span className="text-base">Diensten</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#projects"
                    onClick={() => setIsMenuActive(false)}
                    className="flex items-center gap-3 hover:bg-primary-foreground/5 p-3 rounded-lg text-primary-foreground transform transition-all duration-300 hover:translate-x-2 block w-full"
                  >
                    <span className="text-base">Projecten</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#reviews"
                    onClick={() => setIsMenuActive(false)}
                    className="flex items-center gap-3 hover:bg-primary-foreground/5 p-3 rounded-lg text-primary-foreground transform transition-all duration-300 hover:translate-x-2 block w-full"
                  >
                    <span className="text-base">Reviews</span>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
