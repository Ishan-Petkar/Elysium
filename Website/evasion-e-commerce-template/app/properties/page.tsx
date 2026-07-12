"use client";

import React, { useEffect, useState, useMemo } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { COLLECTIONS, PROPERTY_TYPES, TRANSACTION_TYPES, FURNISHING_OPTIONS, AVAILABILITY_OPTIONS } from "@/lib/constants";
import { Property } from "@/lib/types";
import Link from "next/link";
import { MapPin, Bed, Bath, Square, Search, Filter, X } from "lucide-react";

export default function PropertiesListingPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter State (9 Filters)
  const [searchQuery, setSearchQuery] = useState("");
  const [transactionType, setTransactionType] = useState<string>("All");
  const [propertyType, setPropertyType] = useState<string>("All");
  const [furnishing, setFurnishing] = useState<string>("All");
  const [availability, setAvailability] = useState<string>("All");
  const [bedrooms, setBedrooms] = useState<string>("All");
  const [bathrooms, setBathrooms] = useState<string>("All");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        // Base Query: Only fetch published, non-deleted properties
        let q = query(
          collection(db, COLLECTIONS.PROPERTIES),
          where("status", "==", "Published"),
          where("isDeleted", "==", false)
        );

        // We apply propertyType and transactionType at DB level to reduce reads if they are selected
        if (transactionType !== "All") {
          q = query(q, where("transactionType", "==", transactionType));
        }
        if (propertyType !== "All") {
          q = query(q, where("propertyType", "==", propertyType));
        }

        const snapshot = await getDocs(q);
        const propsData = snapshot.docs.map(doc => ({
          ...doc.data(),
          propertyId: doc.id,
          createdAt: doc.data().createdAt?.toDate() || new Date(0),
        } as Property));
        
        // Sort by newest first
        propsData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        setProperties(propsData);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    // Refetch when DB-level filters change
    fetchProperties();
  }, [transactionType, propertyType]);

  // Client-side filtering for the remaining 7 parameters
  // (Firestore cannot do multiple range queries or full-text search natively)
  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      // 1. Text Search (City, Locality, Title)
      if (searchQuery) {
        const queryLower = searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(queryLower);
        const matchCity = p.city.toLowerCase().includes(queryLower);
        const matchLocality = p.locality.toLowerCase().includes(queryLower);
        if (!matchTitle && !matchCity && !matchLocality) return false;
      }

      // 2. Furnishing
      if (furnishing !== "All" && p.furnishing !== furnishing) return false;

      // 3. Availability
      if (availability !== "All" && p.availability !== availability) return false;

      // 4. Bedrooms
      if (bedrooms !== "All") {
        if (bedrooms === "4+") {
          if (p.bedrooms < 4) return false;
        } else if (p.bedrooms !== parseInt(bedrooms)) {
          return false;
        }
      }

      // 5. Bathrooms
      if (bathrooms !== "All") {
        if (bathrooms === "4+") {
          if (p.bathrooms < 4) return false;
        } else if (p.bathrooms !== parseInt(bathrooms)) {
          return false;
        }
      }

      // 6. Min Price
      if (minPrice && p.price < parseInt(minPrice)) return false;

      // 7. Max Price
      if (maxPrice && p.price > parseInt(maxPrice)) return false;

      return true;
    });
  }, [properties, searchQuery, furnishing, availability, bedrooms, bathrooms, minPrice, maxPrice]);

  const clearFilters = () => {
    setSearchQuery("");
    setTransactionType("All");
    setPropertyType("All");
    setFurnishing("All");
    setAvailability("All");
    setBedrooms("All");
    setBathrooms("All");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <div className="pt-24 pb-16 bg-surface-secondary min-h-screen">
      {/* Header */}
      <section className="bg-surface py-12 border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-center">
          <h1 className="text-4xl font-display font-bold text-text mb-4">Exclusive Properties</h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Explore our curated portfolio of premium real estate, representing the finest luxury living.
          </p>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 mt-8">
        
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6">
          <button 
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className="w-full flex items-center justify-center py-3 bg-white border border-gray-300 rounded-md shadow-sm font-medium"
          >
            <Filter className="w-5 h-5 mr-2" />
            {isMobileFiltersOpen ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className={`w-full lg:w-1/4 ${isMobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 lg:sticky lg:top-28">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Filter className="w-5 h-5 mr-2 text-primary" />
                  <h2 className="text-xl font-display font-bold text-text">Refine Search</h2>
                </div>
                {isMobileFiltersOpen && (
                  <button onClick={() => setIsMobileFiltersOpen(false)} className="lg:hidden text-gray-500">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              <div className="space-y-5">
                {/* 1. Search */}
                <div>
                  <label className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wider">Search Location</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input 
                      type="text"
                      placeholder="City, locality, etc..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:ring-primary focus:border-primary text-sm"
                    />
                  </div>
                </div>

                {/* 2 & 3. Types */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wider">Transaction</label>
                    <select value={transactionType} onChange={(e) => setTransactionType(e.target.value)} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-md text-sm">
                      <option value="All">All</option>
                      {TRANSACTION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wider">Property Type</label>
                    <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-md text-sm">
                      <option value="All">All</option>
                      {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                {/* 4 & 5. Price Range */}
                <div>
                  <label className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wider">Price Range (₹)</label>
                  <div className="flex items-center space-x-2">
                    <input type="number" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="w-1/2 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-md text-sm" />
                    <span className="text-gray-400">-</span>
                    <input type="number" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="w-1/2 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-md text-sm" />
                  </div>
                </div>

                {/* 6 & 7. Beds/Baths */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wider">Bedrooms</label>
                    <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-md text-sm">
                      <option value="All">Any</option>
                      {[1,2,3,"4+"].map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wider">Bathrooms</label>
                    <select value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-md text-sm">
                      <option value="All">Any</option>
                      {[1,2,3,"4+"].map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                {/* 8. Furnishing */}
                <div>
                  <label className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wider">Furnishing</label>
                  <select value={furnishing} onChange={(e) => setFurnishing(e.target.value)} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-md text-sm">
                    <option value="All">Any</option>
                    {FURNISHING_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                {/* 9. Availability */}
                <div>
                  <label className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wider">Availability</label>
                  <select value={availability} onChange={(e) => setAvailability(e.target.value)} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-md text-sm">
                    <option value="All">Any</option>
                    {AVAILABILITY_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <button onClick={clearFilters} className="w-full py-2.5 text-sm font-semibold text-text hover:bg-gray-50 border border-gray-300 rounded-md transition-colors">
                    Reset All Filters
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Property Grid */}
          <main className="w-full lg:w-3/4">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-text-muted font-medium">
                Showing <span className="text-text font-bold">{filteredProperties.length}</span> properties
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-white rounded-lg h-[450px] animate-pulse">
                    <div className="h-64 bg-gray-200 rounded-t-lg"></div>
                    <div className="p-6 space-y-4">
                      <div className="h-6 bg-gray-200 w-3/4 rounded"></div>
                      <div className="h-8 bg-gray-200 w-1/2 rounded"></div>
                      <div className="h-4 bg-gray-200 w-full rounded mt-6"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-display font-bold text-text mb-2">No properties found</h3>
                <p className="text-text-muted mb-6">Try adjusting your filters to find what you&apos;re looking for.</p>
                <button onClick={clearFilters} className="px-6 py-2 bg-primary text-white rounded-sm font-medium">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredProperties.map((property) => (
                  <Link href={`/properties/${property.slug}`} key={property.propertyId} className="group bg-white rounded-lg overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col h-full border border-gray-100">
                    <div className="relative h-64 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={property.thumbnailUrl || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                        alt={property.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <span className="bg-primary text-white text-xs font-bold px-3 py-1.5 uppercase tracking-wider rounded-sm shadow-sm">
                          For {property.transactionType}
                        </span>
                        {property.featured && (
                          <span className="bg-accent text-white text-xs font-bold px-3 py-1.5 uppercase tracking-wider rounded-sm shadow-sm">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center text-xs text-text-muted uppercase tracking-wider font-semibold">
                          <MapPin className="w-3.5 h-3.5 mr-1" />
                          {property.locality}, {property.city}
                        </div>
                        <span className="text-xs text-text-muted bg-gray-100 px-2 py-1 rounded">
                          {property.propertyType}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-display font-bold text-text mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {property.title}
                      </h3>
                      
                      <p className="text-2xl text-text font-light mb-6">
                        ₹{property.price.toLocaleString("en-IN")}
                      </p>
                      
                      <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between text-sm text-text-muted">
                        <div className="flex items-center" title="Bedrooms">
                          <Bed className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{property.bedrooms} Beds</span>
                        </div>
                        <div className="flex items-center" title="Bathrooms">
                          <Bath className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{property.bathrooms} Baths</span>
                        </div>
                        <div className="flex items-center" title="Area">
                          <Square className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{property.areaSqft.toLocaleString()} sq.ft</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
