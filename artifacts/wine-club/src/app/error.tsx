"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen gap-8 px-6"
      style={{ background: "#1B3448" }}
    >
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px" style={{ background: "rgba(196,154,53,0.35)" }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#9C7A3D" }} />
          <div className="flex-1 h-px" style={{ background: "rgba(196,154,53,0.35)" }} />
        </div>
        <h1 className="font-serif text-3xl" style={{ color: "#EDEAE2" }}>
          Something went wrong
        </h1>
        <p className="font-serif" style={{ color: "rgba(237,234,226,0.65)", fontSize: "1.05rem" }}>
          Please try again. If the issue continues, refresh the page.
        </p>
        <button
          onClick={reset}
          className="inline-block font-serif tracking-widest text-sm uppercase px-10 py-3.5 rounded-full transition-all hover:opacity-80"
          style={{
            background: "#C49A35",
            color: "#1B3448",
            letterSpacing: "0.15em",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
          }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
