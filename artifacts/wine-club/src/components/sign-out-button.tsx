"use client";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const router = useRouter();
  const supabase = createClient();
  
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };
  
  return (
    <Button variant="outline" size="sm" onClick={handleSignOut} className="border-border text-foreground hover:bg-muted">
      Sign Out
    </Button>
  );
}
