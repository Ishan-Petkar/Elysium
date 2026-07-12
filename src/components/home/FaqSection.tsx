"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What is the process of buying a home with Elysium For You?",
    answer:
      "Our process begins with an in-depth consultation to understand your vision and requirements. We then curate a personalized portfolio of properties. Once you select a home, our experts guide you through the negotiation, legal formalities, and seamless handover, ensuring a premium and hassle-free experience.",
  },
  {
    question: "Do I need a real estate agent?",
    answer:
      "While it is possible to buy property independently, partnering with our seasoned advisors provides you with exclusive access to off-market listings, expert market analysis, and professional negotiation skills, safeguarding your investment and saving you invaluable time.",
  },
  {
    question: "How do you ensure the quality of listed properties?",
    answer:
      "Every property in our portfolio undergoes a rigorous vetting process. We evaluate architectural integrity, legal clearances, location prospects, and overall design aesthetics to ensure they meet the uncompromising standards of the Elysium For You brand.",
  },
  {
    question: "Can you assist with home loans and financing?",
    answer:
      "Absolutely. Elysium For You goes beyond traditional real estate. We have an extensive network of financial partners to help you secure the best mortgage rates and financing options tailored to your bespoke vision and budget.",
  },
  {
    question: "What areas do you currently serve?",
    answer:
      "We specialize in premium luxury real estate across prime locations in Pune and Mumbai. Contact our team for specific inquiries regarding exclusive properties in these areas and our upcoming domestic projects.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full py-8 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#383A3C] tracking-wide mb-2 sm:mb-6"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-[#7d7d7d] text-lg font-serif"
          >
            Honest guidance and expert insights for your real estate journey.
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
              className="border-b border-gray-200 pb-4"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center py-4 text-left group focus:outline-none"
              >
                <span className="text-lg md:text-xl font-serif text-[#383A3C] group-hover:text-[#6b705c] transition-colors">
                  {faq.question}
                </span>
                <span className="ml-4 flex-shrink-0 text-[#7d7d7d] group-hover:text-[#6b705c] transition-colors">
                  {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                    className="overflow-hidden"
                  >
                    <p className="pt-2 pb-6 text-[#7d7d7d] font-serif leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
