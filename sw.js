const CACHE_NAME = "infoparkdaily-v140";
const PRELOAD_ASSETS = [
  "./",
  "./jobs/",
  "./recruit/",
  "./technopark-jobs/",
  "./infopark-jobs/",
  "./cyberpark-jobs/",
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
  "./css/styles.css?v=20260802sc",
  "./css/onam.css?v=20260802m",
  "./assets/media/onam-bg-light.svg",
  "./js/disclaimer.js?v=20260802r",
  "./js/site.js?v=20260802sa",
  "./assets/lottie/job-request.json",
  "./assets/lottie/job-search.json",
  "./data/jobs-data.js?v=20260802sb",
  "./data/technopark-jobs-data.js?v=20260802r",
  "./data/infopark-jobs-data.js?v=20260802sb",
  "./data/cyberpark-jobs-data.js?v=20260802r",
  "./js/cyberpark-jobs.js?v=20260728i",
  "./js/infopark-jobs.js?v=20260728i",
  "./js/technopark-jobs.js?v=20260728i",
  "./js/jobs.js?v=20260802af",
  "./js/hiring-portal.js?v=20260802rq",
  "./js/job.js?v=20260802z",
  "./js/company.js?v=20260730d",
  "./js/contact.js?v=20260725k",
  "./data/media-data.js?v=20260724g",
  "./js/media.js?v=20260724g",
  "./assets/media/onam-bg.svg",
  "./data/news-data.js?v=20260728m",
  "./js/news.js?v=20260724r",
  "./js/news-article.js?v=20260724r",
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
