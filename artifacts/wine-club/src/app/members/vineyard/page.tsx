export default function VineyardPage() {
  return (
    <div className="container mx-auto px-6 py-12 md:py-16 max-w-4xl">

      {/* Header */}
      <div className="mb-10">
        <h1
          className="font-serif leading-snug mb-8"
          style={{
            color: "#1B3448",
            fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
            fontWeight: 400,
          }}
        >
          The Sullivan Rutherford Estate at Galleron Rd, Rutherford
        </h1>

        {/* Gold rule under title */}
        <div style={{ width: "3rem", height: "2px", background: "#8B6726", marginBottom: "2rem" }} />

        {/* Description paragraphs */}
        <div className="space-y-5" style={{ maxWidth: "72ch" }}>
          <p
            className="font-serif leading-relaxed"
            style={{ color: "#6E6960", fontSize: "1.1rem" }}
          >
            The Sullivan Rutherford Estate was shaped over millions of years as runoff from Spring
            Mountain and the surrounding hills carried gravel, sand, and sediment onto the valley
            floor. Over time, these deposits created deep, well-drained gravelly sandy loam soils
            that sit slightly elevated above the surrounding landscape, allowing excess water to move
            freely through the profile while naturally limiting vine vigor.
          </p>
          <p
            className="font-serif leading-relaxed"
            style={{ color: "#6E6960", fontSize: "1.1rem" }}
          >
            That natural restraint is the foundation of the vineyard's character. Lower yields and
            smaller berries produce fruit with exceptional concentration, while the combination of
            warm valley-floor afternoons and cool evening breezes preserves freshness, structure, and
            aromatic precision. The result is a site that consistently delivers wines of remarkable
            depth without sacrificing energy or balance.
          </p>
          <p
            className="font-serif leading-relaxed"
            style={{ color: "#6E6960", fontSize: "1.1rem" }}
          >
            The wines are unmistakably Rutherford, defined by layered dark fruit, savory earth,
            mineral tension, and finely structured tannins. Powerful yet refined, they are an
            authentic expression of a place where geology, climate, and time come together to produce
            wines with unmistakable identity and lasting ageability.
          </p>
        </div>
      </div>

      {/* Block map */}
      <div className="mt-10">
        <p
          className="uppercase tracking-widest mb-4"
          style={{ color: "#8B6726", fontSize: "0.7rem", fontWeight: 600 }}
        >
          Vineyard Block Map
        </p>
        <div
          className="rounded-xl overflow-hidden border"
          style={{ borderColor: "rgba(139,103,38,0.25)" }}
        >
          <img
            src="/vineyard-block-map.jpg"
            alt="Sullivan Vineyard aerial block map showing blocks A1 through L at 1090 Galleron Rd, Rutherford"
            className="w-full h-auto block"
            style={{ display: "block" }}
          />
        </div>
      </div>

    </div>
  );
}
