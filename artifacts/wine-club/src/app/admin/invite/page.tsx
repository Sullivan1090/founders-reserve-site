"use client";

import { useState } from "react";
import Link from "next/link";
import { inviteMembers, type InviteResult } from "./actions";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

export default function AdminInvitePage() {
  const [raw, setRaw]       = useState("");
  const [results, setResults] = useState<InviteResult[] | null>(null);
  const [loading, setLoading] = useState(false);

  const emails = raw
    .split(/[\n,;]+/)
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!emails.length) return;
    setLoading(true);
    setResults(null);
    const res = await inviteMembers(emails);
    setResults(res);
    setLoading(false);
  }

  const invited = results?.filter((r) => r.status === "invited").length ?? 0;
  const errors  = results?.filter((r) => r.status === "error").length ?? 0;

  return (
    <div className="space-y-8">
      <div>
        <Link href="/admin" className="text-xs text-muted-foreground hover:text-primary transition-colors">
          ← Dashboard
        </Link>
        <h1 className="font-serif text-3xl text-primary mt-3 mb-1">Invite Members</h1>
        <p className="text-muted-foreground text-sm">
          Paste allocation member emails below — one per line, or comma-separated.
          Each person receives a secure &quot;set your password&quot; email with a link to the Vault.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium" style={{ color: "#EDEAE2" }}>
            Email addresses
          </label>
          <textarea
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            rows={10}
            placeholder={"member@example.com\nanother@example.com\n..."}
            className="w-full rounded-lg px-4 py-3 text-sm bg-background border border-border/50 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/60 resize-y font-mono"
          />
          {emails.length > 0 && (
            <p className="text-xs text-muted-foreground">
              {emails.length} email{emails.length !== 1 ? "s" : ""} detected
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || emails.length === 0}
          className="inline-flex items-center gap-2 font-serif tracking-wide px-8 py-3 rounded-full transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: "#8B6726",
            color: "#EDEAE2",
            border: "none",
            cursor: emails.length === 0 || loading ? "not-allowed" : "pointer",
            fontSize: "0.95rem",
          }}
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? "Sending invitations..." : `Send ${emails.length > 0 ? emails.length : ""} Invitation${emails.length !== 1 ? "s" : ""}`}
        </button>
      </form>

      {/* Results */}
      {results && (
        <div className="space-y-4">
          <div className="flex gap-6 text-sm">
            <span style={{ color: "#6abf69" }}>
              {invited} invited successfully
            </span>
            {errors > 0 && (
              <span style={{ color: "#f28b82" }}>
                {errors} failed
              </span>
            )}
          </div>

          <div
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid rgba(139,103,38,0.25)" }}
          >
            {results.map((r) => (
              <div key={r.email} className="flex items-center gap-3 px-5 py-3">
                {r.status === "invited"
                  ? <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "#6abf69" }} />
                  : <XCircle    className="w-4 h-4 shrink-0" style={{ color: "#f28b82" }} />
                }
                <span className="text-sm font-mono text-foreground">{r.email}</span>
                {r.message && (
                  <span className="text-xs text-muted-foreground ml-auto truncate max-w-xs">
                    {r.message}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
