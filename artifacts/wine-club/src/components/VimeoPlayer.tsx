"use client";
import { useEffect, useRef, useState } from "react";

export default function VimeoPlayer({
  videoId,
  title,
}: {
  videoId: string;
  title?: string;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.origin !== "https://player.vimeo.com") return;
      try {
        const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        if (data.event === "finish") setEnded(true);
        if (data.event === "playProgress" || data.event === "play") setEnded(false);
      } catch {}
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  // Tell Vimeo to send us events once iframe loads
  function onLoad() {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ method: "addEventListener", value: "finish" }),
      "https://player.vimeo.com"
    );
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ method: "addEventListener", value: "play" }),
      "https://player.vimeo.com"
    );
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ method: "addEventListener", value: "playProgress" }),
      "https://player.vimeo.com"
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-border/50 shadow-sm" style={{ paddingBottom: "56.25%" }}>
      <iframe
        ref={iframeRef}
        src={`https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=0&app_id=58479&dnt=1&api=1`}
        title={title}
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
        loading="lazy"
        onLoad={onLoad}
      />
      {/* Overlay that covers Vimeo's end-screen suggestions */}
      {ended && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-5"
          style={{ background: "rgba(12, 26, 38, 0.96)" }}
        >
          <div className="flex items-center gap-3">
            <div className="h-px w-10" style={{ background: "rgba(184,151,90,0.4)" }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#B8975A" }} />
            <div className="h-px w-10" style={{ background: "rgba(184,151,90,0.4)" }} />
          </div>
          <button
            onClick={() => {
              setEnded(false);
              iframeRef.current?.contentWindow?.postMessage(
                JSON.stringify({ method: "play" }),
                "https://player.vimeo.com"
              );
            }}
            className="text-xs tracking-[0.3em] uppercase px-8 py-3 transition-opacity hover:opacity-80"
            style={{
              background: "rgba(184,151,90,0.15)",
              border: "1px solid rgba(184,151,90,0.4)",
              color: "#EDEAE2",
            }}
          >
            Watch Again
          </button>
        </div>
      )}
    </div>
  );
}
