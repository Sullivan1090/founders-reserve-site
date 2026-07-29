// Titles and thumbnails fetched from YouTube oEmbed at build time.
// Order is preserved as supplied (oldest → newest).
const VIDEOS = [
  { id: "vn0bm-BVzfQ",    title: "April 7, 2025" },
  { id: "Euq9H8fpZyU",    title: "April 22, 2025" },
  { id: "3jxLsjUpO3Y",    title: "April 22, 2025" },
  { id: "mKMhR1aaQk8",    title: "April 28, 2025" },
  { id: "Ony4bxE1WG0",    title: "May 19, 2025" },
  { id: "gUe6Qb8O4N4",    title: "June 6, 2025" },
  { id: "P3ZPBQbkhCE",    title: "June 13, 2025" },
  { id: "Jm---TCZc8M",    title: "July 3, 2025" },
  { id: "eUknGd292cc",    title: "July 23, 2025" },
  { id: "AI40yfP-VMs",    title: "August 14, 2025" },
  { id: "lCVBGX3RRJI",    title: "September 15, 2025" },
  { id: "MaRiT-8h71Y",    title: "October 22, 2025" },
  { id: "P48EgFO4gbY",    title: "November 18, 2025" },
  { id: "o8B6NNu8Wco",    title: "January 14, 2026" },
  { id: "IAiSAb6InBE",    title: "March 6, 2026" },
  { id: "dEgvdXOvn2g",    title: "May 20, 2026" },
  { id: "1oqT-_tyaQQ",    title: "July 21, 2026" },
];

export default function ConstructionPage() {
  return (
    <div className="container mx-auto px-6 py-12 md:py-16">
      {/* Header */}
      <div className="mb-12 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6">Construction</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          An intimate look at the building of Sullivan Rutherford Estate — from the first
          footings to the finishing details. Each video captures a milestone on the journey
          from vision to winery.
        </p>
      </div>

      {/* Video grid — two columns on md+, single on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {VIDEOS.map((video, i) => (
          <div key={video.id} className="flex flex-col gap-3">
            {/* Title / date label above the player */}
            <div className="flex items-baseline gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="font-serif text-lg text-primary leading-snug">
                {video.title}
              </h2>
            </div>

            {/* YouTube embed */}
            <div className="relative w-full overflow-hidden rounded-xl border border-border/50 shadow-sm"
                 style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
