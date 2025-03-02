// app/projects/[slug]/ProjectGallerySlider.js
"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode, Autoplay } from "swiper/modules";
import "swiper/css";
import ButtonFill from "@/components/ui/buttons/buttonFill";
import RightArrow from "@/assets/icons/rightArrow";
import { staticBluarDataUrl } from "@/lib/staticBluarDataUrl";

const ProjectGallerySlider = ({ images }) => {
  const desktopSwiperRef = useRef();
  const mobileSwiperRef = useRef();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  
  return (
    <div className="relative" style={{ zIndex: "-1000" }}>
      {/* Desktop version with slider and thumbnails */}
      <div className="hidden sm:block">
        <div className="max-h-[80vh] min-h-[600px]">
          <Swiper
            slidesPerView={1}
            loop
            onBeforeInit={(swiper) => {
              desktopSwiperRef.current = swiper;
            }}
            thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : null}
            modules={[FreeMode, Navigation, Thumbs, Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
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
          <div onClick={() => desktopSwiperRef.current?.slidePrev()}>
            <ButtonFill className="rotate-180 2sm:h-[90px] h-10 2sm:w-[90px] w-10 2sm:px-6 px-1.5 after:bg-secondary border-secondary hover:border-primary text-primary-foreground hover:text-secondary-foreground hover:bg-primary">
              <RightArrow width="35" height="22" />
            </ButtonFill>
          </div>
          <div onClick={() => desktopSwiperRef.current?.slideNext()}>
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
      
      {/* Mobile version with slider - 16:9 aspect ratio */}
      <div className="sm:hidden">
        <div className="pt-16"></div>
        <div className="w-full" style={{ aspectRatio: '16/9' }}>
          <Swiper
            slidesPerView={1}
            loop
            onBeforeInit={(swiper) => {
              mobileSwiperRef.current = swiper;
            }}
            modules={[Navigation, Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="h-full"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-full">
                  <Image
                    src={image.imgix_url}
                    alt={`Project image ${index + 1}`}
                    fill
                    className="object-contain"
                    priority={index === 0}
                    placeholder="blur"
                    blurDataURL={staticBluarDataUrl}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 z-10 w-full flex justify-between items-center gap-5 px-3">
          <div onClick={() => mobileSwiperRef.current?.slidePrev()}>
            <ButtonFill className="rotate-180 h-9 w-9 px-1 after:bg-secondary border-secondary text-primary-foreground">
              <RightArrow width="20" height="12" />
            </ButtonFill>
          </div>
          <div onClick={() => mobileSwiperRef.current?.slideNext()}>
            <ButtonFill className="h-9 w-9 px-1 after:bg-secondary border-secondary text-primary-foreground">
              <RightArrow width="20" height="12" />
            </ButtonFill>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectGallerySlider;
