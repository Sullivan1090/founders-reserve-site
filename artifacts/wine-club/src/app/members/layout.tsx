import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { SignOutButton } from "@/components/sign-out-button";
import { Wine } from "lucide-react";
import { HamburgerMenu } from "@/components/hamburger-menu";
import { ConciergeChat } from "@/components/concierge-chat";
import { PwaInstallBanner } from "@/components/pwa-install-banner";

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
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden md:inline-block font-medium">{user?.email}</span>
            <SignOutButton />
            <HamburgerMenu />
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <ConciergeChat />
      <PwaInstallBanner />
    </div>
  );
}
