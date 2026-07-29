"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Start fade-out at 3.2s, navigate at 4s
    const fadeTimer = setTimeout(() => setFading(true), 3200);
    const navTimer = setTimeout(() => router.push("/members"), 4000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
    };
  }, [router]);

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-6 transition-opacity duration-700"
      style={{
        background: "#1B3448",
        opacity: fading ? 0 : 1,
      }}
    >
      <div className="max-w-2xl w-full text-center flex flex-col gap-8">

        {/* Gold label */}
        <p
          className="text-xs tracking-[0.4em] uppercase"
          style={{ color: "#B8975A" }}
        >
          Founder's Reserve
        </p>

        {/* Main quote */}
        <h1
          className="text-3xl md:text-4xl font-light leading-relaxed"
          style={{ color: "#EDEAE2", lineHeight: "1.55" }}
        >
          Founder's Reserve is what happens when curiosity refuses to settle.
        </h1>

        {/* Description */}
        <p
          className="text-lg font-light leading-relaxed max-w-xl mx-auto"
          style={{ color: "#6E6960", lineHeight: "1.8" }}
        >
          It represents an unwavering commitment to pushing beyond expectation,
          where every decision is guided by purpose, precision, and an
          uncompromising pursuit of excellence.
        </p>

        {/* Closing line */}
        <p
          className="text-base tracking-[0.08em] font-medium"
          style={{ color: "#B8975A" }}
        >
          Here, excellence isn't an aspiration. It's the standard.
        </p>

      </div>
    </div>
  );
}
