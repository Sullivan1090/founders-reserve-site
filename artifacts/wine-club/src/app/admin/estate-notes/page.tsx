import { createClient } from "@/lib/supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import Link from "next/link";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "jeff@sullivanwine.com";

export default async function AdminEstateNotesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user?.email !== ADMIN_EMAIL) redirect("/members");

  const admin = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: notes } = await admin
    .from("estate_notes")
    .select("id, title, author_name, is_published, published_at, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link href="/admin" className="text-xs text-muted-foreground hover:text-primary transition-colors">
            ← Dashboard
          </Link>
          <h1 className="font-serif text-3xl text-primary mt-3 mb-1">Notes from the Estate</h1>
          <p className="text-muted-foreground text-sm">
            Create and manage estate journal posts.
          </p>
        </div>
        <Link
          href="/admin/estate-notes/new"
          className="shrink-0 font-serif tracking-wide px-6 py-2.5 rounded-full transition-all hover:opacity-90 text-sm"
          style={{ background: "#8B6726", color: "#EDEAE2" }}
        >
          New Post
        </Link>
      </div>

      {!notes || notes.length === 0 ? (
        <div
          className="rounded-xl p-8 text-center"
          style={{ background: "rgba(139,103,38,0.06)", border: "1px solid rgba(139,103,38,0.2)" }}
        >
          <p className="font-serif text-xl text-foreground mb-2">No posts yet</p>
          <p className="text-muted-foreground text-sm">
            Create your first estate note using the button above.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {notes.map((note) => (
            <Link
              key={note.id}
              href={`/admin/estate-notes/${note.id}`}
              className="flex items-center justify-between gap-4 rounded-xl px-6 py-5 transition-all hover:opacity-90"
              style={{ background: "rgba(139,103,38,0.08)", border: "1px solid rgba(139,103,38,0.25)" }}
            >
              <div className="min-w-0">
                <p className="font-serif text-lg text-foreground truncate">{note.title}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {note.author_name ? `By ${note.author_name} · ` : ""}
                  {note.is_published && note.published_at
                    ? `Published ${new Date(note.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`
                    : "Draft"}
                </p>
              </div>
              <span
                className="shrink-0 text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wide"
                style={
                  note.is_published
                    ? { background: "rgba(156,122,61,0.2)", color: "#C49A35" }
                    : { background: "rgba(110,105,96,0.2)", color: "#6E6960" }
                }
              >
                {note.is_published ? "Live" : "Draft"}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
