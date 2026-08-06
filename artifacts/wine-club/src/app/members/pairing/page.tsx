"use client";

import { useState } from "react";
import Image from "next/image";

const BLUE      = "#1B3448";
const GOLD      = "#C49A35";
const GOLD_DARK = "#9C7A3D";
const OFF_WHITE = "#EDEAE2";
const MUTED     = "rgba(237,234,226,0.62)";

const recipes = [
  {
    wine:       "Merlot",
    label:      "J.O. Sullivan Founder's Reserve Merlot",
    dish:       "Herb-Crusted Rack of Lamb",
    subtitle:   "with Blackberry–Merlot Sauce",
    tagline:    "A refined pairing that brings out the Merlot's dark fruit, savory herbs, and velvety texture.",
    serves:     4,
    image:      "/merlot-recipe-card.webp",
    imageAlt:   "Herb-Crusted Rack of Lamb with Blackberry–Merlot Sauce recipe card",
    sections: [
      {
        heading: "Lamb",
        items: [
          "2 racks of lamb, about 1½ pounds each",
          "2 tbsp Dijon mustard",
          "3 cloves garlic, minced",
          "1 tbsp chopped rosemary",
          "1 tbsp chopped thyme",
          "1 tsp kosher salt",
          "½ tsp black pepper",
          "2 tbsp olive oil",
        ],
      },
      {
        heading: "Blackberry–Merlot Sauce",
        items: [
          "1 cup blackberries",
          "1 cup dry Merlot",
          "1 cup beef or lamb stock",
          "1 tsp balsamic vinegar",
          "1 tsp honey",
          "1 tbsp cold unsalted butter",
          "Salt and pepper to taste",
        ],
      },
    ],
    instructions: [
      "Remove lamb from refrigerator 30 minutes before cooking. Preheat oven to 425°F.",
      "Combine garlic, rosemary, thyme, salt, pepper, and olive oil.",
      "Sear lamb, fat side down, in a hot oven-safe skillet for 3 minutes. Turn and sear other side for 2 minutes.",
      "Brush with Dijon mustard and press herb mixture over the surface.",
      "Roast for 15–20 minutes, or until internal temperature reaches 125–130°F for medium-rare.",
      "Transfer lamb to a cutting board and rest for 10 minutes.",
      "For the sauce: Sauté shallot in the lamb skillet over medium heat until softened.",
      "Add Merlot and scrape up browned bits. Reduce by half.",
      "Add stock, blackberries, balsamic vinegar, and honey. Simmer until sauce lightly coats the back of a spoon.",
      "Press some berries to break them; leave others whole.",
      "Remove from heat and whisk in cold butter. Season with salt and pepper.",
      "Slice lamb into chops and serve with sauce alongside.",
    ],
    serveWith:  "Creamy polenta, roasted mushrooms, or celery-root purée.",
    whyItWorks: "The lamb's richness softens the wine's tannins, while rosemary and thyme echo its herbal character. Blackberry highlights the Merlot's bramble and blue-fruit profile.",
  },
  {
    wine:       "Cabernet Sauvignon",
    label:      "J.O. Sullivan Founder's Reserve Cabernet Sauvignon",
    dish:       "Coffee-and-Herb-Crusted New York Strip",
    subtitle:   "with Wild Mushroom Bordelaise",
    tagline:    "A bold pairing that matches the Cabernet Sauvignon's depth, structure, and savory complexity.",
    serves:     4,
    image:      "/cabernet-recipe-card.webp",
    imageAlt:   "Coffee-and-Herb-Crusted New York Strip with Wild Mushroom Bordelaise recipe card",
    sections: [
      {
        heading: "Steaks",
        items: [
          "4 New York strip steaks, 10–12 oz each",
          "1 tbsp finely ground espresso",
          "1 tsp unsweetened cocoa",
          "1 tsp chopped rosemary",
          "1 tsp cracked black pepper",
          "1½ tsp kosher salt",
          "1 tbsp neutral oil",
          "2 tbsp unsalted butter",
          "2 garlic cloves, crushed",
          "2 thyme sprigs",
        ],
      },
      {
        heading: "Wild Mushroom Bordelaise",
        items: [
          "8 oz mixed mushrooms, sliced",
          "1 small shallot, diced",
          "1 cup dry red wine",
          "1½ cups beef or veal stock",
          "1 tsp tomato paste",
          "1 thyme sprig",
          "1 tbsp cold unsalted butter",
          "Salt and pepper to taste",
        ],
      },
    ],
    instructions: [
      "Remove steaks from refrigerator 30–45 minutes before cooking.",
      "Combine espresso, cocoa, rosemary, pepper, and salt.",
      "Pat steaks dry and apply seasoning evenly.",
      "Heat skillet over high heat. Add oil and sear steaks 3–4 minutes per side.",
      "Reduce heat to medium. Add butter, garlic, and thyme. Baste for 1–2 minutes.",
      "Cook to internal temperature of 125–130°F for medium-rare. Rest 8 minutes.",
      "In same pan, sauté mushrooms until deeply browned.",
      "Add shallot and cook until softened.",
      "Stir in tomato paste and cook 30 seconds.",
      "Add wine and scrape up browned bits. Reduce until nearly syrupy.",
      "Add stock and thyme. Simmer until reduced by half and sauce thickens.",
      "Remove thyme and whisk in cold butter. Season to taste.",
      "Slice steak and serve with mushrooms and sauce.",
    ],
    serveWith:  "Pommes purée, crispy roasted potatoes, or charred broccolini.",
    whyItWorks: "The steak's protein and fat meet the Cabernet's tannin and structure. Espresso and cocoa enhance its dark, savory notes while the mushrooms deepen its complexity.",
  },
];

