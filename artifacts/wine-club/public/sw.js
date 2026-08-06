// Founder's Reserve — Service Worker
// Caches the app shell for offline use; ready for push notification wiring.

const CACHE_VERSION = "founders-reserve-v1";

const APP_SHELL = [
  "/",
  "/login",
  "/members",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/apple-touch-icon.png",
];

// ─── Install ──────────────────────────────────────────────────────────────────
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

// ─── Activate ─────────────────────────────────────────────────────────────────
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k !== CACHE_VERSION)
            .map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

// ─── Fetch — network-first with cache fallback ────────────────────────────────
self.addEventListener("fetch", (event) => {
  // Only handle GET requests for same-origin or our own assets
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // Skip Supabase API calls — always go to network
  if (url.hostname.includes("supabase.co")) return;

  // Skip Next.js HMR / internal routes
  if (url.pathname.startsWith("/_next/webpack-hmr")) return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Cache successful responses for static assets
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
        // Network failed — try the cache
        caches.match(event.request).then(
          (cached) =>
            cached ||
            // Ultimate fallback for navigation requests
            (event.request.mode === "navigate"
              ? caches.match("/")
              : new Response("Offline", { status: 503 }))
        )
      )
  );
});

// ─── Push notifications (stub — ready for wiring) ─────────────────────────────
self.addEventListener("push", (event) => {
  if (!event.data) return;
  const data = event.data.json();
  event.waitUntil(
    self.registration.showNotification(data.title || "Founder's Reserve", {
      body:  data.body  || "",
      icon:  data.icon  || "/icons/icon-192.png",
      badge: data.badge || "/icons/icon-192.png",
      data:  data.url   || "/members",
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data || "/members")
  );
});
