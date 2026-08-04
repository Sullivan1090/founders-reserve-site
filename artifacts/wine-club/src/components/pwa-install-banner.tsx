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

function isFirefox(): boolean {
  if (typeof navigator === "undefined") return false;
  return /firefox/i.test(navigator.userAgent);
}

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as any).standalone === true
  );
}

export function PwaInstallBanner() {
  const [platform, setPlatform]             = useState<Platform>("other");
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [show, setShow]                     = useState(false);
  const [showSheet, setShowSheet]           = useState(false);

  useEffect(() => {
    // Already running as an installed app — never show
    if (isStandalone()) return;
    // User previously dismissed — don't nag
    if (localStorage.getItem("pwa-banner-dismissed") === "1") return;

    const plat = detectPlatform();
    setPlatform(plat);

    // Show for iOS and Android immediately
    if (plat === "ios" || plat === "android") setShow(true);

    // Capture the native Android install prompt if Chrome fires it
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler as EventListener);

    // If the user installs from outside our button, hide the banner
    const onInstalled = () => setShow(false);
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler as EventListener);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (!show) return null;

  const dismiss = () => {
    setShow(false);
    setShowSheet(false);
    localStorage.setItem("pwa-banner-dismissed", "1");
  };

  const handleInstall = async () => {
    if (deferredPrompt) {
      // Native Chrome prompt is available — use it
      try {
        deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice?.outcome === "accepted") setShow(false);
      } catch {
        // Prompt failed or was already consumed — fall back to instructions
        setShowSheet(true);
      } finally {
        setDeferredPrompt(null);
      }
    } else {
      // No native prompt — show manual instructions
      setShowSheet(true);
    }
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
        <img
          src="/icons/icon-192.png"
          alt=""
          className="w-11 h-11 rounded-xl shrink-0"
        />

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold leading-tight" style={{ color: "#EDEAE2" }}>
            Add to your home screen
          </p>
          <p className="text-xs leading-tight mt-0.5" style={{ color: "rgba(237,234,226,0.55)" }}>
            Open Founders Reserve like an app — no browser bar
          </p>
        </div>

        <button
          onClick={platform === "ios" ? () => setShowSheet(true) : handleInstall}
          className="shrink-0 text-sm font-semibold px-4 py-2 rounded-full transition-opacity hover:opacity-90"
          style={{ background: "#C49A35", color: "#1B3448" }}
        >
          {platform === "ios" ? "How to" : "Install"}
        </button>

        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="shrink-0 p-1 opacity-40 hover:opacity-70 transition-opacity"
        >
          <X className="w-4 h-4" style={{ color: "#EDEAE2" }} />
        </button>
      </div>

      {/* ── Instruction sheet (iOS + Android fallback) ────────────────── */}
      {showSheet && (
        <div
          className="fixed inset-0 z-[60] flex items-end"
          style={{ background: "rgba(0,0,0,0.55)" }}
          onClick={() => setShowSheet(false)}
        >
          <div
            className="w-full rounded-t-2xl px-6 pt-6 pb-10 space-y-5"
            style={{ background: "#1B3448", border: "1px solid rgba(196,154,53,0.25)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full mx-auto mb-4" style={{ background: "rgba(196,154,53,0.35)" }} />

            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl" style={{ color: "#C49A35" }}>
                Add to Home Screen
              </h2>
              <button onClick={() => setShowSheet(false)} className="opacity-50 hover:opacity-80">
                <X className="w-5 h-5" style={{ color: "#EDEAE2" }} />
              </button>
            </div>

            {platform === "ios" ? (
              <>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(237,234,226,0.7)" }}>
                  Install Founders Reserve on your iPhone in three taps:
                </p>

                {[
                  {
                    n: "1",
                    title: "Tap the Share button",
                    body: (
                      <>The <Share className="inline w-3.5 h-3.5 mb-0.5" /> icon at the bottom of Safari — the box with an arrow pointing up</>
                    ),
                  },
                  {
                    n: "2",
                    title: 'Tap "Add to Home Screen"',
                    body: (
                      <><Plus className="inline w-3.5 h-3.5 mb-0.5" /> Add to Home Screen in the share menu</>
                    ),
                  },
                  {
                    n: "3",
                    title: 'Tap "Add" to confirm',
                    body: <>Founders Reserve will appear on your home screen and open full-screen</>,
                  },
                ].map(({ n, title, body }) => (
                  <div key={n} className="flex items-start gap-4">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: "rgba(196,154,53,0.15)", border: "1px solid rgba(196,154,53,0.35)" }}
                    >
                      <span className="text-xs font-bold" style={{ color: "#C49A35" }}>{n}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "#EDEAE2" }}>{title}</p>
                      <p className="text-xs mt-0.5" style={{ color: "rgba(237,234,226,0.55)" }}>{body}</p>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {isFirefox() ? (
                  <>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(237,234,226,0.7)" }}>
                      Firefox on Android doesn't support installing apps to your home screen.
                    </p>

                    {/* Chrome instruction */}
                    <div className="flex items-start gap-4">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: "rgba(196,154,53,0.15)", border: "1px solid rgba(196,154,53,0.35)" }}
                      >
                        <span className="text-xs font-bold" style={{ color: "#C49A35" }}>1</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: "#EDEAE2" }}>Open this page in Chrome</p>
                        <p className="text-xs mt-0.5" style={{ color: "rgba(237,234,226,0.55)" }}>
                          Copy the URL from Firefox and paste it into Chrome
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: "rgba(196,154,53,0.15)", border: "1px solid rgba(196,154,53,0.35)" }}
                      >
                        <span className="text-xs font-bold" style={{ color: "#C49A35" }}>2</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: "#EDEAE2" }}>Tap "Install" when the banner appears</p>
                        <p className="text-xs mt-0.5" style={{ color: "rgba(237,234,226,0.55)" }}>
                          Chrome will prompt you automatically — one tap and you're done
                        </p>
                      </div>
                    </div>

                    <div
                      className="rounded-xl px-4 py-3"
                      style={{ background: "rgba(196,154,53,0.1)", border: "1px solid rgba(196,154,53,0.25)" }}
                    >
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(237,234,226,0.65)" }}>
                        <span style={{ color: "#C49A35", fontWeight: 600 }}>Why Chrome?</span> Chrome is the only
                        Android browser that supports installing web apps directly to your home screen.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(237,234,226,0.7)" }}>
                      Install Founders Reserve on your Android in two steps:
                    </p>

                    {[
                      {
                        n: "1",
                        title: "Tap the ⋮ menu",
                        body: 'The three-dot menu in the top-right corner of your browser',
                      },
                      {
                        n: "2",
                        title: 'Tap "Add to Home Screen" or "Install app"',
                        body: 'Founders Reserve will appear on your home screen and open full-screen',
                      },
                    ].map(({ n, title, body }) => (
                      <div key={n} className="flex items-start gap-4">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: "rgba(196,154,53,0.15)", border: "1px solid rgba(196,154,53,0.35)" }}
                        >
                          <span className="text-xs font-bold" style={{ color: "#C49A35" }}>{n}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold" style={{ color: "#EDEAE2" }}>{title}</p>
                          <p className="text-xs mt-0.5" style={{ color: "rgba(237,234,226,0.55)" }}>{body}</p>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </>
            )}

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
