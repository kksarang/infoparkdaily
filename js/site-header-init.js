/* For pages that do not load js/site.js (e.g. Portfolio): wire the shared main header. */
import { bindSiteHeader } from "./site-header.js?v=20261109si";

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bindSiteHeader);
else bindSiteHeader();
