// Titles and thumbnails fetched from YouTube oEmbed at build time.
// Order is preserved as supplied (oldest → newest).
const VIDEOS = [
  { id: "vn0bm-BVzfQ",    title: "April 7, 2025" },
  { id: "Euq9H8fpZyU",    title: "April 22, 2025" },
  { id: "3jxLsjUpO3Y",    title: "April 22, 2025" },
  { id: "mKMhR1aaQk8",    title: "Pouring the Footings!" },
  { id: "Ony4bxE1WG0",    title: "Pedestals / Knife Plates" },
  { id: "gUe6Qb8O4N4",    title: "Underground Infrastructure at the Winery – Final Look Before the Slab" },
  { id: "P3ZPBQbkhCE",    title: "Winery Construction Update: Gravel Placement Before Concrete Slab Pour" },
  { id: "Jm---TCZc8M",    title: "Winery Construction Milestone: Concrete Slab Poured After 8 Years of Planning" },
  { id: "eUknGd292cc",    title: "Framing" },
  { id: "AI40yfP-VMs",    title: "Rising Walls, Lasting Legacy" },
  { id: "lCVBGX3RRJI",    title: "Rising Columns, Defining Legacy!" },
  { id: "MaRiT-8h71Y",    title: "The Roof Takes Shape" },
  { id: "P48EgFO4gbY",    title: "The Shift Inward: New Progress on the Winery Construction" },
  { id: "o8B6NNu8Wco",    title: "Windows Change Everything" },
  { id: "IAiSAb6InBE",    title: "Building a Napa Valley Winery: The Infrastructure You'll Never See" },
  { id: "dEgvdXOvn2g",    title: "Sealing In the Future of Winemaking" },
  { id: "1oqT-_tyaQQ",    title: "Roof Complete & Interiors Coming to Life" },
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
