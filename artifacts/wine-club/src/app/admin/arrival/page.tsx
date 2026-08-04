import { createClient } from "@/lib/supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import Link from "next/link";
import { sendPushNotification } from "@/lib/onesignal";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "jeff@sullivanwine.com";

async function updateArrival(formData: FormData) {
  "use server";

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user?.email !== ADMIN_EMAIL) redirect("/members");

  const admin = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  await admin.from("featured_arrival").upsert({
    id:          1,
    wine_name:   (formData.get("wine_name") as string).trim(),
    vintage:     (formData.get("vintage") as string).trim(),
    youtube_id:  (formData.get("youtube_id") as string).trim(),
    description: (formData.get("description") as string).trim(),
    updated_at:  new Date().toISOString(),
  });

  // Send push notification if a message was provided
  const notifMsg = (formData.get("notification_message") as string | null) ?? "";
  if (notifMsg.trim()) {
    await sendPushNotification(notifMsg.trim());
  }

  redirect("/admin?saved=1");
}

export default async function AdminArrivalPage() {
  const supabase = await createClient();
  const { data: arrival } = await supabase
    .from("featured_arrival")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  const current = arrival ?? {
    wine_name: "",
    vintage: "",
    youtube_id: "",
    description: "",
  };

  return (
    <div className="space-y-8">
      <div>
        <Link href="/admin" className="text-xs text-muted-foreground hover:text-primary transition-colors">
          ← Dashboard
        </Link>
        <h1 className="font-serif text-3xl text-primary mt-3 mb-1">The Arrival</h1>
        <p className="text-muted-foreground text-sm">
          Update the featured wine shown to members on their home page.
          Changes go live immediately.
        </p>
      </div>

      <form action={updateArrival} className="space-y-6">
        <Field
          label="Wine Name"
          name="wine_name"
          defaultValue={current.wine_name}
          placeholder="2023 J.O. Sullivan Founder's Reserve Cabernet Sauvignon"
        />
        <Field
          label="Vintage"
          name="vintage"
          defaultValue={current.vintage}
          placeholder="2023"
        />
        <Field
          label="YouTube Video ID"
          name="youtube_id"
          defaultValue={current.youtube_id}
          placeholder="dQw4w9WgXcQ"
          hint="The part after ?v= in the YouTube URL. Leave blank to show a placeholder."
        />
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium" style={{ color: "#EDEAE2" }}>
            Description <span className="text-muted-foreground font-normal">(optional)</span>
          </label>
          <textarea
            name="description"
            defaultValue={current.description}
            rows={4}
            placeholder="A short description shown above the video..."
            className="w-full rounded-lg px-4 py-3 text-sm bg-background border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 resize-none"
          />
        </div>

        {/* ── Push notification ─────────────────────────────────────── */}
        <div
          className="rounded-xl p-5 space-y-3"
          style={{ background: "rgba(139,103,38,0.06)", border: "1px solid rgba(139,103,38,0.2)" }}
        >
          <div>
            <p className="text-xs uppercase tracking-widest font-semibold mb-0.5" style={{ color: "#8B6726" }}>
              Push Notification
            </p>
            <p className="text-xs text-muted-foreground">
              Optional — fill in to send an instant push notification to all subscribed members when you save.
              Leave blank to save quietly.
            </p>
          </div>
          <textarea
            name="notification_message"
            rows={2}
            placeholder="e.g. New arrival: the 2023 Cabernet is now live. Watch the video →"
            className="w-full rounded-lg px-4 py-3 text-sm bg-background border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 resize-none"
          />
        </div>

        <button
          type="submit"
          className="font-serif tracking-wide px-8 py-3 rounded-full transition-all hover:opacity-90"
          style={{
            background: "#8B6726",
            color:      "#EDEAE2",
            border:     "none",
            cursor:     "pointer",
            fontSize:   "0.95rem",
          }}
        >
          Save &amp; Publish
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  defaultValue,
  placeholder,
  hint,
}: {
  label: string;
  name: string;
  defaultValue: string;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium" style={{ color: "#EDEAE2" }}>
        {label}
      </label>
      <input
        type="text"
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full rounded-lg px-4 py-3 text-sm bg-background border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60"
      />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
