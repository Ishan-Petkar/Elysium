"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export function DetailsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section id="philosophy" className="relative w-full min-h-screen flex flex-col justify-center bg-white overflow-hidden py-24 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
      {/* Background Image Container */}
      <div className="absolute inset-y-0 right-0 w-full md:w-[85%] lg:w-[85%] z-0 flex items-center justify-end pr-0 md:pr-4 lg:pr-6">
        <div className="relative w-full h-[90vh] md:h-[110vh]">
          <Image
            src="/details_bg_v2.png"
            alt="Real Estate Sketch Background"
            fill
            style={{ objectFit: 'contain', objectPosition: 'right center' }}
            quality={100}
            priority
            unoptimized={true}
          />
        </div>
      </div>
      {/* Gradient Overlay to ensure text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/10 to-transparent z-0 pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[2000px] mx-auto flex flex-col justify-center items-start pl-0 lg:pl-12 xl:pl-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="flex flex-col gap-12 max-w-2xl"
        >
          {/* Large Heading */}
          <div className="overflow-hidden">
            <motion.h2 
              variants={itemVariants}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#222] tracking-tight leading-[1.1] text-left"
            >
              Turning <br />
              <span className="italic text-[#6b705c]">Dreams into</span> <br />
              Addresses
            </motion.h2>
          </div>

          <div className="flex flex-col gap-6 text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl text-left">
            <motion.p variants={itemVariants}>
              At Elysium For You, we believe that true luxury resides in finding the perfect space. As a premier real estate advisory firm under SONASH PROPERTIES Pvt. Ltd., we blend deep market expertise with a forward-thinking vision. Our approach goes beyond mere transactions; we curate property matches that resonate with your lifestyle and purpose.
            </motion.p>
            <motion.p variants={itemVariants}>
              Driven by a collective of real estate experts, our portfolio spans high-end residential estates, elite luxury apartments, and bespoke commercial sanctuaries across Mumbai and Pune. Every property recommendation is a testament to our unwavering commitment to precision, transparency, and an uncompromising standard of excellence.
            </motion.p>
          </div>

          <motion.button 
            variants={itemVariants}
            className="group relative overflow-hidden bg-gray-900 text-white px-8 py-3 text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#6b705c] self-start"
          >
            <span className="relative z-10">Know More</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom Bar Container */}
      <div className="relative z-20 w-full max-w-[2000px] mx-auto mt-24 flex items-center justify-start pt-8 pl-0 lg:pl-12 xl:pl-24">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1 }}
          className="font-serif italic text-xl sm:text-2xl lg:text-3xl text-gray-500 text-left"
        >
          Curating Extraordinary Real Estate
        </motion.p>
      </div>
    </section>
  );
}
