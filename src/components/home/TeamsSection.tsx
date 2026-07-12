"use client";

import React from "react";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Ashish Shelke",
    role: "Director",
    phone: "+91 83088 37355",
    email: "ashish@elysiumforyou.com",
    address: "Trendy Towers, Amanora Park Town, Hadapsar, Pune 28",
  },
  {
    name: "Sonal Naidu",
    role: "Director",
    phone: "+91 98334 96137",
    email: "sonal@elysiumforyou.com",
    address: "C Wing, Gajanan Society, Lt. Dilip Gupte Marg, Mahim West, Mumbai 400016",
  },
];

export function TeamsSection() {
  return (
    <section id="team" className="w-full py-8 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#383A3C] tracking-wide mb-2 sm:mb-6"
          >
            Meet The Directors
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-[#7d7d7d] text-lg font-serif max-w-2xl mx-auto"
          >
            The visionaries behind Elysium For You, dedicated to turning your dreams into addresses.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 md:gap-12 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] as const }}
              className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-[#EAEAEA] hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <h3 className="font-serif text-3xl text-[#383A3C] mb-2">
                {member.name}
              </h3>
              <p className="text-[#6b705c] text-sm uppercase tracking-[0.2em] mb-8 font-semibold">
                {member.role}
              </p>
              
              <div className="flex flex-col gap-3 text-sm text-[#7d7d7d] tracking-wide w-full">
                <a href={`tel:${member.phone.replace(/\s+/g, '')}`} className="hover:text-[#6b705c] transition-colors">
                  {member.phone}
                </a>
                <a href={`mailto:${member.email}`} className="hover:text-[#6b705c] transition-colors lowercase">
                  {member.email}
                </a>
                <div className="mt-4 pt-4 border-t border-[#EAEAEA]">
                  <p className="leading-relaxed">{member.address}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
