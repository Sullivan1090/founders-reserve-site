import { createClient } from "@/lib/supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import Link from "next/link";
import { sendPushNotification } from "@/lib/onesignal";
import { NoteForm } from "../NoteForm";

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

