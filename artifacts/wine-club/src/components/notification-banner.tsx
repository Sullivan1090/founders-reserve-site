"use client";
/**
 * Prominent opt-in banner for push notifications.
 * Shows at the bottom of the screen after the member has been on the page
 * for a few seconds. Much more visible than a header icon.
 *
 * Rules:
 * - Only shows when Notification.permission === "default" (not yet asked)
 * - Hidden on iOS Safari in non-standalone mode (iOS requires PWA install first)
 * - Dismissed state stored in localStorage ("notif-banner-dismissed")
 * - Disappears immediately after opt-in or dismissal
 */

import { useEffect, useState } from "react";
import { X, Bell } from "lucide-react";

function isIosNonStandalone(): boolean {
  if (typeof navigator === "undefined" || typeof window === "undefined") return false;
  const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as any).standalone === true;
  return isIos && !isStandalone;
}

function notificationsSupported(): boolean {
  return typeof window !== "undefined" && "Notification" in window;
}

export function NotificationBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Server / unsupported environments
    if (!notificationsSupported()) return;
    // Already decided
    if (Notification.permission !== "default") return;
    // iOS Safari without PWA — browser won't allow push
    if (isIosNonStandalone()) return;
    // User previously dismissed
    if (localStorage.getItem("notif-banner-dismissed") === "1") return;

    // Show after 6 s — let the page settle and let the user engage first
    const t = setTimeout(() => setShow(true), 6000);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  function dismiss() {
    setShow(false);
    localStorage.setItem("notif-banner-dismissed", "1");
  }

  async function enable() {
    // Use OneSignal's slide-down if loaded, native dialog as fallback
    const w = window as any;
    if (w.OneSignalDeferred) {
      w.OneSignalDeferred.push(async (OneSignal: any) => {
        try {
          await OneSignal.Slidedown.promptPush({ force: true });
        } catch {
          await Notification.requestPermission();
        }
        setShow(false);
        localStorage.setItem("notif-banner-dismissed", "1");
      });
    } else {
      await Notification.requestPermission();
      setShow(false);
      localStorage.setItem("notif-banner-dismissed", "1");
    }
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[55] px-4 py-4 md:px-6 shadow-2xl"
      style={{
        background: "#1B3448",
        borderTop:  "1px solid rgba(196,154,53,0.45)",
      }}
    >
      <div className="flex items-start gap-3 max-w-2xl mx-auto">
        {/* Icon */}
        <div
          className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center mt-0.5"
          style={{ background: "rgba(196,154,53,0.15)", border: "1px solid rgba(196,154,53,0.35)" }}
        >
          <Bell className="w-5 h-5" style={{ color: "#C49A35" }} />
        </div>

        {/* Copy */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold leading-tight" style={{ color: "#EDEAE2" }}>
            Stay in the loop
          </p>
          <p className="text-xs mt-1 leading-relaxed" style={{ color: "rgba(237,234,226,0.65)" }}>
            Get notified the moment a new wine arrival, tasting note, or member
            update is posted — straight to your phone.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={enable}
              className="text-sm font-semibold px-5 py-2 rounded-full transition-opacity hover:opacity-90 shrink-0"
              style={{ background: "#C49A35", color: "#1B3448" }}
            >
              Enable Notifications
            </button>
            <button
              onClick={dismiss}
              className="text-xs px-3 py-2 rounded-full transition-colors hover:bg-white/10 shrink-0"
              style={{ color: "rgba(237,234,226,0.45)" }}
            >
              Not now
            </button>
          </div>
        </div>

        {/* Close */}
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="shrink-0 p-1 mt-0.5 opacity-35 hover:opacity-70 transition-opacity"
        >
          <X className="w-4 h-4" style={{ color: "#EDEAE2" }} />
        </button>
      </div>
    </div>
  );
}
