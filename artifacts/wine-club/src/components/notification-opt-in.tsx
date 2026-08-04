"use client";
/**
 * Permanent notification opt-in card shown on the members home page.
 * Unlike the timed banner, this is always visible until permission is granted.
 *
 * Platform behaviour:
 *  - iOS Safari (non-standalone): push not supported — shows "install the app first" instructions
 *  - iOS standalone (PWA) / Android / Desktop: shows "Enable Notifications" button
 *  - After permission granted: hides itself
 */

import { useEffect, useState } from "react";
import { Bell, BellOff, CheckCircle2 } from "lucide-react";

type Status =
  | "loading"       // SSR / not yet checked
  | "granted"       // already subscribed — hide
  | "denied"        // user blocked notifications in browser settings
  | "ios-browser"   // iOS Safari, not installed as PWA — can't prompt
  | "ready";        // can prompt

function detect(): Status {
  if (typeof window === "undefined") return "loading";
  if (!("Notification" in window))  return "denied"; // unsupported (treat as blocked)

  const ua         = navigator.userAgent;
  const isIos      = /iphone|ipad|ipod/i.test(ua);
  const standalone = window.matchMedia("(display-mode: standalone)").matches
                  || (navigator as any).standalone === true;

  if (Notification.permission === "granted") return "granted";
  if (Notification.permission === "denied")  return "denied";
  if (isIos && !standalone)                  return "ios-browser";
  return "ready";
}

export function NotificationOptIn() {
  const [status, setStatus]   = useState<Status>("loading");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setStatus(detect());
  }, []);

  // Hide when loading or already subscribed (with a brief success flash)
  if (status === "loading" || status === "granted") return null;

  async function enable() {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      // Tell OneSignal to register the subscription
      try {
        const OneSignal = (window as any).OneSignal;
        if (OneSignal?.User?.PushSubscription?.optIn) {
          await OneSignal.User.PushSubscription.optIn();
        }
      } catch {
        // Service worker picks it up automatically — non-fatal
      }
      setSuccess(true);
      setTimeout(() => setStatus("granted"), 2000);
    } else {
      setStatus("denied");
    }
  }

  // ── Granted flash ───────────────────────────────────────────────────────
  if (success) {
    return (
      <div
        className="rounded-xl px-5 py-4 flex items-center gap-3"
        style={{ background: "rgba(139,103,38,0.1)", border: "1px solid rgba(139,103,38,0.3)" }}
      >
        <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: "#C49A35" }} />
        <p className="text-sm font-medium" style={{ color: "#EDEAE2" }}>
          Notifications enabled — you'll hear from us when something new arrives.
        </p>
      </div>
    );
  }

  // ── iOS Safari (not installed) ──────────────────────────────────────────
  if (status === "ios-browser") {
    return (
      <div
        className="rounded-xl px-5 py-4 space-y-2"
        style={{ background: "rgba(139,103,38,0.07)", border: "1px solid rgba(139,103,38,0.25)" }}
      >
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 shrink-0" style={{ color: "#C49A35" }} />
          <p className="text-sm font-semibold" style={{ color: "#EDEAE2" }}>
            Enable push notifications
          </p>
        </div>
        <p className="text-xs leading-relaxed" style={{ color: "rgba(237,234,226,0.6)" }}>
          On iPhone, notifications require the app to be installed first.
          Tap <strong style={{ color: "#C49A35" }}>Add to Home Screen</strong> using
          the Share icon at the bottom of Safari, then reopen the app from your home screen — you'll be prompted automatically.
        </p>
      </div>
    );
  }

  // ── Blocked in browser settings ─────────────────────────────────────────
  if (status === "denied") {
    return (
      <div
        className="rounded-xl px-5 py-4 flex items-start gap-3"
        style={{ background: "rgba(139,103,38,0.07)", border: "1px solid rgba(139,103,38,0.25)" }}
      >
        <BellOff className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "rgba(237,234,226,0.4)" }} />
        <p className="text-xs leading-relaxed" style={{ color: "rgba(237,234,226,0.5)" }}>
          Notifications are blocked for this site. To enable them, open your browser
          settings, find this site under Notifications, and set it to Allow.
        </p>
      </div>
    );
  }

  // ── Ready to prompt ─────────────────────────────────────────────────────
  return (
    <div
      className="rounded-xl px-5 py-4 flex items-center gap-4"
      style={{ background: "rgba(139,103,38,0.07)", border: "1px solid rgba(139,103,38,0.25)" }}
    >
      <Bell className="w-5 h-5 shrink-0" style={{ color: "#C49A35" }} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold leading-tight" style={{ color: "#EDEAE2" }}>
          Stay in the loop
        </p>
        <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "rgba(237,234,226,0.6)" }}>
          Get notified the moment a new arrival, tasting note, or update is posted.
        </p>
      </div>
      <button
        onClick={enable}
        className="shrink-0 text-sm font-semibold px-4 py-2 rounded-full transition-opacity hover:opacity-90"
        style={{ background: "#C49A35", color: "#1B3448" }}
      >
        Enable
      </button>
    </div>
  );
}
