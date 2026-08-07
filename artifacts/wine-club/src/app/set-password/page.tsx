"use client";
import { Suspense, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function SetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      router.push("/members/welcome");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to set password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Background — same as login page */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/login-bg.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "contrast(1.22) saturate(1.45) brightness(1.06)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 38% 42%, rgba(80,140,230,0.28) 0%, rgba(60,100,200,0.12) 45%, transparent 75%), " +
            "linear-gradient(135deg, rgba(100,160,255,0.08) 0%, transparent 60%)",
          mixBlendMode: "overlay",
        }}
      />
      <div className="absolute inset-0 bg-black/28" />

      {/* Panel */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-sm mx-4 flex flex-col gap-6 px-10 py-12"
        style={{
          background: "rgba(27, 52, 72, 0.82)",
          border: "1px solid rgba(184, 151, 90, 0.35)",
        }}
      >
        {/* Header */}
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
            Create Your Password
          </h1>
        </div>

        {/* Divider */}
        <div className="h-px w-16 mx-auto" style={{ background: "rgba(184, 151, 90, 0.4)" }} />

        <p
          className="text-center text-sm leading-relaxed"
          style={{ color: "rgba(237, 234, 226, 0.6)" }}
        >
          Welcome to the Founder's Vault. Set a password to access your membership going forward.
        </p>

        {/* Fields */}
        <div className="flex flex-col gap-4">
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
              autoComplete="new-password"
              className="w-full bg-transparent border-b py-2 text-base outline-none transition-colors placeholder:opacity-30"
              style={{
                borderBottomColor: "rgba(184, 151, 90, 0.35)",
                color: "#EDEAE2",
              }}
              placeholder="At least 8 characters"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="confirm"
              className="text-xs tracking-[0.2em] uppercase"
              style={{ color: "rgba(237, 234, 226, 0.55)" }}
            >
              Confirm Password
            </label>
            <input
              id="confirm"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              autoComplete="new-password"
              className="w-full bg-transparent border-b py-2 text-base outline-none placeholder:opacity-30"
              style={{
                borderBottomColor: "rgba(184, 151, 90, 0.35)",
                color: "#EDEAE2",
              }}
              placeholder="••••••••"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 text-sm tracking-[0.3em] uppercase font-medium transition-opacity hover:opacity-90 disabled:opacity-50 mt-2"
          style={{
            background: "#B8975A",
            color: "#1B3448",
          }}
        >
          {loading ? "Saving…" : "Enter the Vault"}
        </button>
      </form>
    </div>
  );
}

export default function SetPasswordPage() {
  return (
    <Suspense>
      <SetPasswordForm />
    </Suspense>
  );
}
