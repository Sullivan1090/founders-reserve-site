"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, MessageCircle, Send, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}

export function ConciergeChat() {
  const [open, setOpen]       = useState(false);
  const [input, setInput]     = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [busy, setBusy]       = useState(false);
  const bottomRef             = useRef<HTMLDivElement>(null);
  const inputRef              = useRef<HTMLTextAreaElement>(null);
  const abortRef              = useRef<AbortController | null>(null);

  // Auto-scroll on new content
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when panel opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || busy) return;

    setInput("");
    setMessages((prev) => [
      ...prev,
      { role: "user", content: text },
      { role: "assistant", content: "", streaming: true },
    ]);
    setBusy(true);

    const history = messages.map(({ role, content }) => ({ role, content }));

    try {
      abortRef.current = new AbortController();
      const res = await fetch("/api/concierge", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ message: text, history }),
        signal:  abortRef.current.signal,
      });

      if (!res.ok || !res.body) throw new Error("Request failed");

      const reader  = res.body.getReader();
      const decoder = new TextDecoder();
      let   buffer  = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const parsed = JSON.parse(line.slice(6));
            if (parsed.done || parsed.error) {
              setMessages((prev) =>
                prev.map((m, i) =>
                  i === prev.length - 1 ? { ...m, streaming: false } : m
                )
              );
              break;
            }
            if (parsed.content) {
              setMessages((prev) =>
                prev.map((m, i) =>
                  i === prev.length - 1
                    ? { ...m, content: m.content + parsed.content }
                    : m
                )
              );
            }
          } catch { /* skip malformed */ }
        }
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setMessages((prev) =>
        prev.map((m, i) =>
          i === prev.length - 1
            ? { ...m, content: "Something went wrong. Please try again.", streaming: false }
            : m
        )
      );
    } finally {
      setBusy(false);
    }
  }, [input, busy, messages]);

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  const GOLD   = "#8B6726";
  const BLUE   = "#1B3448";
  const OFF_WHITE = "#EDEAE2";

  return (
    <>
      {/* ── Floating button ─────────────────────────────────── */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open concierge chat"
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95"
          style={{ background: BLUE, border: `1.5px solid rgba(139,103,38,0.5)` }}
        >
          <MessageCircle className="w-6 h-6" style={{ color: OFF_WHITE }} />
          <span
            className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full"
            style={{ background: GOLD }}
          />
        </button>
      )}

      {/* ── Chat panel ──────────────────────────────────────── */}
      {open && (
        <div
          className="fixed bottom-6 right-6 z-50 flex flex-col rounded-2xl shadow-2xl overflow-hidden"
          style={{
            width:        "360px",
            height:       "520px",
            background:   BLUE,
            border:       `1px solid rgba(139,103,38,0.4)`,
            fontFamily:   "'Cormorant Garamond', serif",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4 shrink-0"
            style={{ borderBottom: "1px solid rgba(139,103,38,0.25)" }}
          >
            <div>
              <p className="text-sm font-semibold tracking-wide" style={{ color: GOLD }}>
                Vault Concierge
              </p>
              <p className="text-xs" style={{ color: "rgba(237,234,226,0.5)" }}>
                Ask about the estate, wines, or vineyards
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="flex items-center justify-center w-8 h-8 rounded-full transition-colors hover:bg-white/10"
              style={{ color: OFF_WHITE }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(139,103,38,0.15)", border: `1px solid rgba(139,103,38,0.3)` }}
                >
                  <MessageCircle className="w-5 h-5" style={{ color: GOLD }} />
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(237,234,226,0.6)" }}>
                  Ask anything about the wines, vineyards, or the estate.
                </p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed"
                  style={
                    msg.role === "user"
                      ? {
                          background: "rgba(139,103,38,0.2)",
                          color: OFF_WHITE,
                          borderRadius: "16px 16px 4px 16px",
                        }
                      : {
                          background: "rgba(255,255,255,0.06)",
                          color: OFF_WHITE,
                          borderRadius: "16px 16px 16px 4px",
                        }
                  }
                >
                  {msg.content || (msg.streaming && (
                    <Loader2 className="w-4 h-4 animate-spin" style={{ color: GOLD }} />
                  ))}
                  {msg.streaming && msg.content && (
                    <span
                      className="inline-block w-0.5 h-4 ml-0.5 align-middle animate-pulse"
                      style={{ background: GOLD }}
                    />
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            className="shrink-0 px-4 py-3 flex items-end gap-2"
            style={{ borderTop: "1px solid rgba(139,103,38,0.2)" }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              disabled={busy}
              rows={1}
              placeholder="Ask about the estate…"
              className="flex-1 resize-none rounded-xl px-4 py-2.5 text-sm focus:outline-none disabled:opacity-50"
              style={{
                background:  "rgba(255,255,255,0.07)",
                border:      "1px solid rgba(139,103,38,0.25)",
                color:       OFF_WHITE,
                fontFamily:  "inherit",
                maxHeight:   "100px",
                lineHeight:  "1.5",
              }}
            />
            <button
              onClick={send}
              disabled={!input.trim() || busy}
              aria-label="Send message"
              className="flex items-center justify-center w-10 h-10 rounded-full shrink-0 transition-all hover:opacity-90 disabled:opacity-30"
              style={{ background: GOLD, border: "none", cursor: "pointer" }}
            >
              {busy
                ? <Loader2 className="w-4 h-4 animate-spin" style={{ color: OFF_WHITE }} />
                : <Send className="w-4 h-4" style={{ color: OFF_WHITE }} />
              }
            </button>
          </div>
        </div>
      )}
    </>
  );
}
