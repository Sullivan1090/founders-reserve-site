import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ArrivalPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // First-login check: redirect to welcome if member hasn't seen it yet.
  // Handles gracefully if the column doesn't exist yet (migration pending).
  if (user) {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("has_seen_welcome")
      .eq("id", user.id)
      .single();

    if (!error && profile && !profile.has_seen_welcome) {
      redirect("/members/welcome");
    }
  }

  // Fetch featured wine from Supabase (admin-updatable).
  // Falls back to default if table doesn't exist yet.
  const { data: arrival } = await supabase
    .from("featured_arrival")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  const wine = arrival ?? {
    wine_name: "2023 J.O. Sullivan Founder's Reserve Cabernet Sauvignon",
    vintage:   "2023",
    youtube_id: "",
    description: "",
  };

  return (
    <div className="container mx-auto px-6 py-12 md:py-16 max-w-4xl">

      {/* Page header */}
      <div className="mb-14 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-serif text-primary mb-5">The Arrival</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          A personal introduction to the wines of Sullivan Rutherford Estate — the winemaking
          process, the passion, and the story behind each bottle.
        </p>
      </div>

      {/* Featured wine block */}
      <div className="flex flex-col gap-6">
        <h2 className="font-serif text-2xl md:text-3xl text-primary border-b border-border/40 pb-4">
          {wine.wine_name}
        </h2>

        {wine.description && (
          <p className="font-serif text-lg text-muted-foreground leading-relaxed">
            {wine.description}
          </p>
        )}

        {/* Video embed or placeholder */}
        {wine.youtube_id ? (
          <div
            className="relative w-full overflow-hidden rounded-xl border border-border/50 shadow-sm"
            style={{ paddingBottom: "56.25%" }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${wine.youtube_id}`}
              title={wine.wine_name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              loading="lazy"
            />
          </div>
        ) : (
          <div
            className="relative w-full overflow-hidden rounded-xl border border-border/50 bg-card flex items-center justify-center"
            style={{ paddingBottom: "56.25%" }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <span className="font-serif text-xl text-muted-foreground">Video coming soon</span>
              <span className="text-sm text-muted-foreground/60">
                Add the YouTube ID via the admin panel to publish
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
