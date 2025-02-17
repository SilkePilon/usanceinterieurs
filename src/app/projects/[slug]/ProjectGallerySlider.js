// app/projects/[slug]/ProjectGallerySlider.js
"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import "swiper/css";
import ButtonFill from "@/components/ui/buttons/buttonFill";
import RightArrow from "@/assets/icons/rightArrow";
import { staticBluarDataUrl } from "@/lib/staticBluarDataUrl";

const ProjectGallerySlider = ({ images }) => {
  const swiperRef = useRef();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="relative" style={{ zIndex: "-1000" }}>
      <div className="max-h-[80vh] min-h-[600px]">
        <Swiper
          slidesPerView={1}
          loop
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : null}
          modules={[FreeMode, Navigation, Thumbs]}
          className="h-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[80vh] min-h-[600px]">
                <Image
                  src={image.imgix_url}
                  alt={`Project image ${index + 1}`}
                  fill
                  style={{ zIndex: "-1000" }}
                  className="object-cover"
                  priority={index === 0}
                  placeholder="blur"
                  blurDataURL={staticBluarDataUrl}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 z-10 w-full flex justify-between items-center gap-5 px-5">
        <div onClick={() => swiperRef.current?.slidePrev()}>
          <ButtonFill className="rotate-180 2sm:h-[90px] h-10 2sm:w-[90px] w-10 2sm:px-6 px-1.5 after:bg-secondary border-secondary hover:border-primary text-primary-foreground hover:text-secondary-foreground hover:bg-primary">
            <RightArrow width="35" height="22" />
          </ButtonFill>
        </div>
        <div onClick={() => swiperRef.current?.slideNext()}>
          <ButtonFill className="2sm:h-[90px] h-10 2sm:w-[90px] w-10 2sm:px-6 px-1.5 border-secondary hover:border-primary after:bg-secondary text-primary-foreground hover:text-secondary-foreground hover:bg-primary">
            <RightArrow width="35" height="22" />
          </ButtonFill>
        </div>
      </div>

      {images.length > 1 && (
        <div className="container mt-8">
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={27}
            speed={500}
            breakpoints={{
              300: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              750: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1320: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mt-[35px]"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-[120px] cursor-pointer">
                  <Image
                    src={image.imgix_url}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL={staticBluarDataUrl}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default ProjectGallerySlider;
