"use client";
import { Suspense, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, Wine, CheckCircle } from "lucide-react";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      // If email confirmation is disabled, user is immediately signed in
      if (data.session) {
        toast.success("Welcome to The Founders Vault.");
        router.push("/members");
        router.refresh();
      } else {
        // Email confirmation required
        setSubmitted(true);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary relative overflow-hidden px-4 py-12 w-full">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-primary/30 via-secondary to-secondary pointer-events-none" />

      <Link href="/" className="absolute top-8 left-8 text-white/60 hover:text-white flex items-center text-sm transition-colors z-20 font-medium">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Society
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-xl border border-primary-border">
            <Wine className="w-8 h-8" />
          </div>
        </div>

        <Card className="border-none shadow-2xl bg-background rounded-2xl overflow-hidden">
          <div className="h-2 w-full bg-primary" />

          {submitted ? (
            <>
              <CardHeader className="text-center pb-4 pt-8">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="w-12 h-12 text-primary" />
                </div>
                <CardTitle className="font-serif text-3xl text-primary">Check Your Inbox</CardTitle>
                <CardDescription className="text-base mt-2">
                  We sent a confirmation link to <strong>{email}</strong>. Click it to activate your membership.
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex flex-col items-center bg-muted/30 border-t border-border/50 py-4">
                <p className="text-sm text-muted-foreground">
                  Already confirmed?{" "}
                  <Link href="/login" className="text-primary hover:underline font-medium">
                    Sign in
                  </Link>
                </p>
              </CardFooter>
            </>
          ) : (
            <>
              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle className="font-serif text-3xl text-primary">Join the Circle</CardTitle>
                <CardDescription className="text-base mt-2">
                  Create your account to access exclusive allocations and the wine library.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <form onSubmit={handleSignup} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="connoisseur@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-card border-border/50 focus-visible:ring-primary h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="At least 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-card border-border/50 focus-visible:ring-primary h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Repeat your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="bg-card border-border/50 focus-visible:ring-primary h-11"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-11 text-base bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Account"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col items-center bg-muted/30 border-t border-border/50 py-4">
                <p className="text-sm text-muted-foreground">
                  Already a member?{" "}
                  <Link href="/login" className="text-primary hover:underline font-medium">
                    Sign in
                  </Link>
                </p>
              </CardFooter>
            </>
          )}
        </Card>
      </motion.div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-secondary"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}>
      <SignupForm />
    </Suspense>
  );
}
