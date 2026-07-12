"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 2,
    title: "The Apex Tower",
    subtitle: "Grade-A Commercial Spaces",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80",
  },
  {
    id: 1,
    title: "Elysium Signature Residences",
    subtitle: "Premium Luxury Living",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Azure Waterfront",
    subtitle: "Bespoke Oceanfront Estates",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    title: "The Heritage Enclave",
    subtitle: "Exclusive Private Residences",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80",
  },
];

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 40 },
    [
      Fade(),
      Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }),
    ]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  // Framer Motion Variants for Text
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2, // Stagger effect
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const, // Custom easing for premium feel
      },
    }),
  };

  return (
    <div id="home" className="relative w-full h-[calc(100vh-70px)] landscape:min-h-[280px] landscape:h-[calc(100vh-60px)] sm:h-[calc(100vh-120px)] md:h-[calc(100vh-140px)] overflow-hidden bg-[#1a1a1a] group">
      {/* Embla Viewport */}
      <div className="overflow-hidden w-full h-full" ref={emblaRef}>
        <div className="flex w-full h-full touch-pan-y">
          {slides.map((slide, index) => {
            const isActive = index === selectedIndex;
            return (
              <div
                key={slide.id}
                className="relative flex-[0_0_100%] min-w-0 h-full overflow-hidden"
              >
                {/* Ken Burns Background Image */}
                <motion.div
                  initial={{ scale: 1.0 }}
                  animate={{ scale: isActive ? 1.1 : 1.0 }}
                  transition={{ duration: 10, ease: "linear" }}
                  className="absolute inset-0 z-0 bg-cover bg-center"
                  style={{ backgroundImage: `url("${slide.image}")` }}
                />
                
                {/* Subtle gradient overlay for text legibility */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Text Content overlay */}
                <div className="absolute bottom-6 landscape:bottom-4 left-4 sm:left-8 md:bottom-24 md:left-12 lg:left-16 xl:left-24 z-20 flex flex-col items-start w-full max-w-[90vw] md:max-w-4xl pr-4 sm:pr-8">
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div
                        key={`content-${slide.id}`}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="flex flex-col items-start"
                      >
                        <motion.h1
                          custom={0}
                          variants={textVariants}
                          className="font-serif text-3xl landscape:text-2xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[90px] text-white leading-[1.1] tracking-normal font-light mb-1 landscape:mb-0 drop-shadow-md break-words"
                        >
                          {slide.title}
                        </motion.h1>
                        
                        <motion.h2
                          custom={1}
                          variants={textVariants}
                          className="font-script text-2xl landscape:text-xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] text-white leading-tight font-bold mb-4 landscape:mb-2 sm:mb-8 drop-shadow-md"
                        >
                          {slide.subtitle}
                        </motion.h2>
                        
                        <motion.div custom={2} variants={textVariants}>
                          <Link
                            href="/properties"
                            className="inline-block border border-[var(--accent)] bg-transparent px-8 py-3 text-[var(--accent)] text-[13px] tracking-widest uppercase transition-all duration-300 hover:bg-[var(--accent)] hover:text-[var(--background)] font-sans"
                          >
                            Know More
                          </Link>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Side Vertical Indicators */}
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4 items-center">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className="group relative flex items-center justify-center h-8"
          >
            <div
              className={`w-[2px] transition-all duration-500 ease-in-out ${
                index === selectedIndex
                  ? "h-12 bg-white"
                  : "h-6 bg-white/30 group-hover:bg-white/60 group-hover:h-8"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Optional Hover Arrows (Left/Right) */}
      <button
        onClick={scrollPrev}
        aria-label="Previous Slide"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-2 text-white/50 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"
      >
        <ChevronLeft size={48} strokeWidth={1} />
      </button>
      <button
        onClick={scrollNext}
        aria-label="Next Slide"
        className="absolute right-16 md:right-24 top-1/2 -translate-y-1/2 z-30 p-2 text-white/50 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"
      >
        <ChevronRight size={48} strokeWidth={1} />
      </button>
    </div>
  );
}
