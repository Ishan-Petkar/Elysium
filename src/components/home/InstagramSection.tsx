"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle } from "lucide-react";
import { IconBrandInstagram } from "@tabler/icons-react";

import Image from "next/image";

// Mock data for Instagram posts with varied heights for masonry layout
const posts = [
  { id: 1, likes: 342, comments: 28, heightClass: "h-[300px] sm:h-[450px]", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1000&auto=format&fit=crop" },
  { id: 2, likes: 512, comments: 45, heightClass: "h-[200px] sm:h-[280px]", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1000&auto=format&fit=crop" },
  { id: 3, likes: 289, comments: 12, heightClass: "h-[350px] sm:h-[520px]", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop" },
  { id: 4, likes: 892, comments: 104, heightClass: "h-[180px] sm:h-[220px]", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop" },
  { id: 5, likes: 456, comments: 33, heightClass: "h-[250px] sm:h-[320px]", image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=1000&auto=format&fit=crop" },
  { id: 6, likes: 671, comments: 56, heightClass: "h-[280px] sm:h-[380px]", image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1000&auto=format&fit=crop" },
  { id: 7, likes: 89, comments: 5, heightClass: "h-[220px] sm:h-[300px]", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80" },
  { id: 8, likes: 123, comments: 18, heightClass: "h-[300px] sm:h-[400px]", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80" },
  { id: 9, likes: 541, comments: 42, heightClass: "h-[250px] sm:h-[350px]", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop" },
  { id: 10, likes: 312, comments: 15, heightClass: "h-[200px] sm:h-[280px]", image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=1000&auto=format&fit=crop" },
];

export function InstagramSection() {
  return (
    <section className="w-full py-16 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 sm:mb-12 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
              className="flex items-center gap-3 mb-4"
            >
              <IconBrandInstagram className="w-6 h-6 text-[#383A3C]" />
              <span className="uppercase tracking-[0.2em] text-xs font-semibold text-[#383A3C]">
                Follow Us
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
              className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#383A3C] tracking-wide"
            >
              @elysiumforyourealty
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <a
              href="https://instagram.com/elysiumforyourealty"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-[#383A3C] text-[#383A3C] hover:bg-[#383A3C] hover:text-white transition-colors text-xs uppercase tracking-[0.2em] px-8 py-3"
            >
              View on Instagram
            </a>
          </motion.div>
        </div>

        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
              className={`relative w-full ${post.heightClass} bg-[#EAEAEA] group overflow-hidden cursor-pointer rounded-2xl break-inside-avoid`}
            >
              {/* Actual Image */}
              <div className="absolute inset-0 transition-transform duration-700 md:group-hover:scale-105">
                <Image 
                  src={post.image}
                  alt={`Instagram Post ${post.id}`}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>

              {/* Hover Overlay - Visible on mobile/touch, hover-only on desktop */}
              <div className="absolute inset-0 bg-black/40 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-white z-10">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  <span className="font-semibold text-sm sm:text-base">{post.likes}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  <span className="font-semibold text-sm sm:text-base">{post.comments}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
