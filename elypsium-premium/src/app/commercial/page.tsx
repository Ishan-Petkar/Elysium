import React from "react";
import Image from "next/image";

export default function CommercialPage() {
  return (
    <main className="w-full min-h-screen bg-[#FAFAFA] pt-[100px]">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
            alt="Commercial Architecture"
            fill
            style={{ objectFit: 'cover' }}
            priority
            unoptimized={true}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 text-center px-6">
          <h1 className="font-serif italic text-5xl md:text-7xl text-white mb-6">Commercial</h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide">
            Innovative workspaces and retail environments redefining modern architecture.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full max-w-[2000px] mx-auto py-24 px-6 md:px-12 lg:px-24">
        <div className="flex flex-col gap-12 items-center justify-center text-center max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-[#383A3C]">Iconic Workspaces & Hospitality</h2>
          <p className="text-[#7d7d7d] text-lg leading-relaxed">
            Our commercial architecture practice focuses on creating high-performance, sustainable, and visually striking environments. We understand that a commercial space must embody a brand's identity while optimizing functionality, employee well-being, and customer experience.
          </p>
          
          <div className="w-24 h-[1px] bg-black/20 my-8" />
          
          <p className="font-serif italic text-xl text-gray-400">
            More projects coming soon...
          </p>
        </div>
      </section>
    </main>
  );
}
