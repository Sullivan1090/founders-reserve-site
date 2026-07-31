import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";


// ─── All estate content used to ground the concierge ─────────────────────────

const ESTATE_KNOWLEDGE = `
SULLIVAN RUTHERFORD ESTATE — FOUNDERS VAULT CONCIERGE KNOWLEDGE BASE

== ESTATE OVERVIEW ==
Sullivan Rutherford Estate produces small-lot Bordeaux-variety wines from three estate vineyards in Napa Valley. The flagship program is the Founders Reserve allocation, offered exclusively to a small group of founding members through Founders Vault.

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

Founders Reserve Merlot — available vintages: 2023, 2022, 2021, 2020, 2019, 2018, 2015, 2014, 2013
Founders Reserve Cabernet Sauvignon — available vintages: 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013
Founders Reserve Cabernet Franc — available vintages: 2022, 2021

== TASTING NOTES ==

--- 2022 J.O. Sullivan Founders Reserve Merlot ---
Tasting Note: Deep, dark, and unapologetically rich, this wine unfolds in deliberate layers of intensity. Brambleberry, ripe plum, and crushed violet lead into notes of espresso, graphite, and wild herbs. The palate is full-bodied and commanding with a seamless, velvet-like texture. Dark cherry and blueberry fill the mid-palate while finely integrated tannins build length, structure, and poise through the finish. Generous yet deeply rooted, this is a Merlot defined not simply by fruit, but by depth, power, and unmistakable presence.
Blend: 86% Merlot, 11% Cabernet Sauvignon, 3% Cabernet Franc
Oak: 80% New French Oak
TA: 5.8 g/L | pH: 3.70 | Alcohol: 14.8% | Cases produced: 500
Vineyard: Sullivan Rutherford Estate
Clones: Merlot 3, 1, 15 · Cabernet Franc 1 · Cabernet Sauvignon 4
Vineyard Manager: Mike Wolf

(Tasting notes for other vintages will be added as they are published.)

== WINERY CONSTRUCTION ==
The Sullivan Rutherford Estate winery is currently under construction. Construction progress is documented through a series of video updates captured from April 2025 through July 2026, covering milestones from the first footings through ongoing finishing details. Members can view these in the Construction section of Founders Vault.

== CONTACT & DIRECT ACCESS ==
Members wishing to reach the winemaker directly can:
- Send a text via the "Text Me Directly" button on the Winemaker page (opens on mobile)
- Submit a written question via the "Ask a Question" form on the Winemaker page

Both options are available inside Founders Vault under the Winemaker section.
`;

const SYSTEM_PROMPT = `You are the Founders Vault Concierge — a knowledgeable, warm, and precise assistant for Sullivan Rutherford Estate's private member platform. You speak on behalf of the estate, not as the winemaker personally. Use "the estate," "the wines," or "Founders Vault" rather than "I" when referring to the producer.

Your role is to help Founders Reserve members with questions about the estate, the wines, the vineyards, and what's happening at Sullivan Rutherford Estate.

IMPORTANT RULES:
1. Only answer using the information provided in the knowledge base below, or from any additional context provided with the user's question.
2. If a question falls outside what is documented (e.g., personal opinions not on record, events not listed, vintages with no tasting note yet), clearly say you don't have that information on hand and direct the member to reach out directly via the "Text Me Directly" or "Ask a Question" options on the Winemaker page.
3. Never invent, guess, or extrapolate beyond what is explicitly documented.
4. Keep responses concise and elegant — matching the tone of the estate. No bullet-point walls; write in flowing prose unless a list genuinely aids clarity.
5. Do not refer to yourself as an AI or chatbot. You are the Founders Vault Concierge.

KNOWLEDGE BASE:
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
        // Use the Replit AI proxy in dev; fall back to a direct Anthropic key in production (e.g. Vercel)
        const anthropicOptions: ConstructorParameters<typeof Anthropic>[0] = {
          apiKey: process.env.AI_INTEGRATIONS_ANTHROPIC_API_KEY ?? process.env.ANTHROPIC_API_KEY,
        };
        if (process.env.AI_INTEGRATIONS_ANTHROPIC_BASE_URL) {
          anthropicOptions.baseURL = process.env.AI_INTEGRATIONS_ANTHROPIC_BASE_URL;
        }
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
