/**
 * Elypsium Platform Constants
 * Source: Implementation Plan Phase 8 — Resolved Decisions (Q3)
 *
 * These enum values are the canonical taxonomy for the platform.
 * They power CMS dropdowns, search filters, and Firestore queries.
 */

// ─── Property Type ──────────────────────────────────────────────
export const PROPERTY_TYPES = [
  "Villa",
  "Apartment",
  "Penthouse",
  "Plot",
  "Farmhouse",
  "Commercial",
  "Bungalow",
  "Row House",
] as const;

export type PropertyType = (typeof PROPERTY_TYPES)[number];

// ─── Transaction Type ───────────────────────────────────────────
export const TRANSACTION_TYPES = ["Sale", "Rent"] as const;

export type TransactionType = (typeof TRANSACTION_TYPES)[number];

// ─── Furnishing ─────────────────────────────────────────────────
export const FURNISHING_OPTIONS = [
  "Furnished",
  "Semi-Furnished",
  "Unfurnished",
] as const;

export type FurnishingOption = (typeof FURNISHING_OPTIONS)[number];

// ─── Availability ───────────────────────────────────────────────
export const AVAILABILITY_OPTIONS = [
  "Available",
  "Sold",
  "Rented",
  "Upcoming",
] as const;

export type AvailabilityOption = (typeof AVAILABILITY_OPTIONS)[number];

// ─── Status (CMS Internal) ─────────────────────────────────────
export const PROPERTY_STATUSES = [
  "Draft",
  "Published",
  "Archived",
] as const;

export type PropertyStatus = (typeof PROPERTY_STATUSES)[number];

// ─── Lead Status ────────────────────────────────────────────────
export const LEAD_STATUSES = [
  "New",
  "Contacted",
  "Qualified",
  "Converted",
  "Closed",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

// ─── User Roles (Canonical: SAD + Data Governance) ──────────────
export const USER_ROLES = [
  "Super Admin",
  "Admin",
  "Viewer",
] as const;

export type UserRole = (typeof USER_ROLES)[number];

// ─── Firebase Storage Paths (TAD §Storage) ──────────────────────
export const STORAGE_PATHS = {
  PROPERTY_IMAGES: "properties",
  TEAM_IMAGES: "team-images",
  REVIEW_ASSETS: "review-assets",
} as const;

// ─── Upload Limits ──────────────────────────────────────────────
export const UPLOAD_LIMITS = {
  IMAGE_MAX_SIZE_MB: 5,
  IMAGE_MAX_WIDTH_PX: 1920,
  IMAGE_QUALITY: 0.8,
  VIDEO_MAX_SIZE_MB: 50,
  MAX_IMAGES_PER_PROPERTY: 10,
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp"],
  ALLOWED_VIDEO_TYPES: ["video/mp4"],
} as const;

// ─── Analytics Events (Canonical 11 events) ─────────────────────
export const ANALYTICS_EVENTS = {
  PAGE_VIEW: "page_view",
  PROPERTY_VIEW: "property_view",
  PROPERTY_FILTER: "property_filter",
  PROPERTY_SEARCH: "property_search",
  PROPERTY_SHARE: "property_share",
  LEAD_SUBMIT: "lead_submit",
  CONTACT_SUBMIT: "contact_submit",
  PHONE_CLICK: "phone_click",
  WHATSAPP_CLICK: "whatsapp_click",
  TESTIMONIAL_VIEW: "testimonial_view",
  CTA_CLICK: "cta_click",
} as const;

// ─── Site Metadata ──────────────────────────────────────────────
export const SITE_CONFIG = {
  name: "Elypsium",
  description:
    "A premium luxury real estate platform — Discover exceptional properties through honest guidance, market expertise, and enduring relationships.",
  url: "https://www.elypsium.com",
  locale: "en-IN",
  currency: "INR",
} as const;

// ─── Firestore Collection Names ─────────────────────────────────
export const COLLECTIONS = {
  PROPERTIES: "properties",
  LEADS: "leads",
  USERS: "users",
  TESTIMONIALS: "testimonials",
  SETTINGS: "settings",
  AUDIT_LOGS: "audit_logs",
} as const;
