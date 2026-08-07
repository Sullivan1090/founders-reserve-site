"use client";

import { useState } from "react";
import Link from "next/link";
import { inviteMembers, createMembersWithPassword, type InviteResult, type CreateResult } from "./actions";
import { CheckCircle2, XCircle, Loader2, Copy, Check } from "lucide-react";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="ml-2 opacity-60 hover:opacity-100 transition-opacity">
      {copied ? <Check className="w-3.5 h-3.5" style={{ color: "#6abf69" }} /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

export default function AdminInvitePage() {
  const [raw, setRaw]               = useState("");
  const [results, setResults]       = useState<InviteResult[] | null>(null);
  const [loading, setLoading]       = useState(false);

  const [rawCreate, setRawCreate]         = useState("");
  const [createResults, setCreateResults] = useState<CreateResult[] | null>(null);
  const [createLoading, setCreateLoading] = useState(false);

  const emails = raw.split(/[\n,;]+/).map((e) => e.trim().toLowerCase()).filter(Boolean);
  const createEmails = rawCreate.split(/[\n,;]+/).map((e) => e.trim().toLowerCase()).filter(Boolean);

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    if (!emails.length) return;
    setLoading(true);
    setResults(null);
    const res = await inviteMembers(emails);
    setResults(res);
    setLoading(false);
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!createEmails.length) return;
    setCreateLoading(true);
    setCreateResults(null);
    const res = await createMembersWithPassword(createEmails);
    setCreateResults(res);
    setCreateLoading(false);
  }

  const invited = results?.filter((r) => r.status === "invited").length ?? 0;
  const inviteErrors = results?.filter((r) => r.status === "error").length ?? 0;
  const created = createResults?.filter((r) => r.status === "created").length ?? 0;
  const createErrors = createResults?.filter((r) => r.status === "error").length ?? 0;

  return (
    <div className="space-y-12">
      <div>
        <Link href="/admin" className="text-xs text-muted-foreground hover:text-primary transition-colors">
          ← Dashboard
        </Link>
        <h1 className="font-serif text-3xl text-primary mt-3 mb-1">Invite Members</h1>
      </div>

      {/* ── Option A: Email invite ── */}
      <section className="space-y-5">
        <div>
          <h2 className="font-serif text-xl text-primary mb-1">Send Email Invitation</h2>
          <p className="text-muted-foreground text-sm">
            Member receives a secure link to set their own password. Requires Resend SMTP to be working.
          </p>
        </div>

        <form onSubmit={handleInvite} className="space-y-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" style={{ color: "#EDEAE2" }}>Email addresses</label>
            <textarea
              value={raw}
              onChange={(e) => setRaw(e.target.value)}
              rows={5}
              placeholder={"member@example.com\nanother@example.com"}
              className="w-full rounded-lg px-4 py-3 text-sm bg-background border border-border/50 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/60 resize-y font-mono"
            />
            {emails.length > 0 && (
              <p className="text-xs text-muted-foreground">{emails.length} email{emails.length !== 1 ? "s" : ""} detected</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading || emails.length === 0}
            className="inline-flex items-center gap-2 font-serif tracking-wide px-8 py-3 rounded-full transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: "#8B6726", color: "#EDEAE2", border: "none", cursor: emails.length === 0 || loading ? "not-allowed" : "pointer", fontSize: "0.95rem" }}
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Sending…" : `Send ${emails.length > 0 ? emails.length : ""} Invitation${emails.length !== 1 ? "s" : ""}`}
          </button>
        </form>

        {results && (
          <div className="space-y-3">
            <div className="flex gap-6 text-sm">
              <span style={{ color: "#6abf69" }}>{invited} invited successfully</span>
              {inviteErrors > 0 && <span style={{ color: "#f28b82" }}>{inviteErrors} failed</span>}
            </div>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(139,103,38,0.25)" }}>
              {results.map((r) => (
                <div key={r.email} className="flex items-center gap-3 px-5 py-3">
                  {r.status === "invited"
                    ? <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "#6abf69" }} />
                    : <XCircle className="w-4 h-4 shrink-0" style={{ color: "#f28b82" }} />}
                  <span className="text-sm font-mono text-foreground">{r.email}</span>
                  {r.message && <span className="text-xs text-muted-foreground ml-auto truncate max-w-xs">{r.message}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px" style={{ background: "rgba(139,103,38,0.25)" }} />
        <span className="text-xs tracking-widest uppercase text-muted-foreground">or</span>
        <div className="flex-1 h-px" style={{ background: "rgba(139,103,38,0.25)" }} />
      </div>

      {/* ── Option B: Instant access ── */}
      <section className="space-y-5">
        <div>
          <h2 className="font-serif text-xl text-primary mb-1">Create Instant Access</h2>
          <p className="text-muted-foreground text-sm">
            Creates the account immediately with a temporary password. Copy it and send it to the member yourself — they can update their password after logging in.
          </p>
        </div>

        <form onSubmit={handleCreate} className="space-y-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" style={{ color: "#EDEAE2" }}>Email addresses</label>
            <textarea
              value={rawCreate}
              onChange={(e) => setRawCreate(e.target.value)}
              rows={5}
              placeholder={"member@example.com\nanother@example.com"}
              className="w-full rounded-lg px-4 py-3 text-sm bg-background border border-border/50 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/60 resize-y font-mono"
            />
            {createEmails.length > 0 && (
              <p className="text-xs text-muted-foreground">{createEmails.length} email{createEmails.length !== 1 ? "s" : ""} detected</p>
            )}
          </div>
          <button
            type="submit"
            disabled={createLoading || createEmails.length === 0}
            className="inline-flex items-center gap-2 font-serif tracking-wide px-8 py-3 rounded-full transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: "rgba(139,103,38,0.15)", color: "#EDEAE2", border: "1px solid rgba(139,103,38,0.5)", cursor: createEmails.length === 0 || createLoading ? "not-allowed" : "pointer", fontSize: "0.95rem" }}
          >
            {createLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {createLoading ? "Creating…" : `Create ${createEmails.length > 0 ? createEmails.length : ""} Account${createEmails.length !== 1 ? "s" : ""}`}
          </button>
        </form>

        {createResults && (
          <div className="space-y-3">
            <div className="flex gap-6 text-sm">
              <span style={{ color: "#6abf69" }}>{created} created</span>
              {createErrors > 0 && <span style={{ color: "#f28b82" }}>{createErrors} failed</span>}
            </div>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(139,103,38,0.25)" }}>
              {createResults.map((r) => (
                <div key={r.email} className="px-5 py-4 space-y-2">
                  <div className="flex items-center gap-3">
                    {r.status === "created"
                      ? <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "#6abf69" }} />
                      : <XCircle className="w-4 h-4 shrink-0" style={{ color: "#f28b82" }} />}
                    <span className="text-sm font-mono text-foreground">{r.email}</span>
                    {r.message && <span className="text-xs text-muted-foreground ml-auto">{r.message}</span>}
                  </div>
                  {r.tempPassword && (
                    <div
                      className="ml-7 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-mono"
                      style={{ background: "rgba(139,103,38,0.1)", border: "1px solid rgba(139,103,38,0.25)", color: "#EDEAE2" }}
                    >
                      <span className="text-xs text-muted-foreground mr-1">Temp password:</span>
                      <span>{r.tempPassword}</span>
                      <CopyButton text={r.tempPassword} />
                    </div>
                  )}
                </div>
              ))}
            </div>
            {created > 0 && (
              <p className="text-xs text-muted-foreground">
                Send each member their email + temp password and direct them to{" "}
                <span className="font-mono" style={{ color: "#B8975A" }}>foundersreserve.wine/login</span>.
                They can update their password at{" "}
                <span className="font-mono" style={{ color: "#B8975A" }}>foundersreserve.wine/set-password</span>{" "}
                after logging in.
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
