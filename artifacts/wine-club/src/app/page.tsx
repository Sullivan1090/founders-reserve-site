import Link from "next/link";

export default function StatementPage() {
  // Antique/burnished gold — readable against vineyard sky
  const gold = "#9C7A3D";
  // Text-shadow to lift gold elements that sit on top of the photo
  const photoTextShadow = "0 1px 3px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.25)";

  return (
    <div
      className="relative w-full overflow-hidden flex flex-col items-center justify-center"
      style={{ background: "#1B3448", height: "100dvh" }}
    >
      {/*
        Vineyard image — absolutely positioned, bottom half of the page.
        mask-image fades from transparent → fully visible so the image
        appears starting roughly where "uncompromising pursuit of excellence" sits.
      */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "52%",
          backgroundImage: "url('/vineyard.png')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          maskImage: "linear-gradient(180deg, transparent 0%, black 100%)",
          WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 100%)",
        }}
      />

      {/* Content — sits above the image layer */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-2xl"
        style={{ gap: "1.75rem" }}
      >
        {/* 1. Gold label — 15px, wide tracking */}
        <p
          className="uppercase"
          style={{
            color: gold,
            fontSize: "15px",
            letterSpacing: "0.4em",
          }}
        >
          Founder's Reserve
        </p>

        {/* 2. Main quote — ~15–20% larger than before */}
        <h1
          className="font-light"
          style={{
            color: "#EDEAE2",
            fontSize: "clamp(1.85rem, 4vw, 2.9rem)",
            lineHeight: 1.5,
            letterSpacing: "0.01em",
          }}
        >
          Founder's Reserve is what happens when curiosity refuses to settle.
        </h1>

        {/* 3. Description — muted warm grey, ~15% larger */}
        <p
          className="font-light leading-relaxed max-w-xl"
          style={{
            color: "#B8B4A8",
            fontSize: "clamp(1.15rem, 1.9vw, 1.4rem)",
            lineHeight: 1.85,
          }}
        >
          It represents an unwavering commitment to pushing beyond expectation,
          where every decision is guided by purpose, precision, and an
          uncompromising pursuit of excellence.
        </p>

        {/* 4. Gold closing line — over the vineyard photo; text-shadow for contrast */}
        <p
          style={{
            color: gold,
            fontSize: "clamp(1.05rem, 1.6vw, 1.2rem)",
            letterSpacing: "0.06em",
            fontWeight: 500,
            textShadow: photoTextShadow,
          }}
        >
          Here, excellence isn't an aspiration. It's the standard.
        </p>

        {/* 5. LOGIN link — over the vineyard photo; text-shadow for contrast */}
        <Link
          href="/login"
          style={{
            color: gold,
            fontSize: "0.8rem",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            marginTop: "0.25rem",
            textShadow: photoTextShadow,
          }}
          className="hover:opacity-70 transition-opacity duration-300"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
