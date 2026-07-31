import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "jeff@sullivanwine.com";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.email !== ADMIN_EMAIL) {
    redirect("/members");
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Admin nav bar */}
      <header
        className="sticky top-0 z-40 border-b"
        style={{ background: "#1B3448", borderColor: "rgba(139,103,38,0.3)" }}
      >
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-serif text-lg" style={{ color: "#9C7A3D" }}>
            Founders Vault — Admin
          </span>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/admin"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/arrival"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              The Arrival
            </Link>
            <Link
              href="/admin/invite"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Invite Members
            </Link>
            <Link
              href="/members"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              ← Back to Vault
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-3xl">
        {children}
      </main>
    </div>
  );
}
