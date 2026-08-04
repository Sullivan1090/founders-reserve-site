/**
 * Injects the OneSignal SDK and deferred init into every page.
 * Intentionally a Server Component — Script tags must be registered
 * through Next.js's server-side script manager (strategy="afterInteractive"
 * inside a "use client" component is not handled correctly by Next.js).
 */
import Script from "next/script";

const APP_ID = "bc482883-f864-4867-854d-ff69fed75295";

export function OneSignalInit() {
  return (
    <>
      <Script
        src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
        strategy="afterInteractive"
      />
      <Script id="onesignal-init" strategy="afterInteractive">{`
        window.OneSignalDeferred = window.OneSignalDeferred || [];
        OneSignalDeferred.push(async function(OneSignal) {
          await OneSignal.init({
            appId: "${APP_ID}",
            serviceWorkerPath: "/OneSignalSDKWorker.js",
          });
          // Fire the slide-in prompt automatically if permission hasn't been
          // decided yet. Delayed 4 s so the page is settled before it appears.
          if (typeof Notification !== "undefined" && Notification.permission === "default") {
            setTimeout(function() {
              OneSignal.Slidedown.promptPush();
            }, 4000);
          }
        });
      `}</Script>
    </>
  );
}
