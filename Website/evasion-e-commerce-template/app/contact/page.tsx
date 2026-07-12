"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    interest: "Buying a property",
    message: ""
  });
  const [turnstileToken, setTurnstileToken] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!turnstileToken) {
      setErrorMsg("Please complete the security verification.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const submitLead = httpsCallable(functions, "submitLead");
      const result = await submitLead({
        ...formData,
        token: turnstileToken
      });

      if ((result.data as any).success) {
        setIsSuccess(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          interest: "Buying a property",
          message: ""
        });
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

  return (
    <div className="pt-24 pb-16">
      {/* Header */}
      <section className="bg-surface py-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-text mb-4">Contact Us</h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Whether you&apos;re looking to buy, sell, or simply explore your options, our team of luxury real estate experts is here to assist you.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-display font-bold text-text mb-8">Get in Touch</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center flex-shrink-0 mr-6">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text mb-1">Our Office</h3>
                    <p className="text-text-muted leading-relaxed">
                      123 Luxury Avenue, Bandra West<br />
                      Mumbai, Maharashtra 400050<br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center flex-shrink-0 mr-6">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text mb-1">Phone</h3>
                    <p className="text-text-muted mb-1">
                      <a href="tel:+919876543210" className="hover:text-primary transition-colors">Direct: +91 98765 43210</a>
                    </p>
                    <p className="text-text-muted">
                      <a href="tel:+912212345678" className="hover:text-primary transition-colors">Office: +91 22 1234 5678</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center flex-shrink-0 mr-6">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text mb-1">Email</h3>
                    <p className="text-text-muted mb-1">
                      <a href="mailto:info@elypsium.com" className="hover:text-primary transition-colors">Inquiries: info@elypsium.com</a>
                    </p>
                    <p className="text-text-muted">
                      <a href="mailto:support@elypsium.com" className="hover:text-primary transition-colors">Support: support@elypsium.com</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center flex-shrink-0 mr-6">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text mb-1">Business Hours</h3>
                    <p className="text-text-muted mb-1">Monday - Friday: 10:00 AM - 7:00 PM</p>
                    <p className="text-text-muted">Saturday: 10:00 AM - 4:00 PM</p>
                    <p className="text-text-muted">Sunday: Closed (Available by appointment)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 md:p-10 rounded-lg shadow-elevated border border-gray-100">
              <h2 className="text-2xl font-display font-bold text-text mb-6">Send a Message</h2>
              
              {isSuccess ? (
                <div className="bg-green-50 border border-green-200 text-green-800 rounded-md p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                  <p>Your message has been successfully sent. One of our advisors will contact you shortly.</p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="mt-6 px-6 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMsg && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-text-muted mb-1">First Name *</label>
                      <input type="text" id="firstName" value={formData.firstName} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary" />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-text-muted mb-1">Last Name *</label>
                      <input type="text" id="lastName" value={formData.lastName} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-text-muted mb-1">Email Address *</label>
                      <input type="email" id="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-text-muted mb-1">Phone Number</label>
                      <input type="tel" id="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="interest" className="block text-sm font-medium text-text-muted mb-1">I am interested in...</label>
                    <select id="interest" value={formData.interest} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary bg-white">
                      <option>Buying a property</option>
                      <option>Selling a property</option>
                      <option>Renting a property</option>
                      <option>Real estate advisory</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text-muted mb-1">Message *</label>
                    <textarea id="message" value={formData.message} onChange={handleChange} rows={5} required className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"></textarea>
                  </div>

                  {/* Cloudflare Turnstile */}
                  <div className="flex justify-center">
                    <Turnstile
                      siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"} // 1x00000000000000000000AA is the dummy test key that always passes
                      onSuccess={(token) => setTurnstileToken(token)}
                      onError={() => setErrorMsg("Security check failed. Please refresh.")}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !turnstileToken}
                    className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-sm shadow-sm text-base font-semibold text-white bg-primary hover:bg-[#465a26] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
