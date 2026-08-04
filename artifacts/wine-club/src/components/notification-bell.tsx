"use client";
/**
 * Bell button shown in the members header.
 * - Visible only when notification permission is "default" (not yet asked).
 * - Hidden once permission is granted or denied.
 * - Calls OneSignal.Slidedown.promptPush() so the configured slide-in
 *   prompt appears (rather than the raw browser dialog).
 */

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

type PermState = "default" | "granted" | "denied" | "unsupported";

export function NotificationBell() {
  const [perm, setPerm] = useState<PermState>("granted"); // hidden until we know

  useEffect(() => {
    if (typeof Notification === "undefined") {
      setPerm("unsupported");
      return;
    }
    setPerm(Notification.permission as PermState);

    // Keep in sync if the user changes permission externally
    if ("permissions" in navigator) {
      navigator.permissions.query({ name: "notifications" }).then((status) => {
        status.onchange = () => {
          setPerm(status.state === "prompt" ? "default" : status.state as PermState);
        };
      }).catch(() => {});
    }
  }, []);

  async function handleClick() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (w.OneSignalDeferred) {
      w.OneSignalDeferred.push(async function(OneSignal: any) {
        await OneSignal.Slidedown.promptPush({ force: true });
        // After the prompt resolves, update our state
        setPerm(Notification.permission as PermState);
      });
    } else {
      // Fallback: native browser dialog
      const result = await Notification.requestPermission();
      setPerm(result as PermState);
    }
  }

  // Only show the button when permission hasn't been decided yet
  if (perm !== "default") return null;

  return (
    <button
      onClick={handleClick}
      title="Enable push notifications"
      aria-label="Enable push notifications"
      className="flex items-center justify-center w-9 h-9 rounded-md transition-colors hover:bg-primary/10 relative"
    >
      <Bell className="w-4 h-4 text-primary" />
      {/* Subtle dot to draw attention */}
      <span
        className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
        style={{ background: "#C49A35" }}
      />
    </button>
  );
}
