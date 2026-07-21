const CACHE_NAME = "infoparkdaily-v37";
const PRELOAD_ASSETS = [
  "./",
  "./index.html",
  "./jobs.html",
  "./job.html",
  "./contact.html",
  "./media.html",
  "./news.html",
  "./news-article.html",
  "./hexenity.html",
  "./services.html",
  "./hexenity.css?v=20260721t",
  "./hexenity.js?v=20260721t",
  "./styles.css?v=20260721t",
  "./script.js?v=20260721t",
  "./jobs-data.js?v=20260721t",
  "./jobs.js?v=20260721t",
  "./job.js?v=20260721t",
  "./contact.js?v=20260721t",
  "./media-data.js?v=20260721t",
  "./media.js?v=20260721t",
  "./news-data.js?v=20260721t",
  "./news.js?v=20260721t",
  "./news-article.js?v=20260721t",
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
