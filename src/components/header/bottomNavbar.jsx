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
            <Logo height={"90"} width={"219"} />
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
                  06 30 30 57 60
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
                  06 30 30 57 60
                </a>
              </div>
            </div>
            <li
              className={cn(
                `other_icon text-primary-foreground px-6 cursor-pointer ${linkColor}`
              )}
              onClick={() => setOffcanvaseActive(true)}
            >
              <Search height={"24"} width={"24"} />
            </li>
            <li
              className={cn(
                `other_icon text-primary-foreground pl-6 cursor-pointer flex relative ${linkColor}`
              )}
              onClick={() => setCartActive(true)}
            ></li>
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
