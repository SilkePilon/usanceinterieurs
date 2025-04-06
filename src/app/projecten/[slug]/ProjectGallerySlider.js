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
  
  // Function to navigate to a specific slide when clicking on a thumbnail
  const goToSlide = (index) => {
    if (desktopSwiperRef.current) {
      desktopSwiperRef.current.slideToLoop(index);
    }
  };
  
  return (
    <div className="relative pt-16 md:pt-20">
      {/* Desktop version with slider and thumbnails */}
      <div className="hidden sm:block">
        <div className="w-full max-w-[1920px] mx-auto relative" style={{ aspectRatio: '16/9' }}>
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
            className="h-full w-full"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} className="flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                    <Image
                      src={image.imgix_url}
                      alt={`Project image ${index + 1}`}
                      fill
                      style={{ zIndex: "1" }}
                      className="object-contain"
                      priority={index === 0}
                      placeholder="blur"
                      blurDataURL={staticBluarDataUrl}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 z-20 w-full flex justify-between items-center gap-5 px-5">
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
          <div 
            className="absolute bottom-8 left-8 z-30 bg-black/50 p-4 rounded-lg backdrop-blur-sm" 
            style={{ maxWidth: "50%" }}
          >
            <Swiper
              onSwiper={setThumbsSwiper}
              loop={true}
              spaceBetween={10}
              speed={500}
              breakpoints={{
                300: {
                  slidesPerView: 2,
                  spaceBetween: 8,
                },
                750: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1320: {
                  slidesPerView: 4,
                  spaceBetween: 12,
                },
              }}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="thumbnail-swiper"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index} onClick={() => goToSlide(index)}>
                  <div className="relative w-full h-[80px] cursor-pointer transition-all duration-300 hover:opacity-100 opacity-70 border border-white/30 hover:border-white">
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
            className="h-full w-full"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} className="flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
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
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 z-20 w-full flex justify-between items-center gap-5 px-3">
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
