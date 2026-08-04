"use client";
import { useEffect } from "react";

/**
 * Registers the service worker on mount. Rendered once in the root layout.
 * Silently no-ops on browsers that don't support service workers.
 */
export function PwaRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .then((reg) => {
          console.log("[PWA] Service worker registered:", reg.scope);
        })
        .catch((err) => {
          console.warn("[PWA] Service worker registration failed:", err);
        });
    });
  }, []);

  return null;
}
