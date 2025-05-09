"use client";
import React, { useState, useEffect } from "react";

const ScrollCircle = () => {
    const [scrollPercentage, setScrollPercentage] = useState(0);
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.body.clientHeight;
            const scrollableHeight = documentHeight - windowHeight;
            const scrollPercentage = (scrollPosition / scrollableHeight) * 100;
            setScrollPercentage(scrollPercentage);
            setShowBackToTop(scrollPosition > 350);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        if (typeof window !== 'undefined') {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    // Use a more accurate path length measurement for the house
    const housePathLength = 420; // Adjusted path length to ensure complete drawing

    return (
        <div
            onClick={scrollToTop}
            className={`${showBackToTop ? "block" : "hidden"} fixed bottom-5 right-5 z-20 bg-primary rounded-full cursor-pointer shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]`}
        >
            <svg
                className="sm:w-16 sm:h-16 w-14 h-14"
                width="100%"
                height="100%"
                viewBox="-1 -1 102 102"
                stroke="white"
                strokeWidth={5}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path
                    d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
                    style={{
                        strokeDasharray: "307.919, 307.919",
                        strokeDashoffset: 307.919 - (scrollPercentage * 307.919) / 100,
                    }}
                ></path>
            </svg>
            <span className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg 
                    width="30" 
                    height="30" 
                    viewBox="0 0 105 132" 
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path 
                        d="M 1866.5,239.5 
                        L 1919,279.5
                        L 1919.5,370.5
                        L 1814.5,370.5
                        L 1815,279.5
                        Z"
                        transform="translate(-1814.5, -239.5)"
                        style={{
                            strokeDasharray: `${housePathLength}`,
                            strokeDashoffset: Math.max(0, housePathLength - ((scrollPercentage * housePathLength) / 100)),
                        }}
                    />
                    
                    
                </svg>
            </span>
        </div>
    );
};

export default ScrollCircle;
