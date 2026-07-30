"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2 } from "lucide-react";

interface Props {
  src: string;
  label?: string;
  available?: boolean;
}

export function VintageAudioPlayer({ src, label = "Vintage Summary", available = true }: Props) {
  const [open, setOpen]         = useState(false);
  const [playing, setPlaying]   = useState(false);
  const [progress, setProgress] = useState(0);   // 0–1
  const [duration, setDuration] = useState(0);
  const [errored, setErrored]   = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  /* keep progress in sync */
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onTime = () => setProgress(el.currentTime / (el.duration || 1));
    const onMeta = () => setDuration(el.duration);
    const onEnd  = () => { setPlaying(false); setProgress(0); };
    el.addEventListener("timeupdate",  onTime);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("ended",       onEnd);
    return () => {
      el.removeEventListener("timeupdate",  onTime);
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("ended",       onEnd);
    };
  }, [open]);

  function togglePlay() {
    const el = audioRef.current;
    if (!el) return;
    if (playing) { el.pause(); setPlaying(false); }
    else         { el.play().catch(() => setErrored(true)); setPlaying(true); }
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const el = audioRef.current;
    if (!el || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct  = (e.clientX - rect.left) / rect.width;
    el.currentTime = pct * duration;
    setProgress(pct);
  }

  function fmt(s: number) {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  }

  return (
    <div>
      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full font-serif text-sm tracking-wide transition-all"
        style={{
          background: open ? "rgba(139,103,38,0.18)" : "rgba(139,103,38,0.10)",
          border: "1px solid rgba(139,103,38,0.45)",
          color: "#EDEAE2",
          cursor: "pointer",
        }}
      >
        <Volume2 className="w-4 h-4" style={{ color: "#8B6726" }} />
        {label}
      </button>

      {/* Expanded player */}
      {open && (
        <div
          className="mt-4 rounded-xl px-5 py-4"
          style={{ background: "rgba(139,103,38,0.08)", border: "1px solid rgba(139,103,38,0.25)" }}
        >
          {errored ? (
            <p className="text-sm text-muted-foreground italic">
              Audio not yet available for this vintage.
            </p>
          ) : (
            <div className="flex items-center gap-4">
              {/* Play/pause */}
              <button
                onClick={togglePlay}
                className="flex items-center justify-center w-10 h-10 rounded-full shrink-0 transition-all"
                style={{
                  background: "#8B6726",
                  color: "#EDEAE2",
                  border: "none",
                  cursor: "pointer",
                }}
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing
                  ? <Pause className="w-4 h-4" />
                  : <Play  className="w-4 h-4 translate-x-px" />
                }
              </button>

              {/* Progress bar + time */}
              <div className="flex-1">
                <div
                  className="relative h-1.5 rounded-full cursor-pointer"
                  style={{ background: "rgba(237,234,226,0.15)" }}
                  onClick={seek}
                >
                  <div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ width: `${progress * 100}%`, background: "#8B6726" }}
                  />
                </div>
                <div className="flex justify-between mt-1.5 text-xs text-muted-foreground">
                  <span>{fmt(progress * duration)}</span>
                  <span>{duration ? fmt(duration) : "--:--"}</span>
                </div>
              </div>

              <audio ref={audioRef} src={src} preload="metadata" onError={() => setErrored(true)} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
