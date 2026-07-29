import Link from "next/link";

export default function StatementPage() {
  // Deep burnished antique gold — readable over both JO Blue and the vineyard sky
  const gold = "#8B6726";
  // Text-shadow for gold elements that sit over the photo
  const photoTextShadow = "0 1px 4px rgba(0,0,0,0.55), 0 2px 10px rgba(0,0,0,0.3)";

  return (
    <div
      className="relative w-full overflow-hidden flex flex-col items-center justify-center"
      style={{
        background: "#1B3448",
        // svh = small viewport height: the shortest the viewport gets (browser chrome fully
        // visible). Safer than dvh on real browsers — prevents the bottom from being cut off.
        height: "100svh",
        // Fallback for browsers that don't support svh yet
        minHeight: "100vh",
      }}
    >
      {/*
        Vineyard image — covers the bottom 62% of the page, fades in from
        transparent at the top of this layer to fully opaque at the bottom.
        Moving from 52% → 62% shifts the photo up so more of it is visible
        and the lower edge stays anchored to the true bottom of the viewport.
      */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "62%",
          backgroundImage: "url('/vineyard.png')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          maskImage: "linear-gradient(180deg, transparent 0%, black 55%)",
          WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 55%)",
        }}
      />

      {/* Content column */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-2xl"
        style={{ gap: "2rem" }}
      >
        {/* 1. Gold label */}
        <p
          className="uppercase"
          style={{
            color: gold,
            fontSize: "16px",
            letterSpacing: "0.42em",
          }}
        >
          Founder's Reserve
        </p>

        {/* 2. Main quote */}
        <h1
          className="font-light"
          style={{
            color: "#EDEAE2",
            fontSize: "clamp(2.1rem, 4.5vw, 3.2rem)",
            lineHeight: 1.45,
            letterSpacing: "0.01em",
          }}
        >
          Founder's Reserve is what happens when curiosity refuses to settle.
        </h1>

        {/* 3. Description — muted warm grey */}
        <p
          className="font-light leading-relaxed max-w-xl"
          style={{
            color: "#B8B4A8",
            fontSize: "clamp(1.25rem, 2.1vw, 1.5rem)",
            lineHeight: 1.85,
          }}
        >
          It represents an unwavering commitment to pushing beyond expectation,
          where every decision is guided by purpose, precision, and an
          uncompromising pursuit of excellence.
        </p>

        {/* 4. Gold closing line — over the photo; shadow lifts it off the sky */}
        <p
          style={{
            color: gold,
            fontSize: "clamp(1.1rem, 1.75vw, 1.3rem)",
            letterSpacing: "0.06em",
            fontWeight: 500,
            textShadow: photoTextShadow,
          }}
        >
          Here, excellence isn't an aspiration. It's the standard.
        </p>

        {/* 5. LOGIN link — over the photo */}
        <Link
          href="/login"
          style={{
            color: gold,
            fontSize: "0.85rem",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            marginTop: "0.15rem",
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
