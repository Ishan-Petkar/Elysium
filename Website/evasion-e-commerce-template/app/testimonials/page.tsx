"use client";

import React, { useEffect, useState } from "react";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { COLLECTIONS } from "@/lib/constants";
import { Testimonial } from "@/lib/types";
import { Star, Quote } from "lucide-react";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const q = query(
          collection(db, COLLECTIONS.TESTIMONIALS),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        } as Testimonial));
        
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        
        // Load fallback testimonials if Firestore fails/is empty
        setTestimonials([
          {
            id: "1",
            clientName: "Rajiv M.",
            review: "Elypsium provided an unparalleled level of service when we were searching for our sea-facing apartment in Bandra. Their market knowledge and access to off-market properties made all the difference.",
            rating: 5,
            featured: true,
            createdAt: new Date(),
          },
          {
            id: "2",
            clientName: "Ananya S.",
            review: "Selling a luxury property can be stressful, but the Elypsium team handled everything with absolute professionalism. From staging advice to the final negotiations, they were flawless.",
            rating: 5,
            featured: true,
            createdAt: new Date(),
          },
          {
            id: "3",
            clientName: "Vikram K.",
            review: "What sets Elypsium apart is their absolute transparency. They advised us against a property that looked great but had underlying issues, ultimately finding us a much better investment. Trust is everything.",
            rating: 5,
            featured: false,
            createdAt: new Date(),
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="pt-24 pb-16 bg-white min-h-screen">
      {/* Header */}
      <section className="bg-surface py-16 border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-text mb-4">Client Testimonials</h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Read what our valued clients have to say about their experience with Elypsium.
          </p>
        </div>
      </section>

      <section className="py-20 max-w-[1440px] mx-auto px-6 md:px-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-8 bg-surface rounded-lg animate-pulse h-64"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="p-8 bg-surface rounded-lg shadow-sm hover:shadow-card transition-shadow border border-gray-100 flex flex-col h-full">
                <Quote className="w-10 h-10 text-primary/20 mb-6" />
                <p className="text-text-muted leading-relaxed mb-8 flex-grow">
                  "{testimonial.review}"
                </p>
                <div className="mt-auto border-t border-gray-200 pt-6 flex justify-between items-center">
                  <div>
                    <p className="font-display font-bold text-lg text-text">{testimonial.clientName}</p>
                    <p className="text-xs text-text-muted uppercase tracking-wider mt-1">Verified Client</p>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? "text-accent fill-accent" : "text-gray-300"}`} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
