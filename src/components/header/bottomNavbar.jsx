"use client";
import React, { useState } from "react";
import Link from "next/link";
import Logo from "@/assets/icons/logo";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";
import Offcanvas from "./offCanvas";

const BottomNavbar = () => {
  const [offcanvaseActive, setOffcanvaseActive] = useState(false);

  return (
    <>
      <div className="bottom-navbar flex justify-between items-center py-2">
        <div>
          <Link
            href="/"
            className="logo text-primary-foreground"
          >
            <Logo height={"80"} width={"160"} />
          </Link>
        </div>
        <nav>
          <ul className="flex items-center">
            {/* Contact Information */}
            <div className="flex items-center gap-4">
              {/* Email */}
              <div className="flex items-center gap-2">
                <EnvelopeIcon className="h-5 w-5 text-primary-foreground" />
                <a
                  href="mailto:info@usanceinterieurs.nl"
                  className="text-primary-foreground text-sm"
                  style={{ color: "black" }}
                >
                  info@usanceinterieurs.nl
                </a>
              </div>

              {/* Phone Number 1 */}
              <div className="flex items-center gap-2">
                <PhoneIcon className="h-5 w-5 text-primary-foreground" />
                <a
                  href="tel:+1234567890"
                  className="text-primary-foreground text-sm"
                  style={{ color: "black" }}
                >
                  Mariska 0630305760
                </a>
              </div>

              {/* Phone Number 2 */}
              <div className="flex items-center gap-2">
                <PhoneIcon className="h-5 w-5 text-primary-foreground" />
                <a
                  href="tel:+0987654321"
                  className="text-primary-foreground text-sm"
                  style={{ color: "black" }}
                >
                  Dennis 0630211174
                </a>
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
