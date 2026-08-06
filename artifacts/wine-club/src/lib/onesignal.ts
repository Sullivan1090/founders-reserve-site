/**
 * Server-side OneSignal utility.
 * ONESIGNAL_REST_API_KEY must be set in Replit Secrets / Vercel env vars.
 * App ID is public — safe to hardcode per OneSignal's own guidance.
 */

const ONESIGNAL_APP_ID = "bc482883-f864-4867-854d-ff69fed75295";
const ONESIGNAL_API    = "https://onesignal.com/api/v1/notifications";

export async function sendPushNotification(message: string): Promise<void> {
  const apiKey = process.env.ONESIGNAL_REST_API_KEY;

  if (!apiKey) {
    console.warn("[OneSignal] ONESIGNAL_REST_API_KEY not configured — skipping push notification.");
    return;
  }

  if (!message.trim()) return;

  try {
    const res = await fetch(ONESIGNAL_API, {
      method:  "POST",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": `Key ${apiKey}`,
      },
      body: JSON.stringify({
        app_id:            ONESIGNAL_APP_ID,
        included_segments: ["All"],
        contents:          { en: message.trim() },
        name:              "Founder's Reserve Admin Push",
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("[OneSignal] Push notification failed:", res.status, body);
    } else {
      const data = await res.json();
      console.log("[OneSignal] Push sent. Notification ID:", data.id);
    }
  } catch (err) {
    console.error("[OneSignal] Error sending push notification:", err);
  }
}
