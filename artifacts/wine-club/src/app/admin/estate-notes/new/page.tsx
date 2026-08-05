import { createClient } from "@/lib/supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import Link from "next/link";
import { sendPushNotification } from "@/lib/onesignal";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "jeff@sullivanwine.com";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
    .slice(0, 80);
}

async function createNote(formData: FormData) {
  "use server";

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user?.email !== ADMIN_EMAIL) redirect("/members");

  const admin = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const title       = (formData.get("title")       as string).trim();
  const rawSlug     = (formData.get("slug")         as string).trim();
  const slug        = rawSlug || slugify(title);
  const body        = (formData.get("body")         as string).trim();
  const authorName  = (formData.get("author_name")  as string).trim() || null;
  const coverUrl    = (formData.get("cover_image_url") as string).trim() || null;
  const isPublished = formData.get("is_published") === "on";
  const notifMsg    = (formData.get("notification_message") as string).trim();

  const { data: note, error } = await admin
    .from("estate_notes")
    .insert({
      title,
      slug,
      body,
      author_name:      authorName,
      cover_image_url:  coverUrl,
      is_published:     isPublished,
      published_at:     isPublished ? new Date().toISOString() : null,
      notification_message: notifMsg || null,
    })
    .select("id")
    .single();

  if (error) {
    console.error("Error creating note:", error.message);
    redirect("/admin/estate-notes?error=1");
  }

  if (isPublished && notifMsg) {
    await sendPushNotification(notifMsg);
  }

  redirect("/admin/estate-notes");
}

export default async function NewEstateNotePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user?.email !== ADMIN_EMAIL) redirect("/members");

  return (
    <div className="space-y-8">
      <div>
        <Link href="/admin/estate-notes" className="text-xs text-muted-foreground hover:text-primary transition-colors">
          ← Estate Notes
        </Link>
        <h1 className="font-serif text-3xl text-primary mt-3 mb-1">New Post</h1>
        <p className="text-muted-foreground text-sm">
          Write a new estate journal entry. Toggle &quot;Publish&quot; to make it live for members.
        </p>
      </div>

      <NoteForm action={createNote} />
    </div>
  );
}

export function NoteForm({
  action,
  defaults,
}: {
  action: (formData: FormData) => Promise<void>;
  defaults?: {
    title?: string;
    slug?: string;
    body?: string;
    author_name?: string;
    cover_image_url?: string;
    is_published?: boolean;
    notification_message?: string;
  };
}) {
  return (
    <form action={action} className="space-y-6">
      <Field
        label="Title"
        name="title"
        defaultValue={defaults?.title ?? ""}
        placeholder="Harvest begins on the estate..."
        required
      />
      <Field
        label="Slug"
        name="slug"
        defaultValue={defaults?.slug ?? ""}
        placeholder="harvest-begins (auto-generated from title if left blank)"
        hint="URL-safe identifier. Leave blank to auto-generate from title."
      />
      <Field
        label="Author Name"
        name="author_name"
        defaultValue={defaults?.author_name ?? ""}
        placeholder="Jeff Sullivan"
        hint="Optional. Shown beneath the post title."
      />
      <Field
        label="Cover Image URL"
        name="cover_image_url"
        defaultValue={defaults?.cover_image_url ?? ""}
        placeholder="https://..."
        hint="Optional. Paste a direct image URL."
      />

      {/* Body */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium" style={{ color: "#EDEAE2" }}>
          Body <span className="text-muted-foreground font-normal">(required)</span>
        </label>
        <textarea
          name="body"
          defaultValue={defaults?.body ?? ""}
          rows={16}
          required
          placeholder="Write your estate note here. Line breaks are preserved exactly as written."
          className="w-full rounded-lg px-4 py-3 text-sm bg-background border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 resize-y font-serif"
        />
        <p className="text-xs text-muted-foreground">
          Plain text only. Line breaks are preserved when displayed to members.
        </p>
      </div>

      {/* Publish toggle */}
      <div
        className="rounded-xl p-5 flex items-center justify-between gap-4"
        style={{ background: "rgba(139,103,38,0.06)", border: "1px solid rgba(139,103,38,0.2)" }}
      >
        <div>
          <p className="text-xs uppercase tracking-widest font-semibold mb-0.5" style={{ color: "#8B6726" }}>
            Publish
          </p>
          <p className="text-xs text-muted-foreground">
            Toggle on to make this post immediately visible to members.
          </p>
        </div>
        <input
          type="checkbox"
          name="is_published"
          defaultChecked={defaults?.is_published ?? false}
          className="w-5 h-5 accent-amber-600 cursor-pointer"
        />
      </div>

      {/* Push notification */}
      <div
        className="rounded-xl p-5 space-y-3"
        style={{ background: "rgba(139,103,38,0.06)", border: "1px solid rgba(139,103,38,0.2)" }}
      >
        <div>
          <p className="text-xs uppercase tracking-widest font-semibold mb-0.5" style={{ color: "#8B6726" }}>
            Push Notification
          </p>
          <p className="text-xs text-muted-foreground">
            Optional. Fill in to notify all subscribed members when you publish. Leave blank to publish quietly.
          </p>
        </div>
        <textarea
          name="notification_message"
          defaultValue={defaults?.notification_message ?? ""}
          rows={2}
          placeholder="e.g. New from the estate: harvest has begun. Read the latest note."
          className="w-full rounded-lg px-4 py-3 text-sm bg-background border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 resize-none"
        />
      </div>

      <button
        type="submit"
        className="font-serif tracking-wide px-8 py-3 rounded-full transition-all hover:opacity-90"
        style={{ background: "#8B6726", color: "#EDEAE2", border: "none", cursor: "pointer", fontSize: "0.95rem" }}
      >
        Save
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  placeholder,
  hint,
  required,
}: {
  label: string;
  name: string;
  defaultValue: string;
  placeholder?: string;
  hint?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium" style={{ color: "#EDEAE2" }}>
        {label}
        {!required && <span className="text-muted-foreground font-normal"> (optional)</span>}
      </label>
      <input
        type="text"
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg px-4 py-3 text-sm bg-background border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60"
      />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
