import * as functions from "firebase-functions/v2";
import * as admin from "firebase-admin";

admin.initializeApp();

// Hardcoded for development. In production, use Firebase Secrets.
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY || "1x0000000000000000000000000000000AA"; // Dummy test key for Turnstile
const RESEND_API_KEY = process.env.RESEND_API_KEY || "re_dummy_key";

/**
 * submitLead - Callable HTTP Function
 * Verifies Turnstile token and adds lead to Firestore
 */
export const submitLead = functions.https.onCall(async (request) => {
  const data = request.data;
  
  if (!data.token) {
    throw new functions.https.HttpsError("invalid-argument", "Turnstile token is required.");
  }

  if (!data.firstName || !data.lastName || !data.email) {
    throw new functions.https.HttpsError("invalid-argument", "Missing required fields.");
  }

  // 1. Verify Turnstile Token
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${TURNSTILE_SECRET_KEY}&response=${data.token}`,
    });
    
    const result = await response.json();
    
    if (!result.success) {
      console.error("Turnstile validation failed:", result);
      throw new functions.https.HttpsError("permission-denied", "Security check failed. Please try again.");
    }
  } catch (error) {
    console.error("Error verifying Turnstile token:", error);
    throw new functions.https.HttpsError("internal", "Error verifying security token.");
  }

  // 2. Add lead to Firestore
  try {
    const leadData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone || "",
      interest: data.interest || "",
      message: data.message || "",
      propertyId: data.propertyId || null,
      source: data.propertyId ? "Property Inquiry" : "Contact Form",
      status: "New",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const db = admin.firestore();
    const leadRef = await db.collection("leads").add(leadData);

    // 3. Add Audit Log
    await db.collection("audit_logs").add({
      action: "CREATE_LEAD",
      performedBy: "SYSTEM",
      resourceId: leadRef.id,
      resourceType: "LEAD",
      details: { email: data.email, source: leadData.source },
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { success: true, leadId: leadRef.id };
  } catch (error) {
    console.error("Error saving lead to Firestore:", error);
    throw new functions.https.HttpsError("internal", "Error saving your inquiry.");
  }
});

/**
 * sendLeadNotification - Firestore Trigger
 * Sends an email via Resend when a new lead is created
 */
export const sendLeadNotification = functions.firestore.onDocumentCreated("leads/{leadId}", async (event) => {
  const snapshot = event.data;
  if (!snapshot) return;

  const lead = snapshot.data();

  // 1. Send Email Notification via Resend (Using HTTP fetch to avoid needing external npm package in functions if possible, but Resend SDK is fine too)
  try {
    const emailBody = {
      from: "Elypsium System <onboarding@resend.dev>",
      to: ["admin@elypsium.com"], // Would be dynamic or from config
      subject: `New Lead: ${lead.firstName} ${lead.lastName}`,
      html: `
        <h2>New Inquiry Received</h2>
        <p><strong>Name:</strong> ${lead.firstName} ${lead.lastName}</p>
        <p><strong>Email:</strong> ${lead.email}</p>
        <p><strong>Phone:</strong> ${lead.phone}</p>
        <p><strong>Interest:</strong> ${lead.interest}</p>
        <p><strong>Message:</strong> ${lead.message}</p>
        <p><strong>Source:</strong> ${lead.source}</p>
        ${lead.propertyId ? `<p><strong>Property ID:</strong> ${lead.propertyId}</p>` : ""}
      `
    };

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(emailBody)
    });

    if (!response.ok) {
      console.error("Resend API error:", await response.text());
    } else {
      console.log(`Notification sent for lead ${event.params.leadId}`);
    }
  } catch (error) {
    console.error("Error sending notification:", error);
  }
});
