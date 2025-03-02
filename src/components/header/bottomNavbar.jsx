"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import DropDownMenu from "./dropDownMenu";
import MegaMenu from "./megaMenu";
import Logo from "@/assets/icons/logo";
import Search from "@/assets/icons/search";
import { menuList } from "@/lib/fackData/menuList";
import Offcanvas from "./offCanvas";
import Cart from "./cart";
import { cn, countCartProductQuantity } from "@/lib/utils";
import ShopCart from "@/assets/icons/shopCart";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import useActiveNavLink from "@/hooks/useActiveNavLink";
import useStickyHeader from "@/hooks/useStickyHeader";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";
const BottomNavbar = ({ linkColor }) => {
  const { products } = useSelector((state) => state.addToCart);
  const [offcanvaseActive, setOffcanvaseActive] = useState(false);
  const [cartActive, setCartActive] = useState(false);

  useStickyHeader(linkColor);
  const pathName = usePathname();
  useActiveNavLink(pathName);

  return (
    <>
      <div className="bottom-navbar flex justify-between items-center">
        <div>
          <Link
            href="/"
            className={cn(`logo text-primary-foreground ${linkColor}`)}
          >
            <Logo height={"110"} width={"220"} />
          </Link>
        </div>
        <nav>
          <ul className="flex items-center">
            {/* Contact Information */}
            <div className="flex items-center gap-6">
              {/* Email */}
              <div className="flex items-center gap-2">
                <EnvelopeIcon className="h-6 w-6 text-primary-foreground" />
                <a
                  href="mailto:info@example.com"
                  className={cn(`text-primary-foreground ${linkColor}`)}
                  color="black"
                  style={{ color: "black" }}
                >
                  info@usanceinterieurs.nl
                </a>
              </div>

              {/* Phone Number 1 */}
              <div className="flex items-center gap-2">
                <PhoneIcon className="h-6 w-6 text-primary-foreground" />
                <a
                  href="tel:+1234567890"
                  className={cn(`text-primary-foreground ${linkColor}`)}
                  color="black"
                  style={{ color: "black" }}
                >
                  Mariska 0630305760
                </a>
              </div>

              {/* Phone Number 2 */}
              <div className="flex items-center gap-2">
                <PhoneIcon className="h-6 w-6 text-primary-foreground" />
                <a
                  href="tel:+0987654321"
                  className={cn(`text-primary-foreground ${linkColor}`)}
                  color="black"
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
      <Cart setCartActive={setCartActive} cartActive={cartActive} />
    </>
  );
};

export default BottomNavbar;
