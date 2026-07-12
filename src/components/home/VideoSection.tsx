"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import VideoPlayer from "@/components/ui/video-player";

export function VideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="video-preview" className="w-full py-8 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 bg-white">
      <div className="w-full max-w-[1600px] mx-auto flex flex-col items-center">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
          className="relative w-full aspect-[21/9] bg-black overflow-hidden shadow-2xl"
        >
          <VideoPlayer src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" />
        </motion.div>
      </div>
    </section>
  );
}
