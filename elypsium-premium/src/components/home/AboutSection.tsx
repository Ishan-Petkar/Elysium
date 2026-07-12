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
    <section className="relative w-full min-h-screen flex flex-col lg:flex-row bg-[#FAFAFA] overflow-hidden">
      {/* Left Content Area */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-start z-10 py-24 pl-6 pr-6 md:pl-12 md:pr-12 lg:pl-24 lg:pr-16 order-2 lg:order-1 mt-12 lg:mt-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-8 max-w-2xl"
        >
          <motion.p 
            variants={itemVariants}
            className="font-serif text-[#7d7d7d] text-lg md:text-xl leading-relaxed tracking-wide"
          >
            We believe in providing holistic services, wherein every design project is developed in its totality. Every design decision is taken after considering the aesthetics, practicality, cost, durability, and environmental responsibility. Creating the right balance between the clientele&apos;s vision and its execution on-site, stays top on our agenda to deliver the entire spectrum of services that are a cusp of state-of-art designs with an unmatched practical approach.
          </motion.p>
          
          <motion.p 
            variants={itemVariants}
            className="font-serif text-[#7d7d7d] text-lg md:text-xl leading-relaxed tracking-wide"
          >
            Our interdisciplinary team strength of over 200+ combines their strengths in multiple sectors including residential, retail, corporate, institutional, hospitality and many more.
          </motion.p>

          <motion.div variants={itemVariants} className="pt-4">
            <button className="bg-[#383A3C] hover:bg-[#6b705c] transition-colors text-white text-xs uppercase tracking-[0.2em] px-10 py-4">
              Know More
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Image Area */}
      <div className="relative w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen flex items-center justify-center z-10 order-1 lg:order-2">
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
        className="absolute bottom-12 right-12 z-20 text-xs font-serif font-semibold lowercase tracking-widest text-black border-b border-black pb-0.5 hover:text-[#6b705c] hover:border-[#6b705c] transition-colors bg-[#F5F5F5] px-2 py-1"
      >
        top
      </motion.button>
    </section>
  );
}
