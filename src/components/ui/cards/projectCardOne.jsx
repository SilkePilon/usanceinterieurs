"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import RightArrow from "@/assets/icons/rightArrow";
import ButtonFill from "../buttons/buttonFill";
import Link from "next/link";
import { staticBluarDataUrl } from "@/lib/staticBluarDataUrl";

const ProjectCardOne = ({
  order,
  position,
  text_home,
  project_year,
  project_desc,
  project_img,
  location,
  project_type,
  project_name,
  category,
  link,
  imageVariants,
  cardVariants,
}) => {
  return (
    <div className="xl:max-w-[95%] w-full mx-auto relative overflow-hidden">
      <div className="container">
        <div className="flex lg:flex-row flex-col items-center lg:pb-[170px] pb-25">
          <div className={`${order} lg:w-1/2`}>
            <div
              className={`${position} w-full xl:max-w-[1100px] max-w-[800px] max-h-[700px] h-full`}
            >
              <motion.div
                initial="offscreen"
                whileInView="onscreen"
                variants={imageVariants}
                viewport={{ once: true, amount: 0 }}
              >
                <img
                  src={project_img}
                  loading="lazy"
                  alt={`Project image for ${project_name}`}
                  className="h-full object-cover"
                  width={"auto"}
                  height={"auto"}
                />
              </motion.div>
            </div>
          </div>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            variants={cardVariants}
            viewport={{ once: true, amount: 0 }}
            className="lg:w-1/2 lg:mt-[187px] relative z-[1]"
          >
            <div
              style={{ backgroundColor: "#2A2B2D" }}
              className="xl:px-16 px-8 xl:pt-[78px] pt-10 xl:pb-[58px] pb-7"
            >
              <h3 className="text-3xl font-extrabold leading-120 text-secondary-foreground pb-10 uppercase">
                {category}
              </h3>
              <h4
                className="text-2xl leading-120 text-secondary-foreground pb-10"
                dangerouslySetInnerHTML={{ __html: text_home }}
              ></h4>
              {/* <div className="text-secondary-foreground mb-7">
                <div dangerouslySetInnerHTML={{ __html: project_desc }} />
              </div> */}
              {/* <ul className="mb-9">
                {project_year && (
                  <li className="flex items-center mb-[6px]">
                    <span className="inline-block font-extrabold min-w-32 text-secondary-foreground">
                      Year:
                    </span>
                    <span className="font-medium text-secondary-foreground">
                      {project_year}
                    </span>
                  </li>
                )}
                {project_type && (
                  <li className="flex items-center mb-[6px]">
                    <span className="inline-block font-extrabold min-w-32 text-secondary-foreground">
                      Category:
                    </span>
                    <span className="font-medium text-secondary-foreground">
                      {project_type}
                    </span>
                  </li>
                )}
                {location && (
                  <li className="flex items-center mb-[6px]">
                    <span className="inline-block font-extrabold min-w-32 text-secondary-foreground">
                      Location:
                    </span>
                    <span className="font-medium text-secondary-foreground">
                      {location}
                    </span>
                  </li>
                )}
              </ul> */}
              <Link href={link}>
                <ButtonFill className="border-secondary text-[#2A2B2D] hover:text-secondary-foreground after:left-0 after:bg-secondary text-xs py-1.5 px-3">
                  Bekijk Projecten <RightArrow width="20" height="12" />
                </ButtonFill>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCardOne;
