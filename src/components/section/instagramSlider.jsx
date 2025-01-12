"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import SectionTitle from "../ui/sectionTitle";
import ProgressAndNatigation from "../ui/progressAndNatigation";
import Image from "next/image";
import ShopCart from "@/assets/icons/shopCart";
import { cn } from "@/lib/utils";
import { staticBluarDataUrl } from "@/lib/staticBluarDataUrl";

const InsagramSlider = ({ text_muted, bg_muted }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://feeds.behold.so/k5dAIDzSFOhl4csGlEuY"
        );
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error("Error fetching Instagram posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const ProductCard = ({ post }) => {
    return (
      <div className="group px-4 sm:px-0">
        <div className="relative">
          <div className="absolute z-10 w-full h-full flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-500">
            <p
              className={cn(
                `text-sm text-white mb-4 px-4 text-center line-clamp-2 ${text_muted}`
              )}
            >
              {post.caption}
            </p>
            <a
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                `px-[25px] py-2.5 flex items-center gap-2.5 border-white hover:border-primary text-white border-2 whitespace-nowrap relative z-10 overflow-hidden after:absolute after:left-0 after:top-0 after:bottom-0 after:z-[-1] after:bg-primary after:${bg_muted} after:w-0 after:transition-all after:duration-500 hover:after:w-full text-secondary-foreground hover:text-secondary-foreground transition-all duration-500`
              )}
            >
              Bekijk op Instagram
            </a>
          </div>
          <div className="relative after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:transition-all after:duration-500 after:group-hover:w-full after:group-hover:h-full after:group-hover:opacity-100 after:h-0 after:w-0 after:opacity-0 after:flex after:justify-center after:items-center after:bg-[rgba(37,_59,_47,_0.38)] after:group-hover:blur-sm">
            <Image
              src={post.sizes?.large?.mediaUrl || post.mediaUrl}
              alt={post.caption || "Instagram post"}
              width={post.sizes?.large?.width || 1000}
              height={post.sizes?.large?.height || 1000}
              loading="lazy"
              placeholder="blur"
              blurDataURL={staticBluarDataUrl}
              className="w-full h-full object-cover aspect-square rounded-lg"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="pt-20">
      <div className="container-fluid">
        <SectionTitle
          sectionName={"Instagram"}
          sectionTitle={"Laatste Posts"}
          sectionDesc={"Volg ons op Instagram voor meer inspiratie"}
          link={"https://www.instagram.com/usanceinterieurs/"}
          button_text={"Volg Ons"}
          bg_muted={bg_muted}
          text_muted={text_muted}
        />

        <div className="lg:pt-30 2sm:pt-20 pt-14">
          <Swiper
            spaceBetween={30}
            breakpoints={{
              0: { slidesPerView: 1 },
              560: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
              1400: { slidesPerView: 4 },
            }}
            pagination={{
              clickable: true,
              el: ".progressbar-pagination",
              type: "progressbar",
            }}
            loop={true}
            modules={[Pagination, Navigation]}
          >
            {posts.map((post) => (
              <SwiperSlide key={post.id}>
                <ProductCard post={post} />
              </SwiperSlide>
            ))}
            <div className="container">
              <ProgressAndNatigation />
            </div>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default InsagramSlider;
