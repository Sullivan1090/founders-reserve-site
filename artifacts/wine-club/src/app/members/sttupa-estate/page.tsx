import Image from "next/image";

export default function SttupaestatePage() {
  const GOLD      = "#C49A35";
  const GOLD_DARK = "#9C7A3D";
  const OFF_WHITE = "#F2EFE8";

  const paragraphs = [
    "High above the valley floor, hidden at the end of a gated drive, there is a place built for stillness.",
    "Sttupa Estate began in 2005 as Poetry Inn, one of Napa Valley's most secluded luxury retreats, set among Cabernet Sauvignon vines just outside Yountville. In 2024, the estate joined the family behind Sullivan Rutherford, and in 2026 it embraced a new name rooted in old meaning: stupa, a place that fosters connection between humankind and nature. Sttupa Estate remains devoted to intimacy, serenity, and authenticity, each suite architecturally distinct, each moment shaped by ambassadors who know you before you ever arrive.",
    "It is offered to our Founders as an extension of the same values that shape everything we do.",
  ];

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-6 py-16 overflow-hidden">

      {/* Background photo — Next.js Image handles optimization + preload */}
      <Image
        src="/sttupa-bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-top"
        style={{ zIndex: 0 }}
      />

      {/* Dark-to-light gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: "linear-gradient(to bottom, rgba(8,12,18,0.82) 0%, rgba(8,12,18,0.55) 45%, rgba(8,12,18,0.18) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative max-w-xl w-full text-center space-y-10" style={{ zIndex: 2 }}>

        {/* Top rule */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px" style={{ background: "rgba(196,154,53,0.45)" }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD_DARK }} />
          <div className="flex-1 h-px" style={{ background: "rgba(196,154,53,0.45)" }} />
        </div>

        {/* Title */}
        <h1
          className="font-serif leading-tight"
          style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)", fontWeight: 400, color: GOLD }}
        >
          Sttupa Estate
        </h1>

        {/* Body */}
        <div className="space-y-7 text-left">
          {paragraphs.map((para, i) => (
            <p
              key={i}
              className="font-serif leading-relaxed"
              style={{
                color:      OFF_WHITE,
                fontSize:   i === 0 ? "1.2rem" : "1.05rem",
                fontStyle:  i === 0 ? "italic" : "normal",
                textShadow: "0 1px 4px rgba(0,0,0,0.5)",
              }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* Bottom rule */}
        <div className="flex items-center gap-4 pt-2">
          <div className="flex-1 h-px" style={{ background: "rgba(196,154,53,0.45)" }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD_DARK }} />
          <div className="flex-1 h-px" style={{ background: "rgba(196,154,53,0.45)" }} />
        </div>

        {/* CTA button */}
        <div className="pt-2">
          <a
            href="https://sttupaestate.com/experience/our-story/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-serif tracking-widest text-sm uppercase transition-all hover:opacity-80 px-10 py-3.5 rounded-full"
            style={{
              background:    GOLD,
              border:        `1px solid ${GOLD}`,
              color:         "#0D1117",
              letterSpacing: "0.15em",
              fontWeight:    600,
            }}
          >
            Discover Sttupa Estate
          </a>
        </div>

      </div>
    </div>
  );
}
