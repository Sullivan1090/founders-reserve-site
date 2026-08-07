import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { NotificationOptIn } from "@/components/notification-opt-in";
import VimeoPlayer from "@/components/VimeoPlayer";

const GOLD      = "#C49A35";
const GOLD_DARK = "#9C7A3D";
const BLUE      = "#1B3448";
const CREAM     = "#EDEAE2";

const CAB_2023_NOTES = "The 2023 J.O. Sullivan Founder's Reserve Cabernet Sauvignon is the product of patience, observation, and an unwavering commitment to detail. Drawn from some of the estate's lowest-yielding vines, it captures the concentration and character that only come from fruit pushed to fully express its site. Dark currant, black plum, graphite, and dried sage emerge in layers, woven together by the earthy minerality that defines Rutherford. There is depth from the outset, but also restraint. Nothing competes for attention. Instead, each element finds its place, creating a wine that feels complete rather than assembled. The structure is firm and finely shaped, carrying a density of fruit that never loses its sense of energy. Savory undertones, crushed stone, and fresh acidity provide balance and direction, allowing the wine to unfold gradually and with purpose. This is a wine built through countless small decisions, each made in pursuit of a singular goal: to capture the vineyard as completely and honestly as possible. The result is a Cabernet Sauvignon of depth, precision, and quiet confidence.";


export default async function ArrivalPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

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

  const { data: arrival } = await supabase
    .from("featured_arrival")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  const wine = arrival ?? {
    wine_name:  "2023 J.O. Sullivan Founder's Reserve Cabernet Sauvignon",
    vintage:    "2023",
    youtube_id: "vimeo:1216519315",
    description: "",
  };

  // Detect vimeo: prefix — admin can store "vimeo:VIDEOID" in the youtube_id field
  const rawId       = wine.youtube_id ?? "";
  const isVimeo     = rawId.startsWith("vimeo:");
  const isCab2023   = wine.vintage === "2023" && wine.wine_name.toLowerCase().includes("cabernet");

  // For the 2023 Cab Sauv, always show the Vimeo intro video if no other video is set
  const vimeoId     = isVimeo
    ? rawId.replace("vimeo:", "")
    : (!rawId && isCab2023 ? "1216519315" : null);
  const youtubeId   = !isVimeo && rawId ? rawId : null;
  const hasVideo    = !!(vimeoId || youtubeId);

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

      {/* Notification opt-in */}
      <NotificationOptIn />

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

        {/* Video embed */}
        {hasVideo ? (
          <>
            {vimeoId ? (
              <VimeoPlayer videoId={vimeoId} title={wine.wine_name} />
            ) : (
              <div
                className="relative w-full overflow-hidden rounded-xl border border-border/50 shadow-sm"
                style={{ paddingBottom: "56.25%" }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  title={wine.wine_name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                />
              </div>
            )}
          </>
        ) : (
          <div
            className="relative w-full overflow-hidden rounded-xl border border-border/50 bg-card flex items-center justify-center"
            style={{ paddingBottom: "56.25%" }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <span className="font-serif text-xl text-muted-foreground">Video coming soon</span>
              <span className="text-sm text-muted-foreground/60">
                Add the YouTube ID or vimeo:ID via the admin panel to publish
              </span>
            </div>
          </div>
        )}

        {/* 2023 Cab Sauv tasting notes */}
        {isCab2023 && (
          <div
            className="rounded-2xl overflow-hidden mt-4"
            style={{ background: BLUE, border: "1px solid rgba(196,154,53,0.25)" }}
          >
            {/* Header */}
            <div className="px-8 pt-8 pb-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px" style={{ background: "rgba(196,154,53,0.3)" }} />
                <p
                  className="font-serif tracking-widest uppercase text-xs shrink-0"
                  style={{ color: GOLD, letterSpacing: "0.22em" }}
                >
                  Tasting Notes
                </p>
                <div className="flex-1 h-px" style={{ background: "rgba(196,154,53,0.3)" }} />
              </div>
              <h3
                className="font-serif text-center"
                style={{ color: CREAM, fontSize: "1.35rem" }}
              >
                2023 J.O. Sullivan Founder's Reserve<br />
                <span style={{ color: GOLD_DARK }}>Cabernet Sauvignon</span>
              </h3>
            </div>

            {/* Notes body */}
            <div className="px-8 pb-8 space-y-8">
              <p
                className="font-serif leading-relaxed"
                style={{ color: CREAM, fontSize: "1.05rem", opacity: 0.9 }}
              >
                {CAB_2023_NOTES}
              </p>

              {/* Bottom rule */}
              <div className="flex items-center gap-4 pt-2">
                <div className="flex-1 h-px" style={{ background: "rgba(196,154,53,0.25)" }} />
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD_DARK }} />
                <div className="flex-1 h-px" style={{ background: "rgba(196,154,53,0.25)" }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
