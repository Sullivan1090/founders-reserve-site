import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

// ─── Load the authoritative knowledge base from disk ─────────────────────────

function loadKnowledgeBase(): string {
  try {
    return readFileSync(
      join(process.cwd(), "content", "sullivan-knowledge", "index.md"),
      "utf-8"
    );
  } catch {
    return ""; // Fallback: inline knowledge below will still apply
  }
}

// ─── Inline wine & tasting-note details (supplement to the KB file) ──────────

const ESTATE_KNOWLEDGE = `
SULLIVAN RUTHERFORD ESTATE — FOUNDERS VAULT CONCIERGE KNOWLEDGE BASE

== ESTATE OVERVIEW ==
Sullivan Rutherford Estate produces small-lot Bordeaux-variety wines from three estate vineyards in Napa Valley. The flagship program is the Founder's Reserve allocation, offered exclusively to a small group of founding members through Founder's Vault.

== VINEYARDS ==

--- Galleron Road, Rutherford (Gravel and Sand) ---
The Sullivan Rutherford Estate was shaped over millions of years as runoff from Spring Mountain and the surrounding hills carried gravel, sand, and sediment onto the valley floor. Over time, these deposits created deep, well-drained gravelly sandy loam soils that sit slightly elevated above the surrounding landscape, allowing excess water to move freely through the profile while naturally limiting vine vigor.

That natural restraint is the foundation of the vineyard's character. Lower yields and smaller berries produce fruit with exceptional concentration, while the combination of warm valley-floor afternoons and cool evening breezes preserves freshness, structure, and aromatic precision. The result is a site that consistently delivers wines of remarkable depth without sacrificing energy or balance.

The wines are unmistakably Rutherford, defined by layered dark fruit, savory earth, mineral tension, and finely structured tannins. Powerful yet refined, they are an authentic expression of a place where geology, climate, and time come together to produce wines with unmistakable identity and lasting ageability. Located at 1090 Galleron Rd, Rutherford. Vineyard blocks A1 through L.

--- Crystal Springs Road, St. Helena (Iron and Glass) ---
Tucked into the foothills between Howell Mountain and Glass Mountain, Crystal Springs Vineyard occupies a unique volcanic valley shaped by ancient geologic forces. Its deep red, iron-rich soils, scattered with obsidian formed from cooling lava, are exceptionally well drained, naturally limiting vine vigor and allowing the vines to produce fruit of remarkable concentration and character.

Although St. Helena experiences some of Napa Valley's warmest daytime temperatures, Crystal Springs benefits from its distinctive position within this mountain corridor. As evening temperatures fall, cool air descends from the surrounding slopes and moves naturally through the valley, creating significant diurnal temperature shifts. This daily rhythm allows the fruit to achieve full ripeness while preserving freshness, natural acidity, and aromatic precision.

The combination of volcanic soils, mountain influences, and a naturally moderated climate makes Crystal Springs unlike any other site in the valley. It is a vineyard defined by energy, structure, mineral expression, and a purity that can only come from this remarkable landscape. Located at 391 Crystal Springs Rd, St. Helena. Vineyard blocks A through G.

--- Soda Canyon, Napa Valley (Ash and Tuff) ---
Situated in the southeastern foothills of Napa Valley, just north of the Coombsville appellation, Soda Canyon Vineyard is shaped by an ancient volcanic landscape unlike any other in the portfolio. Its distinctive rhyolitic tuff soils — formed from compressed volcanic ash — are naturally low in fertility and exceptionally well drained, encouraging balanced vines, small yields, and fruit of remarkable concentration.

The vineyard's location provides an ideal balance of warmth and freshness. Eastern exposure captures the morning sun, allowing the fruit to ripen fully, while its proximity to the southern end of Napa Valley welcomes cooling marine influences from San Pablo Bay. This combination of warm days, cool afternoons and evenings, and ash-derived soils creates a long, measured growing season that preserves natural acidity, structure, and aromatic purity.

Soda Canyon is a vineyard defined by restraint rather than power. The unique interplay of volcanic ash soils, cooling coastal influences, and low-vigor vines produces wines with exceptional energy, focus, and elegance — an expression of place that is both distinctive and unmistakably Napa Valley. Located at 1156 Soda Canyon Rd, Napa. Vineyard blocks 1A, 1B, 2A–2D, 3A.

== WINE LINEUP & VINTAGES ==

Founder's Reserve Merlot — available vintages: 2023, 2022, 2021, 2020, 2019, 2018, 2015, 2014, 2013
Founder's Reserve Cabernet Sauvignon — available vintages: 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013
Founder's Reserve Cabernet Franc — available vintages: 2022, 2021
Rosé — available vintages: 2024, 2023, 2022, 2021, 2020, 2019
Chardonnay — available vintages: 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015

== TASTING NOTES ==

--- 2024 Sullivan Rutherford Estate Rosé ---
Tasting Note: The 2024 Rosé is all about vibrancy and freshness. Lighter in color than previous vintages, it delivers unmatched energy and precision. The nose is alive with bright minerality, ripe peaches, and a hint of wild raspberry. On the palate, it's electric — bursting with sun-ripened strawberries, zesty citrus, and crisp acidity that keeps every sip refreshing and focused. A subtle floral lift lingers through the finish, adding elegance to its energetic core. This is the most dynamic rosé produced at the estate — pure, refreshing, and impossible to put down.
Blend: 81% Merlot, 19% Malbec
Oak: None
TA: 6.5 g/L | pH: 3.21 | Alcohol: 13.3% | Cases produced: 330
Vineyard: Sullivan Rutherford Estate
Clones: Merlot 15 · Malbec 3
Vineyard Manager: Domenic Bianco

--- 2023 Sullivan Rutherford Estate Rosé ---
Vintage Context: The 2023 vintage was a standout year for Sullivan Rutherford Estate. Generous winter and spring rains replenished the vineyards, ensuring healthy vines and saturated soils. Throughout the mild, sun-drenched summer, temperatures hovered consistently between 72–75°F, fostering optimal grape development. Despite challenges of mildew pressure caused by the cooler vintage, the vineyard team's diligence ensured that the vines produced loose clusters and small, concentrated berries.
Tasting Note: A radiant coral hue reminiscent of a sunset sky. The aromatics are rich with mineral nuances, ripe stone fruit aromas, and the subtle sweetness of raspberries. Bursting with freshly picked strawberries and bright acidity, it offers a mouth-watering, quenching refreshment. Each sip reveals a delightful medley of juicy, tropical citrus, and subtle floral fragrances. This rosé exudes energy and vitality, promising a vibrant tasting journey that leaves a lasting impression of pure enjoyment.
Blend: 100% Merlot
Oak: None
Alcohol: 13.2% | Cases produced: 380
Vineyard: Sullivan Rutherford Estate

--- 2022 Sullivan Rutherford Estate Rosé ---
Tasting Note: A true gem. Bursting with bright flavors of red fruit and zesty lime, this 100% Merlot Rosé is juicy and quenching. Fresh strawberries mingled with cool, clean, tangy acidity amplify the inherent minerality that Sullivan Rutherford Estate is known for, making for a perfectly balanced and refreshing wine. With its sophisticated blend of flavors and impeccable craftsmanship, the 2022 Rosé is a wine for all occasions.
Blend: 100% Merlot
Oak: None
Vineyard: Sullivan Rutherford Estate

--- 2019 Sullivan Rutherford Estate Rosé ---
Tasting Note: Fresh cherry, blood orange, quenching, juicy, bright. Explosive and inundating aromas of the freshest red fruit mark the undeniable characteristics of Malbec. Specifically grown from the estate to produce a rosé, this is a unique way to express all the sensory qualities that Malbec has to offer. The berries were picked early in the morning to preserve fresh acidity. Once picked, the grapes were destemmed and allowed to soak in their own juices, extracting aroma, flavor, and just enough color to give the wine its identity. After soaking, the remaining juice was pressed off the skins into stainless fermenters for 3 days of cold settling. The juice was then fermented slowly at low temperature for 30 days — a technique used to preserve freshness. Once fermentation was complete, the wine resolved for 3 months before bottling.
Variety: 100% Malbec
Oak: None (stainless steel only)
Vineyard: Sullivan Rutherford Estate

--- 2023 Sullivan Rutherford Estate Chardonnay ---
Tasting Note: The 2023 Chardonnay carries a quiet tension from the beginning. A distinct mineral line gives the wine shape and focus, creating energy before it fully opens. Fresh stone fruit and yellow tropical fruit unfold in layers, balanced by a subtle reduction that brings complexity and keeps the wine from feeling overly polished or predictable. There is richness and texture throughout, but natural acidity keeps everything lifted, precise, and moving with intention. What stands out most is the balance between depth and energy — the wine has weight but never feels heavy. It stretches with length and drive, leaving behind freshness and persistence rather than excess. This is a serious Chardonnay shaped more by instinct, curiosity, and attention than by formula. A wine that was allowed to evolve naturally and become its own expression rather than being pushed toward a predetermined style.
Variety: 100% Chardonnay
Oak: 60% New French Oak, 100% barrel fermented
Alcohol: 14.5% | TA: 6.1 g/L | pH: 3.32 | Cases produced: 330
Vineyards: Sullivan Rutherford Estate, Hyde Vineyards

--- 2018 Sullivan Rutherford Estate Chardonnay ---
Tasting Note: Ripe pear, toasty vanilla, lemon rind, and supple. Taking advantage of a site that allows for complete ripeness, while diligently crafting and respecting the unique expression this wine has to offer.
Variety: 100% Chardonnay
Oak: 60% New French Oak, Partial Malolactic fermentation
Vineyard: Sullivan Rutherford Estate

--- 2015 Sullivan Rutherford Estate Chardonnay ---
Tasting Note: Honeysuckle and sweet vanilla meet the nose immediately, providing a sense of pleasure, quickly followed by bright green citrus and a hint of minerality. The youth of this wine is evident in the fresh fruitfulness that envelops the aroma. Don't let the fruitfulness fool you — this wine is dense and layered. There is a round and juicy quality of peach and developed pineapple, yet the lemon-lime citrus provides brightness, acidity, and length. Enjoy now and for years to come.
Variety: 100% Chardonnay
Oak: 50% New French Oak
Alcohol: 14.5% | TA: 6.1 g/L | pH: 3.34
Harvest Date: August 11, 2015
Vineyard: Sullivan Rutherford Estate

== TASTING NOTES ==

--- 2022 J.O. Sullivan Founder's Reserve Merlot ---
Tasting Note: Deep, dark, and unapologetically rich, this wine unfolds in deliberate layers of intensity. Brambleberry, ripe plum, and crushed violet lead into notes of espresso, graphite, and wild herbs. The palate is full-bodied and commanding with a seamless, velvet-like texture. Dark cherry and blueberry fill the mid-palate while finely integrated tannins build length, structure, and poise through the finish. Generous yet deeply rooted, this is a Merlot defined not simply by fruit, but by depth, power, and unmistakable presence.
Blend: 86% Merlot, 11% Cabernet Sauvignon, 3% Cabernet Franc
Oak: 80% New French Oak
TA: 5.8 g/L | pH: 3.70 | Alcohol: 14.8% | Cases produced: 500
Vineyard: Sullivan Rutherford Estate
Clones: Merlot 3, 1, 15 · Cabernet Franc 1 · Cabernet Sauvignon 4
Vineyard Manager: Mike Wolf

--- 2021 J.O. Sullivan Founder's Reserve Merlot ---
Tasting Note: Savor the nuanced charm of the 2021 J.O. Sullivan Founder's Reserve Merlot — an absolute masterpiece. Revealing intricate notes of blueberries, hints of tobacco leaves, and a whisper of toasty vanilla, it gracefully unfolds. Dense yet understated, matured tannins and integrated acidity dance in harmony. The sophisticated finish arrives with refined elegance and polished subtlety. In every sip, the commitment to Merlot excellence is undeniable. This vintage greatly champions the noble variety, a quiet celebration of the estate's unwavering commitment to the artistry and distinction of Merlot.
Blend: 89% Merlot, 7% Cabernet Sauvignon, 4% Cabernet Franc
Oak: 82% New French Oak, 22 months
TA: 5.7 g/L | pH: 3.70 | Alcohol: 14.8% | Cases produced: 500
Clones: Merlot 1, 3, 5 · Cabernet Sauvignon 4 · Cabernet Franc 1
Vineyard Manager: Mike Wolf

--- 2020 J.O. Sullivan Founder's Reserve Merlot ---
Tasting Note: There is absolutely no Merlot in the Napa Valley that can compare to this wine. Structured, dense, fresh, and built to age, the 2020 J.O. Sullivan Founder's Reserve Merlot offers something that no other Merlot can — complexity. There is an elegance to this Merlot that is recognizable, but it is more than that: it is a powerhouse that delivers on all levels. Fresh acidity carries the wine and brings it into focus, weight and juiciness give it a supple character, and structure provides a harmonious foundation knitting all the components together. This is what Merlot is supposed to be. Drink over the next 25 years.
Blend: 95% Merlot, 5% Cabernet Franc
Oak: 80% New French Oak
TA: 5.9 g/L | pH: 3.70 | Alcohol: 14.8% | Cases produced: 280
Clones: Merlot 1, 3, 15 · Cabernet Franc 1
Vineyard Manager: Mike Wolf

--- 2019 J.O. Sullivan Founder's Reserve Merlot ---
Tasting Note: In a league of its own. This seriously built Merlot offers density and richness, yet the agility and freshness distinguishes it as a wine of great pedigree. The depths and layers keep expanding while the cocoa powder tannins melt across the palate giving a sense of sweetness. The classic savory notes of bitter chocolate and dry herb are an inherent signature of the vineyard. Blue fruits of bramble and blueberry are highlights of the vintage. This wine is the definition of luxury and should be enjoyed over the next 20 years.
Blend: 89% Merlot, 8% Cabernet Sauvignon, 3% Cabernet Franc
Oak: 100% New French Oak
TA: 5.6 g/L | pH: 3.71 | Alcohol: 14.8% | Cases produced: 300
Clones: Merlot 1, 3, 15 · Cabernet Sauvignon 191 · Cabernet Franc 1
Vineyard Manager: Mike Wolf

--- 2018 J.O. Sullivan Founder's Reserve Merlot ---
Tasting Note: Two vintages have passed, but the wait is over! The 2018 J.O. Sullivan Merlot is one of the most unique, interesting, and delicious Merlots produced to date. The structure and complexity that defines this Merlot is a reflection of the gravelly soil from which the fruit is grown. Grown in a warmer climate has shaped the fruit profile to be more generous, exotic, and giving. Constantly evolving and changing, it stimulates the senses to such a degree that one experience with this wine is not enough. Enjoy forever.
Blend: 80% Merlot, 12% Cabernet Sauvignon, 8% Petit Verdot
Oak: 100% New French Oak
TA: 5.4 g/L | pH: 3.72 | Alcohol: 14.8% | Cases produced: 235
Clones: Merlot 1, 3, 15 · Cabernet Sauvignon 7 · Petit Verdot 400
Vineyard Manager: Paul Garvey

--- 2015 J.O. Sullivan Founder's Reserve Merlot ---
Tasting Note: The 2015 Merlot pours a deep ruby, rimmed with a youthful violet glow. The nose unfurls with delicate red raspberry and a whisper of caramel, grounded by savory notes of rosemary and lavender. A silky entry gives way to rich dark cherry, lifted by a bright, sustaining acidity that carries through the length of the palate. Subtle notes of warm vanilla round the fruit, resolving into a lingering, bittersweet cocoa on a long, focused finish. Refined and expressive, this vintage is crafted for approachability upon release and pairs effortlessly across a range of dishes. Drink now through 2030.
Blend: 95% Merlot, 5% Cabernet Sauvignon
Oak: 70% New French Oak
TA: 5.8 g/L | pH: 3.70 | Alcohol: 14.8% | Cases produced: 230
Clones: Merlot 3, 337 · Cabernet Sauvignon 7
Vineyard Manager: Paul Garvey

--- 2014 J.O. Sullivan Founder's Reserve Merlot ---
Tasting Note: A sweetness of toffee and oak lifts immediately from the glass, followed by darker raspberry and red cherry, lending the wine an inviting sense of pleasure from the very first pour. Lush and juicy on the palate, powerful flavors of red plum, light caramel, and sweetened cranberry meld together seamlessly, while a bright thread of acidity lends this beautiful wine both focus and length. Beneath that richness runs an intensity and savory depth that has become a hallmark of the estate — a wine as powerful as it is graceful, and one that feels, unmistakably, saturated in the same passion from which it was made.
Blend: 97% Merlot, 3% Cabernet Sauvignon
Oak: 100% New French Oak
TA: 6.1 g/L | pH: 3.68 | Alcohol: 14.8% | Cases produced: 230
Clones: Merlot 3 · Cabernet Sauvignon 4
Vineyard Manager: Paul Garvey

--- 2013 J.O. Sullivan Founder's Reserve Merlot ---
Tasting Note: Sullivan has long been known for big, bold, extracted Merlots, and the 2013 J.O. Sullivan Founder's Reserve Merlot carries that legacy forward without compromise. Abundant cherry and raspberry burst from the glass, layered with vanilla and spice, while a subtle savory character runs beneath, lending the wine real depth and complexity. These same qualities carry through to the palate, wrapping it in a plushness that coats the mouth with a sense of sweetness. Yet for all its size and lushness, a bright vein of acidity brings focus, allowing the wine to linger long after the last sip. A wine built to reward patience, and to be enjoyed for years to come.
Blend: 78% Merlot, 11% Cabernet Sauvignon, 11% Cabernet Franc
Oak: 71% New French Oak
TA: 5.8 g/L | pH: 3.73 | Alcohol: 14.8% | Cases produced: 240
Clones: Merlot 3 · Cabernet Sauvignon 191 · Cabernet Franc 1

(Tasting notes for additional vintages will be added as they are published.)

== WINERY CONSTRUCTION ==
The Sullivan Rutherford Estate winery is currently under construction. Construction progress is documented through a series of video updates captured from April 2025 through July 2026, covering milestones from the first footings through ongoing finishing details. Members can view these in the Construction section of Founder's Vault.

== CONTACT & DIRECT ACCESS ==
Members wishing to reach the winemaker directly can:
- Send a text via the "Text Me Directly" button on the Winemaker page (opens on mobile)
- Submit a written question via the "Ask a Question" form on the Winemaker page

Both options are available inside Founder's Vault under the Winemaker section.
`;

