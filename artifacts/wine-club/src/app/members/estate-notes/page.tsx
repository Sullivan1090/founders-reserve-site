import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export const revalidate = 60;

export default async function EstateNotesPage() {
  const supabase = await createClient();

  const { data: notes } = await supabase
    .from("estate_notes")
    .select("id, title, slug, cover_image_url, author_name, published_at")
    .eq("is_published", true)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false });

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
      {!notes || notes.length === 0 ? (
        <p className="font-serif text-lg" style={{ color: "rgba(237,234,226,0.4)" }}>
          No notes published yet. Check back soon.
        </p>
      ) : (
        <div className="flex flex-col divide-y" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          {notes.map((note) => (
            <Link
              key={note.id}
              href={`/members/estate-notes/${note.slug}`}
              className="group flex items-start gap-6 py-8 hover:opacity-80 transition-opacity"
            >
              {/* Cover image thumbnail */}
              {note.cover_image_url && (
                <div className="shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border" style={{ borderColor: "rgba(156,122,61,0.2)" }}>
                  <Image
                    src={note.cover_image_url}
                    alt={note.title}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="flex-1 min-w-0">
                {note.published_at && (
                  <p className="text-xs uppercase tracking-widest mb-2 font-semibold" style={{ color: "#9C7A3D" }}>
                    {new Date(note.published_at).toLocaleDateString("en-US", {
                      month: "long", day: "numeric", year: "numeric",
                    })}
                    {note.author_name && (
                      <span style={{ color: "rgba(237,234,226,0.35)" }}>
                        {" "}&mdash;{" "}{note.author_name}
                      </span>
                    )}
                  </p>
                )}
                <h2 className="font-serif text-2xl md:text-3xl leading-tight" style={{ color: "#EDEAE2" }}>
                  {note.title}
                </h2>
              </div>

              <ChevronRight
                className="w-5 h-5 shrink-0 mt-2 group-hover:translate-x-1 transition-transform"
                style={{ color: "#9C7A3D" }}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
