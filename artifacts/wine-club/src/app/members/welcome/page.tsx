import { markWelcomeSeen } from "./actions";

export default function WelcomePage() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] px-6 py-16"
      style={{ background: "#1B3448" }}
    >
      <div className="max-w-xl w-full text-center space-y-10">

        {/* Decorative top rule */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px" style={{ background: "rgba(139,103,38,0.35)" }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#9C7A3D" }} />
          <div className="flex-1 h-px" style={{ background: "rgba(139,103,38,0.35)" }} />
        </div>

        {/* Title */}
        <h1
          className="font-serif leading-tight"
          style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 400, color: "#9C7A3D" }}
        >
          Welcome to Founders Vault
        </h1>

        {/* Body */}
        <div className="space-y-7 text-left">
          {[
            "This is not a website. It is a door held open for very few.",
            "To hold a place in the Founders Reserve allocation is to be family, not a customer. Founders Vault is where that relationship lives: your one place for complete access to everything we do, not just the wine, but every endeavor we pursue.",
            "Here, nothing is held at a distance. You will understand our work as we understand it ourselves, and you will not simply observe it. You will be part of it, invited into the decisions, the moments, and the people behind them, as they happen, not after.",
            "This is not a newsletter, and it is not a subscription. It is access, freely given, to those who already belong.",
          ].map((para, i) => (
            <p
              key={i}
              className="font-serif leading-relaxed"
              style={{
                color: "#EDEAE2",
                fontSize: i === 0 ? "1.2rem" : "1.05rem",
                fontStyle: i === 0 ? "italic" : "normal",
              }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* Decorative rule */}
        <div className="flex items-center gap-4 pt-2">
          <div className="flex-1 h-px" style={{ background: "rgba(139,103,38,0.35)" }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#9C7A3D" }} />
          <div className="flex-1 h-px" style={{ background: "rgba(139,103,38,0.35)" }} />
        </div>

        {/* Enter button — marks welcome seen, then goes to The Arrival */}
        <form action={markWelcomeSeen} className="pt-2">
          <button
            type="submit"
            className="font-serif tracking-widest text-sm uppercase transition-all hover:opacity-80 px-10 py-3.5 rounded-full"
            style={{
              background: "rgba(139,103,38,0.15)",
              border: "1px solid rgba(139,103,38,0.5)",
              color: "#EDEAE2",
              cursor: "pointer",
              letterSpacing: "0.15em",
            }}
          >
            Enter the Vault
          </button>
        </form>

      </div>
    </div>
  );
}
