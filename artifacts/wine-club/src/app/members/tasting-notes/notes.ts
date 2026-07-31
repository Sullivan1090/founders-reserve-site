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
