export default function PAVineaPage() {
  const GOLD      = "#C49A35";
  const GOLD_DARK = "#9C7A3D";
  const BLUE      = "#1B3448";
  const TEXT      = "#2B2F32";

  const paragraphs = [
    "Some things are not made to be sold. They are made to be shared.",
    "PA Vinea takes its name from the Golden Ratio, Proportion Aurea, and Vinea, the Latin word for vineyard. It represents an equilibrium between past and future, restraint and power, tradition and innovation, made in quantities too small to ever reach the public.",
    "This is our Merlot-driven Bordeaux blend, drawn from the estate's most distinctive parcels and shaped by a devotion to precision over volume. Saturating black fruit, savory spice, and sleek, structured tannins arise from a collective drive to reshape what a Napa Valley wine can be — a wine of depth and quiet intensity, where crushed rock, dark plum, and warm cedar unfold slowly, never rushed, never shouting.",
    "It is offered only to those we consider family: our team, our closest friends, and our Founders.",
    "If you are reading this, you are already part of that circle.",
  ];

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] px-6 py-16 relative overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      {/* PA Vinea circular graphic — watermark behind all text */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/pa-vinea-graphic.png"
        alt=""
        aria-hidden="true"
        className="absolute pointer-events-none select-none"
        style={{
          width: "min(680px, 130vw)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0.08,
        }}
      />

      <div className="max-w-xl w-full text-center space-y-10 relative z-10">

        {/* Top rule */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px" style={{ background: "rgba(196,154,53,0.4)" }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD_DARK }} />
          <div className="flex-1 h-px" style={{ background: "rgba(196,154,53,0.4)" }} />
        </div>

        {/* Wordmark image — replaces the "PA Vinea" text */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/pa-vinea-wordmark.png"
          alt="PA Vinea"
          className="mx-auto"
          style={{ width: "min(260px, 60vw)" }}
        />

        {/* Body */}
        <div className="space-y-7 text-left">
          {paragraphs.map((para, i) => (
            <p
              key={i}
              className="font-serif leading-relaxed"
              style={{
                color:     i === 0 ? GOLD_DARK : TEXT,
                fontSize:  i === 0 ? "1.2rem" : "1.05rem",
                fontStyle: i === 0 ? "italic" : "normal",
              }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* Bottom rule */}
        <div className="flex items-center gap-4 pt-2">
          <div className="flex-1 h-px" style={{ background: "rgba(196,154,53,0.4)" }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD_DARK }} />
          <div className="flex-1 h-px" style={{ background: "rgba(196,154,53,0.4)" }} />
        </div>

        {/* CTA button */}
        <div className="pt-2">
          <a
            href="https://pavinea.com/offering/?utm_source=Commerce+7&utm_campaign=bacd49a7fb-EMAIL_CAMPAIGN_2021_11_02_01_31_COPY_01&utm_medium=email&utm_term=0_93484e7167-bacd49a7fb-92441648&mc_cid=bacd49a7fb&mc_eid=f743e7ddce#allocation"
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
            Inquire About PA Vinea
          </a>
        </div>

      </div>
    </div>
  );
}
