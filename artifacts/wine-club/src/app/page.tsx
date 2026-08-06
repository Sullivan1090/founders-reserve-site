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
        Vineyard image wrapper — bottom 75% of the viewport.
        Using an <img> with object-fit/object-position so the exact same
        crop (70% down the photo = the vineyard rows) is pinned on every
        viewport width. The mask fades it in from transparent at the top.
        A dark overlay div sits on top to tone down bright areas.
      */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "75%",
          overflow: "hidden",
          maskImage: "linear-gradient(180deg, transparent 0%, black 50%)",
          WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 50%)",
        }}
      >
        {/* The photo — object-position locks the vineyard-row band in place */}
        <img
          src="/vineyard.webp"
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 70%",
          }}
        />
        {/* Dark overlay to keep text legible */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(20,38,54,0.70) 0%, rgba(10,20,30,0.40) 55%, rgba(0,0,0,0.20) 100%)",
          }}
        />
      </div>

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

        {/* 5. LOGIN link — bright white, larger, stronger shadow over dark trees */}
        <Link
          href="/login"
          style={{
            color: "#FFFFFF",
            fontSize: "1.25rem",
            letterSpacing: "0.6em",
            textTransform: "uppercase",
            marginTop: "2rem",
            textShadow: "0 0 16px rgba(0,0,0,1), 0 2px 8px rgba(0,0,0,1), 0 0 4px rgba(0,0,0,1)",
            fontWeight: 500,
          }}
          className="hover:opacity-70 transition-opacity duration-300"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
