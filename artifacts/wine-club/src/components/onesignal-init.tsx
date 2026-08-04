"use client";
/**
 * Injects the OneSignal SDK and deferred init into the page.
 * Rendered once in the root layout. The OneSignalDeferred queue
 * means the init code safely runs after the SDK loads regardless of order.
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
        });
      `}</Script>
    </>
  );
}
