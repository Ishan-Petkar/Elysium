import { getAnalytics, logEvent, isSupported } from "firebase/analytics";
import app from "./firebase";

// Ensure analytics is only initialized on the client side
const analyticsPromise = typeof window !== "undefined" ? isSupported().then(yes => yes ? getAnalytics(app) : null) : Promise.resolve(null);

export const ANALYTICS_EVENTS = {
  PAGE_VIEW: "page_view",
  SEARCH_PROPERTIES: "search_properties",
  VIEW_PROPERTY: "view_property",
  LEAD_FORM_START: "lead_form_start",
  LEAD_FORM_SUBMIT: "lead_form_submit",
  WHATSAPP_CLICK: "whatsapp_click",
  PHONE_CLICK: "phone_click",
  ADMIN_LOGIN: "admin_login",
  ADMIN_CREATE_PROPERTY: "admin_create_property",
  ADMIN_EDIT_PROPERTY: "admin_edit_property",
  ADMIN_DELETE_PROPERTY: "admin_delete_property",
} as const;

export const logAnalyticsEvent = async (eventName: string, eventParams?: Record<string, any>) => {
  try {
    const analytics = await analyticsPromise;
    if (analytics) {
      logEvent(analytics, eventName, eventParams);
    } else {
      // Analytics might be disabled or blocked (e.g., ad blockers)
      if (process.env.NODE_ENV !== "production") {
        console.log(`[Analytics Event] ${eventName}`, eventParams);
      }
    }
  } catch (error) {
    console.error("Failed to log analytics event", error);
  }
};
