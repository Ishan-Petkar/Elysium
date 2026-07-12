import React from "react";
import Image from "next/image";

export default function UpcomingProjectsPage() {
  return (
    <main className="w-full min-h-screen bg-[#FAFAFA] pt-[100px]">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1590041794748-2d8eb73a571c?q=80&w=3456&auto=format&fit=crop"
            alt="Upcoming Projects"
            fill
            style={{ objectFit: 'cover' }}
            priority
            unoptimized={true}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 text-center px-6">
          <h1 className="font-serif italic text-5xl md:text-7xl text-white mb-6">Upcoming Projects</h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide">
            A glimpse into our exclusive future listings.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full max-w-[2000px] mx-auto py-24 px-6 md:px-12 lg:px-24">
        <div className="flex flex-col gap-12 items-center justify-center text-center max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-[#383A3C]">Discover Our Newest Premium Developments</h2>
          <p className="text-[#7d7d7d] text-lg leading-relaxed">
            Detailed information about our upcoming premium developments will be available here soon. We are currently curating the architectural plans and interior details for these exclusive properties to ensure they meet our uncompromising standards of excellence.
          </p>
          
          <div className="w-24 h-[1px] bg-black/20 my-8" />
          
          <p className="font-serif italic text-xl text-gray-400">
            More details coming soon...
          </p>
        </div>
      </section>
    </main>
  );
}
