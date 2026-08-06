export default function GatheringsPage() {
  const GOLD      = "#C49A35";
  const GOLD_DARK = "#9C7A3D";
  const BLUE      = "#1B3448";
  const CREAM     = "#EDEAE2";

  const artists = [
    {
      name:  "Jeff Cole",
      title: "Winemaker",
      bio:   "For more than thirteen vintages, Jeff Cole has dedicated himself to understanding every nuance of Sullivan Rutherford Estate. His work is driven by a simple belief: when exceptional vineyards are farmed with intention and every decision in the cellar is made with purpose, the wines become authentic expressions of place. Today, that philosophy has become the foundation of Sullivan's Merlot Mastery program and continues to shape every bottle produced at the estate.",
    },
    {
      name:  "Rogelio Garcia",
      title: "James Beard Award-Winning Chef",
      bio:   "Chef Rogelio Garcia is one of Napa Valley's most celebrated culinary voices. His cuisine reflects both precision and restraint, drawing inspiration from the finest seasonal ingredients while honoring his Mexican heritage and the agricultural traditions of the Napa Valley. Each course has been thoughtfully created to complement the wines and celebrate the season of harvest.",
    },
    {
      name:  "Adán Paredes",
      title: "Maestro Ceramista",
      bio:   "Working from Oaxaca, Mexico, Adán Paredes has spent more than four decades exploring clay as a medium for artistic expression. His work draws inspiration from archaeology, light, texture, and the natural world, creating pieces that are both timeless and contemporary. Each handcrafted ceramic becomes part of the dining experience, bringing another layer of artistry to the table.",
    },
  ];

  return (
    <div
      className="flex flex-col items-center min-h-[calc(100vh-4rem)] px-6 py-16 relative"
      style={{ background: BLUE }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 10%, rgba(196,154,53,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-2xl w-full relative z-10 space-y-14">

        {/* ── Header ── */}
        <div className="text-center space-y-5 pt-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px" style={{ background: "rgba(196,154,53,0.35)" }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD_DARK }} />
            <div className="flex-1 h-px" style={{ background: "rgba(196,154,53,0.35)" }} />
          </div>

          <p
            className="font-serif tracking-widest uppercase text-xs"
            style={{ color: GOLD, letterSpacing: "0.25em" }}
          >
            Gatherings
          </p>

          <h1
            className="font-serif"
            style={{ color: CREAM, fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.15 }}
          >
            Harvest Celebration
          </h1>

          <p className="font-serif text-lg" style={{ color: GOLD_DARK }}>
            September 26, 2026
          </p>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-px" style={{ background: "rgba(196,154,53,0.35)" }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD_DARK }} />
            <div className="flex-1 h-px" style={{ background: "rgba(196,154,53,0.35)" }} />
          </div>
        </div>

        {/* ── Opening ── */}
        <div className="space-y-6">
          {[
            "Harvest is one of the most exciting times of the year at Sullivan Rutherford Estate. The vineyard is alive with anticipation, the winery begins its transformation, and another vintage starts to take shape.",
            "This annual celebration brings together three forms of artistry that share a common philosophy: a relentless pursuit of craftsmanship, authenticity, and excellence.",
            "Set beneath the backdrop of harvest in Rutherford, guests will gather around a communal table for an afternoon of exceptional wine, extraordinary cuisine, and meaningful conversation. Throughout the experience, each course, every wine, and every artistic expression has been thoughtfully curated to reflect the season and celebrate the creative process.",
            "More than a meal, this is an opportunity to experience the estate through the people whose work defines it.",
          ].map((para, i) => (
            <p
              key={i}
              className="font-serif leading-relaxed"
              style={{ color: CREAM, fontSize: "1.05rem" }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* ── The Experience ── */}
        <div className="space-y-6">
          <SectionHeader label="The Experience" gold={GOLD} />
          {[
            "The afternoon begins with a walk through Sullivan Rutherford Estate before guests gather for a four-course harvest lunch prepared by James Beard Award-winning and Michelin-starred Chef Rogelio Garcia.",
            "Each course is inspired by the ingredients of the season and thoughtfully paired with a selection of Sullivan wines, including an exclusive preview of an unreleased Family Reserve bottling available only to guests attending this celebration.",
            "Throughout the afternoon, guests will experience the work of internationally acclaimed ceramic artist Adán Paredes, whose handcrafted pieces provide the canvas for each course and reflect a lifelong dedication to craftsmanship and creative expression.",
            "Personally hosted by Winemaker Jeff Cole, the gathering offers a behind-the-scenes perspective on harvest, the philosophy behind the wines, and the continual pursuit of producing some of Napa Valley's most compelling expressions of Merlot and Cabernet Sauvignon.",
          ].map((para, i) => (
            <p
              key={i}
              className="font-serif leading-relaxed"
              style={{ color: CREAM, fontSize: "1.05rem" }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* ── The Artists ── */}
        <div className="space-y-10">
          <SectionHeader label="The Artists" gold={GOLD} />
          {artists.map((a) => (
            <div key={a.name} className="space-y-2 pl-5" style={{ borderLeft: `2px solid ${GOLD_DARK}` }}>
              <p className="font-serif text-lg" style={{ color: CREAM }}>{a.name}</p>
              <p
                className="font-serif tracking-widest uppercase text-xs"
                style={{ color: GOLD, letterSpacing: "0.18em" }}
              >
                {a.title}
              </p>
              <p className="font-serif leading-relaxed pt-1" style={{ color: CREAM, fontSize: "1rem", opacity: 0.85 }}>
                {a.bio}
              </p>
            </div>
          ))}
        </div>

        {/* ── Why We Gather ── */}
        <div className="space-y-6">
          <SectionHeader label="Why We Gather" gold={GOLD} />
          {[
            "Harvest reminds us that the most meaningful things are rarely created alone.",
            "Every bottle begins with the vineyard, but its story is shaped by countless hands along the way. The grower. The winemaker. The chef. The artist. The people who gather around the table.",
            "This celebration honors that shared pursuit of excellence and the belief that craftsmanship, creativity, and hospitality are at their very best when experienced together.",
          ].map((para, i) => (
            <p
              key={i}
              className="font-serif leading-relaxed"
              style={{
                color:     i === 0 ? GOLD_DARK : CREAM,
                fontStyle: i === 0 ? "italic" : "normal",
                fontSize:  i === 0 ? "1.15rem" : "1.05rem",
              }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* ── Event Details ── */}
        <div
          className="rounded-lg p-8 space-y-4"
          style={{ border: `1px solid rgba(196,154,53,0.3)`, background: "rgba(196,154,53,0.05)" }}
        >
          <p
            className="font-serif tracking-widest uppercase text-xs text-center"
            style={{ color: GOLD, letterSpacing: "0.22em" }}
          >
            Event Details
          </p>
          <div className="space-y-2 text-center font-serif" style={{ color: CREAM }}>
            <p className="text-lg">Saturday, September 26, 2026</p>
            <p style={{ color: GOLD_DARK }}>3:00 PM – 6:00 PM</p>
            <p className="pt-1">Sullivan Rutherford Estate</p>
            <p style={{ opacity: 0.75 }}>1090 Galleron Road</p>
            <p style={{ opacity: 0.75 }}>St. Helena, California</p>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="text-center space-y-6 pb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px" style={{ background: "rgba(196,154,53,0.35)" }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD_DARK }} />
            <div className="flex-1 h-px" style={{ background: "rgba(196,154,53,0.35)" }} />
          </div>
          <a
            href="https://sullivanwine.com/estate-experiences/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-serif tracking-widest text-sm uppercase transition-all hover:opacity-80 px-10 py-3.5 rounded-full"
            style={{
              background:    GOLD,
              border:        `1px solid ${GOLD}`,
              color:         BLUE,
              letterSpacing: "0.15em",
              fontWeight:    600,
            }}
          >
            Reserve Your Seat →
          </a>
        </div>

      </div>
    </div>
  );
}

function SectionHeader({ label, gold }: { label: string; gold: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 h-px" style={{ background: "rgba(196,154,53,0.25)" }} />
      <h2
        className="font-serif tracking-widest uppercase text-sm shrink-0"
        style={{ color: gold, letterSpacing: "0.2em" }}
      >
        {label}
      </h2>
      <div className="flex-1 h-px" style={{ background: "rgba(196,154,53,0.25)" }} />
    </div>
  );
}
