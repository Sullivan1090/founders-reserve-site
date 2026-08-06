"use server";

import { Resend } from "resend";

export type NoteResponseState = { error?: string; success?: true };

export async function submitNoteResponse(
  _prev: NoteResponseState,
  formData: FormData
): Promise<NoteResponseState> {
  const name    = (formData.get("name")    as string | null)?.trim() ?? "";
  const email   = (formData.get("email")   as string | null)?.trim() ?? "";
  const message = (formData.get("message") as string | null)?.trim() ?? "";
  const noteTitle = (formData.get("note_title") as string | null)?.trim() ?? "";

  if (!name || !email || !message) {
    return { error: "Please fill in all fields." };
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from:    "Founder's Vault <onboarding@resend.dev>",
        to:      "jeff@sullivanwine.com",
        replyTo: email,
        subject: `Note from ${name} — "${noteTitle}"`,
        html: `
          <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1B3448;">
            <h2 style="border-bottom:1px solid #8B6726;padding-bottom:8px;">
              Response to Estate Note
            </h2>
            <p style="color:#6E6960;font-size:14px;margin-top:0;">
              Re: <em>${noteTitle}</em>
            </p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Message:</strong></p>
            <blockquote style="border-left:3px solid #8B6726;margin:0;padding:8px 16px;color:#444;">
              ${message.replace(/\n/g, "<br>")}
            </blockquote>
          </div>
        `,
      });
    } catch (err) {
      console.error("Resend error:", err);
      return { error: "Something went wrong sending your message. Please try again." };
    }
  } else {
    console.warn("RESEND_API_KEY not set — email notification skipped.");
  }

  return { success: true };
}
