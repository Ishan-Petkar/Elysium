"use client";

import React, { useEffect, useState, use } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, functions } from "@/lib/firebase";
import { COLLECTIONS } from "@/lib/constants";
import { Property } from "@/lib/types";
import { MapPin, Bed, Bath, Square, ChevronRight, Phone, Mail, FileText, CheckCircle2, Send } from "lucide-react";
import Link from "next/link";
import { Turnstile } from "@marsidev/react-turnstile";
import { httpsCallable } from "firebase/functions";
import { logAnalyticsEvent, ANALYTICS_EVENTS } from "@/lib/analytics";

export default function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  // Form State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    message: ""
  });
  const [turnstileToken, setTurnstileToken] = useState("");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const q = query(
          collection(db, COLLECTIONS.PROPERTIES),
          where("slug", "==", resolvedParams.slug),
          where("status", "==", "Published"),
          where("isDeleted", "==", false)
        );
        
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          const data = doc.data() as Property;
          setProperty({
            ...data,
            propertyId: doc.id
          });
          setFormData(prev => ({
            ...prev,
            message: `I am interested in this property (${data.title}). Please contact me with more details.`
          }));

          // Log View Property Event
          logAnalyticsEvent(ANALYTICS_EVENTS.VIEW_PROPERTY, {
            property_id: doc.id,
            property_title: data.title,
            property_type: data.propertyType,
            transaction_type: data.transactionType,
            price: data.price
          });
        }
      } catch (error) {
        console.error("Error fetching property details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [resolvedParams.slug]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!turnstileToken) {
      setErrorMsg("Please complete the security verification.");
      return;
    }

    setIsSubmitting(true);
    
    // Log form submit event
    logAnalyticsEvent(ANALYTICS_EVENTS.LEAD_FORM_SUBMIT, {
      source: "Property Detail Page",
      property_id: property?.propertyId
    });
    
    try {
      const submitLead = httpsCallable(functions, "submitLead");
      const result = await submitLead({
        ...formData,
        lastName: "-",
        interest: "Buying a property",
        propertyId: property?.propertyId,
        token: turnstileToken
      });

      if ((result.data as any).success) {
        setIsSuccess(true);
        setTurnstileToken("");
      } else {
        throw new Error("Submission failed");
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      setErrorMsg(error.message || "An error occurred. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center bg-surface">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="pt-32 pb-16 min-h-[60vh] bg-surface flex flex-col items-center text-center px-6">
        <h1 className="text-4xl font-display font-bold text-text mb-4">Property Not Found</h1>
        <p className="text-text-muted mb-8 max-w-md">The property you are looking for does not exist or has been removed.</p>
        <Link href="/properties" className="px-6 py-3 bg-primary text-white rounded-sm font-medium hover:bg-[#465a26] transition-colors">
          Browse All Properties
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-surface-secondary">
      {/* Breadcrumbs */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-6">
        <nav className="flex text-sm text-text-muted font-medium">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href="/properties" className="hover:text-primary transition-colors">Properties</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-text truncate max-w-[200px] sm:max-w-none">{property.title}</span>
        </nav>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Title Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <span className="bg-primary text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-sm shadow-sm">
                For {property.transactionType}
              </span>
              <span className="bg-surface text-text text-xs font-bold px-3 py-1 uppercase tracking-wider border border-gray-200 rounded-sm">
                {property.propertyType}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text mb-2">
              {property.title}
            </h1>
            <div className="flex items-center text-text-muted font-medium">
              <MapPin className="w-5 h-5 mr-2 text-primary" />
              {property.locality}, {property.city}
            </div>
          </div>
          <div className="text-left lg:text-right">
            <p className="text-sm text-text-muted uppercase tracking-wider font-semibold mb-1">Asking Price</p>
            <p className="text-4xl font-display font-bold text-text">
              ₹{property.price.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="mb-12">
          {/* Main Image */}
          <div className="relative aspect-video max-h-[600px] w-full bg-gray-200 rounded-lg overflow-hidden shadow-elevated mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={property.imageUrls[activeImage]} 
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Thumbnails */}
          {property.imageUrls.length > 1 && (
            <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
              {property.imageUrls.map((url, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative w-32 h-24 flex-shrink-0 rounded-md overflow-hidden transition-all ${
                    activeImage === idx ? "ring-2 ring-primary ring-offset-2 opacity-100" : "opacity-60 hover:opacity-100"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content (Left Column) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Key Features Bar */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-wrap justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Bed className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Bedrooms</p>
                  <p className="text-lg font-bold text-text">{property.bedrooms}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Bath className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Bathrooms</p>
                  <p className="text-lg font-bold text-text">{property.bathrooms}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Square className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Area</p>
                  <p className="text-lg font-bold text-text">{property.areaSqft.toLocaleString()} Sq.Ft.</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Furnishing</p>
                  <p className="text-lg font-bold text-text">{property.furnishing}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-8 md:p-10 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-2xl font-display font-bold text-text mb-6">About this Property</h2>
              <div className="prose prose-lg text-text-muted max-w-none">
                <p className="whitespace-pre-wrap leading-relaxed">{property.description}</p>
              </div>
            </div>

            {/* Video Tour */}
            {property.videoUrl && (
              <div className="bg-white p-8 md:p-10 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-2xl font-display font-bold text-text mb-6">Video Tour</h2>
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                  <a href={property.videoUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-primary text-white rounded-sm font-medium hover:bg-[#465a26] transition-colors">
                    Watch Video Tour on External Site
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar / Inquiry Form (Right Column) */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white p-8 rounded-lg shadow-elevated border border-gray-100">
              <h3 className="text-xl font-display font-bold text-text mb-2">Interested in this property?</h3>
              <p className="text-sm text-text-muted mb-6">Contact our luxury real estate advisors for more information or to schedule a private viewing.</p>
              
              {isSuccess ? (
                <div className="bg-green-50 border border-green-200 text-green-800 rounded-md p-6 text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                  <p className="text-sm">Your inquiry has been successfully sent. One of our advisors will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 mb-6" onFocus={() => logAnalyticsEvent(ANALYTICS_EVENTS.LEAD_FORM_START, { source: "Property Detail Page", property_id: property?.propertyId })}>
                  {errorMsg && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
                      {errorMsg}
                    </div>
                  )}
                  <div>
                    <input type="text" id="firstName" value={formData.firstName} onChange={handleFormChange} placeholder="Your Name *" required className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm" />
                  </div>
                  <div>
                    <input type="email" id="email" value={formData.email} onChange={handleFormChange} placeholder="Email Address *" required className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm" />
                  </div>
                  <div>
                    <input type="tel" id="phone" value={formData.phone} onChange={handleFormChange} placeholder="Phone Number" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm" />
                  </div>
                  <div>
                    <textarea id="message" value={formData.message} onChange={handleFormChange} rows={3} required className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"></textarea>
                  </div>

                  <div className="flex justify-center">
                    <Turnstile
                      siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
                      onSuccess={(token) => setTurnstileToken(token)}
                      onError={() => setErrorMsg("Security check failed.")}
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting || !turnstileToken}
                    className="w-full flex justify-center items-center py-3 bg-primary text-white font-semibold rounded-sm hover:bg-[#465a26] transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Send Inquiry <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </button>
                </form>
              )}

              <div className="flex flex-col space-y-3 pt-6 border-t border-gray-100">
                <a 
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210"}?text=I'm interested in ${property.title}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex justify-center items-center py-3 bg-[#25D366] text-white font-semibold rounded-sm hover:bg-[#128C7E] transition-colors shadow-md"
                  onClick={() => logAnalyticsEvent(ANALYTICS_EVENTS.WHATSAPP_CLICK, { property_id: property?.propertyId })}
                >
                  WhatsApp Us
                </a>
                <a 
                  href="tel:+919876543210" 
                  className="flex justify-center items-center py-3 bg-white text-text border border-gray-300 font-semibold rounded-sm hover:bg-gray-50 transition-colors"
                  onClick={() => logAnalyticsEvent(ANALYTICS_EVENTS.PHONE_CLICK, { property_id: property?.propertyId })}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Advisor
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
