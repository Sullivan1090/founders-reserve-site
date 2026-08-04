"use client";
import { useEffect } from "react";

/**
 * Registers OneSignalSDKWorker.js as the single service worker for this app.
 * It handles both OneSignal push notifications AND offline caching —
 * previously we had two workers (sw.js + OneSignalSDKWorker.js) competing
 * for the same scope, which prevented OneSignal from ever activating.
 */
export function PwaRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/OneSignalSDKWorker.js", { scope: "/" })
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
