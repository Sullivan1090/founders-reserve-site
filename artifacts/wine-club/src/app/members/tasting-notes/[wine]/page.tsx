import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getWine } from "../data";

export default async function WineVintagePage({
  params,
}: {
  params: Promise<{ wine: string }>;
}) {
  const { wine: slug } = await params;
  const wine = getWine(slug);
  if (!wine) notFound();

  return (
    <div className="container mx-auto px-6 py-12 md:py-16 max-w-4xl">

      {/* Back link */}
      <Link
        href="/members/tasting-notes"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-10"
      >
        <ChevronLeft className="w-4 h-4" />
        All Wines
      </Link>

      {/* Header */}
      <div className="mb-12">
        <p className="text-xs uppercase tracking-widest text-primary mb-2 font-semibold">
          Tasting Notes
        </p>
        <h1 className="font-serif text-foreground leading-snug mb-1"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
          {wine.name}
        </h1>
        <p className="text-muted-foreground text-sm mt-2">
          {wine.vintages.length} vintage{wine.vintages.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Gold rule */}
      <div className="w-12 h-0.5 bg-primary mb-10" />

      {/* Vintage grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {wine.vintages.map((year) => (
          <Link
            key={year}
            href={`/members/tasting-notes/${slug}/${year}`}
            className="group flex items-center justify-between rounded-lg border border-border/40 px-5 py-4 hover:border-primary/60 hover:bg-primary/5 transition-all"
          >
            <span className="font-serif text-2xl text-foreground group-hover:text-primary transition-colors">
              {year}
            </span>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
          </Link>
        ))}
      </div>

    </div>
  );
}
