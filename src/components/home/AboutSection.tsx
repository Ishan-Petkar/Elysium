"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="about" className="relative w-full min-h-screen flex flex-col lg:flex-row bg-[#FAFAFA] overflow-hidden">
      {/* Left Content Area */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-start z-10 py-16 sm:py-24 px-4 sm:px-8 md:px-12 lg:pl-16 xl:pl-24 lg:pr-16 order-2 lg:order-1">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-6 sm:gap-8 max-w-2xl"
        >
          <motion.p 
            variants={itemVariants}
            className="font-serif text-[#7d7d7d] text-base sm:text-lg md:text-xl leading-relaxed tracking-wide"
          >
            We believe in providing holistic real estate services, wherein every property search is handled with absolute dedication. Backed by SONASH PROPERTIES Pvt. Ltd., every decision is taken after considering location value, practicality, potential yield, and lifestyle match. Creating the perfect harmony between a client's aspirations and reality stays top on our agenda to deliver an unmatched advisory experience.
          </motion.p>
          
          <motion.p 
            variants={itemVariants}
            className="font-serif text-[#7d7d7d] text-base sm:text-lg md:text-xl leading-relaxed tracking-wide"
          >
            Our specialized team combines their strengths across multiple sectors including premium residential, luxury retail, corporate, and high-end commercial real estate to ensure you find exactly what you are looking for.
          </motion.p>

          <motion.div variants={itemVariants} className="pt-4">
            <button className="bg-[#383A3C] hover:bg-[#6b705c] transition-colors text-white text-xs uppercase tracking-[0.2em] px-10 py-4 w-full sm:w-auto">
              Know More
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Image Area */}
      <div className="relative w-full lg:w-1/2 min-h-[40vh] sm:min-h-[50vh] lg:min-h-screen flex items-center justify-center z-10 order-1 lg:order-2">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src="/about_collage_v3.png"
            alt="Architectural Surreal Collage"
            fill
            style={{ objectFit: 'cover' }}
            quality={100}
            priority
            unoptimized={true}
          />
        </motion.div>
      </div>

      {/* Top Button (Absolute Bottom Right) */}
      <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 1 }}
        onClick={scrollToTop}
        className="absolute bottom-6 right-6 sm:bottom-12 sm:right-12 z-20 text-xs font-serif font-semibold lowercase tracking-widest text-black border-b border-black pb-0.5 hover:text-[#6b705c] hover:border-[#6b705c] transition-colors bg-[#F5F5F5] px-2 py-1"
      >
        top
      </motion.button>
    </section>
  );
}
