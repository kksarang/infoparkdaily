/**
 * InfoparkDaily Analytics — ESM entry (Phase 16)
 * ================================================
 * Single module entry. Load with:
 *   <script type="module" src="/analytics/main.js?v=…"></script>
 *
 * Internals use ES modules (no IPD_ANALYTICS_* globals).
 * One public facade `IPDAnalytics` is attached for legacy classic scripts.
 */
import { config } from "./src/config.js";
import { init, api } from "./src/client.js";
import { track } from "./src/track.js";
import { EVENTS } from "./src/events.js";

const publicApi = Object.freeze({
  ...api,
  init,
  track,
  trackEvent: track,
  EVENTS,
  config
});

// Sole bridge for non-module page scripts (job.js, contact.js, …)
const name = config.publicApiName || "IPDAnalytics";
Object.defineProperty(globalThis, name, {
  value: publicApi,
  writable: false,
  configurable: true
});
// Optional short alias used in older snippets
Object.defineProperty(globalThis, "trackEvent", {
  value: (n, p) => track(n, p),
  writable: false,
  configurable: true
});

if (typeof document !== "undefined") {
  init();
}

export { track, EVENTS, config, init, publicApi as IPDAnalytics };
export default publicApi;
