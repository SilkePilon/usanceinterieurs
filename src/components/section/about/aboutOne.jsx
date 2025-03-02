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
          sectionTitle={"Wat betekent Usance eigenlijk?"}
          sectionDesc={
            "De vrije vertaling voor usance is ‘gewoonte’. Ook wel ‘het nut beogend’. En dit is nou precies waar wij voor staan! Usance Interieurs denkt met u mee en zal altijd voor het interieur van uw woning, bedrijf, winkel of product het nut als uitgangspunt nemen. Een mooi interieurontwerp maken kunnen vele. Maar een op maat gemaakt advies waarin volledig op uw wensen en eisen wordt ingespeeld, tot en met de realisatie, dat doen wij uit gewoonte."
          }
        text_muted={text_muted}
        bg_muted={bg_muted}
        />
        {/* <div
          className={cn(
            `bg-primary xl:mt-[220px] lg:mt-25 md:mt-44 mt-[540px] xl:mb-20 mb-0 ${bg_muted} fade-top`
          )}
        >
        </div> */}
      </div>
    </section>
  );
};

export default AboutOne;
