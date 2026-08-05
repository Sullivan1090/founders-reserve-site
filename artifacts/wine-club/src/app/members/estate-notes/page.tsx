import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export const revalidate = 60;

export default async function EstateNotesPage() {
  const supabase = await createClient();

  // Fetch oldest-first so we can assign sequential numbers (001, 002, ...)
  const { data: notes } = await supabase
    .from("estate_notes")
    .select("id, title, slug, published_at")
    .eq("is_published", true)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: true });

  // Assign sequential numbers, then reverse for newest-first display
  const numbered = (notes ?? []).map((note, i) => ({
    ...note,
    number: String(i + 1).padStart(3, "0"),
  })).reverse();

  return (
    <div className="container mx-auto px-6 py-12 md:py-16 max-w-4xl">

      {/* Header */}
      <div className="mb-14 max-w-2xl">
        <p className="text-xs uppercase tracking-widest mb-3 font-semibold" style={{ color: "#9C7A3D" }}>
          The Estate
        </p>
        <h1 className="text-4xl md:text-5xl font-serif mb-6" style={{ color: "#EDEAE2" }}>
          Notes from the Estate
        </h1>
        <div className="space-y-4 font-serif text-lg leading-relaxed" style={{ color: "rgba(237,234,226,0.7)" }}>
          <p>
            Life at Sullivan Rutherford Estate extends far beyond the bottle.
          </p>
          <p>
            This journal offers a behind-the-scenes look at the vineyard, the winery, and the people
            who make the estate what it is. From seasonal vineyard updates and harvest to new releases,
            construction progress, special events, and everyday moments, each entry captures another
            chapter in the ongoing story of Sullivan Rutherford Estate.
          </p>
          <p style={{ color: "rgba(237,234,226,0.5)", fontStyle: "italic" }}>
            Because every great vintage begins long before it&apos;s poured.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-b mb-10" style={{ borderColor: "rgba(156,122,61,0.25)" }} />

      {/* Notes list */}
      {numbered.length === 0 ? (
        <p className="font-serif text-lg" style={{ color: "rgba(237,234,226,0.4)" }}>
          No notes published yet. Check back soon.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {numbered.map((note) => (
            <Link
              key={note.id}
              href={`/members/estate-notes/${note.slug}`}
              className="group flex items-center justify-between gap-6 rounded-xl px-6 py-5 transition-all hover:opacity-80"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(156,122,61,0.2)",
              }}
            >
              <div className="flex items-baseline gap-5 min-w-0">
                {/* Note number */}
                <span
                  className="shrink-0 font-serif text-sm tracking-widest"
                  style={{ color: "#9C7A3D" }}
                >
                  No.&nbsp;{note.number}
                </span>

                {/* Divider */}
                <span className="shrink-0 w-px h-4 self-center" style={{ background: "rgba(156,122,61,0.3)" }} />

                {/* Date */}
                {note.published_at && (
                  <span
                    className="shrink-0 text-xs uppercase tracking-widest font-medium hidden sm:block"
                    style={{ color: "rgba(237,234,226,0.4)" }}
                  >
                    {new Date(note.published_at).toLocaleDateString("en-US", {
                      month: "long", day: "numeric", year: "numeric",
                    })}
                  </span>
                )}

                {/* Title */}
                <h2
                  className="font-serif text-xl md:text-2xl leading-tight truncate"
                  style={{ color: "#EDEAE2" }}
                >
                  {note.title}
                </h2>
              </div>

              {/* Arrow */}
              <span
                className="shrink-0 text-lg transition-transform group-hover:translate-x-1"
                style={{ color: "#9C7A3D" }}
              >
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
