// OneSignal MUST be imported first — it registers push/notificationclick handlers.
importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

// ─── Offline caching (previously in sw.js) ───────────────────────────────────
// Bump the version whenever the app shell changes so stale caches are cleared.
const CACHE_VERSION = "founders-reserve-v2";

const APP_SHELL = [
  "/",
  "/login",
  "/members",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Network-first fetch with cache fallback for static assets.
// OneSignal's imported SW does not add a fetch handler, so there is no conflict.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // Always go to network for Supabase and Next.js internals
  if (url.hostname.includes("supabase.co")) return;
  if (url.hostname.includes("onesignal.com")) return;
  if (url.pathname.startsWith("/_next/webpack-hmr")) return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (
          networkResponse.ok &&
          (url.pathname.startsWith("/_next/static/") ||
            url.pathname.startsWith("/icons/") ||
            url.pathname.match(/\.(png|jpg|jpeg|webp|svg|woff2?)$/))
        ) {
          const clone = networkResponse.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, clone));
        }
        return networkResponse;
      })
      .catch(() =>
        caches.match(event.request).then(
          (cached) =>
            cached ||
            (event.request.mode === "navigate"
              ? caches.match("/")
              : new Response("Offline", { status: 503 }))
        )
      )
  );
});
