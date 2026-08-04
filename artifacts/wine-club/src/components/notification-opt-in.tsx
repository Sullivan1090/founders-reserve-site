"use client";
/**
 * Permanent notification opt-in card on the members home page.
 * Covers four cases:
 *  1. Permission "default"           → Enable button
 *  2. Permission "granted" but not   → "Activate" button (permission OK,
 *     yet registered in OneSignal       but OneSignal subscription missing)
 *  3. Permission "denied"            → Instructions to unblock in settings
 *  4. iOS Safari non-standalone      → Install PWA first instructions
 *  5. Fully subscribed               → Hidden
 */

import { useEffect, useState } from "react";
import { Bell, BellOff, CheckCircle2 } from "lucide-react";

type Status =
  | "loading"
  | "subscribed"        // permission granted + OneSignal subscription active → hide
  | "granted-unsynced"  // permission granted but OneSignal not subscribed yet
  | "ready"             // permission "default" — needs to be asked
  | "denied"
  | "ios-browser";

function isIosNonStandalone(): boolean {
  if (typeof window === "undefined") return false;
  const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const standalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as any).standalone === true;
  return isIos && !isStandalone;
}

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as any).standalone === true
  );
}

function baseDetect(): Status {
  if (typeof window === "undefined") return "loading";
  if (!("Notification" in window)) return "denied";

  const ua  = navigator.userAgent;
  const ios = /iphone|ipad|ipod/i.test(ua);
  if (ios && !isStandalone()) return "ios-browser";
  if (Notification.permission === "denied") return "denied";
  if (Notification.permission === "default") return "ready";
  return "loading"; // "granted" — need to check OneSignal (async)
}

export function NotificationOptIn() {
  const [status, setStatus]       = useState<Status>("loading");
  const [success, setSuccess]     = useState(false);
  const [activateError, setActivateError] = useState(false);

  useEffect(() => {
    const base = baseDetect();
    if (base !== "loading") {
      setStatus(base);
      return;
    }

    // Permission is "granted" — check if OneSignal actually has an active
    // subscription. Give the SDK up to 4 s to initialize.
    let cancelled = false;

    function checkOneSignal() {
      if (cancelled) return;
      const os = (window as any).OneSignal;
      if (os?.User?.PushSubscription?.optedIn === true) {
        setStatus("subscribed");
      } else {
        // SDK not ready or subscription missing — show the activate button
        setStatus("granted-unsynced");
      }
    }

    // First check after 1 s, then again at 4 s once the SDK has likely loaded
    const t1 = setTimeout(checkOneSignal, 1000);
    const t2 = setTimeout(checkOneSignal, 4000);

    return () => {
      cancelled = true;
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (status === "loading" || status === "subscribed") return null;

  // ── Success flash ─────────────────────────────────────────────────────────
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

  async function optInViaOneSignal() {
    const os = (window as any).OneSignal;
    if (os?.User?.PushSubscription?.optIn) {
      await os.User.PushSubscription.optIn();
    }
  }

  // ── Permission granted but OneSignal subscription missing ─────────────────
  if (status === "granted-unsynced") {
    async function activate() {
      setActivateError(false);
      try {
        // Race optIn() against a 6 s timeout so the button never hangs forever.
        const timeout = new Promise<void>((_, reject) =>
          setTimeout(() => reject(new Error("timeout")), 6000)
        );
        await Promise.race([optInViaOneSignal(), timeout]);
        setSuccess(true);
        setTimeout(() => setStatus("subscribed"), 2500);
      } catch (e: any) {
        if (e?.message === "timeout") {
          // optIn() hung — most likely a OneSignal dashboard misconfiguration
          setActivateError(true);
        } else {
          // Fallback: re-request native permission to re-trigger full push flow
          const result = await Notification.requestPermission();
          if (result === "granted") {
            await optInViaOneSignal().catch(() => {});
            setSuccess(true);
            setTimeout(() => setStatus("subscribed"), 2500);
          }
        }
      }
    }

    return (
      <div
        className="rounded-xl px-5 py-4 space-y-3"
        style={{ background: "rgba(139,103,38,0.07)", border: "1px solid rgba(139,103,38,0.25)" }}
      >
        <div className="flex items-center gap-4">
          <Bell className="w-5 h-5 shrink-0" style={{ color: "#C49A35" }} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold leading-tight" style={{ color: "#EDEAE2" }}>
              Finish setting up notifications
            </p>
            <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "rgba(237,234,226,0.6)" }}>
              Your browser has permission — tap below to activate delivery.
            </p>
          </div>
          <button
            onClick={activate}
            className="shrink-0 text-sm font-semibold px-4 py-2 rounded-full transition-opacity hover:opacity-90"
            style={{ background: "#C49A35", color: "#1B3448" }}
          >
            Activate
          </button>
        </div>
        {activateError && (
          <p className="text-xs leading-relaxed px-1" style={{ color: "rgba(237,234,226,0.5)" }}>
            ⚠ Could not register. If this keeps happening, check that your
            OneSignal dashboard Site URL matches your live domain exactly
            (Settings → Platforms → Chrome).
          </p>
        )}
      </div>
    );
  }

  // ── iOS Safari (not installed as PWA) ─────────────────────────────────────
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
          the Share icon in Safari, then reopen the app from your home screen.
        </p>
      </div>
    );
  }

  // ── Blocked ───────────────────────────────────────────────────────────────
  if (status === "denied") {
    return (
      <div
        className="rounded-xl px-5 py-4 flex items-start gap-3"
        style={{ background: "rgba(139,103,38,0.07)", border: "1px solid rgba(139,103,38,0.25)" }}
      >
        <BellOff className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "rgba(237,234,226,0.4)" }} />
        <p className="text-xs leading-relaxed" style={{ color: "rgba(237,234,226,0.5)" }}>
          Notifications are blocked for this site. To enable them, open Chrome →
          tap the lock icon next to the address bar → Notifications → Allow.
        </p>
      </div>
    );
  }

  // ── Ready (permission "default") ──────────────────────────────────────────
  async function enable() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      await optInViaOneSignal().catch(() => {});
      setSuccess(true);
      setTimeout(() => setStatus("subscribed"), 2500);
    } else {
      setStatus("denied");
    }
  }

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
