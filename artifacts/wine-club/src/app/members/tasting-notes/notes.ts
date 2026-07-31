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
  },

  "cabernet-sauvignon": {
    // Add vintages here as content is provided
  },

  "cabernet-franc": {
    // Add vintages here as content is provided
  },
};

export function getTastingNote(
  slug: string,
  year: number
): TastingNoteContent | null {
  return TASTING_NOTE_CONTENT[slug]?.[year] ?? null;
}
