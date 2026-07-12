import React from "react";
import Image from "next/image";
import { CheckCircle2, Award, Users, TrendingUp } from "lucide-react";

export const metadata = {
  title: "About Us | Elypsium",
  description: "Learn more about Elypsium, your trusted partner in premium luxury real estate.",
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 pr-0 md:pr-12 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-text mb-6">
              Redefining <span className="text-primary italic">Luxury</span> Real Estate
            </h1>
            <p className="text-lg text-text-muted mb-6 leading-relaxed">
              Elypsium was founded on a simple premise: luxury real estate requires a higher standard of service, deeper market knowledge, and unyielding integrity. We are not just brokers; we are your trusted advisors in building generational wealth through exceptional properties.
            </p>
            <p className="text-lg text-text-muted leading-relaxed">
              With over 15 years of combined experience in the ultra-luxury segment, our team brings unparalleled expertise to every transaction, ensuring our clients achieve their real estate goals with confidence and peace of mind.
            </p>
          </div>
          <div className="md:w-1/2 w-full">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-elevated">
              {/* Fallback image if actual isn't available. In production, use Next Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Elypsium luxury property" 
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text mb-4">Our Core Values</h2>
            <p className="text-text-muted max-w-2xl mx-auto">The principles that guide every decision we make and every relationship we build.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 bg-surface rounded-lg border border-gray-100 hover:shadow-card transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-text mb-3">Integrity First</h3>
              <p className="text-text-muted text-sm leading-relaxed">We operate with absolute transparency. We will always tell you what you need to hear, not what you want to hear.</p>
            </div>
            
            <div className="p-8 bg-surface rounded-lg border border-gray-100 hover:shadow-card transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-text mb-3">Excellence</h3>
              <p className="text-text-muted text-sm leading-relaxed">We settle for nothing less than extraordinary in our service, our marketing, and the properties we represent.</p>
            </div>

            <div className="p-8 bg-surface rounded-lg border border-gray-100 hover:shadow-card transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-text mb-3">Client-Centric</h3>
              <p className="text-text-muted text-sm leading-relaxed">Your goals become our goals. We build lasting relationships that extend far beyond a single transaction.</p>
            </div>

            <div className="p-8 bg-surface rounded-lg border border-gray-100 hover:shadow-card transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-text mb-3">Market Expertise</h3>
              <p className="text-text-muted text-sm leading-relaxed">Data-driven insights combined with deep local knowledge to identify the best investment opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team (Placeholder) */}
      <section className="py-20 bg-surface">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-text mb-16">Leadership</h2>
          <p className="text-text-muted italic max-w-2xl mx-auto mb-12">
            "At Elypsium, we believe that luxury is not just a price point, but an experience characterized by exceptional quality, exclusivity, and impeccable service."
          </p>
          <div className="inline-block border-t border-b border-primary py-4 px-8">
            <h3 className="text-xl font-bold text-text">Founder & CEO</h3>
            <p className="text-primary font-medium mt-1">Elypsium Real Estate</p>
          </div>
        </div>
      </section>
    </div>
  );
}
