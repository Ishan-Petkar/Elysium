/**
 * Firestore Data Types
 * Source: Firebase Architecture Document §5, SAD §11
 *
 * These types define the shape of all Firestore documents.
 * They are the canonical TypeScript representation of the data model.
 */

import type {
  PropertyType,
  TransactionType,
  FurnishingOption,
  AvailabilityOption,
  PropertyStatus,
  LeadStatus,
  UserRole,
} from "./constants";

// ─── Property ───────────────────────────────────────────────────
export interface Property {
  propertyId: string;
  title: string;
  slug: string;
  city: string;
  locality: string;
  transactionType: TransactionType;
  propertyType: PropertyType;
  price: number;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  furnishing: FurnishingOption;
  featured: boolean;
  availability: AvailabilityOption;
  thumbnailUrl: string;
  imageUrls: string[];
  videoUrl?: string;
  description: string;
  status: PropertyStatus;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Lead ───────────────────────────────────────────────────────
export interface Lead {
  leadId: string;
  propertyId: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  consentGiven: boolean;
  consentTimestamp: Date;
  turnstileVerified: boolean;
  sourcePage: string;
  status: LeadStatus;
  assignedTo?: string;
  createdAt: Date;
}

// ─── User (Admin) ───────────────────────────────────────────────
export interface User {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
}

// ─── Testimonial ────────────────────────────────────────────────
export interface Testimonial {
  id: string;
  clientName: string;
  review: string;
  rating: number;
  featured: boolean;
  createdAt: Date;
}

// ─── Settings (Singleton Document) ──────────────────────────────
export interface SiteSettings {
  homepageFeaturedLimit: number;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  maintenanceMode: boolean;
}

// ─── Audit Log ──────────────────────────────────────────────────
export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resourceId: string;
  details?: string;
  timestamp: Date;
}

// ─── Lead Form Input (for React Hook Form / Zod) ────────────────
export interface LeadFormInput {
  name: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
  turnstileToken: string;
  propertyId?: string;
  sourcePage: string;
}
