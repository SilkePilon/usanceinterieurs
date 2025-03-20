import React from "react";
import TextTyped from "../../ui/textTyped";
import Link from "next/link";
import ButtonFill from "@/components/ui/buttons/buttonFill";
import RightArrow from "@/assets/icons/rightArrow";
import header from "@/assets/images/header_2.jpg";
const BannerThree = () => {
  return (
    <div className="relative overflow-x-hidden">
      <div className="bg-hero-section bg-no-repeat h-screen bg-center bg-cover">
        <img
          className="absolute inset-0 object-cover h-screen w-full"
          src={header.src}
        ></img>
        {/* Gradient fade overlay */}
        {/* <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent z-10"></div> */}
        <div className="container">
          <div className="absolute top-1/2 -translate-y-1/2 z-20">
            <h1 className="text-white [font-size:_clamp(60px,10vw,150px)] font-extrabold leading-[90%]">
              Usance Interieurs <br />
              <TextTyped text={["Ontwerp", "Styling", "Realisatie"]} />
            </h1>
            <a href={"#projects"} className="mt-16 inline-block">
              <ButtonFill
                className={`sm:px-10 px-4 after:left-0 after:bg-secondary text-primary-foreground border-secondary hover:text-secondary-foreground`}
              >
                {" "}
                Onze projecten <RightArrow width={"35"} height={"22"} />{" "}
              </ButtonFill>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerThree;
