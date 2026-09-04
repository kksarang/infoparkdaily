const CACHE_NAME = "infoparkdaily-v280";
const PRELOAD_ASSETS = [
  "./",
  "./jobs/",
  "./ats-checker/",
  "./companies/",
  "./recruit/",
  "./technopark-jobs/",
  "./infopark-jobs/",
  "./cyberpark-jobs/",
  "./guides/",
  "./guides/how-to-apply-infopark-technopark-jobs/",
  "./guides/fresher-guide-kochi-it-parks/",
  "./guides/walk-in-interview-tips-infopark/",
  "./guides/kerala-it-hiring-this-week/",
  "./guides/verify-jobs-before-you-apply/",
  "./job.html",
  "./company.html",
  "./404.html",
  "./contact/",
  "./review/",
  "./media/",
  "./social/",
  "./social-post/",
  "./onam/",
  "./rajaonam/",
  "./cpe/",
  "./news/",
  "./news-article/",
  "./services/",
  "./build/",
  "./privacy/",
  "./terms/",
  "./safety/",
  "./favicon.ico",
  "./assets/icons/favicon-48.png",
  "./assets/icons/favicon-192.png",
  "./assets/icons/favicon-180.png",
  "./css/styles.css?v=20260904h",
  "./css/onam.css?v=20260831b",
  "./css/jobs-marketplace.css?v=20260904w",
  "./css/recruit-premium.css?v=20260904r",
  "./css/ats-checker.css?v=20260904d",
  "./css/job-detail-premium.css?v=20260904j",
  "./css/company-premium.css?v=20260904d",
  "./assets/media/cpe-opscloud.png?v=20260902b",
  "./assets/media/onam-bg-light.svg",
  "./js/disclaimer.js?v=20260825b",
  "./js/site.js?v=20260904e",
  "./js/ads.js?v=20260805a",
  "./assets/lottie/job-request.json",
  "./assets/lottie/job-search.json?v=20260802sd",
  "./data/jobs-data.js?v=20260904c",
  "./data/applications-config.js?v=20260904f",
  "./data/technopark-jobs-data.js?v=20260904a",
  "./data/infopark-jobs-data.js?v=20260904a",
  "./data/cyberpark-jobs-data.js?v=20260904a",
  "./data/site-reviews.json",
  "./js/cyberpark-jobs.js?v=20260805p",
  "./js/infopark-jobs.js?v=20260805p",
  "./js/technopark-jobs.js?v=20260805p",
  "./js/jobs.js?v=20260904s",
  "./js/ats-checker.js?v=20260904e",
  "./vendor/pdfjs/pdf.min.js",
  "./vendor/pdfjs/pdf.worker.min.js",
  "./vendor/mammoth/mammoth.browser.min.js",
  "./js/hiring-portal.js?v=20260805r",
  "./js/job-apply.js?v=20260904f",
  "./js/job.js?v=20260904a",
  "./js/company.js?v=20260904d",
  "./js/park-companies.js?v=20260830l",
  "./data/infopark-companies-data.js?v=20260830d",
  "./data/technopark-companies-data.js?v=20260830d",
  "./data/cyberpark-companies-data.js?v=20260830d",
  "./js/contact.js?v=20260725k",
  "./data/media-data.js?v=20260902c",
  "./js/social.js?v=20260902a",
  "./js/social-post.js?v=20260815b",
  "./assets/media/onam-bg.svg",
  "./data/news-data.js?v=20260805x",
  "./js/news.js?v=20260805x",
  "./js/news-article.js?v=20260805l",
  "./manifest.webmanifest",
  "./assets/logo-infoparkdaily.png"
];

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (_error) {
    const cached = await cache.match(request);
    if (cached) return cached;
    throw _error;
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  const networkPromise = fetch(request)
    .then((response) => {
      if (response && response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => null);
  return cached || networkPromise;
}

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(PRELOAD_ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const { destination, mode } = event.request;
  if (mode === "navigate" || destination === "style" || destination === "script" || destination === "document") {
    event.respondWith(networkFirst(event.request));
    return;
  }

  event.respondWith(staleWhileRevalidate(event.request));
});
