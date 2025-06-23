"use client"
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from "swiper/modules"
import 'swiper/css';
import { createBucketClient } from '@cosmicjs/sdk';
import Link from 'next/link';
import QuoteIcon from '@/assets/icons/quoteIcon';
import SectionTitle from '../ui/sectionTitle'
import ProgressAndNatigation from '../ui/progressAndNatigation';
import { cn } from '@/lib/utils';

const Testimonial = ({ text_muted, bg_muted }) => {
    const [testimonials, setTestimonials] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const cosmic = createBucketClient({
                    bucketSlug: process.env.COSMIC_BUCKET_SLUG || 'usance-production',
                    readKey: process.env.COSMIC_READ_KEY
                });
                
                const response = await cosmic.objects.find({
                    "type": "reviews"
                })
                .limit(10)
                .props("slug,title,metadata,type")
                .depth(1);
                
                if (response.objects) {
                    const formattedTestimonials = response.objects.map((item, index) => ({
                        id: index + 1,
                        name: item.title,
                        position: item.metadata.persoon,
                        review: item.metadata.uitspraak,
                        project: item.metadata.bijbehorend_project
                    }));
                    setTestimonials(formattedTestimonials);
                }
            } catch (error) {
                console.error("Error fetching testimonials:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    const pagination = {
        clickable: true,
        el: ".progressbar-pagination",
        type: 'progressbar'
    };
    
    return (
        <section id="reviews" className='pt-20'>
            <div className='container-fluid '>
                <SectionTitle
                    sectionName={"Reviews"}
                    sectionTitle={"Wat vinden onze opdrachtgevers?"}
                    sectionDesc={"Wij zijn graag transparant, zo weet je ook wat je aan ons hebt."}
                    bg_muted={bg_muted}
                    text_muted={text_muted}
                />

                <div className='lg:pt-30 2sm:pt-20 pt-14'>
                    {isLoading ? (
                        <div className="text-center">Laden...</div>
                    ) : (
                        <Swiper
                            spaceBetween={30}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1
                                },
                                700: {
                                    slidesPerView: 2
                                },
                                1300: {
                                    slidesPerView: 3
                                }
                            }}
                            pagination={pagination}
                            loop={testimonials.length > 3}
                            modules={[Pagination, Navigation]}
                            className=''
                        >
                            {
                                testimonials.map(({ id, name, position, review, project }) => {
                                    return (
                                        <SwiperSlide key={id}>
                                            <Link href={project ? `/projecten/${project.slug}` : '#'}>
                                                <div className='flex md:gap-6 gap-2'>
                                                    <div className='text-secondary-foreground blur-xs'><QuoteIcon /></div>
                                                    <div className='mt-16'>
                                                        <p className={cn(`text-lg text-primary-foreground ${text_muted}`)}>{review}</p>
                                                        <div className='relative after:absolute after:-left-5 after:top-0 after:w-[1px] after:h-full after:bg-primary ml-5 mt-6'>
                                                            <h5 style={{color: "#2A2B2D"}} className={cn(`font-extrabold leading-160 text-lg ${text_muted}`)}>{position}</h5>
                                                            <p style={{color: "#2A2B2D"}} className={cn(`font-medium ${text_muted}`)}>{project?.title || ""}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </SwiperSlide>
                                    )
                                })
                            }
                            <div className='container'><ProgressAndNatigation /></div>
                        </Swiper>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Testimonial