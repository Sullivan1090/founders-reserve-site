// THE ARRIVAL — default post-login landing page
//
// Add the YouTube video IDs below once the videos are uploaded to the channel.
// Replace the empty string "" with the video ID (the part after ?v= in the URL).

const WINES = [
  {
    title: "2023 J.O. Sullivan Founder's Reserve Cabernet Sauvignon",
    youtubeId: "", // ← paste YouTube video ID here
  },
  {
    title: "2023 J.O. Sullivan Founder's Reserve Merlot",
    youtubeId: "", // ← paste YouTube video ID here
  },
];

export default function ArrivalPage() {
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

      {/* Wine video blocks */}
      <div className="flex flex-col gap-16">
        {WINES.map((wine) => (
          <div key={wine.title} className="flex flex-col gap-5">
            {/* Wine title */}
            <h2 className="font-serif text-2xl md:text-3xl text-primary border-b border-border/40 pb-4">
              {wine.title}
            </h2>

            {/* Video embed or placeholder */}
            {wine.youtubeId ? (
              <div
                className="relative w-full overflow-hidden rounded-xl border border-border/50 shadow-sm"
                style={{ paddingBottom: "56.25%" }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${wine.youtubeId}`}
                  title={wine.title}
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
                  <span className="text-sm text-muted-foreground/60">Add the YouTube ID to page.tsx to publish</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
