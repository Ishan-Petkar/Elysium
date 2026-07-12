import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import { COLLECTIONS } from "./constants";

/**
 * Audit Logging Utility
 * Source: Data Governance and Security Plan §3.3
 * 
 * Logs significant actions to the `audit_logs` collection for security and accountability.
 */
export async function logAuditAction(userId: string, action: string, resourceId: string, details?: string) {
  try {
    await addDoc(collection(db, COLLECTIONS.AUDIT_LOGS), {
      userId,
      action,
      resourceId,
      details: details || null,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    // We don't want audit logging failures to break the main application flow,
    // but they should be monitored via console/reporting tools.
    console.error("Failed to write audit log:", error);
  }
}
