/**
 * Tasting note content, keyed by wine slug then vintage year.
 * Add each vintage here as content becomes available.
 */

export interface TastingNoteContent {
  notes: string;
  details?: {
    blend?: string;
    oak?: string;
    ta?: string;
    ph?: string;
    alcohol?: string;
    cases?: string;
    vineyard?: string;
    clones?: string;
    vineyardManager?: string;
  };
}

export const TASTING_NOTE_CONTENT: Record<string, Record<number, TastingNoteContent>> = {
  merlot: {
    2022: {
      notes:
        "Deep, dark, and unapologetically rich, this wine unfolds in deliberate layers of intensity. Brambleberry, ripe plum, and crushed violet lead into notes of espresso, graphite, and wild herbs. The palate is full-bodied and commanding with a seamless, velvet-like texture. Dark cherry and blueberry fill the mid-palate while finely integrated tannins build length, structure, and poise through the finish. Generous yet deeply rooted, this is a Merlot defined not simply by fruit, but by depth, power, and unmistakable presence.",
      details: {
        blend:            "86% Merlot, 11% Cabernet Sauvignon, 3% Cabernet Franc",
        oak:              "80% New French Oak",
        ta:               "5.8 g/L",
        ph:               "3.70",
        alcohol:          "14.8%",
        cases:            "500",
        vineyard:         "Sullivan Rutherford Estate",
        clones:           "Merlot 3, 1, 15 · Cabernet Franc 1 · Cabernet Sauvignon 4",
        vineyardManager:  "Mike Wolf",
      },
    },

    2021: {
      notes:
        "Savor the nuanced charm of the 2021 J.O. Sullivan Founder's Reserve Merlot — an absolute masterpiece. Revealing intricate notes of blueberries, hints of tobacco leaves, and a whisper of toasty vanilla, it gracefully unfolds. Dense yet understated, matured tannins and integrated acidity dance in harmony. The sophisticated finish arrives with refined elegance and polished subtlety. In every sip, the commitment to Merlot excellence is undeniable. This vintage greatly champions the noble variety, a quiet celebration of the estate's unwavering commitment to the artistry and distinction of Merlot.",
      details: {
        blend:            "89% Merlot, 7% Cabernet Sauvignon, 4% Cabernet Franc",
        oak:              "82% New French Oak, 22 months",
        ta:               "5.7 g/L",
        ph:               "3.70",
        alcohol:          "14.8%",
        cases:            "500",
        clones:           "Merlot 1, 3, 5 · Cabernet Sauvignon 4 · Cabernet Franc 1",
        vineyardManager:  "Mike Wolf",
      },
    },

    2020: {
      notes:
        "There is absolutely no Merlot in the Napa Valley that can compare to this wine. Structured, dense, fresh, and built to age, the 2020 J.O. Sullivan Founders Reserve Merlot offers something that no other Merlot can — complexity. There is an elegance to this Merlot that is recognizable, but it is more than that: it is a powerhouse that delivers on all levels. Fresh acidity carries the wine and brings it into focus, weight and juiciness give it a supple character, and structure provides a harmonious foundation knitting all the components together. This is what Merlot is supposed to be. Drink over the next 25 years.",
      details: {
        blend:            "95% Merlot, 5% Cabernet Franc",
        oak:              "80% New French Oak",
        ta:               "5.9 g/L",
        ph:               "3.70",
        alcohol:          "14.8%",
        cases:            "280",
        vineyard:         "Sullivan Rutherford Estate",
        clones:           "Merlot 1, 3, 15 · Cabernet Franc 1",
        vineyardManager:  "Mike Wolf",
      },
    },

    2019: {
      notes:
        "In a league of its own. This seriously built Merlot offers density and richness, yet the agility and freshness distinguishes it as a wine of great pedigree. The depths and layers keep expanding while the cocoa powder tannins melt across the palate giving a sense of sweetness. The classic savory notes of bitter chocolate and dry herb are an inherent signature of the vineyard. Blue fruits of bramble and blueberry are highlights of the vintage. This wine is the definition of luxury and should be enjoyed over the next 20 years.",
      details: {
        blend:            "89% Merlot, 8% Cabernet Sauvignon, 3% Cabernet Franc",
        oak:              "100% New French Oak",
        ta:               "5.6 g/L",
        ph:               "3.71",
        alcohol:          "14.8%",
        cases:            "300",
        clones:           "Merlot 1, 3, 15 · Cabernet Sauvignon 191 · Cabernet Franc 1",
        vineyardManager:  "Mike Wolf",
      },
    },

    2018: {
      notes:
        "Two vintages have passed, but the wait is over! The 2018 J.O. Sullivan Merlot is one of the most unique, interesting, and delicious Merlots produced to date. The structure and complexity that defines this Merlot is a reflection of the gravelly soil from which the fruit is grown. Grown in a warmer climate has shaped the fruit profile to be more generous, exotic, and giving. Constantly evolving and changing, it stimulates the senses to such a degree that one experience with this wine is not enough. Enjoy forever.",
      details: {
        blend:            "80% Merlot, 12% Cabernet Sauvignon, 8% Petit Verdot",
        oak:              "100% New French Oak",
        ta:               "5.4 g/L",
        ph:               "3.72",
        alcohol:          "14.8%",
        cases:            "235",
        clones:           "Merlot 1, 3, 15 · Cabernet Sauvignon 7 · Petit Verdot 400",
        vineyardManager:  "Paul Garvey",
      },
    },

    2015: {
      notes:
        "The 2015 Merlot pours a deep ruby, rimmed with a youthful violet glow. The nose unfurls with delicate red raspberry and a whisper of caramel, grounded by savory notes of rosemary and lavender. A silky entry gives way to rich dark cherry, lifted by a bright, sustaining acidity that carries through the length of the palate. Subtle notes of warm vanilla round the fruit, resolving into a lingering, bittersweet cocoa on a long, focused finish. Refined and expressive, this vintage is crafted for approachability upon release and pairs effortlessly across a range of dishes. Drink now through 2030.",
      details: {
        blend:            "95% Merlot, 5% Cabernet Sauvignon",
        oak:              "70% New French Oak",
        ta:               "5.8 g/L",
        ph:               "3.70",
        alcohol:          "14.8%",
        cases:            "230",
        clones:           "Merlot 3, 337 · Cabernet Sauvignon 7",
        vineyardManager:  "Paul Garvey",
      },
    },

    2014: {
      notes:
        "A sweetness of toffee and oak lifts immediately from the glass, followed by darker raspberry and red cherry, lending the wine an inviting sense of pleasure from the very first pour. Lush and juicy on the palate, powerful flavors of red plum, light caramel, and sweetened cranberry meld together seamlessly, while a bright thread of acidity lends this beautiful wine both focus and length. Beneath that richness runs an intensity and savory depth that has become a hallmark of the estate — a wine as powerful as it is graceful, and one that feels, unmistakably, saturated in the same passion from which it was made.",
      details: {
        blend:            "97% Merlot, 3% Cabernet Sauvignon",
        oak:              "100% New French Oak",
        ta:               "6.1 g/L",
        ph:               "3.68",
        alcohol:          "14.8%",
        cases:            "230",
        clones:           "Merlot 3 · Cabernet Sauvignon 4",
        vineyardManager:  "Paul Garvey",
      },
    },

    2013: {
      notes:
        "Sullivan has long been known for big, bold, extracted Merlots, and the 2013 J.O. Sullivan Founder's Reserve Merlot carries that legacy forward without compromise. Abundant cherry and raspberry burst from the glass, layered with vanilla and spice, while a subtle savory character runs beneath, lending the wine real depth and complexity. These same qualities carry through to the palate, wrapping it in a plushness that coats the mouth with a sense of sweetness. Yet for all its size and lushness, a bright vein of acidity brings focus, allowing the wine to linger long after the last sip. A wine built to reward patience, and to be enjoyed for years to come.",
      details: {
        blend:            "78% Merlot, 11% Cabernet Sauvignon, 11% Cabernet Franc",
        oak:              "71% New French Oak",
        ta:               "5.8 g/L",
        ph:               "3.73",
        alcohol:          "14.8%",
        cases:            "240",
        clones:           "Merlot 3 · Cabernet Sauvignon 191 · Cabernet Franc 1",
      },
    },
  },

  "cabernet-sauvignon": {
    2023: {
      notes:
        "The 2023 J.O. Sullivan Founder's Reserve Cabernet Sauvignon is the product of patience, observation, and an unwavering commitment to detail. Drawn from some of the estate's lowest-yielding vines, it captures the concentration and character that only come from fruit pushed to fully express its site. Dark currant, black plum, graphite, and dried sage emerge in layers, woven together by the earthy minerality that defines Rutherford. There is depth from the outset, but also restraint. Nothing competes for attention. Instead, each element finds its place, creating a wine that feels complete rather than assembled. The structure is firm and finely shaped, carrying a density of fruit that never loses its sense of energy. Savory undertones, crushed stone, and fresh acidity provide balance and direction, allowing the wine to unfold gradually and with purpose. This is a wine built through countless small decisions, each made in pursuit of a singular goal: to capture the vineyard as completely and honestly as possible. The result is a Cabernet Sauvignon of depth, precision, and quiet confidence.",
      details: {
        blend:           "88% Cabernet Sauvignon, 12% Petit Verdot",
        oak:             "80% New French Oak",
        alcohol:         "14.8%",
        ta:              "5.7 g/L",
        ph:              "3.75",
        cases:           "400",
        clones:          "191, 7 – CS, 400 – PV",
        vineyardManager: "Domenick Bianco",
      },
    },

    2022: {
      notes:
        "The 2022 Founder's Reserve Cabernet Sauvignon is layered and introspective, with a core that reveals itself slowly. Aromatically dense, it opens with dark forest fruits, spiced red fruit, graphite, and crushed bark. There's a quiet intensity — inky, savory, and grounded in Rutherford earth. On the palate, it's composed and full-bodied, with tightly knit tannins and acidity that carries without disruption. Notes of ripe plum, cocoa powder, minerality, and dry savory herbs create a layered, textured impression. Nothing feels overstated; the structure holds everything in balance, allowing the purity of the fruit to resonate alongside its more elemental undertones. This is a Cabernet built for the long arc, precise in its construction, expressive in its restraint, and rooted in the kind of detail that doesn't happen by chance.",
      details: {
        blend:           "90% Cabernet Sauvignon, 10% Petit Verdot",
        oak:             "80% New French Oak",
        alcohol:         "14.8%",
        ta:              "5.8 g/L",
        ph:              "3.80",
        cases:           "500",
        clones:          "191, 7, 4 – CS, 400 – PV",
        vineyardManager: "Mike Wolf",
      },
    },

    2021: {
      notes:
        "The 2021 J.O. Sullivan Founder's Reserve Cabernet Sauvignon is a profound masterpiece — an inky marvel of depth. Its enchanting aroma reveals distilled notes of elderberry, blackberry compote, and spice, with rich dark chocolate undertones. This dense Cabernet, with a tarry, structured profile, introduces minerality for a unique dimension. Meticulously crafted, flawless tannins seamlessly intertwine, striking a harmonious balance between opulence and grace. The sophistication and depth testify to the Estate's world-class soils, resulting in the most complete wine in its 50+ year history. Anticipate a journey of enjoyment over the next two decades.",
      details: {
        blend:           "89% Cabernet Sauvignon, 11% Petit Verdot",
        oak:             "80% New French Oak, aged 22 months",
        alcohol:         "14.8%",
        ta:              "5.8 g/L",
        ph:              "3.78",
        cases:           "500",
        clones:          "191, 7, 4 – CS, 400 – PV",
        vineyardManager: "Mike Wolf",
      },
    },

    2020: {
      notes:
        "The 2020 J.O. Sullivan Founder's Reserve Cabernet Sauvignon stands unrivaled in the realm of captivating wines. Its sheer intensity and concentrated flavors leave an indelible mark on the palate. The luxurious fusion of dark chocolate, black fruit, and savory minerality creates an enchanting taste experience that truly delights the senses. Imbued with an inky richness and flawless balance, each sip becomes a gratifying indulgence. The velvety cocoa powder tannins meld harmoniously with the luscious, black fruit-driven character of this Cabernet Sauvignon, infusing it with even greater depth. An everlasting impression is etched on the palate, making this wine an unforgettable delight.",
      details: {
        blend:           "87% Cabernet Sauvignon, 13% Petit Verdot",
        oak:             "100% New French Oak",
        alcohol:         "14.8%",
        ta:              "5.9 g/L",
        ph:              "3.77",
        cases:           "400",
        clones:          "191, 4, 7 – CS, 400 – PV",
        vineyardManager: "Mike Wolf",
      },
    },

    2019: {
      notes:
        "An absolutely stunning wine. This Cabernet Sauvignon is a pinnacle of Rutherford, highlighting one of the most unique and sought-after terroirs in the world. The concentration of dark fruit, minerality, and structure saturates the senses. There is an intense richness that is inherent in a wine of this caliber, but the balance of acid — which provides length and freshness — is a direct reflection of the phenomenal 2019 vintage. Time will continue to allow the J.O. Sullivan Founder's Reserve Cabernet Sauvignon to evolve and develop even more complex flavors and nuanced aromatics. Enjoy over the next 25 years.",
      details: {
        blend:           "91% Cabernet Sauvignon, 9% Petit Verdot",
        oak:             "79% New French Oak",
        alcohol:         "14.8%",
        ta:              "6.0 g/L",
        ph:              "3.79",
        cases:           "350",
        clones:          "191, 4, 7 – CS, 400 – PV",
        vineyardManager: "Mike Wolf",
      },
    },

    2018: {
      notes:
        "Our oldest block of Cabernet Sauvignon dominates this blend with a splash from some younger blocks that are starting to show true potential. Immediately the savory essence that is the pedigree of this wine is identifiable, but so is ripe brambleberry confection that adds layers and intensity that has never been identified before. The 2018 vintage has put its stamp on the J.O. Sullivan Cabernet Sauvignon and has unleashed characteristics that truly make the estate unique.",
      details: {
        blend:           "91% Cabernet Sauvignon, 9% Petit Verdot",
        oak:             "83% New French Oak",
        alcohol:         "14.8%",
        ta:              "5.4 g/L",
        ph:              "3.86",
        cases:           "350",
        clones:          "191, 4, 7 – CS, 400 – PV",
        vineyardManager: "Mike Wolf",
      },
    },

    2017: {
      notes:
        "Grapes grown from the oldest Cabernet Sauvignon vines on the estate — deeply rooted in the most well-drained soils — gave life to this magnificent wine. Wafting blueberries are intense and vibrant, weaving in and out of the incredible dark and savory chocolate that is the undeniable signature of this extraordinary creation. Easily caught up in its complexities and rich nature, a connection is truly made deep down as if two souls have become one. The best effort in 2017, and one that will not be forgotten for many years to come.",
      details: {
        blend:           "90% Cabernet Sauvignon, 10% Petit Verdot",
        oak:             "100% New French Oak",
        alcohol:         "14.8%",
        ta:              "6.1 g/L",
        ph:              "3.85",
        cases:           "250",
        clones:          "191, 4, 7 – CS, 400 – PV",
        vineyardManager: "Paul Garvey",
      },
    },

    2016: {
      notes:
        "The 2016 James O'Neil Cabernet Sauvignon is a defining expression of both the vintage and the Sullivan Estate. Layers of dark cherry, blackcurrant, and sweet baking chocolate unfold alongside subtle notes of vanilla, espresso, and crushed graphite, creating a wine of remarkable depth and complexity. Rich and expansive from the first sip, it fills the palate with concentrated fruit while bright natural acidity provides freshness, precision, and exceptional length. Fine-grained tannins give the wine structure without overshadowing its generosity, resulting in a Cabernet that is both powerful and effortlessly balanced. Built on purity, concentration, and elegance, the 2016 captures the character of an extraordinary vintage and the enduring pursuit of excellence that defines the estate.",
      details: {
        blend:           "95% Cabernet Sauvignon, 5% Petit Verdot",
        oak:             "80% New French Oak",
        alcohol:         "14.8%",
        ta:              "5.9 g/L",
        ph:              "3.85",
        cases:           "500",
        clones:          "191, 337, 35, 7 – CS, 400 – PV",
        vineyardManager: "Paul Garvey",
      },
    },

    2015: {
      notes:
        "Crafted in tribute to James O'Neil Sullivan, this Cabernet Sauvignon represents the highest expression of the estate and the philosophy that continues to shape every vintage. Deeply concentrated and beautifully structured, it possesses the depth and framework to evolve gracefully for decades, yet its refined tannins and seamless balance make it remarkably approachable today. Layers of blackberry and black cherry are woven together with the dusty minerality, savory herbs, and earthy character that define Rutherford. Rich and expansive without excess, the wine is driven as much by freshness and precision as it is by power — a Cabernet that speaks confidently of its place, balancing concentration with elegance in a way that only exceptional vineyards and extraordinary vintages can achieve.",
      details: {
        blend:           "100% Cabernet Sauvignon",
        oak:             "78% New French Oak",
        alcohol:         "14.8%",
        ta:              "5.8 g/L",
        ph:              "3.84",
        cases:           "230",
        clones:          "191 – CS",
        vineyardManager: "Paul Garvey",
      },
    },

    2014: {
      notes:
        "The wine opens with an unmistakable sense of depth. Dark chocolate and ripe plum lead the way, layered with cocoa powder, tobacco leaf, and worn leather that continue to unfold with time in the glass. There is an immediate feeling of power, but it's measured rather than overwhelming. Rich and expansive, the texture fills the palate with dark cherry, sweet vanilla, and finely woven tannins that give the wine both volume and precision. Despite its concentration, freshness carries the wine effortlessly, extending the finish and revealing new layers with every sip. This is a Cabernet built on confidence rather than excess — powerful, refined, and remarkably complete, capturing the balance between intensity and elegance that defines truly exceptional Napa Valley wines.",
      details: {
        blend:           "100% Cabernet Sauvignon",
        oak:             "100% New French Oak",
        alcohol:         "14.8%",
        ta:              "6.1 g/L",
        ph:              "3.77",
        cases:           "175",
        clones:          "191 – CS",
        vineyardManager: "Paul Garvey",
      },
    },

    2013: {
      notes:
        "From the first pour, this wine commands attention with remarkable depth and presence. Layers of developed plum and dark chocolate unfold alongside notes of toasted oak, subtle vanilla, and the savory minerality that has become the hallmark of the Sullivan Estate and the Rutherford appellation. There is undeniable power, yet it is matched by precision and refinement. Fine, resolved tannins create a texture reminiscent of cocoa powder, while a broad, generous palate carries both richness and freshness in perfect balance. The finish is long, seamless, and persistent, inviting another sip before the last impression has faded. Built with exceptional structure and balance, this is a wine that offers immediate enjoyment while possessing the depth and composure to evolve beautifully for years to come.",
      details: {
        blend:           "93% Cabernet Sauvignon, 7% Petit Verdot",
        oak:             "80% New French Oak",
        alcohol:         "14.8%",
        ta:              "5.7 g/L",
        ph:              "3.87",
        cases:           "285",
        clones:          "191 – CS, 400 – PV",
        vineyardManager: "Paul Garvey",
      },
    },
  },

  "cabernet-franc": {
    2021: {
      notes:
        "The 2021 J.O. Sullivan Founders Reserve Cabernet Franc exudes a blend of elegance and profound intensity, with a powerful presence that is unrivaled. Its bright, energetic aromas are laced with a touch of dried herbs, while hints of rhubarb and vibrant red fruit pierce through layers of dense, toasty dark chocolate. On the palate, it reveals a concentrated richness, with fine-grained tannins that elevate the savory bitter chocolate notes. This wine passionately showcases the exceptional terroir of Sullivan Rutherford Estate, leaving a lasting impression of depth and sophistication.",
      details: {
        blend:           "80% Cabernet Franc, 12% Merlot, 8% Cabernet Sauvignon",
        oak:             "100% New French Oak",
        alcohol:         "14.8%",
        ta:              "5.9 g/L",
        ph:              "3.76",
        cases:           "70",
        clones:          "1, 12 – CF, 15 – ME, 7 – CS",
        vineyardManager: "Mike Wolf",
      },
    },
    2022: {
      notes:
        "The 2022 Founder's Reserve Cabernet Franc reflects the distinct character of the gravel-rich soils at the front of the Rutherford estate — structured, perfumed, and tightly composed. The fruit leads with mulberry and dark plum, lifted by floral notes of lilac. Hints of sun-dried bay and black tea add dimension without overshadowing the wine's natural clarity. The palate is detailed and firm, shaped by remarkably fine tannins that carry flavor without excess weight. Each movement of flavor, texture, and structure is the result of a deliberate effort to elevate what the vineyard provides. The finish is long and composed, with energy that hums beneath its polish. This is not a reductive interpretation of Cabernet Franc. It is expressive, sculpted, and crafted to reveal nuance from first pour to final impression.",
      details: {
        blend:           "86% Cabernet Franc, 8% Cabernet Sauvignon, 6% Merlot",
        oak:             "100% New French Oak",
        alcohol:         "14.8%",
        ta:              "5.8 g/L",
        ph:              "3.78",
        cases:           "75",
        clones:          "1, 12 – CF, 7 – CS, 15 – ME",
        vineyardManager: "Mike Wolf",
      },
    },
  },
};

export function getTastingNote(
  slug: string,
  year: number
): TastingNoteContent | null {
  return TASTING_NOTE_CONTENT[slug]?.[year] ?? null;
}
