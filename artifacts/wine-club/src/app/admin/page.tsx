import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { data: arrival } = await supabase
    .from("featured_arrival")
    .select("wine_name, vintage, updated_at")
    .eq("id", 1)
    .maybeSingle();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-serif text-3xl text-primary mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground text-sm">Manage Founders Vault content.</p>
      </div>

      <div className="grid gap-5">
        {/* Arrival card */}
        <Link
          href="/admin/arrival"
          className="block rounded-xl p-6 transition-all hover:opacity-90"
          style={{ background: "rgba(139,103,38,0.08)", border: "1px solid rgba(139,103,38,0.25)" }}
        >
          <p className="text-xs uppercase tracking-widest text-primary mb-1 font-semibold">The Arrival</p>
          <p className="font-serif text-xl text-foreground">
            {arrival?.wine_name ?? "Not yet configured"}
          </p>
          {arrival?.updated_at && (
            <p className="text-xs text-muted-foreground mt-2">
              Last updated{" "}
              {new Date(arrival.updated_at).toLocaleDateString("en-US", {
                month: "long", day: "numeric", year: "numeric",
              })}
            </p>
          )}
        </Link>

        {/* Invite card */}
        <Link
          href="/admin/invite"
          className="block rounded-xl p-6 transition-all hover:opacity-90"
          style={{ background: "rgba(139,103,38,0.08)", border: "1px solid rgba(139,103,38,0.25)" }}
        >
          <p className="text-xs uppercase tracking-widest text-primary mb-1 font-semibold">Member Invites</p>
          <p className="font-serif text-xl text-foreground">Invite allocation members</p>
          <p className="text-xs text-muted-foreground mt-2">
            Paste a list of emails to send secure set-password invitations.
          </p>
        </Link>
      </div>
    </div>
  );
}
