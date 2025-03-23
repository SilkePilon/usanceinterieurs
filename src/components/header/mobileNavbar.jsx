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
            <Link href={"/"} className="text-primary-foreground">
              <Logo height={"25"} width={"160"} />
            </Link>
            <div>
              <nav
                className={`max-h-screen min-h-screen overflow-y-auto bg-background absolute transition-all duration-500 ease-in-out transform ${
                  isMenuActive ? "right-0" : "sm:-right-full -right-[150%]"
                } top-0 z-50 py-4 px-4`}
              >
                <div className="w-80">
                  <div className="flex items-center justify-between pb-4 mb-4">
                    <Link href={"/"} className="text-primary-foreground">
                      <Logo height={"25"} width={"160"} />
                    </Link>
                    <div 
                      className="text-primary-foreground cursor-pointer transform hover:rotate-180 transition-all duration-300" 
                      onClick={() => setIsMenuActive(false)}
                    >
                      <CloseIcon />
                    </div>
                  </div>
                  <ul className="space-y-6">
                    {/* Contact Items with slide-in animation */}
                    <li className="pb-4 transform transition-all duration-300 hover:translate-x-2">
                      <div className="flex items-center gap-2">
                        <EnvelopeIcon className="h-5 w-5 text-primary-foreground" />
                        <a
                          href="mailto:info@usanceinterieurs.nl"
                          className="text-primary-foreground text-sm"
                        >
                          info@usanceinterieurs.nl
                        </a>
                      </div>
                    </li>
                    <li className="pb-4 transform transition-all duration-300 hover:translate-x-2">
                      <div className="flex items-center gap-2">
                        <PhoneIcon className="h-5 w-5 text-primary-foreground" />
                        <a
                          href="tel:0630305760"
                          className="text-primary-foreground text-sm"
                        >
                          Mariska 0630305760
                        </a>
                      </div>
                    </li>
                    <li className="pb-4 transform transition-all duration-300 hover:translate-x-2">
                      <div className="flex items-center gap-2">
                        <PhoneIcon className="h-5 w-5 text-primary-foreground" />
                        <a
                          href="tel:0630211174"
                          className="text-primary-foreground text-sm"
                        >
                          Dennis 0630211174
                        </a>
                      </div>
                    </li>
                    <li className="pb-4 transform transition-all duration-300 hover:translate-x-2">
                      <div className="flex items-center gap-2">
                        <StarIcon className="h-5 w-5 text-primary-foreground" />
                        <Link
                          href="/#reviews"
                          className="text-primary-foreground text-sm"
                          onClick={() => setIsMenuActive(false)}
                        >
                          Reviews
                        </Link>
                      </div>
                    </li>
                  </ul>
                </div>
              </nav>
              <div
                className="text-primary-foreground cursor-pointer transform hover:scale-110 transition-all duration-300"
                onClick={() => setIsMenuActive(true)}
              >
                <MenuIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
