"use client";

import { useState } from "react";

const SITES = [
  {
    id: "galleron",
    shortLabel: "Galleron Rd",
    sublabel: "Rutherford",
    fullTitle: "Sullivan Rutherford Estate at Galleron Road, Rutherford — Gravel and Sand",
    content: <GalleronContent />,
  },
  {
    id: "crystal-springs",
    shortLabel: "Crystal Springs Rd",
    sublabel: "St. Helena",
    fullTitle: "Sullivan Rutherford Estate at Crystal Springs Road, St. Helena",
    content: <ComingSoon />,
  },
  {
    id: "soda-canyon",
    shortLabel: "Soda Canyon",
    sublabel: "Napa Valley",
    fullTitle: "Sullivan Rutherford Estate at Soda Canyon, Napa Valley",
    content: <ComingSoon />,
  },
] as const;

export default function VineyardPage() {
  const [active, setActive] = useState<string>("galleron");
  const site = SITES.find((s) => s.id === active)!;

  return (
    /* Outer wrapper — no max-width so the map can go full-bleed */
    <div className="w-full px-6 py-12 md:py-16">

      {/* Header + tabs constrained to readable width */}
      <div className="max-w-4xl mx-auto">

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
          style={{ borderBottom: "2px solid rgba(27,52,72,0.12)" }}
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
                  marginBottom: "-2px",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                <span
                  className="font-serif text-sm leading-tight"
                  style={{
                    color: isActive ? "#1B3448" : "#4A4540",
                    fontWeight: isActive ? 700 : 500,
                  }}
                >
                  {s.shortLabel}
                </span>
                <span
                  className="text-xs tracking-wide"
                  style={{ color: isActive ? "#8B6726" : "#6E6960" }}
                >
                  {s.sublabel}
                </span>
              </button>
            );
          })}
        </div>

      </div>{/* end header+tabs */}

      {/* Tab content — passes the max-width down per-section */}
      {site.content}

    </div>
  );
}

/* ── Galleron Rd ─────────────────────────────────────────── */
function GalleronContent() {
  return (
    <div>
      {/* Text block — capped at readable width */}
      <div className="max-w-4xl mx-auto">
        <div style={{ width: "3rem", height: "2px", background: "#8B6726", marginBottom: "2rem" }} />

        <div className="space-y-5 mb-10" style={{ maxWidth: "72ch" }}>
          <p
            className="font-serif leading-relaxed"
            style={{ color: "#1C1917", fontSize: "1.1rem" }}
          >
            The Sullivan Rutherford Estate was shaped over millions of years as runoff from Spring
            Mountain and the surrounding hills carried gravel, sand, and sediment onto the valley
            floor. Over time, these deposits created deep, well-drained gravelly sandy loam soils
            that sit slightly elevated above the surrounding landscape, allowing excess water to move
            freely through the profile while naturally limiting vine vigor.
          </p>
          <p
            className="font-serif leading-relaxed"
            style={{ color: "#1C1917", fontSize: "1.1rem" }}
          >
            That natural restraint is the foundation of the vineyard's character. Lower yields and
            smaller berries produce fruit with exceptional concentration, while the combination of
            warm valley-floor afternoons and cool evening breezes preserves freshness, structure, and
            aromatic precision. The result is a site that consistently delivers wines of remarkable
            depth without sacrificing energy or balance.
          </p>
          <p
            className="font-serif leading-relaxed"
            style={{ color: "#1C1917", fontSize: "1.1rem" }}
          >
            The wines are unmistakably Rutherford, defined by layered dark fruit, savory earth,
            mineral tension, and finely structured tannins. Powerful yet refined, they are an
            authentic expression of a place where geology, climate, and time come together to produce
            wines with unmistakable identity and lasting ageability.
          </p>
        </div>
      </div>

      {/* Block map — full available width, no max-width cap */}
      <div className="max-w-5xl mx-auto">
        <p
          className="uppercase tracking-widest mb-4"
          style={{ color: "#8B6726", fontSize: "0.7rem", fontWeight: 600 }}
        >
          Vineyard Block Map
        </p>
        <div
          className="rounded-xl border"
          style={{ borderColor: "rgba(139,103,38,0.25)", lineHeight: 0 }}
        >
          <img
            src="/vineyard-block-map.jpg"
            alt="Sullivan Vineyard aerial block map showing blocks A1 through L at 1090 Galleron Rd, Rutherford"
            style={{ width: "100%", height: "auto", display: "block", borderRadius: "0.75rem" }}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Coming soon ─────────────────────────────────────────── */
function ComingSoon() {
  return (
    <div className="max-w-4xl mx-auto py-16 flex flex-col items-start">
      <div style={{ width: "3rem", height: "2px", background: "#8B6726", marginBottom: "2rem" }} />
      <p
        className="font-serif leading-relaxed"
        style={{ color: "#1C1917", fontSize: "1.1rem" }}
      >
        Content for this site is being prepared. Check back soon.
      </p>
    </div>
  );
}
