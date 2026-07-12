"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { doc, setDoc, updateDoc, serverTimestamp, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { COLLECTIONS, PROPERTY_TYPES, TRANSACTION_TYPES, FURNISHING_OPTIONS, AVAILABILITY_OPTIONS, PROPERTY_STATUSES } from "@/lib/constants";
import { Property } from "@/lib/types";
import { logAuditAction } from "@/lib/audit";
import { useAuth } from "@/lib/auth-context";
import ImageUpload from "./ImageUpload";
import { Save, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

const propertySchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  city: z.string().min(2, "City is required"),
  locality: z.string().min(2, "Locality is required"),
  transactionType: z.enum(TRANSACTION_TYPES),
  propertyType: z.enum(PROPERTY_TYPES),
  price: z.number().min(0, "Price must be positive"),
  bedrooms: z.number().min(0).int(),
  bathrooms: z.number().min(0).int(),
  areaSqft: z.number().min(0, "Area must be positive"),
  furnishing: z.enum(FURNISHING_OPTIONS),
  featured: z.boolean().default(false),
  availability: z.enum(AVAILABILITY_OPTIONS),
  description: z.string().min(20, "Description must be at least 20 characters"),
  status: z.enum(PROPERTY_STATUSES),
  videoUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

type PropertyFormData = z.infer<typeof propertySchema>;

interface PropertyFormProps {
  initialData?: Property;
  propertyId?: string;
  isNew?: boolean;
}

export default function PropertyForm({ initialData, propertyId, isNew = false }: PropertyFormProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [images, setImages] = useState<string[]>(initialData?.imageUrls || []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, control, formState: { errors } } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema) as any,
    defaultValues: initialData ? {
      ...initialData,
      videoUrl: initialData.videoUrl || "",
    } : {
      title: "",
      city: "",
      locality: "",
      transactionType: "Sale",
      propertyType: "Apartment",
      price: 0,
      bedrooms: 0,
      bathrooms: 0,
      areaSqft: 0,
      furnishing: "Unfurnished",
      featured: false,
      availability: "Available",
      description: "",
      status: "Draft",
      videoUrl: "",
    }
  });

  const onSubmit = async (data: PropertyFormData) => {
    if (images.length === 0) {
      setError("Please upload at least one image.");
      return;
    }
    
    setIsSubmitting(true);
    setError("");

    try {
      // Create a slug from title
      const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      
      const propertyData = {
        ...data,
        slug,
        imageUrls: images,
        thumbnailUrl: images[0], // First image is thumbnail
        updatedAt: serverTimestamp(),
      };

      if (isNew) {
        // Create new
        const newPropertyRef = doc(collection(db, COLLECTIONS.PROPERTIES));
        await setDoc(newPropertyRef, {
          ...propertyData,
          propertyId: newPropertyRef.id,
          isDeleted: false,
          createdAt: serverTimestamp(),
        });
        if (user) await logAuditAction(user.uid, "CREATE_PROPERTY", newPropertyRef.id, `Created property: ${data.title}`);
      } else if (propertyId) {
        // Update existing
        const docRef = doc(db, COLLECTIONS.PROPERTIES, propertyId);
        await updateDoc(docRef, propertyData);
        if (user) await logAuditAction(user.uid, "UPDATE_PROPERTY", propertyId, `Updated property: ${data.title}`);
      }

      router.push("/admin/properties");
    } catch (err: any) {
      console.error("Error saving property:", err);
      setError("Failed to save property. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/properties" className="text-gray-400 hover:text-text transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-display font-bold text-text">
            {isNew ? "Add New Property" : "Edit Property"}
          </h1>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-error p-4 rounded-md border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-6">
          <h2 className="text-lg font-semibold text-text border-b pb-2">Basic Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-text-muted mb-1">Title *</label>
              <input {...register("title")} className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary" />
              {errors.title && <p className="text-error text-xs mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">City *</label>
              <input {...register("city")} className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary" />
              {errors.city && <p className="text-error text-xs mt-1">{errors.city.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Locality *</label>
              <input {...register("locality")} className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary" />
              {errors.locality && <p className="text-error text-xs mt-1">{errors.locality.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Price (₹) *</label>
              <input type="number" {...register("price", { valueAsNumber: true })} className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary" />
              {errors.price && <p className="text-error text-xs mt-1">{errors.price.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Area (Sq.ft) *</label>
              <input type="number" {...register("areaSqft", { valueAsNumber: true })} className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary" />
              {errors.areaSqft && <p className="text-error text-xs mt-1">{errors.areaSqft.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Bedrooms *</label>
              <input type="number" {...register("bedrooms", { valueAsNumber: true })} className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary" />
              {errors.bedrooms && <p className="text-error text-xs mt-1">{errors.bedrooms.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Bathrooms *</label>
              <input type="number" {...register("bathrooms", { valueAsNumber: true })} className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary" />
              {errors.bathrooms && <p className="text-error text-xs mt-1">{errors.bathrooms.message}</p>}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-6">
          <h2 className="text-lg font-semibold text-text border-b pb-2">Categorization & Status</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Property Type</label>
              <select {...register("propertyType")} className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary bg-white">
                {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Transaction Type</label>
              <select {...register("transactionType")} className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary bg-white">
                {TRANSACTION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Furnishing</label>
              <select {...register("furnishing")} className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary bg-white">
                {FURNISHING_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Availability</label>
              <select {...register("availability")} className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary bg-white">
                {AVAILABILITY_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Status (CMS)</label>
              <select {...register("status")} className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary bg-white font-medium">
                {PROPERTY_STATUSES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            
            <div className="flex items-center mt-6">
              <input type="checkbox" id="featured" {...register("featured")} className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
              <label htmlFor="featured" className="ml-2 block text-sm text-text">
                Featured Property
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-6">
          <h2 className="text-lg font-semibold text-text border-b pb-2">Description & Media</h2>
          
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Description *</label>
            <textarea {...register("description")} rows={6} className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary"></textarea>
            {errors.description && <p className="text-error text-xs mt-1">{errors.description.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Video Tour URL (Optional)</label>
            <input {...register("videoUrl")} placeholder="https://youtube.com/..." className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary" />
            {errors.videoUrl && <p className="text-error text-xs mt-1">{errors.videoUrl.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-3">Property Images *</label>
            <ImageUpload images={images} onChange={setImages} />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-[#465a26] transition-colors disabled:opacity-70"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <Save className="w-5 h-5 mr-2" />
            )}
            {isNew ? "Create Property" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
