/** Public Firebase web config. Access is enforced by Auth and Firestore rules. */
export const firebaseConfig = {
  apiKey: "AIzaSyA_Oi_2ciCduRiRjMXjI6bbXYjymeGlr5M",
  authDomain: "infoparkdailyweb.firebaseapp.com",
  projectId: "infoparkdailyweb",
  storageBucket: "infoparkdailyweb.firebasestorage.app",
  messagingSenderId: "329836048903",
  appId: "1:329836048903:web:9eacf8dfbfcb546b52b0a2",
  measurementId: "G-747MYSVW6K",
};

export const SITE_ORIGIN = "https://infoparkdaily.online";
export const AUTH_ACTION_PATH = "/auth/action/";

/** Continue URL after the user opens the email link. Must be an authorised Auth domain. */
export function authEmailSettings(continuePath = "/resume-builder/my-resumes/") {
  const origin =
    typeof location !== "undefined" && location.origin
      ? location.origin
      : SITE_ORIGIN;
  const path = continuePath.startsWith("/") ? continuePath : `/${continuePath}`;
  return { url: origin + path, handleCodeInApp: false };
}
