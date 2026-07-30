"use server";

import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export type QuestionState = { error?: string; success?: true };

export async function submitQuestion(_prev: QuestionState, formData: FormData): Promise<QuestionState> {
  const name    = (formData.get("name")    as string | null)?.trim() ?? "";
  const email   = (formData.get("email")   as string | null)?.trim() ?? "";
  const message = (formData.get("message") as string | null)?.trim() ?? "";

  if (!name || !email || !message) {
    return { error: "Please fill in all fields." };
  }

  // Check required env vars explicitly so we get a clear error in logs
  const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey   = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendKey    = process.env.RESEND_API_KEY;

  if (!supabaseUrl || !serviceKey) {
    console.error("Missing Supabase env vars on this deployment.");
    return { error: "Configuration error — please contact the site administrator." };
  }

  // Save to Supabase (service-role bypasses RLS)
  const supabase = createClient(supabaseUrl, serviceKey);
  const { error: dbError } = await supabase
    .from("questions")
    .insert({ name, email, message });

  if (dbError) {
    console.error("Supabase insert error:", dbError);
    return { error: "Something went wrong — please try again." };
  }

  // Email notification via Resend
  // NOTE: "from" uses Resend's shared domain until sullivanwine.com is verified
  // in your Resend dashboard. After verification, change to: noreply@sullivanwine.com
  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: "Founders Vault <onboarding@resend.dev>",
        to:   "jeff@sullivanwine.com",
        subject: `New question from ${name}`,
        html: `
          <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1B3448;">
            <h2 style="border-bottom:1px solid #8B6726;padding-bottom:8px;">
              New question — Founder's Reserve
            </h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Message:</strong></p>
            <blockquote style="border-left:3px solid #8B6726;margin:0;padding:8px 16px;color:#444;">
              ${message.replace(/\n/g, "<br>")}
            </blockquote>
          </div>
        `,
      });
    } catch (emailErr) {
      // Log but don't fail — the question is already saved
      console.error("Resend error:", emailErr);
    }
  } else {
    console.warn("RESEND_API_KEY not set — email notification skipped.");
  }

  return { success: true };
}
