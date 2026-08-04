"use client";
import { useEffect, useState } from "react";
import { X, Share, Plus } from "lucide-react";

type Platform = "android" | "ios" | "other";

function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "other";
  const ua = navigator.userAgent;
  if (/iphone|ipad|ipod/i.test(ua)) return "ios";
  if (/android/i.test(ua)) return "android";
  return "other";
}

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as any).standalone === true
  );
}

export function PwaInstallBanner() {
  const [platform, setPlatform]           = useState<Platform>("other");
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner]       = useState(false);
  const [showIosSheet, setShowIosSheet]   = useState(false);
  const [installed, setInstalled]         = useState(false);

  useEffect(() => {
    // Already running as installed app — never show
    if (isStandalone()) { setInstalled(true); return; }
    // User dismissed before — don't nag
    if (localStorage.getItem("pwa-banner-dismissed") === "1") return;

    const plat = detectPlatform();
    setPlatform(plat);

    if (plat === "android") {
      const handler = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e);
        setShowBanner(true);
      };
      window.addEventListener("beforeinstallprompt", handler as EventListener);
      return () => window.removeEventListener("beforeinstallprompt", handler as EventListener);
    }

    if (plat === "ios") {
      // iOS Safari never fires beforeinstallprompt — show our own prompt
      setShowBanner(true);
    }
  }, []);

  if (installed || !showBanner) return null;

  const dismiss = () => {
    setShowBanner(false);
    setShowIosSheet(false);
    localStorage.setItem("pwa-banner-dismissed", "1");
  };

  const handleAndroidInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowBanner(false);
      setInstalled(true);
    }
    setDeferredPrompt(null);
  };

  return (
    <>
      {/* ── Banner strip ─────────────────────────────────────────────── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 flex items-center gap-3 px-4 py-4 md:px-6 shadow-xl"
        style={{
          background: "#1B3448",
          borderTop:  "1px solid rgba(196,154,53,0.35)",
        }}
      >
        {/* Icon */}
        <img
          src="/icons/icon-192.png"
          alt=""
          className="w-11 h-11 rounded-xl shrink-0"
        />

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold leading-tight" style={{ color: "#EDEAE2" }}>
            Add to your home screen
          </p>
          <p className="text-xs leading-tight mt-0.5" style={{ color: "rgba(237,234,226,0.55)" }}>
            Open Founders Reserve like an app — no browser bar
          </p>
        </div>

        {/* CTA */}
        {platform === "android" ? (
          <button
            onClick={handleAndroidInstall}
            className="shrink-0 text-sm font-semibold px-4 py-2 rounded-full transition-opacity hover:opacity-90"
            style={{ background: "#C49A35", color: "#1B3448" }}
          >
            Install
          </button>
        ) : (
          <button
            onClick={() => setShowIosSheet(true)}
            className="shrink-0 text-sm font-semibold px-4 py-2 rounded-full transition-opacity hover:opacity-90"
            style={{ background: "#C49A35", color: "#1B3448" }}
          >
            How to
          </button>
        )}

        {/* Dismiss */}
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="shrink-0 p-1 opacity-40 hover:opacity-70 transition-opacity"
        >
          <X className="w-4 h-4" style={{ color: "#EDEAE2" }} />
        </button>
      </div>

      {/* ── iOS instruction sheet ─────────────────────────────────────── */}
      {showIosSheet && (
        <div
          className="fixed inset-0 z-[60] flex items-end"
          style={{ background: "rgba(0,0,0,0.55)" }}
          onClick={() => setShowIosSheet(false)}
        >
          <div
            className="w-full rounded-t-2xl px-6 pt-6 pb-10 space-y-5"
            style={{ background: "#1B3448", border: "1px solid rgba(196,154,53,0.25)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle */}
            <div className="w-10 h-1 rounded-full mx-auto mb-4" style={{ background: "rgba(196,154,53,0.35)" }} />

            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl" style={{ color: "#C49A35" }}>
                Add to Home Screen
              </h2>
              <button onClick={() => setShowIosSheet(false)} className="opacity-50 hover:opacity-80">
                <X className="w-5 h-5" style={{ color: "#EDEAE2" }} />
              </button>
            </div>

            <p className="text-sm leading-relaxed" style={{ color: "rgba(237,234,226,0.7)" }}>
              Install Founders Reserve on your iPhone in three taps:
            </p>

            {/* Step 1 */}
            <div className="flex items-start gap-4">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: "rgba(196,154,53,0.15)", border: "1px solid rgba(196,154,53,0.35)" }}
              >
                <span className="text-xs font-bold" style={{ color: "#C49A35" }}>1</span>
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "#EDEAE2" }}>
                  Tap the Share button
                </p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(237,234,226,0.55)" }}>
                  The <Share className="inline w-3.5 h-3.5 mb-0.5" /> icon at the bottom of Safari (the box with an arrow pointing up)
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: "rgba(196,154,53,0.15)", border: "1px solid rgba(196,154,53,0.35)" }}
              >
                <span className="text-xs font-bold" style={{ color: "#C49A35" }}>2</span>
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "#EDEAE2" }}>
                  Scroll down and tap "Add to Home Screen"
                </p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(237,234,226,0.55)" }}>
                  You'll see <Plus className="inline w-3.5 h-3.5 mb-0.5" /> Add to Home Screen in the share menu
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: "rgba(196,154,53,0.15)", border: "1px solid rgba(196,154,53,0.35)" }}
              >
                <span className="text-xs font-bold" style={{ color: "#C49A35" }}>3</span>
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "#EDEAE2" }}>
                  Tap "Add" to confirm
                </p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(237,234,226,0.55)" }}>
                  Founders Reserve will appear on your home screen and open full-screen
                </p>
              </div>
            </div>

            <button
              onClick={dismiss}
              className="w-full py-3 rounded-full text-sm font-semibold mt-2 transition-opacity hover:opacity-90"
              style={{ background: "#C49A35", color: "#1B3448" }}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
