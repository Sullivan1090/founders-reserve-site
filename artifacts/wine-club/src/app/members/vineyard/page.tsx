"use client";

import { useState } from "react";

const GOLD     = "#8B6726";
const OFFWHITE = "#EDEAE2";
const WARM_GREY = "#BDB8B0";

const SITES = [
  {
    id: "galleron",
    shortLabel: "Galleron Rd",
    sublabel: "Rutherford",
    fullTitle: "Sullivan Rutherford Estate at Galleron Road, Rutherford — Gravel and Sand",
  },
  {
    id: "crystal-springs",
    shortLabel: "Crystal Springs Rd",
    sublabel: "St. Helena",
    fullTitle: "Sullivan Rutherford Estate at Crystal Springs Road, St. Helena",
  },
  {
    id: "soda-canyon",
    shortLabel: "Soda Canyon",
    sublabel: "Napa Valley",
    fullTitle: "Sullivan Rutherford Estate at Soda Canyon, Napa Valley",
  },
] as const;

export default function VineyardPage() {
  const [active, setActive] = useState<(typeof SITES)[number]["id"]>("galleron");
  const site = SITES.find((s) => s.id === active)!;

  return (
    <div className="w-full px-6 py-12 md:py-16">

      {/* Header + tabs */}
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <p className="uppercase tracking-widest mb-2"
            style={{ color: GOLD, fontSize: "0.7rem", fontWeight: 600 }}>
            Vineyard
          </p>
          <h1 className="font-serif leading-snug"
            style={{ color: OFFWHITE, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 400 }}>
            {site.fullTitle}
          </h1>
        </div>

        <div className="flex gap-0 mb-10 overflow-x-auto"
          style={{ borderBottom: "2px solid rgba(237,234,226,0.15)" }}>
          {SITES.map((s) => {
            const isActive = s.id === active;
            return (
              <button key={s.id} onClick={() => setActive(s.id)}
                className="flex flex-col items-start px-5 py-3 transition-colors shrink-0"
                style={{
                  borderBottom: isActive ? `2px solid ${GOLD}` : "2px solid transparent",
                  marginBottom: "-2px",
                  background: "transparent",
                  cursor: "pointer",
                }}>
                <span className="font-serif text-sm leading-tight"
                  style={{ color: isActive ? OFFWHITE : WARM_GREY, fontWeight: isActive ? 700 : 400 }}>
                  {s.shortLabel}
                </span>
                <span className="text-xs tracking-wide"
                  style={{ color: isActive ? GOLD : "rgba(237,234,226,0.45)" }}>
                  {s.sublabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      {active === "galleron"      && <GalleronContent />}
      {active === "crystal-springs" && <ComingSoon />}
      {active === "soda-canyon"   && <ComingSoon />}

    </div>
  );
}

/* ── Galleron Rd ─────────────────────────────────────────── */
function GalleronContent() {
  return (
    <div>
      <div className="max-w-4xl mx-auto">
        <div style={{ width: "3rem", height: "2px", background: GOLD, marginBottom: "2rem" }} />

        <div className="space-y-6 mb-12" style={{ maxWidth: "70ch" }}>
          {[
            `The Sullivan Rutherford Estate was shaped over millions of years as runoff from Spring
Mountain and the surrounding hills carried gravel, sand, and sediment onto the valley
floor. Over time, these deposits created deep, well-drained gravelly sandy loam soils
that sit slightly elevated above the surrounding landscape, allowing excess water to move
freely through the profile while naturally limiting vine vigor.`,
            `That natural restraint is the foundation of the vineyard's character. Lower yields and
smaller berries produce fruit with exceptional concentration, while the combination of
warm valley-floor afternoons and cool evening breezes preserves freshness, structure, and
aromatic precision. The result is a site that consistently delivers wines of remarkable
depth without sacrificing energy or balance.`,
            `The wines are unmistakably Rutherford, defined by layered dark fruit, savory earth,
mineral tension, and finely structured tannins. Powerful yet refined, they are an
authentic expression of a place where geology, climate, and time come together to produce
wines with unmistakable identity and lasting ageability.`,
          ].map((para, i) => (
            <p key={i} className="font-serif leading-relaxed"
              style={{ color: OFFWHITE, fontSize: "1.1rem" }}>
              {para.replace(/\n/g, " ")}
            </p>
          ))}
        </div>
      </div>

      {/* Block map
          Constrained to 62 vh so the full image fits on-screen without scrolling.
          width: auto lets the browser derive width from the height, keeping aspect ratio.
          The outer div just centers it and adds the gold border.                        */}
      <div className="max-w-5xl mx-auto">
        <p className="uppercase tracking-widest mb-4"
          style={{ color: GOLD, fontSize: "0.7rem", fontWeight: 600 }}>
          Vineyard Block Map
        </p>

        <div style={{ textAlign: "center" }}>
          <img
            src="/vineyard-block-map.jpg"
            alt="Sullivan Vineyard aerial block map — blocks A1 through L at 1090 Galleron Rd, Rutherford"
            style={{
              display: "inline-block",
              /* Never taller than 62% of the viewport — full map always visible */
              maxHeight: "62vh",
              /* Never wider than the container */
              maxWidth: "100%",
              /* Let the browser compute the correct width from the height */
              width: "auto",
              height: "auto",
              borderRadius: "0.75rem",
              border: `1px solid rgba(139,103,38,0.35)`,
            }}
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
