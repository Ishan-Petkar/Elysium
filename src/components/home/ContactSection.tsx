"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const contactSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  interest: z.string().optional(),
  message: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // TODO: Integrate a backend API or email service (e.g. Resend, SendGrid, or a
      // Next.js API Route) to handle form submissions and forward leads.
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitStatus("success");
      reset();
    } catch (error) {
      console.error("Contact form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="w-full py-16 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
        {/* Left Side: Info */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <span className="uppercase tracking-[0.3em] text-xs font-semibold text-[var(--accent)] mb-4 sm:mb-6 block">
              Inquire
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white tracking-wide mb-6 sm:mb-8 leading-[1.1]">
              Curate Your <br />
              <span className="italic text-[var(--accent)]">Elysium</span> Experience.
            </h2>
            <p className="text-gray-300 text-lg font-serif leading-relaxed mb-12 max-w-lg">
              Whether you are looking to acquire a bespoke residence or require expert consultation for your next project, our team is at your disposal. Connect with us to explore the extraordinary.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-[var(--muted)] pt-12">
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-[var(--accent)] font-semibold mb-3">Mumbai Office</h4>
                <p className="text-gray-300 font-serif leading-relaxed text-sm">C Wing, Gajanan Society<br/>Lt. Dilip Gupte Marg, Mahim West<br/>Mumbai 400016</p>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-[var(--accent)] font-semibold mb-3">Pune Office</h4>
                <p className="text-gray-300 font-serif leading-relaxed text-sm">Trendy Towers, Amanora Park Town<br/>Hadapsar, Pune 28</p>
              </div>
              <div className="sm:col-span-2">
                <h4 className="text-xs uppercase tracking-[0.2em] text-[var(--accent)] font-semibold mb-3">Direct</h4>
                <p className="text-gray-300 font-serif leading-relaxed text-sm">contact@elysiumforyou.com<br/>+91 83088 37355 | +91 98334 96137</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
            className="bg-[var(--muted)]/20 p-6 sm:p-10 md:p-14 rounded-2xl border border-[var(--muted)] backdrop-blur-sm"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative">
                  <Input
                    {...register("firstName")}
                    placeholder="First Name"
                    className="bg-transparent border-0 border-b border-[var(--muted)] rounded-none px-0 py-3 focus-visible:ring-0 focus-visible:border-[var(--accent)] text-white placeholder:text-gray-500 transition-colors"
                  />
                  {errors.firstName && <span className="text-[var(--accent)]/90 italic text-xs mt-1 absolute -bottom-5 left-0">{errors.firstName.message}</span>}
                </div>
                <div className="relative">
                  <Input
                    {...register("lastName")}
                    placeholder="Last Name"
                    className="bg-transparent border-0 border-b border-[var(--muted)] rounded-none px-0 py-3 focus-visible:ring-0 focus-visible:border-[var(--accent)] text-white placeholder:text-gray-500 transition-colors"
                  />
                  {errors.lastName && <span className="text-[var(--accent)]/90 italic text-xs mt-1 absolute -bottom-5 left-0">{errors.lastName.message}</span>}
                </div>
              </div>

              <div className="relative">
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="Email Address"
                  className="bg-transparent border-0 border-b border-[var(--muted)] rounded-none px-0 py-3 focus-visible:ring-0 focus-visible:border-[var(--accent)] text-white placeholder:text-gray-500 transition-colors"
                />
                {errors.email && <span className="text-[var(--accent)]/90 italic text-xs mt-1 absolute -bottom-5 left-0">{errors.email.message}</span>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Input
                    {...register("phone")}
                    type="tel"
                    placeholder="Phone (Optional)"
                    className="bg-transparent border-0 border-b border-[var(--muted)] rounded-none px-0 py-3 focus-visible:ring-0 focus-visible:border-[var(--accent)] text-white placeholder:text-gray-500 transition-colors"
                  />
                </div>
                <div>
                  <Input
                    {...register("interest")}
                    placeholder="Interest (e.g. Residential)"
                    className="bg-transparent border-0 border-b border-[var(--muted)] rounded-none px-0 py-3 focus-visible:ring-0 focus-visible:border-[var(--accent)] text-white placeholder:text-gray-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <textarea
                  {...register("message")}
                  placeholder="How may we assist you?"
                  rows={4}
                  className="w-full bg-transparent border-0 border-b border-[var(--muted)] rounded-none px-0 py-3 focus:outline-none focus:border-[var(--accent)] transition-colors resize-none text-white placeholder:text-gray-500"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[var(--accent)] hover:bg-[#868558] text-[var(--background)] font-bold rounded-full uppercase tracking-[0.2em] text-xs py-7 mt-4 transition-all duration-300 hover:shadow-lg hover:shadow-[var(--accent)]/20"
              >
                {isSubmitting ? "Submitting..." : "Submit Inquiry"}
              </Button>

              {submitStatus === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[var(--accent)] text-sm text-center mt-4 font-serif"
                >
                  Thank you. A member of our team will contact you shortly.
                </motion.p>
              )}
              {submitStatus === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[var(--accent)]/90 italic text-sm text-center mt-4 font-serif"
                >
                  We encountered an error. Please try again later.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
