"use client";

import React from "react";
import TextTyped from "../../ui/textTyped";
import Link from "next/link";
import ButtonFill from "@/components/ui/buttons/buttonFill";
import RightArrow from "@/assets/icons/rightArrow";
import DownArrow from "@/assets/icons/downArrow";
import header from "@/assets/images/header.jpg";

const BannerThree = () => {
  const handleProjectsClick = (e) => {
    e.preventDefault();
    const projectsElement = document.getElementById("projects");
    if (projectsElement) {
      const headerOffset = 100; // Adjust this value as needed
      const elementPosition = projectsElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="relative overflow-x-hidden">
      <div className="bg-hero-section bg-no-repeat h-screen bg-center bg-cover">
        <img
          className="absolute inset-0 object-cover h-screen w-full"
          src={header.src}
        ></img>
        {/* Gradient fade overlay */}
        {/* <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent z-10"></div> */}
        <div className="container px-4 sm:px-6">
          <div className="absolute top-1/2 -translate-y-1/2 z-20 w-full sm:w-auto">
            <h1 className="text-white [font-size:_clamp(40px,8vw,150px)] font-extrabold leading-[1.1] sm:leading-[90%] text-center sm:text-left">
              Usance Interieurs <br />
              <TextTyped text={["Ontwerp", "Styling", "Realisatie"]} />
            </h1>
            <div className="text-center sm:text-left">
              <a href="#projects" onClick={handleProjectsClick} className="mt-32 sm:mt-16 inline-block">
                <ButtonFill
                  className={`sm:px-10 px-6 py-3 sm:py-4 after:left-0 after:bg-secondary text-primary-foreground border-secondary hover:text-secondary-foreground`}
                >
                  Onze projecten <RightArrow width={"28"} height={"18"} className="sm:w-[35px] sm:h-[22px]" />
                </ButtonFill>
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 sm:hidden z-20">
          <DownArrow 
            width="48" 
            height="48" 
            className="text-[#D35D39] animate-bounce" 
          />
        </div>
      </div>
    </div>
  );
};

export default BannerThree;