const ESTATE_KB = loadKnowledgeBase();

const SYSTEM_PROMPT = `You are the official digital concierge for Sullivan Rutherford Estate, serving members of Founder's Vault — the estate's private allocation program.

IDENTITY AND TONE:
You are the Founder's Vault Concierge. Do not refer to yourself as an AI or chatbot. Speak on behalf of the estate, not as the winemaker personally. Use "the estate," "the wines," or "Founder's Vault" rather than "I" when referring to the producer. Your tone is knowledgeable, warm, precise, confident, elegant, and unpretentious. Avoid generic luxury language and unsupported superlatives. Explain why the site, decision, person, or technique matters. Keep responses concise and elegant — flowing prose unless a list genuinely aids clarity.

ACCURACY RULES:
1. Use only information contained in the knowledge base provided below. Do not invent names, dates, vineyard facts, ownership details, biographies, technical data, or historical claims.
2. Do not describe the estate vineyard as being on the Rutherford Bench. Do not describe the estate as sitting on a riverbed.
3. Do not include Sean Maher, Pedro, Roberto, or Gerardo Rodriguez in the estate team or history.
4. Tony Hurtado is the Cellar Master. Jeff Cole and Tony Hurtado worked together at Schramsberg from 2006 through 2013 before reuniting at Sullivan.
5. When discussing vineyards, use both the official name and its storytelling identity: Sullivan Rutherford Estate (Gravel & Sand), Crystal Springs Vineyard (Iron & Glass), Soda Canyon Vineyard (Ash & Tuff).
6. When discussing architecture, explain the relationship between John Marsh Davis (original residence) and Hans Baldauf of BCV Architecture + Interiors (new winery).
7. Present Merlot as a central and serious part of Sullivan's identity, never as a secondary variety.
8. When information may have changed — construction status, team roles, current vintage — qualify the answer by date.
9. If a question falls outside what is documented, say: "The estate's available records do not currently confirm that detail." Then direct the member to the "Text Me Directly" or "Ask a Question" options on the Winemaker page.
10. Do not describe 2026 as a completed vintage. Always date-stamp in-season vintage assessments.

KNOWLEDGE BASE — ESTATE ARCHIVE:
${ESTATE_KB}

KNOWLEDGE BASE — WINE AND TASTING NOTE DETAILS:
${ESTATE_KNOWLEDGE}`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  // Auth check — concierge is members-only
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let message: string;
  let history: ChatMessage[];

  try {
    ({ message, history } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!message?.trim()) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }

  // Fetch live featured arrival content to augment context
  let arrivalContext = "";
  try {
    const { data: arrival } = await supabase
      .from("featured_arrival")
      .select("wine_name, vintage, description")
      .eq("id", 1)
      .maybeSingle();
    if (arrival?.wine_name) {
      arrivalContext = `\n\nCURRENTLY FEATURED ON THE ARRIVAL: ${arrival.wine_name}${arrival.vintage ? ` (${arrival.vintage})` : ""}${arrival.description ? ` — ${arrival.description}` : ""}`;
    }
  } catch {
    // Non-fatal — proceed without it
  }

  const systemWithContext = arrivalContext
    ? SYSTEM_PROMPT + arrivalContext
    : SYSTEM_PROMPT;

  // Build message history for Claude (cap at last 10 exchanges)
  const recentHistory = history.slice(-20);
  const messages: Anthropic.MessageParam[] = [
    ...recentHistory,
    { role: "user", content: message.trim() },
  ];

  // SSE streaming response
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        // Prefer a direct Anthropic API key (Vercel/production).
        // Fall back to the Replit AI proxy only when no direct key is present (local dev).
        const directKey = process.env.ANTHROPIC_API_KEY;
        const proxyKey  = process.env.AI_INTEGRATIONS_ANTHROPIC_API_KEY;
        const proxyUrl  = process.env.AI_INTEGRATIONS_ANTHROPIC_BASE_URL;

        const anthropicOptions: ConstructorParameters<typeof Anthropic>[0] = directKey
          ? { apiKey: directKey }
          : { apiKey: proxyKey, baseURL: proxyUrl };

        const anthropic = new Anthropic(anthropicOptions);

        const claudeStream = anthropic.messages.stream({
          model:      "claude-sonnet-4-6",
          max_tokens: 1024,
          system:     systemWithContext,
          messages,
        });

        for await (const event of claudeStream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            const chunk = JSON.stringify({ content: event.delta.text });
            controller.enqueue(encoder.encode(`data: ${chunk}\n\n`));
          }
        }

        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`));
      } catch (err) {
        console.error("[concierge] Anthropic error:", err);
        const msg = err instanceof Error ? err.message : "Stream error";
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: msg })}\n\n`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type":  "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection":    "keep-alive",
    },
  });
}
