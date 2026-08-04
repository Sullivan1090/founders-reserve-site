"use client";
import { Suspense, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams?.get("next") ?? "/members";
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.push(next);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Background image — filter applied in isolation so it doesn't affect the form */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/login-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "contrast(1.22) saturate(1.45) brightness(1.06)",
        }}
      />

      {/* Metallic blue shimmer — mix-blend-mode:overlay selectively brightens the blue squares */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 38% 42%, rgba(80,140,230,0.28) 0%, rgba(60,100,200,0.12) 45%, transparent 75%), " +
            "linear-gradient(135deg, rgba(100,160,255,0.08) 0%, transparent 60%)",
          mixBlendMode: "overlay",
        }}
      />

      {/* Subtle dark overlay so the panel stays readable */}
      <div className="absolute inset-0 bg-black/28" />

      {/* Floating login panel */}
      <form
        onSubmit={handleLogin}
        className="relative z-10 w-full max-w-sm mx-4 flex flex-col gap-6 px-10 py-12"
        style={{
          background: "rgba(27, 52, 72, 0.82)",
          border: "1px solid rgba(184, 151, 90, 0.35)",
          backdropFilter: "none",
        }}
      >
        {/* Label */}
        <div className="text-center">
          <p
            className="text-xs tracking-[0.35em] uppercase mb-1"
            style={{ color: "#B8975A" }}
          >
            Sullivan Rutherford Estate
          </p>
          <h1
            className="text-2xl font-light tracking-[0.2em] uppercase"
            style={{ color: "#EDEAE2", letterSpacing: "0.22em" }}
          >
            Founder's Reserve
          </h1>
        </div>

        {/* Divider */}
        <div
          className="h-px w-16 mx-auto"
          style={{ background: "rgba(184, 151, 90, 0.4)" }}
        />

        {/* Fields */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-xs tracking-[0.2em] uppercase"
              style={{ color: "rgba(237, 234, 226, 0.55)" }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full bg-transparent border-b py-2 text-base outline-none transition-colors placeholder:opacity-30"
              style={{
                borderBottomColor: "rgba(184, 151, 90, 0.35)",
                color: "#EDEAE2",
              }}
              placeholder="you@example.com"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-xs tracking-[0.2em] uppercase"
              style={{ color: "rgba(237, 234, 226, 0.55)" }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full bg-transparent border-b py-2 text-base outline-none placeholder:opacity-30"
              style={{
                borderBottomColor: "rgba(184, 151, 90, 0.35)",
                color: "#EDEAE2",
              }}
              placeholder="••••••••"
            />
          </div>
        </div>

        {/* Enter button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 text-sm tracking-[0.3em] uppercase font-medium transition-opacity hover:opacity-90 disabled:opacity-50 mt-2"
          style={{
            background: "#B8975A",
            color: "#1B3448",
          }}
        >
          {loading ? "Entering…" : "Enter"}
        </button>

        {/* Sign up link */}
        <p className="text-center text-xs" style={{ color: "rgba(237, 234, 226, 0.4)" }}>
          New member?{" "}
          <a href="/signup" style={{ color: "rgba(184, 151, 90, 0.75)" }} className="hover:opacity-100 transition-opacity">
            Create an account
          </a>
        </p>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
