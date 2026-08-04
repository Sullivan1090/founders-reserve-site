"use client";
/**
 * Loads the OneSignal SDK via dynamic script injection in useEffect.
 * This approach is 100% reliable on the client — no dependency on
 * Next.js Script component internals or SSR timing.
 */

import { useEffect } from "react";

const APP_ID            = "bc482883-f864-4867-854d-ff69fed75295";
const SDK_URL           = "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";
const SERVICE_WORKER    = "/OneSignalSDKWorker.js";

export function OneSignalInit() {
  useEffect(() => {
    const w = window as any;

    // Set up the deferred queue before the script loads so our push()
    // calls are replayed automatically once the SDK is ready.
    w.OneSignalDeferred = w.OneSignalDeferred || [];

    w.OneSignalDeferred.push(async function(OneSignal: any) {
      await OneSignal.init({
        appId:              APP_ID,
        serviceWorkerPath:  SERVICE_WORKER,
      });

      // If the user already granted permission (e.g. on a previous visit),
      // register the push subscription now so they appear as a subscriber.
      if (typeof Notification !== "undefined" && Notification.permission === "granted") {
        try {
          await OneSignal.User.PushSubscription.optIn();
        } catch (e) {
          console.warn("[OneSignal] optIn on init failed:", e);
        }
      }
    });

    // Inject the SDK script dynamically — always fires, no SSR timing issues.
    if (!document.querySelector(`script[src="${SDK_URL}"]`)) {
      const s    = document.createElement("script");
      s.src      = SDK_URL;
      s.async    = true;
      s.onerror  = () => console.error("[OneSignal] Failed to load SDK script.");
      document.head.appendChild(s);
    }
  }, []);

  return null;
}
