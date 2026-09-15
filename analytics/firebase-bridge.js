/** Firebase Analytics delivery for the web app linked to the Firebase console. */
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  initializeAnalytics,
  isSupported,
  logEvent,
  setUserId,
  setUserProperties,
  settings,
} from "firebase/analytics";
import { firebaseConfig } from "../js/resume-builder/firebase-config.js";
import { config } from "./src/config.js";

let analyticsPromise;

async function instance() {
  if (!analyticsPromise) {
    analyticsPromise = (async () => {
      if (config.gaMeasurementId !== firebaseConfig.measurementId)
        throw Error("Analytics stream does not match the Firebase web app.");
      if (!(await isSupported())) return null;
      settings({ gtagName: "gtag", dataLayerName: "dataLayer" });
      const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
      // The site sends its own sanitized page_view after the consent decision.
      return initializeAnalytics(app, { config: { send_page_view: false } });
    })().catch(() => null);
  }
  return analyticsPromise;
}

export async function sendEvent(name, params) {
  const analytics = await instance();
  if (analytics) logEvent(analytics, name, params || {});
}

export async function setAnalyticsUserId(uid, props = {}) {
  const analytics = await instance();
  if (!analytics) return;
  setUserId(analytics, uid || null);
  setUserProperties(analytics, {
    auth_state: uid ? "signed_in" : "signed_out",
    account_area: uid ? props.account_area || "none" : "none",
  });
}
