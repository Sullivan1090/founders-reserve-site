"use client";
import { Suspense, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, Wine } from "lucide-react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMagicLink, setIsMagicLink] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams?.get("next") ?? "/members";
  const supabase = createClient();

  const handleEmailPasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast.success("Welcome back.");
      router.push(next);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in.");
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${next}`,
        },
      });
      
      if (error) throw error;
      
      toast.success("Magic link sent. Check your inbox.");
      setIsMagicLink(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to send magic link.");
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
          <CardHeader className="text-center pb-8 pt-8">
            <CardTitle className="font-serif text-3xl text-primary">Enter the Cellar</CardTitle>
            <CardDescription className="text-base mt-2">
              Sign in to access your allocations and library.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            {isMagicLink ? (
              <form onSubmit={handleMagicLink} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="magic-email">Email Address</Label>
                  <Input 
                    id="magic-email" 
                    type="email" 
                    placeholder="connoisseur@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-card border-border/50 focus-visible:ring-primary h-11"
                  />
                </div>
                <Button type="submit" className="w-full h-11 text-base bg-primary hover:bg-primary/90 text-primary-foreground" disabled={loading}>
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Magic Link"}
                </Button>
                <div className="text-center text-sm pt-2">
                  <button type="button" onClick={() => setIsMagicLink(false)} className="text-muted-foreground hover:text-primary transition-colors font-medium">
                    Use password instead
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleEmailPasswordLogin} className="space-y-6">
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-card border-border/50 focus-visible:ring-primary h-11"
                  />
                </div>
                <Button type="submit" className="w-full h-11 text-base bg-primary hover:bg-primary/90 text-primary-foreground" disabled={loading}>
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Unlock"}
                </Button>
                <div className="text-center text-sm pt-2">
                  <button type="button" onClick={() => setIsMagicLink(true)} className="text-muted-foreground hover:text-primary transition-colors font-medium">
                    Send magic link instead
                  </button>
                </div>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-center bg-muted/30 border-t border-border/50 py-4">
            <p className="text-xs text-muted-foreground text-center">
              By accessing this area, you verify you are of legal drinking age.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-secondary"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}>
      <LoginForm />
    </Suspense>
  )
}
