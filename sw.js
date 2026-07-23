const CACHE_NAME = "infoparkdaily-v45";
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
  "./privacy.html",
  "./terms.html",
  "./hexenity.css?v=20260724d",
  "./hexenity.js?v=20260724d",
  "./styles.css?v=20260724d",
  "./disclaimer.js?v=20260724d",
  "./script.js?v=20260724d",
  "./jobs-data.js?v=20260724d",
  "./jobs.js?v=20260724d",
  "./job.js?v=20260724d",
  "./contact.js?v=20260724d",
  "./media-data.js?v=20260724d",
  "./media.js?v=20260724d",
  "./news-data.js?v=20260724d",
  "./news.js?v=20260724d",
  "./news-article.js?v=20260724d",
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
