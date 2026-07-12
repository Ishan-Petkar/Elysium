"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function CategoriesSection() {
  const categories = [
    {
      id: "residential",
      title: "Residential",
      subtitle: "Find your perfect family home or luxury apartment.",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
      href: "/residential",
    },
    {
      id: "commercial",
      title: "Commercial",
      subtitle: "Premium office spaces and retail locations.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80",
      href: "/commercial",
    },
  ];

  return (
    <section id="portfolio" className="w-full flex flex-col min-h-[80vh] py-8 bg-white px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24">
      {categories.map((category) => (
        <Link 
          key={category.id}
          href={category.href}
          className="relative w-full h-[25vh] sm:h-[30vh] md:h-[35vh] lg:h-[40vh] group overflow-hidden block rounded-md"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0 transition-transform duration-1000 group-hover:scale-105">
            <Image
              src={category.image}
              alt={category.title}
              fill
              style={{ objectFit: 'cover' }}
              quality={90}
            />
          </div>

          {/* Smooth Gradient Overlay - Darker on mobile by default for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 md:from-black/60 md:via-black/20 md:to-transparent transition-all duration-700 md:group-hover:opacity-100 md:opacity-60 z-10" />

          {/* Content */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 sm:p-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="font-serif italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white md:group-hover:text-white md:group-hover:font-bold transition-all duration-500 mb-2 sm:mb-4">
                {category.title}
              </h3>
              <p className="text-white/90 md:text-white/80 text-sm sm:text-base max-w-sm mx-auto transform translate-y-0 md:translate-y-4 opacity-100 md:opacity-0 transition-all duration-500 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                {category.subtitle}
              </p>
            </motion.div>
          </div>
        </Link>
      ))}
    </section>
  );
}
