"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import about_img from "@/assets/images/about-image.jpg";
import SectionTitle from "../../ui/sectionTitle";
import { cardSlideAnimation, cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";
import SectionSidebarImg from "@/components/ui/sectionSidebarImg";

const aboutList = [
  {
    id: "01",
    item: "Ontwerp",
    item_desc:
      "Wij vertalen uw inspiratie uit tijdschriften en media naar een persoonlijk interieur dat perfect bij u past.",
  },
  {
    id: "02",
    item: "B2B Styling",
    item_desc:
      "Met jarenlange ervaring in de retail vertalen wij uw zakelijke ruimte naar een efficiënt en sfeervol concept, waar ergonomie en commercialiteit samenkomen in een doordacht ontwerp.",
  },
  {
    id: "03",
    item: "Realisatie",
    item_desc:
      "Wij creëren duurzame interieurs met oog voor detail, van complete woonkamers tot vakkundig gemonteerde keukens via onze lokale partners.",
  },
];
const AboutOne = ({ text_muted, bg_muted }) => {
  const { ref, inView, entry } = useInView({
    threshold: 0.0,
    triggerOnce: true,
  });
  return (
    <section className="pt-20">
      <div className="container-fluid ">
        <SectionTitle
          sectionName={"Over Ons"}
          sectionTitle={"Omdat wij u èn ons vak verstaan"}
          sectionDesc={
            "Usance komt van het Franse woord voor 'gewoonte' en 'nut'. Dit vormt de basis van onze werkwijze: wij creëren doelgerichte, praktische interieurs die perfect aansluiten bij uw specifieke wensen en eisen."
          }
          text_muted={text_muted}
          bg_muted={bg_muted}
        />
        <div
          className={cn(
            `bg-primary xl:mt-[220px] lg:mt-25 md:mt-44 mt-[540px] xl:mb-20 mb-0 ${bg_muted}`
          )}
        >
          {/* <div className="container">
            <div className="flex lg:flex-row flex-col items-center gap-[66px]">
              <SectionSidebarImg
                img={about_img}
                section_name={"about-bg"}
                className="md:-mt-25 -mt-[470px] -mb-25"
              />
              <ul className="lg:mt-0 mt-20 lg:pb-0 pb-10">
                {aboutList.map(({ id, item, item_desc }) => {
                  return (
                    <li
                      key={id}
                      className="lg:flex gap-10 pb-10 last:pb-0 justify-between"
                    >
                      <svg
                        ref={ref}
                        strokeWidth="1"
                        className={`h-[65px] w-20 relative -top-2 left-3 xl:text-6xl text-5xl mb-3 lg:mb-0 inline-block font-extrabold leading-120  ${
                          inView
                            ? "animate-text-line-animation stroke-secondary stroke-dasharray-1000 stroke-dashoffset-1000"
                            : " fill-transparent stroke-secondary "
                        }`}
                      >
                        <text x="0%" dominantBaseline="middle" y="70%">
                          {id}
                        </text>
                      </svg>
                      <div className="max-w-[534px]">
                        <h4 className="text-3xl 2sm:text-4xl font-bold leading-135 text-secondary-foreground">
                          {item}
                        </h4>
                        <p className="text-lg text-secondary-foreground font-normal">
                          {item_desc}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default AboutOne;
