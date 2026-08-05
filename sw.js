const CACHE_NAME = "infoparkdaily-v155";
const PRELOAD_ASSETS = [
  "./",
  "./jobs/",
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
  "./media/",
  "./onam/",
  "./news/",
  "./news-article/",
  "./services/",
  "./build/",
  "./privacy/",
  "./terms/",
  "./favicon.ico",
  "./assets/icons/favicon-48.png",
  "./assets/icons/favicon-192.png",
  "./assets/icons/favicon-180.png",
  "./css/styles.css?v=20260805t",
  "./css/onam.css?v=20260802m",
  "./assets/media/onam-bg-light.svg",
  "./js/disclaimer.js?v=20260805n",
  "./js/site.js?v=20260802sa",
  "./js/ads.js?v=20260805a",
  "./assets/lottie/job-request.json",
  "./assets/lottie/job-search.json?v=20260802sd",
  "./data/jobs-data.js?v=20260804b",
  "./data/technopark-jobs-data.js?v=20260802r",
  "./data/infopark-jobs-data.js?v=20260804b",
  "./data/cyberpark-jobs-data.js?v=20260802r",
  "./js/cyberpark-jobs.js?v=20260728i",
  "./js/infopark-jobs.js?v=20260728i",
  "./js/technopark-jobs.js?v=20260728i",
  "./js/jobs.js?v=20260802af",
  "./js/hiring-portal.js?v=20260805r",
  "./js/job.js?v=20260802z",
  "./js/company.js?v=20260804b",
  "./js/contact.js?v=20260725k",
  "./data/media-data.js?v=20260724g",
  "./js/media.js?v=20260724g",
  "./assets/media/onam-bg.svg",
  "./data/news-data.js?v=20260805t",
  "./js/news.js?v=20260805t",
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
