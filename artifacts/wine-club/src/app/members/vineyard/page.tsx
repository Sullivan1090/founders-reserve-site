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

/* Gold accent */
const GOLD = "#8B6726";
/* Off-white — readable on the dark navy background */
const OFFWHITE = "#EDEAE2";
/* Muted warm grey — secondary text on dark bg */
const WARM_GREY = "#BDB8B0";

export default function VineyardPage() {
  const [active, setActive] = useState<string>("galleron");
  const site = SITES.find((s) => s.id === active)!;

  return (
    <div className="w-full px-6 py-12 md:py-16">

      {/* Header + tabs */}
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <p
            className="uppercase tracking-widest mb-2"
            style={{ color: GOLD, fontSize: "0.7rem", fontWeight: 600 }}
          >
            Vineyard
          </p>
          <h1
            className="font-serif leading-snug"
            style={{ color: OFFWHITE, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 400 }}
          >
            {site.fullTitle}
          </h1>
        </div>

        {/* Tab row */}
        <div
          className="flex gap-0 mb-10 overflow-x-auto"
          style={{ borderBottom: "2px solid rgba(237,234,226,0.15)" }}
        >
          {SITES.map((s) => {
            const isActive = s.id === active;
            return (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className="flex flex-col items-start px-5 py-3 transition-colors shrink-0"
                style={{
                  borderBottom: isActive ? `2px solid ${GOLD}` : "2px solid transparent",
                  marginBottom: "-2px",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                <span
                  className="font-serif text-sm leading-tight"
                  style={{
                    color: isActive ? OFFWHITE : WARM_GREY,
                    fontWeight: isActive ? 700 : 400,
                  }}
                >
                  {s.shortLabel}
                </span>
                <span
                  className="text-xs tracking-wide"
                  style={{ color: isActive ? GOLD : "rgba(237,234,226,0.45)" }}
                >
                  {s.sublabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      {site.content}

    </div>
  );
}

/* ── Galleron Rd ─────────────────────────────────────────── */
function GalleronContent() {
  return (
    <div>
      {/* Text block */}
      <div className="max-w-4xl mx-auto">
        <div style={{ width: "3rem", height: "2px", background: GOLD, marginBottom: "2rem" }} />

        <div className="space-y-6 mb-12" style={{ maxWidth: "70ch" }}>
          <p className="font-serif leading-relaxed" style={{ color: OFFWHITE, fontSize: "1.1rem" }}>
            The Sullivan Rutherford Estate was shaped over millions of years as runoff from Spring
            Mountain and the surrounding hills carried gravel, sand, and sediment onto the valley
            floor. Over time, these deposits created deep, well-drained gravelly sandy loam soils
            that sit slightly elevated above the surrounding landscape, allowing excess water to move
            freely through the profile while naturally limiting vine vigor.
          </p>
          <p className="font-serif leading-relaxed" style={{ color: OFFWHITE, fontSize: "1.1rem" }}>
            That natural restraint is the foundation of the vineyard's character. Lower yields and
            smaller berries produce fruit with exceptional concentration, while the combination of
            warm valley-floor afternoons and cool evening breezes preserves freshness, structure, and
            aromatic precision. The result is a site that consistently delivers wines of remarkable
            depth without sacrificing energy or balance.
          </p>
          <p className="font-serif leading-relaxed" style={{ color: OFFWHITE, fontSize: "1.1rem" }}>
            The wines are unmistakably Rutherford, defined by layered dark fruit, savory earth,
            mineral tension, and finely structured tannins. Powerful yet refined, they are an
            authentic expression of a place where geology, climate, and time come together to produce
            wines with unmistakable identity and lasting ageability.
          </p>
        </div>
      </div>

      {/* Block map — wider than text, explicit dimensions so nothing gets clipped */}
      <div className="max-w-5xl mx-auto">
        <p
          className="uppercase tracking-widest mb-4"
          style={{ color: GOLD, fontSize: "0.7rem", fontWeight: 600 }}
        >
          Vineyard Block Map
        </p>
        <div
          style={{
            borderRadius: "0.75rem",
            border: `1px solid rgba(139,103,38,0.35)`,
            overflow: "hidden",
            lineHeight: 0,
          }}
        >
          <img
            src="/vineyard-block-map.jpg"
            alt="Sullivan Vineyard aerial block map — blocks A1 through L at 1090 Galleron Rd, Rutherford"
            width={2550}
            height={1876}
            style={{ width: "100%", height: "auto", display: "block" }}
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
      <div style={{ width: "3rem", height: "2px", background: GOLD, marginBottom: "2rem" }} />
      <p className="font-serif leading-relaxed" style={{ color: OFFWHITE, fontSize: "1.1rem" }}>
        Content for this site is being prepared. Check back soon.
      </p>
    </div>
  );
}
