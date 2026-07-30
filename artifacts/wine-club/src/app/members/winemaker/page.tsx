// WINEMAKER PAGE
//
// Intro video: replace the empty string below with the YouTube video ID
// (the part after ?v= in the URL) once the video is uploaded.
// Example: "dQw4w9WgXcQ"
const INTRO_VIDEO_ID = "";

import { WinemakerForm } from "@/components/winemaker-form";
import { MessageSquare } from "lucide-react";

export default function WinemakerPage() {
  const phone = "+17072871243";
  const smsHref = `sms:${phone}`;

  return (
    <div className="container mx-auto px-6 py-12 md:py-16 max-w-4xl">
      {/* Header */}
      <div className="mb-10 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-serif text-primary mb-4">Winemaker</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          An introduction to Sullivan Rutherford Estate — who I am, what drives me,
          and what's happening at the estate right now.
        </p>
      </div>

      {/* Intro video */}
      {INTRO_VIDEO_ID ? (
        <div
          className="relative w-full overflow-hidden rounded-xl border border-border/50 shadow-md"
          style={{ paddingBottom: "56.25%" }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${INTRO_VIDEO_ID}`}
            title="Winemaker Introduction"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            loading="lazy"
          />
        </div>
      ) : (
        <div
          className="relative w-full overflow-hidden rounded-xl border border-border/50 bg-card flex items-center justify-center"
          style={{ paddingBottom: "56.25%" }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <span className="font-serif text-xl text-muted-foreground">Video coming soon</span>
            <span className="text-sm text-muted-foreground/60">Add the YouTube ID to page.tsx to publish</span>
          </div>
        </div>
      )}

      {/* Text Me Directly */}
      <div className="mt-10">
        <a
          href={smsHref}
          className="inline-flex items-center gap-3 px-7 py-3 rounded-lg font-serif text-base tracking-wide transition-all hover:opacity-90"
          style={{ background: "#1B3448", color: "#EDEAE2", border: "1px solid rgba(139,103,38,0.45)" }}
        >
          <MessageSquare className="w-5 h-5 flex-shrink-0" style={{ color: "#8B6726" }} />
          Text Me Directly
        </a>
        <p className="mt-2 text-xs text-muted-foreground/60">
          Opens your messaging app — (707) 287‑1243
        </p>
      </div>

      {/* Ask a Question form */}
      <WinemakerForm />
    </div>
  );
}
