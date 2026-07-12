"use client";

import React, { useEffect, useState, use } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { COLLECTIONS } from "@/lib/constants";
import { Property } from "@/lib/types";
import PropertyForm from "@/components/admin/PropertyForm";
import { Loader2 } from "lucide-react";

export default function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const docRef = doc(db, COLLECTIONS.PROPERTIES, resolvedParams.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setProperty({
            ...data,
            propertyId: docSnap.id,
            createdAt: data.createdAt?.toDate(),
            updatedAt: data.updatedAt?.toDate(),
          } as Property);
        } else {
          setError("Property not found.");
        }
      } catch (err: any) {
        console.error("Error fetching property:", err);
        setError("Failed to load property details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
        <p className="text-text-muted">Loading property details...</p>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <div className="bg-red-50 text-error p-6 rounded-md border border-red-200 text-center">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error || "Property could not be loaded."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <PropertyForm initialData={property} propertyId={resolvedParams.id} isNew={false} />
    </div>
  );
}
