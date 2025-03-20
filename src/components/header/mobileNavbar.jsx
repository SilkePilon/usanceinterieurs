"use client";
import React, { useState } from "react";
import Logo from "@/assets/icons/logo";
import Link from "next/link";
import { menuListTwo } from "@/lib/fackData/menuListTwo";
import MenuIcon from "@/assets/icons/menuIcon";
import CloseIcon from "@/assets/icons/closeIcon";
import Search from "@/assets/icons/search";
import Offcanvas from "./offCanvas";
import Cart from "./cart";
import { cn } from "@/lib/utils";

const MobileNavbar = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [dropDownActive, setDropDownActive] = useState("");
  const [offcanvaseActive, setOffcanvaseActive] = useState(false);
  const [cartActive, setCartActive] = useState(false);

  const handleDropDown = (e, id, isDropdown, isMegaMenu) => {
    if (isDropdown.length || isMegaMenu.length) {
      setDropDownActive(dropDownActive ? "" : id);
    } else {
      setIsMenuActive(false);
    }
  };

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
                className={`max-h-screen min-h-screen overflow-y-auto bg-background absolute transition-all duration-500 ${
                  isMenuActive ? "right-0" : "sm:-right-full -right-[150%]"
                } top-0 z-50 py-4 px-4`}
              >
                <div className="w-80">
                  <div className="flex items-center justify-between pb-4 mb-4 border-b">
                    <Link href={"/"} className="text-primary-foreground">
                      <Logo height={"25"} width={"160"} />
                    </Link>
                    <div className="text-primary-foreground" onClick={() => setIsMenuActive(false)}>
                      <CloseIcon />
                    </div>
                  </div>
                  <ul>
                    {menuListTwo.map(({ id, name, path, isDropdown, isMegaMenu }) => {
                      return (
                        <li key={id} className="border-b">
                          <Link
                            href={path}
                            onClick={(e) => handleDropDown(e, id, isDropdown, isMegaMenu)}
                            className={cn(`text-primary-foreground text-base font-medium py-2 flex items-center justify-between`)}
                          >
                            {name}
                            {(isDropdown.length || isMegaMenu.length) && (
                              <span className={cn(`transition-all duration-500 text-xl ${dropDownActive === id ? "rotate-180" : "rotate-0"}`)}>
                                +
                              </span>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </nav>
              <div
                className="text-primary-foreground"
                onClick={() => setIsMenuActive(true)}
              >
                <MenuIcon className="cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
        <Offcanvas
          setOffcanvaseActive={setOffcanvaseActive}
          offcanvaseActive={offcanvaseActive}
        />
        <Cart setCartActive={setCartActive} cartActive={cartActive} />
      </div>
    </div>
  );
};

export default MobileNavbar;
