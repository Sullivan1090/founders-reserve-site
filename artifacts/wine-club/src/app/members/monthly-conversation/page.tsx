export default function LiveWithWinemakerPage() {
  const BLUE      = "#1B3448";
  const GOLD      = "#C49A35";
  const GOLD_DARK = "#9C7A3D";
  const OFF_WHITE = "#EDEAE2";

  const paragraphs = [
    "This is where the conversation happens.",
    "Whenever there's something worth sharing, I'll go live directly from the vineyard, the winery, the cellar, or wherever the day takes me. Sometimes we'll taste through new releases. Other times we'll walk a vineyard block, discuss a vintage as it unfolds, or dive into the decisions that shape every bottle we produce.",
    "There is no script and no set schedule.",
    "Just real conversations, real wines, and an opportunity to experience Sullivan Rutherford Estate as it happens.",
    "When I'm live, this is where you'll find me.",
  ];

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-6 py-16"
      style={{ background: BLUE }}
    >
      <div className="max-w-xl w-full text-center space-y-10">

        {/* Top rule */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px" style={{ background: "rgba(139,103,38,0.35)" }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD_DARK }} />
          <div className="flex-1 h-px" style={{ background: "rgba(139,103,38,0.35)" }} />
        </div>

        {/* Title */}
        <h1
          className="font-serif leading-tight"
          style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)", fontWeight: 400, color: GOLD_DARK }}
        >
          Live with the Winemaker
        </h1>

        {/* Body */}
        <div className="space-y-7 text-left">
          {paragraphs.map((para, i) => (
            <p
              key={i}
              className="font-serif leading-relaxed"
              style={{
                color:     OFF_WHITE,
                fontSize:  i === 0 || i === 2 ? "1.2rem" : "1.05rem",
                fontStyle: i === 0 || i === 2 ? "italic" : "normal",
              }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* Bottom rule */}
        <div className="flex items-center gap-4 pt-2">
          <div className="flex-1 h-px" style={{ background: "rgba(139,103,38,0.35)" }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD_DARK }} />
          <div className="flex-1 h-px" style={{ background: "rgba(139,103,38,0.35)" }} />
        </div>

        {/* CTA button */}
        <div className="pt-2">
          <a
            href="https://us02web.zoom.us/j/6053083846?pwd=Itwe1KNbI70ZIoepTs2TFc0PqG4VwF.1"
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
            Join the Live Session
          </a>
        </div>

      </div>
    </div>
  );
}
