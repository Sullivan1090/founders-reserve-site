import { createClient } from "@/lib/supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { redirect, notFound } from "next/navigation";
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

export default async function EditEstateNotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user?.email !== ADMIN_EMAIL) redirect("/members");

  const admin = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: note } = await admin
    .from("estate_notes")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!note) notFound();

  async function updateNote(formData: FormData) {
    "use server";

    const supabase2 = await createClient();
    const { data: { user: u } } = await supabase2.auth.getUser();
    if (u?.email !== ADMIN_EMAIL) redirect("/members");

    const admin2 = createServiceClient(
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

    // Only set published_at when first publishing
    const wasPublished = note.is_published;
    const publishedAt = isPublished
      ? wasPublished
        ? note.published_at
        : new Date().toISOString()
      : null;

    await admin2
      .from("estate_notes")
      .update({
        title,
        slug,
        body,
        author_name:          authorName,
        cover_image_url:      coverUrl,
        is_published:         isPublished,
        published_at:         publishedAt,
        notification_message: notifMsg || null,
      })
      .eq("id", id);

    // Fire notification only when newly publishing with a message
    if (isPublished && !wasPublished && notifMsg) {
      await sendPushNotification(notifMsg);
    }

    redirect("/admin/estate-notes");
  }

  async function deleteNote() {
    "use server";

    const supabase3 = await createClient();
    const { data: { user: u } } = await supabase3.auth.getUser();
    if (u?.email !== ADMIN_EMAIL) redirect("/members");

    const admin3 = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    await admin3.from("estate_notes").delete().eq("id", id);
    redirect("/admin/estate-notes");
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link href="/admin/estate-notes" className="text-xs text-muted-foreground hover:text-primary transition-colors">
            ← Estate Notes
          </Link>
          <h1 className="font-serif text-3xl text-primary mt-3 mb-1">Edit Post</h1>
          <p className="text-muted-foreground text-sm">
            {note.is_published ? "This post is live." : "This post is a draft."}
          </p>
        </div>

        {/* Delete */}
        <form action={deleteNote}>
          <button
            type="submit"
            className="text-xs font-medium px-4 py-2 rounded-full transition-all hover:opacity-80"
            style={{ background: "rgba(200,60,60,0.12)", color: "rgba(220,80,80,0.9)", border: "1px solid rgba(200,60,60,0.2)" }}
            onClick={(e) => {
              if (!confirm("Delete this post? This cannot be undone.")) e.preventDefault();
            }}
          >
            Delete
          </button>
        </form>
      </div>

      <NoteForm
        action={updateNote}
        defaults={{
          title:                note.title,
          slug:                 note.slug,
          body:                 note.body,
          author_name:          note.author_name ?? "",
          cover_image_url:      note.cover_image_url ?? "",
          is_published:         note.is_published,
          notification_message: note.notification_message ?? "",
        }}
      />
    </div>
  );
}
