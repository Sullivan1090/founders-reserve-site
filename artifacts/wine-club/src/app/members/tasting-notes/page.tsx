import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { WINES } from "./data";

export default function TastingNotesPage() {
  return (
    <div className="container mx-auto px-6 py-12 md:py-16 max-w-4xl">

      {/* Header */}
      <div className="mb-12">
        <p className="text-xs uppercase tracking-widest text-primary mb-2 font-semibold">
          The Vault
        </p>
        <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
          Tasting Notes
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
          Detailed notes for every vintage in the Founder's Reserve library.
          Select a wine to explore by year.
        </p>
      </div>

      {/* Wine list */}
      <div className="flex flex-col divide-y divide-border/40">
        {WINES.map((wine, i) => (
          <Link
            key={wine.slug}
            href={`/members/tasting-notes/${wine.slug}`}
            className="group flex items-center justify-between py-7 hover:opacity-80 transition-opacity"
          >
            <div className="flex items-baseline gap-5">
              {/* Index number */}
              <span className="text-xs font-semibold uppercase tracking-widest text-primary w-6 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                  J.O. Sullivan Founder's Reserve
                </p>
                <h2 className="font-serif text-2xl md:text-3xl text-foreground leading-tight">
                  {wine.shortName}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {wine.vintages.length} vintage{(wine.vintages.length as number) !== 1 ? "s" : ""}
                  {" — "}
                  {wine.vintages[wine.vintages.length - 1]}
                  {" to "}
                  {wine.vintages[0]}
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-primary shrink-0 group-hover:translate-x-1 transition-transform" />
          </Link>
        ))}
      </div>

    </div>
  );
}
