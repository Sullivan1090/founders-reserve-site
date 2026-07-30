"use client";

import { useState } from "react";

/* ── tab definitions ─────────────────────────────────────── */
const SITES = [
  {
    id: "galleron",
    shortLabel: "Galleron Rd",
    sublabel: "Rutherford",
    fullTitle: "The Sullivan Rutherford Estate at Galleron Rd, Rutherford",
    content: <GalleronContent />,
  },
  {
    id: "crystal-springs",
    shortLabel: "Crystal Springs Rd",
    sublabel: "St. Helena",
    fullTitle: "The Sullivan Rutherford Estate at Crystal Springs Road, St. Helena",
    content: <ComingSoon />,
  },
  {
    id: "soda-canyon",
    shortLabel: "Soda Canyon",
    sublabel: "Napa Valley",
    fullTitle: "The Sullivan Rutherford Estate at Soda Canyon, Napa Valley",
    content: <ComingSoon />,
  },
] as const;

/* ── page ────────────────────────────────────────────────── */
export default function VineyardPage() {
  const [active, setActive] = useState<string>("galleron");
  const site = SITES.find((s) => s.id === active)!;

  return (
    <div className="container mx-auto px-6 py-12 md:py-16 max-w-4xl">

      {/* Section header */}
      <div className="mb-8">
        <p
          className="uppercase tracking-widest mb-2"
          style={{ color: "#8B6726", fontSize: "0.7rem", fontWeight: 600 }}
        >
          Vineyard
        </p>
        <h1
          className="font-serif leading-snug"
          style={{ color: "#1B3448", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 400 }}
        >
          {site.fullTitle}
        </h1>
      </div>

      {/* Tab row */}
      <div
        className="flex gap-0 mb-10 overflow-x-auto"
        style={{ borderBottom: "1px solid rgba(139,103,38,0.2)" }}
      >
        {SITES.map((s) => {
          const isActive = s.id === active;
          return (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className="flex flex-col items-start px-5 py-3 transition-colors shrink-0"
              style={{
                borderBottom: isActive ? "2px solid #8B6726" : "2px solid transparent",
                marginBottom: "-1px",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              <span
                className="font-serif text-sm leading-tight"
                style={{ color: isActive ? "#1B3448" : "#6E6960", fontWeight: isActive ? 600 : 400 }}
              >
                {s.shortLabel}
              </span>
              <span
                className="text-xs tracking-wide"
                style={{ color: isActive ? "#8B6726" : "#9E9990" }}
              >
                {s.sublabel}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active tab content */}
      {site.content}

    </div>
  );
}

/* ── Galleron Rd content ─────────────────────────────────── */
function GalleronContent() {
  return (
    <div>
      {/* Gold rule */}
      <div style={{ width: "3rem", height: "2px", background: "#8B6726", marginBottom: "2rem" }} />

      {/* Description */}
      <div className="space-y-5 mb-10" style={{ maxWidth: "72ch" }}>
        <p className="font-serif leading-relaxed" style={{ color: "#6E6960", fontSize: "1.1rem" }}>
          The Sullivan Rutherford Estate was shaped over millions of years as runoff from Spring
          Mountain and the surrounding hills carried gravel, sand, and sediment onto the valley
          floor. Over time, these deposits created deep, well-drained gravelly sandy loam soils
          that sit slightly elevated above the surrounding landscape, allowing excess water to move
          freely through the profile while naturally limiting vine vigor.
        </p>
        <p className="font-serif leading-relaxed" style={{ color: "#6E6960", fontSize: "1.1rem" }}>
          That natural restraint is the foundation of the vineyard's character. Lower yields and
          smaller berries produce fruit with exceptional concentration, while the combination of
          warm valley-floor afternoons and cool evening breezes preserves freshness, structure, and
          aromatic precision. The result is a site that consistently delivers wines of remarkable
          depth without sacrificing energy or balance.
        </p>
        <p className="font-serif leading-relaxed" style={{ color: "#6E6960", fontSize: "1.1rem" }}>
          The wines are unmistakably Rutherford, defined by layered dark fruit, savory earth,
          mineral tension, and finely structured tannins. Powerful yet refined, they are an
          authentic expression of a place where geology, climate, and time come together to produce
          wines with unmistakable identity and lasting ageability.
        </p>
      </div>

      {/* Block map */}
      <div>
        <p
          className="uppercase tracking-widest mb-4"
          style={{ color: "#8B6726", fontSize: "0.7rem", fontWeight: 600 }}
        >
          Vineyard Block Map
        </p>
        <div
          className="rounded-xl overflow-hidden border"
          style={{ borderColor: "rgba(139,103,38,0.25)" }}
        >
          <img
            src="/vineyard-block-map.jpg"
            alt="Sullivan Vineyard aerial block map showing blocks A1 through L at 1090 Galleron Rd, Rutherford"
            className="w-full h-auto block"
          />
        </div>
      </div>
    </div>
  );
}

/* ── Coming soon placeholder ─────────────────────────────── */
function ComingSoon() {
  return (
    <div className="py-16 flex flex-col items-start" style={{ maxWidth: "72ch" }}>
      <div style={{ width: "3rem", height: "2px", background: "#8B6726", marginBottom: "2rem" }} />
      <p
        className="font-serif leading-relaxed"
        style={{ color: "#6E6960", fontSize: "1.1rem" }}
      >
        Content for this site is being prepared. Check back soon.
      </p>
    </div>
  );
}
