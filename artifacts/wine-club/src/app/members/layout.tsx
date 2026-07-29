import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { SignOutButton } from "@/components/sign-out-button";
import { Wine } from "lucide-react";

export default async function MembersLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20 selection:text-primary">
      <header className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 sticky top-0 z-40">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/members" className="font-serif text-2xl tracking-wide text-primary flex items-center gap-2 transition-transform hover:scale-[1.02]">
            <Wine className="w-6 h-6" />
            The Founders Vault
          </Link>
          <nav className="hidden md:flex gap-8 items-center font-medium text-sm">
            <Link href="/members" className="text-muted-foreground hover:text-primary transition-colors">Library</Link>
            <Link href="/members/releases" className="text-muted-foreground hover:text-primary transition-colors">Releases</Link>
            <Link href="/members/construction" className="text-muted-foreground hover:text-primary transition-colors">Construction</Link>
          </nav>
          <div className="flex items-center gap-6">
            <span className="text-sm text-muted-foreground hidden md:inline-block font-medium">{user?.email}</span>
            <SignOutButton />
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