function Rule() {
  return (
    <div className="flex items-center gap-4 my-2">
      <div className="flex-1 h-px" style={{ background: "rgba(196,154,53,0.25)" }} />
      <div className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD_DARK }} />
      <div className="flex-1 h-px" style={{ background: "rgba(196,154,53,0.25)" }} />
    </div>
  );
}

export default function PairingPage() {
  const [active, setActive] = useState(0);
  const recipe = recipes[active];

  return (
    <div className="min-h-screen pb-20" style={{ background: BLUE }}>

      {/* Header */}
      <div
        className="px-6 py-14 text-center"
        style={{ borderBottom: "1px solid rgba(196,154,53,0.15)" }}
      >
        <p
          className="font-serif text-xs tracking-[0.22em] uppercase mb-4"
          style={{ color: GOLD }}
        >
          Founder's Vault
        </p>
        <h1
          className="font-serif mb-4"
          style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 400, color: OFF_WHITE }}
        >
          Pairing &amp; Recipes
        </h1>
        <p className="font-serif text-base max-w-xl mx-auto leading-relaxed" style={{ color: MUTED }}>
          Recipes developed to complement the character of each Founder's Reserve wine.
        </p>
      </div>

      {/* Wine tabs */}
      <div className="flex justify-center gap-2 px-6 pt-10 pb-2">
        {recipes.map((r, i) => (
          <button
            key={r.wine}
            onClick={() => setActive(i)}
            className="font-serif text-sm md:text-base px-7 py-2.5 rounded-full transition-all"
            style={
              active === i
                ? { background: GOLD, color: BLUE, fontWeight: 600, letterSpacing: "0.06em" }
                : {
                    background: "transparent",
                    color: MUTED,
                    border: "1px solid rgba(196,154,53,0.35)",
                    letterSpacing: "0.06em",
                  }
            }
          >
            {r.wine}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 pt-12 space-y-14">

        {/* Wine label + dish intro */}
        <div className="text-center space-y-3">
          <p
            className="font-serif text-xs tracking-[0.18em] uppercase"
            style={{ color: GOLD }}
          >
            {recipe.label}
          </p>
          <h2
            className="font-serif leading-tight"
            style={{ fontSize: "clamp(1.7rem,4vw,2.4rem)", fontWeight: 400, color: OFF_WHITE }}
          >
            {recipe.dish}
          </h2>
          <p className="font-serif text-lg italic" style={{ color: GOLD_DARK }}>
            {recipe.subtitle}
          </p>
          <p className="font-serif text-base leading-relaxed max-w-lg mx-auto pt-1" style={{ color: MUTED }}>
            {recipe.tagline}
          </p>
        </div>

        {/* Recipe card image */}
        <div
          className="rounded-xl overflow-hidden shadow-2xl"
          style={{ border: "1px solid rgba(196,154,53,0.18)" }}
        >
          <Image
            src={recipe.image}
            alt={recipe.imageAlt}
            width={780}
            height={1040}
            className="w-full h-auto"
            priority
          />
        </div>

        <Rule />

        {/* Full recipe details */}
        <div className="space-y-10">

          {/* Serves */}
          <p
            className="text-center font-serif text-sm tracking-[0.18em] uppercase"
            style={{ color: GOLD }}
          >
            Serves {recipe.serves}
          </p>

          {/* Ingredients */}
          <div>
            <h3
              className="font-serif text-xl mb-6 tracking-wide"
              style={{ color: OFF_WHITE }}
            >
              Ingredients
            </h3>
            <div className="grid sm:grid-cols-2 gap-8">
              {recipe.sections.map((section) => (
                <div key={section.heading}>
                  <p
                    className="font-serif text-xs tracking-[0.16em] uppercase mb-3"
                    style={{ color: GOLD }}
                  >
                    {section.heading}
                  </p>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="font-serif text-sm flex gap-2 leading-snug"
                        style={{ color: MUTED }}
                      >
                        <span style={{ color: GOLD_DARK, flexShrink: 0 }}>·</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <h3
              className="font-serif text-xl mb-6 tracking-wide"
              style={{ color: OFF_WHITE }}
            >
              Instructions
            </h3>
            <ol className="space-y-4">
              {recipe.instructions.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span
                    className="font-serif text-sm shrink-0 w-6 text-right"
                    style={{ color: GOLD, paddingTop: "0.05rem" }}
                  >
                    {i + 1}.
                  </span>
                  <p className="font-serif text-sm leading-relaxed" style={{ color: MUTED }}>
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Serve with + Why it works */}
          <div
            className="grid sm:grid-cols-2 gap-6 rounded-xl p-6"
            style={{ background: "rgba(196,154,53,0.07)", border: "1px solid rgba(196,154,53,0.15)" }}
          >
            <div>
              <p
                className="font-serif text-xs tracking-[0.16em] uppercase mb-2"
                style={{ color: GOLD }}
              >
                Serve With
              </p>
              <p className="font-serif text-sm leading-relaxed" style={{ color: MUTED }}>
                {recipe.serveWith}
              </p>
            </div>
            <div>
              <p
                className="font-serif text-xs tracking-[0.16em] uppercase mb-2"
                style={{ color: GOLD }}
              >
                Why It Works
              </p>
              <p className="font-serif text-sm leading-relaxed" style={{ color: MUTED }}>
                {recipe.whyItWorks}
              </p>
            </div>
          </div>

        </div>

        <Rule />

      </div>
    </div>
  );
}
