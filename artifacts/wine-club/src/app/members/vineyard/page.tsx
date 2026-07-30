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
    fullTitle: "Sullivan Rutherford Estate at Crystal Springs Road, St. Helena — Iron and Glass",
  },
  {
    id: "soda-canyon",
    shortLabel: "Soda Canyon",
    sublabel: "Napa Valley",
    fullTitle: "Sullivan Rutherford Estate at Soda Canyon, Napa Valley — Ash and Tuff",
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
      {active === "crystal-springs" && <CrystalSpringsContent />}
      {active === "soda-canyon"   && <SodaCanyonContent />}

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

/* ── Crystal Springs Rd ──────────────────────────────────── */
function CrystalSpringsContent() {
  return (
    <div>
      <div className="max-w-4xl mx-auto">
        <div style={{ width: "3rem", height: "2px", background: GOLD, marginBottom: "2rem" }} />

        <div className="space-y-6 mb-12" style={{ maxWidth: "70ch" }}>
          <p className="font-serif leading-relaxed" style={{ color: OFFWHITE, fontSize: "1.1rem" }}>
            Tucked into the foothills between Howell Mountain and Glass Mountain, Crystal Springs
            Vineyard occupies a unique volcanic valley shaped by ancient geologic forces. Its deep
            red, iron-rich soils, scattered with obsidian formed from cooling lava, are exceptionally
            well drained, naturally limiting vine vigor and allowing the vines to produce fruit of
            remarkable concentration and character.
          </p>
          <p className="font-serif leading-relaxed" style={{ color: OFFWHITE, fontSize: "1.1rem" }}>
            Although St. Helena experiences some of Napa Valley's warmest daytime temperatures,
            Crystal Springs benefits from its distinctive position within this mountain corridor. As
            evening temperatures fall, cool air descends from the surrounding slopes and moves
            naturally through the valley, creating significant diurnal temperature shifts. This daily
            rhythm allows the fruit to achieve full ripeness while preserving freshness, natural
            acidity, and aromatic precision.
          </p>
          <p className="font-serif leading-relaxed" style={{ color: OFFWHITE, fontSize: "1.1rem" }}>
            The combination of volcanic soils, mountain influences, and a naturally moderated climate
            makes Crystal Springs unlike any other site in the valley. It is a vineyard defined by
            energy, structure, mineral expression, and a purity that can only come from this
            remarkable landscape.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <p className="uppercase tracking-widest mb-4"
          style={{ color: GOLD, fontSize: "0.7rem", fontWeight: 600 }}>
          Vineyard Block Map
        </p>
        <div style={{ textAlign: "center" }}>
          <img
            src="/crystal-springs-block-map.jpg"
            alt="Crystal Springs Vineyard aerial block map — blocks A through G at 391 Crystal Springs Rd, St. Helena"
            style={{
              display: "inline-block",
              maxHeight: "62vh",
              maxWidth: "100%",
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

/* ── Soda Canyon ─────────────────────────────────────────── */
function SodaCanyonContent() {
  return (
    <div>
      <div className="max-w-4xl mx-auto">
        <div style={{ width: "3rem", height: "2px", background: GOLD, marginBottom: "2rem" }} />

        <div className="space-y-6 mb-12" style={{ maxWidth: "70ch" }}>
          <p className="font-serif leading-relaxed" style={{ color: OFFWHITE, fontSize: "1.1rem" }}>
            Situated in the southeastern foothills of Napa Valley, just north of the Coombsville
            appellation, Soda Canyon Vineyard is shaped by an ancient volcanic landscape unlike any
            other in our portfolio. Its distinctive rhyolitic tuff soils — formed from compressed
            volcanic ash — are naturally low in fertility and exceptionally well drained, encouraging
            balanced vines, small yields, and fruit of remarkable concentration.
          </p>
          <p className="font-serif leading-relaxed" style={{ color: OFFWHITE, fontSize: "1.1rem" }}>
            The vineyard's location provides an ideal balance of warmth and freshness. Eastern
            exposure captures the morning sun, allowing the fruit to ripen fully, while its proximity
            to the southern end of Napa Valley welcomes cooling marine influences from San Pablo Bay.
            This combination of warm days, cool afternoons and evenings, and ash-derived soils creates
            a long, measured growing season that preserves natural acidity, structure, and aromatic
            purity.
          </p>
          <p className="font-serif leading-relaxed" style={{ color: OFFWHITE, fontSize: "1.1rem" }}>
            Soda Canyon is a vineyard defined by restraint rather than power. The unique interplay of
            volcanic ash soils, cooling coastal influences, and low-vigor vines produces wines with
            exceptional energy, focus, and elegance — an expression of place that is both distinctive
            and unmistakably Napa Valley.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <p className="uppercase tracking-widest mb-4"
          style={{ color: GOLD, fontSize: "0.7rem", fontWeight: 600 }}>
          Vineyard Block Map
        </p>
        <div style={{ textAlign: "center" }}>
          <img
            src="/soda-canyon-block-map.jpg"
            alt="Soda Canyon Vineyard aerial block map — blocks 1A, 1B, 2A–2D, 3A at 1156 Soda Canyon Rd, Napa"
            style={{
              display: "inline-block",
              maxHeight: "62vh",
              maxWidth: "100%",
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
