"use client";

import { useActionState } from "react";
import { submitNoteResponse, type NoteResponseState } from "@/app/members/estate-notes/[slug]/actions";

const initial: NoteResponseState = {};

export function NoteResponseForm({
  noteTitle,
  memberName,
  memberEmail,
}: {
  noteTitle: string;
  memberName: string;
  memberEmail: string;
}) {
  const [state, action, pending] = useActionState(submitNoteResponse, initial);

  if (state.success) {
    return (
      <div
        className="rounded-xl px-6 py-8 text-center"
        style={{ background: "rgba(156,122,61,0.06)", border: "1px solid rgba(156,122,61,0.2)" }}
      >
        <p className="font-serif text-xl mb-2" style={{ color: "#EDEAE2" }}>Sent.</p>
        <p className="text-sm" style={{ color: "rgba(237,234,226,0.5)" }}>
          Your message has been delivered to Sullivan Rutherford Estate.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5">
      {/* Hidden — pulled from their account */}
      <input type="hidden" name="note_title" value={noteTitle} />
      <input type="hidden" name="name"  value={memberName} />
      <input type="hidden" name="email" value={memberEmail} />

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium" style={{ color: "#EDEAE2" }}>
          Your Message
        </label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Share your thoughts..."
          className="w-full rounded-lg px-4 py-3 text-sm focus:outline-none resize-none"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(237,234,226,0.12)",
            color: "#EDEAE2",
          }}
        />
      </div>

      {state.error && (
        <p className="text-sm" style={{ color: "#e87070" }}>{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="font-serif tracking-wide px-8 py-3 rounded-full transition-all hover:opacity-90 disabled:opacity-50"
        style={{ background: "#9C7A3D", color: "#EDEAE2", border: "none", cursor: "pointer", fontSize: "0.95rem" }}
      >
        {pending ? "Sending..." : "Leave a Note \u2192"}
      </button>
    </form>
  );
}
