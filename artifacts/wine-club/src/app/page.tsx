import Link from "next/link";

export default function StatementPage() {
  return (
    <div
      className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center"
      style={{ background: "#1B3448" }}
    >
      {/*
        Vineyard image — absolutely positioned, bottom half of the page.
        mask-image fades it from transparent at the top of this layer to
        fully visible at the bottom. This means the image becomes visible
        starting roughly where the last two text items sit.
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
        style={{ gap: "2rem", paddingTop: "6vh", paddingBottom: "8vh" }}
      >
        {/* 1. Gold label */}
        <p
          className="text-xs uppercase"
          style={{ color: "#B8975A", letterSpacing: "0.4em" }}
        >
          Founder's Reserve
        </p>

        {/* 2. Main quote */}
        <h1
          className="font-light"
          style={{
            color: "#EDEAE2",
            fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
            lineHeight: 1.55,
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
            fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
            lineHeight: 1.85,
          }}
        >
          It represents an unwavering commitment to pushing beyond expectation,
          where every decision is guided by purpose, precision, and an
          uncompromising pursuit of excellence.
        </p>

        {/* 4. Gold closing line — sits on top of fading vineyard image */}
        <p
          style={{
            color: "#B8975A",
            fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)",
            letterSpacing: "0.06em",
            fontWeight: 500,
          }}
        >
          Here, excellence isn't an aspiration. It's the standard.
        </p>

        {/* 5. LOGIN link */}
        <Link
          href="/login"
          style={{
            color: "#B8975A",
            fontSize: "0.7rem",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            marginTop: "0.5rem",
          }}
          className="hover:opacity-70 transition-opacity duration-300"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
