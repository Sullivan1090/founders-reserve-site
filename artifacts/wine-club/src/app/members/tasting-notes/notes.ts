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
