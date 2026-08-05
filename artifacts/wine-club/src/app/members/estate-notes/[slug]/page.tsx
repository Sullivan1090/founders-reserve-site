import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { NoteResponseForm } from "@/components/note-response-form";

export const revalidate = 60;

export default async function EstateNoteDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: note } = await supabase
    .from("estate_notes")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .lte("published_at", new Date().toISOString())
    .maybeSingle();

  if (!note) notFound();

  return (
    <div className="container mx-auto px-6 py-12 md:py-16 max-w-3xl">

      {/* Back link */}
      <Link
        href="/members/estate-notes"
        className="text-xs uppercase tracking-widest font-semibold transition-opacity hover:opacity-70 inline-flex items-center gap-2 mb-10"
        style={{ color: "#9C7A3D" }}
      >
        <span style={{ fontSize: "0.7rem" }}>&#8592;</span> Notes from the Estate
      </Link>

      {/* Cover image */}
      {note.cover_image_url && (
        <div className="w-full rounded-xl overflow-hidden mb-10 border" style={{ borderColor: "rgba(156,122,61,0.2)" }}>
          <Image
            src={note.cover_image_url}
            alt={note.title}
            width={900}
            height={500}
            className="w-full object-cover"
            style={{ maxHeight: "420px" }}
          />
        </div>
      )}

      {/* Meta */}
      <div className="mb-8">
        {note.published_at && (
          <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "#9C7A3D" }}>
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
        <h1 className="font-serif text-4xl md:text-5xl leading-tight" style={{ color: "#EDEAE2" }}>
          {note.title}
        </h1>
      </div>

      {/* Divider */}
      <div className="border-b mb-10" style={{ borderColor: "rgba(156,122,61,0.2)" }} />

      {/* Body */}
      <div
        className="font-serif text-lg leading-relaxed whitespace-pre-wrap mb-20"
        style={{ color: "rgba(237,234,226,0.8)" }}
      >
        {note.body}
      </div>

      {/* Divider */}
      <div className="border-b mb-12" style={{ borderColor: "rgba(156,122,61,0.2)" }} />

      {/* Response form */}
      <div className="space-y-8">
        <div>
          <h2 className="font-serif text-3xl mb-4" style={{ color: "#EDEAE2" }}>
            Share Your Thoughts
          </h2>
          <div className="space-y-4 text-base leading-relaxed" style={{ color: "rgba(237,234,226,0.6)" }}>
            <p>
              Founder&apos;s Reserve is built around conversation.
            </p>
            <p>
              If something sparks your curiosity, inspires a question, or you&apos;d simply like to
              share a thought, leave a note below. Every message is delivered directly to Sullivan
              Rutherford Estate and reviewed personally.
            </p>
            <p>
              Whether it&apos;s a question about a wine, a comment on an Estate Note, a suggestion
              for a future live session, or simply a story you&apos;d like to share, we&apos;d love
              to hear from you.
            </p>
            <p className="text-sm" style={{ color: "rgba(237,234,226,0.35)", fontStyle: "italic" }}>
              Your message is completely private and will never be displayed publicly.
            </p>
          </div>
        </div>

        <NoteResponseForm noteTitle={note.title} />
      </div>
    </div>
  );
}
