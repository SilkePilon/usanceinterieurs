"use client";
import { cn } from "@/lib/utils";
import { useScroll, useTransform, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import RightArrow from "@/assets/icons/rightArrow";
import ButtonOutline from "./buttons/buttonOutline";

const SectionTitle = ({
  sectionName,
  sectionTitle,
  sectionDesc,
  text_muted,
  bg_muted,
  link,
  button_text,
}) => {
  const [scroll, setScroll] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(0);
  const containerRef = useRef();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.0"],
  });

  let scrollValue;
  if (scroll) {
    scrollValue = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  } else {
    scrollValue = useTransform(
      scrollYProgress,
      [0, 1],
      ["0%", `${Math.min(scrollHeight / 4, 10)}%`]
    );
  }
  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        setScroll(true);
      } else {
        setScrollHeight(window.scrollY);
        setScroll(false);
      }
    });
  }, []);
  return (
    <>
      <div className="container relative">
        <div
          className={cn(
            `mt-4 xl:ml-12.5 lg:ml-9 md:ml-7 ml-3 after:contents-[""] after:absolute after:left-[12px] after:top-0 after:w-[1px] after:h-full after:bg-primary`
          )}
        >
          <div className="relative pt-20">
            <div ref={containerRef} className="absolute w-full overflow-visible inset-0 flex items-end">
              <motion.div
                style={{ translateX: scrollValue, transitionDuration: "1s" }}
                className="w-full"
              >
                <h1 className="font-serif text-transparent webkit-text-stroke-width-1 webkit-text-stroke-primary opacity-20 xl:text-[160px] lg:text-[130px] md:text-[100px] sm:text-[80px] text-[60px] whitespace-nowrap leading-none">
                  {sectionName}
                </h1>
              </motion.div>
            </div>
            <h2
              className={cn(
                `relative z-10 [font-size:_clamp(18px,3vw,36px)] font-extrabold leading-110 mb-5 ${text_muted} [&_.highlight-text]:text-primary [&_.highlight-text]:italic`
              )}
              style={{ color: "#2A2B2D" }}
              dangerouslySetInnerHTML={{ __html: sectionTitle }}
            />
          </div>
          <span className={cn(`block w-[300px] h-[1px] bg-primary ${bg_muted}`)}></span>
          <div className="flex md:flex-row flex-col justify-between md:items-center">
            <h5
              className={cn(
                `lg:text-lg sm:text-base text-sm font-semibold mt-4 max-w-[690px] md:mb-0 mb-7 !leading-160 ${text_muted} [&_.highlight-text]:text-primary [&_.highlight-text]:italic`
              )}
              style={{ color: "#2A2B2D" }}
              dangerouslySetInnerHTML={{ __html: sectionDesc }}
            >
            </h5>
            {button_text && (
              <Link href={link}>
                <ButtonOutline
                  className={cn(`2sm:px-10 px-3 after:left-0 after:${bg_muted}`)}
                >
                  {button_text} <RightArrow height={"22"} width={"35"} />{" "}
                </ButtonOutline>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionTitle;