"use client";

import { Carousel } from "@/components/ui/carousel";
import { motion } from "framer-motion";

export function UpcomingProjectsSection() {
  const slideData = [
    {
      title: "The Helix Tower",
      button: "View Details",
      src: "https://images.unsplash.com/photo-1494806812796-244fe51b774d?q=80&w=3534&auto=format&fit=crop",
    },
    {
      title: "Oasis Villas",
      button: "View Details",
      src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop",
    },
    {
      title: "Luminary Heights",
      button: "View Details",
      src: "https://images.unsplash.com/photo-1590041794748-2d8eb73a571c?q=80&w=3456&auto=format&fit=crop",
    },
    {
      title: "Azure Residences",
      button: "View Details",
      src: "https://images.unsplash.com/photo-1679420437432-80cfbf88986c?q=80&w=3540&auto=format&fit=crop",
    },
  ];

  return (
    <section className="w-full flex flex-col py-24 bg-white overflow-hidden">
      <div className="w-full max-w-[2000px] mx-auto px-6 md:px-12 lg:px-24 mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif italic text-4xl md:text-5xl text-[#222] tracking-tight"
        >
          Upcoming Projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-gray-500 mt-4 max-w-xl"
        >
          A glimpse into the future of architectural excellence. Discover our newest concepts currently under development.
        </motion.p>
      </div>

      <div className="relative w-full h-full pb-20">
        <Carousel slides={slideData} />
      </div>
    </section>
  );
}
