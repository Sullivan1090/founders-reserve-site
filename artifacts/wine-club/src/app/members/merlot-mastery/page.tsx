export default function MerlotMasteryPage() {
  const GOLD      = "#C49A35";
  const GOLD_DARK = "#9C7A3D";
  const BLUE      = "#1B3448";
  const TEXT      = "#2B2F32";
  const CREAM     = "#EDEAE2";

  return (
    <div
      className="flex flex-col items-center min-h-[calc(100vh-5rem)] px-6 py-16 relative overflow-hidden"
      style={{ background: BLUE }}
    >
      {/* Background photo — faded */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/merlot-mastery-bg.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        style={{ opacity: 0.18 }}
      />

      {/* Dark overlay so text stays readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(27,52,72,0.72)" }}
      />

      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 20%, rgba(196,154,53,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-2xl w-full relative z-10 space-y-14">

        {/* Header */}
        <div className="text-center space-y-6 pt-4">
          {/* Top rule */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px" style={{ background: "rgba(196,154,53,0.35)" }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD_DARK }} />
            <div className="flex-1 h-px" style={{ background: "rgba(196,154,53,0.35)" }} />
          </div>

          <p
            className="font-serif tracking-widest uppercase text-xs"
            style={{ color: GOLD, letterSpacing: "0.25em" }}
          >
            Sullivan Rutherford Estate
          </p>

          <h1
            className="font-serif"
            style={{ color: CREAM, fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.15 }}
          >
            Merlot Mastery
          </h1>

          <p
            className="font-serif italic text-xl"
            style={{ color: GOLD_DARK }}
          >
            Merlot deserves a seat at the world&apos;s finest tables.
          </p>

          {/* Bottom rule */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px" style={{ background: "rgba(196,154,53,0.35)" }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD_DARK }} />
            <div className="flex-1 h-px" style={{ background: "rgba(196,154,53,0.35)" }} />
          </div>
        </div>

        {/* Opening body */}
        <div className="space-y-6">
          {[
            "For decades, Merlot has often been viewed as Cabernet Sauvignon's quieter counterpart. At Sullivan Rutherford Estate, we've come to a very different conclusion.",
            "Through years of studying our vineyards, tasting the world's great Merlots, and continually refining our approach in both the vineyard and the cellar, we've discovered something remarkable. When planted in exceptional sites and given the same attention, precision, and uncompromising standards as Cabernet Sauvignon, Merlot is capable of extraordinary complexity, structure, elegance, and longevity.",
            "Merlot Mastery is our commitment to challenging convention.",
            "It is an ongoing pursuit to better understand the variety, to continually refine how we farm and craft it, and to demonstrate that the world's finest Merlots deserve to stand alongside the greatest Cabernet Sauvignons.",
            "That pursuit extends well beyond Sullivan Rutherford Estate. Through comparative tastings featuring benchmark wines from Napa Valley, Bordeaux's Right Bank, and Italy's Bolgheri, we continually evaluate our wines against some of the most respected Merlots in the world. Every vintage becomes another opportunity to learn, improve, and redefine what Napa Valley Merlot can be.",
            "Today, the J.O. Sullivan Founder's Reserve Merlot represents the culmination of that philosophy. It is a wine built not around expectations, but around the full potential of this remarkable estate.",
          ].map((para, i) => (
            <p
              key={i}
              className="font-serif leading-relaxed"
              style={{
                color:     i === 2 ? GOLD : CREAM,
                fontStyle: i === 2 ? "italic" : "normal",
                fontSize:  i === 2 ? "1.15rem" : "1.05rem",
              }}
            >
              {para}
            </p>
          ))}

          <p className="font-serif leading-relaxed" style={{ color: CREAM, fontSize: "1.05rem" }}>
            Merlot Mastery isn&apos;t simply a tasting.
          </p>
          <p className="font-serif leading-relaxed" style={{ color: CREAM, fontSize: "1.05rem" }}>
            It&apos;s a belief that one of the world&apos;s greatest wine varieties is only beginning to receive the recognition it deserves.
          </p>
        </div>

        {/* Our Philosophy section */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px" style={{ background: "rgba(196,154,53,0.25)" }} />
            <h2
              className="font-serif tracking-widest uppercase text-sm shrink-0"
              style={{ color: GOLD, letterSpacing: "0.2em" }}
            >
              Our Philosophy
            </h2>
            <div className="flex-1 h-px" style={{ background: "rgba(196,154,53,0.25)" }} />
          </div>

          {[
            "We don't compare Merlot to Cabernet Sauvignon because it needs validation.",
            "We compare it because both varieties deserve the same level of respect.",
            "When grown in exceptional vineyards, farmed with intention, and crafted without compromise, Merlot possesses every bit of the depth, complexity, structure, and longevity that define the world's great wines.",
            "That belief guides every decision we make.",
          ].map((para, i) => (
            <p
              key={i}
              className="font-serif leading-relaxed"
              style={{
                color:     i < 2 ? GOLD_DARK : CREAM,
                fontStyle: i < 2 ? "italic" : "normal",
                fontSize:  "1.05rem",
              }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* Experience section */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px" style={{ background: "rgba(196,154,53,0.25)" }} />
            <h2
              className="font-serif tracking-widest uppercase text-sm shrink-0"
              style={{ color: GOLD, letterSpacing: "0.2em" }}
            >
              Experience Merlot Mastery
            </h2>
            <div className="flex-1 h-px" style={{ background: "rgba(196,154,53,0.25)" }} />
          </div>

          {[
            "Merlot Mastery is an immersive exploration of one of the world's most misunderstood grape varieties.",
            "Personally hosted by Winemaker Jeff Cole, the experience begins with a walk through Sullivan Rutherford Estate before guests are guided through a curated tasting that places Sullivan's Merlot alongside benchmark examples from Napa Valley, Bordeaux's Right Bank, and Italy's Bolgheri. Throughout the tasting, Jeff shares the philosophy behind the estate's Merlot program, the decisions made in the vineyard and cellar, and the continual pursuit of producing Merlot at the highest level.",
            "The experience concludes with a vertical exploration of the J.O. Sullivan Founder's Reserve Merlot, offering a rare opportunity to discover how vineyard, vintage, and time shape the evolution of the wine. Thoughtfully paired seasonal bites accompany each flight, creating an experience designed to educate, challenge perceptions, and celebrate Merlot at the highest level.",
            "More than a tasting, Merlot Mastery is an invitation to see this remarkable variety through a different lens and discover why Sullivan Rutherford Estate has made it a defining part of its identity.",
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

        {/* CTA */}
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
            Experience Merlot Mastery →
          </a>
        </div>

      </div>
    </div>
  );
}
