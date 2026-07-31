import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { existsSync } from "fs";
import { join } from "path";
import { getWine } from "../../data";
import { getTastingNote } from "../../notes";
import { VintageAudioPlayer } from "@/components/vintage-audio-player";

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

  const content  = getTastingNote(slug, year);

  const audioFile  = `/audio/${slug}/${year}.mp3`;
  const audioLocal = join(process.cwd(), "public", "audio", slug, `${year}.mp3`);
  const hasAudio   = existsSync(audioLocal);

  const detailRows = content?.details
    ? [
        { label: "Blend",              value: content.details.blend },
        { label: "Oak",                value: content.details.oak },
        { label: "TA",                 value: content.details.ta },
        { label: "pH",                 value: content.details.ph },
        { label: "Alcohol",            value: content.details.alcohol },
        { label: "Cases",              value: content.details.cases },
        { label: "Vineyard",           value: content.details.vineyard },
        { label: "Clones",             value: content.details.clones },
        { label: "Vineyard Manager",   value: content.details.vineyardManager },
      ].filter((r) => r.value)
    : [];

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

      {/* Audio player */}
      <div className="mb-10">
        <VintageAudioPlayer
          src={audioFile}
          label="Vintage Summary"
          available={hasAudio}
        />
      </div>

      {/* Tasting note */}
      <div className="space-y-6 mb-14">
        {content?.notes ? (
          <p className="font-serif text-foreground text-lg leading-relaxed">
            {content.notes}
          </p>
        ) : (
          <p className="font-serif text-muted-foreground text-lg leading-relaxed italic">
            Tasting note coming soon.
          </p>
        )}
      </div>

      {/* Technical details */}
      {detailRows.length > 0 && (
        <div className="mb-14">
          <h2
            className="font-serif text-foreground mb-6"
            style={{ fontSize: "1.25rem", fontWeight: 400, letterSpacing: "0.01em" }}
          >
            Technical Details
          </h2>
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid rgba(139,103,38,0.25)" }}
          >
            {detailRows.map((row, i) => (
              <div
                key={row.label}
                className="flex gap-6 px-5 py-3.5"
                style={{
                  background: i % 2 === 0 ? "rgba(139,103,38,0.06)" : "transparent",
                  borderBottom:
                    i < detailRows.length - 1
                      ? "1px solid rgba(139,103,38,0.12)"
                      : "none",
                }}
              >
                <span
                  className="text-sm shrink-0 w-36"
                  style={{ color: "#C49A35", fontFamily: "inherit" }}
                >
                  {row.label}
                </span>
                <span className="text-sm text-foreground">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Back navigation */}
      <div className="mt-4 pt-8 border-t border-border/40">
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
