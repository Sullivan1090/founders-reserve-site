"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitQuestion, type QuestionState } from "@/app/members/winemaker/actions";

const initial: QuestionState = {};

export function WinemakerForm() {
  const [state, formAction, pending] = useActionState(submitQuestion, initial);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) formRef.current?.reset();
  }, [state?.success]);

  return (
    <div className="mt-16 max-w-2xl">
      <h2 className="font-serif text-2xl md:text-3xl text-primary mb-2">
        Ask a Question
      </h2>
      <p className="text-muted-foreground mb-8 leading-relaxed">
        Have a question about the wines, the winemaking process, or what's happening
        at the estate? Send it directly — I read every message.
      </p>

      {state?.success ? (
        <div className="rounded-xl border border-[#8B6726]/40 bg-card px-8 py-10 text-center">
          <p className="font-serif text-2xl text-primary mb-2">Thank you.</p>
          <p className="text-muted-foreground">I'll get back to you soon.</p>
        </div>
      ) : (
        <form ref={formRef} action={formAction} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="wm-name" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Name
            </label>
            <input
              id="wm-name"
              name="name"
              type="text"
              required
              placeholder="Your name"
              className="w-full rounded-lg border border-border/60 bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="wm-email" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Email
            </label>
            <input
              id="wm-email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-lg border border-border/60 bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="wm-message" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Message
            </label>
            <textarea
              id="wm-message"
              name="message"
              required
              rows={5}
              placeholder="Your question or message…"
              className="w-full rounded-lg border border-border/60 bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors resize-none"
            />
          </div>

          {state?.error && (
            <p className="text-sm text-red-400">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-1 self-start px-8 py-3 rounded-lg font-serif text-base tracking-wide transition-all"
            style={{
              background: pending ? "#6E6960" : "#8B6726",
              color: "#EDEAE2",
              cursor: pending ? "not-allowed" : "pointer",
            }}
          >
            {pending ? "Sending…" : "Send Message"}
          </button>
        </form>
      )}
    </div>
  );
}
