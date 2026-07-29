import Link from "next/link";

export default function StatementPage() {
  const gold = "#8B6726";
  const photoTextShadow = "0 1px 4px rgba(0,0,0,0.55), 0 2px 10px rgba(0,0,0,0.3)";

  return (
    <div
      className="relative w-full overflow-hidden flex flex-col items-center"
      style={{
        background: "#1B3448",
        // Use 100vh as the universal safe value — works on every real browser.
        // Extra bottom padding shifts the block slightly above true center so it
        // sits in the upper portion without relying on a fixed top offset that
        // can push content below the fold on shorter viewports.
        height: "100vh",
        justifyContent: "center",
        paddingBottom: "14vh",
      }}
    >
      {/*
        Vineyard image — bottom 60% of the viewport.
        Double-layer background: a dark navy-to-transparent overlay is painted
        on top of the photo so the bright sky is toned down significantly.
        The mask gradient then fades the whole layer in from transparent.
      */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "60%",
          // Dark overlay (first layer) + vineyard photo (second layer)
          backgroundImage:
            "linear-gradient(180deg, rgba(20,38,54,0.72) 0%, rgba(10,20,30,0.45) 60%, rgba(0,0,0,0.25) 100%), url('/vineyard.png')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          maskImage: "linear-gradient(180deg, transparent 0%, black 50%)",
          WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 50%)",
        }}
      />

      {/* Content column — lives in the top half, above the cloud zone */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-2xl"
        style={{ gap: "2rem" }}
      >
        {/* 1. Label — white */}
        <p
          className="uppercase"
          style={{
            color: "#EDEAE2",
            fontSize: "16px",
            letterSpacing: "0.42em",
          }}
        >
          Founder's Reserve
        </p>

        {/* 2. Main quote — gold */}
        <h1
          className="font-light"
          style={{
            color: gold,
            fontSize: "clamp(2.1rem, 4.5vw, 3.2rem)",
            lineHeight: 1.45,
            letterSpacing: "0.01em",
          }}
        >
          Founder's Reserve is what happens when curiosity refuses to settle.
        </h1>

        {/* 3. Description — white */}
        <p
          className="font-light leading-relaxed max-w-xl"
          style={{
            color: "#EDEAE2",
            fontSize: "clamp(1.25rem, 2.1vw, 1.5rem)",
            lineHeight: 1.85,
          }}
        >
          It represents an unwavering commitment to pushing beyond expectation,
          where every decision is guided by purpose, precision, and an
          uncompromising pursuit of excellence.
        </p>

        {/* 4. Closing line — white */}
        <p
          style={{
            color: "#EDEAE2",
            fontSize: "clamp(1.1rem, 1.75vw, 1.3rem)",
            letterSpacing: "0.06em",
            fontWeight: 500,
            textShadow: photoTextShadow,
          }}
        >
          Here, excellence isn't an aspiration. It's the standard.
        </p>

        {/* 5. LOGIN link — white */}
        <Link
          href="/login"
          style={{
            color: "#EDEAE2",
            fontSize: "0.85rem",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            marginTop: "2rem",
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
