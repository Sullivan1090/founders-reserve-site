import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getWine } from "../../data";

export default async function TastingNotePage({
  params,
}: {
  params: Promise<{ wine: string; year: string }>;
}) {
  const { wine: slug, year: yearStr } = await params;
  const wine = getWine(slug);
  if (!wine) notFound();

  const year = Number(yearStr);
  if (!wine.vintages.includes(year as never)) notFound();

  return (
    <div className="container mx-auto px-6 py-12 md:py-16 max-w-3xl">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-10">
        <Link href="/members/tasting-notes" className="hover:text-primary transition-colors">
          Tasting Notes
        </Link>
        <ChevronLeft className="w-3.5 h-3.5 rotate-180" />
        <Link
          href={`/members/tasting-notes/${slug}`}
          className="hover:text-primary transition-colors"
        >
          {wine.shortName}
        </Link>
        <ChevronLeft className="w-3.5 h-3.5 rotate-180" />
        <span className="text-foreground">{year}</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-primary mb-3 font-semibold">
          {year} Vintage
        </p>
        <h1
          className="font-serif text-foreground leading-snug"
          style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 400 }}
        >
          {wine.name}
        </h1>
      </div>

      {/* Gold rule */}
      <div className="w-12 h-0.5 bg-primary mb-10" />

      {/*
        ── TASTING NOTE CONTENT ──────────────────────────────────────
        Replace this placeholder with the actual tasting note text.
        Use <p> tags for paragraphs, styled with the classes below.
        ─────────────────────────────────────────────────────────────
      */}
      <div className="space-y-6">
        <p className="font-serif text-muted-foreground text-lg leading-relaxed italic">
          Tasting note coming soon.
        </p>
      </div>

      {/* Back navigation */}
      <div className="mt-16 pt-8 border-t border-border/40">
        <Link
          href={`/members/tasting-notes/${slug}`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to {wine.shortName} vintages
        </Link>
      </div>

    </div>
  );
}
