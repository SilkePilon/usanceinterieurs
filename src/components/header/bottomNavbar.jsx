"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/assets/icons/logo";
import { EnvelopeIcon, PhoneIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";
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

  return (
    <>
      <div className="bottom-navbar flex justify-between items-center py-2 h-[84px] rounded-bl-2xl rounded-br-2xl">
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
                  href="tel:+1234567890"
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
                  href="tel:+0987654321"
                  className="text-primary-foreground text-sm relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full"
                  style={{ color: "black" }}
                >
                  Dennis 0630211174
                </a>
              </div>

              {/* Menu Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-2 group cursor-pointer"
                >
                  <Bars3Icon className="h-5 w-5 text-primary-foreground" />
                  <span className="text-primary-foreground text-sm">
                    Menu
                  </span>
                </button>
                
                {isMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-background rounded-lg shadow-lg py-2 z-50">
                    {/* Main navigation */}
                    <div className="border-b border-primary-foreground/10 pb-2 mb-2">
                      <Link 
                        href="/#about" 
                        className="block px-4 py-2 text-sm text-primary-foreground hover:bg-primary-foreground/10"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Over ons
                      </Link>
                      <Link 
                        href="/#services" 
                        className="block px-4 py-2 text-sm text-primary-foreground hover:bg-primary-foreground/10"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Onze diensten
                      </Link>
                    </div>

                    {/* Project categories */}
                    <div className="px-4 py-2">
                      <span className="text-xs font-semibold text-primary-foreground/60 uppercase">
                        Projecten
                      </span>
                    </div>
                    {categories.map((category) => (
                      <Link
                        key={category}
                        href={`/#${category.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block px-4 py-2 text-sm text-primary-foreground hover:bg-primary-foreground/10"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </ul>
        </nav>
      </div>
      <Offcanvas
        setOffcanvaseActive={setOffcanvaseActive}
        offcanvaseActive={offcanvaseActive}
      />
    </>
  );
};

export default BottomNavbar;
