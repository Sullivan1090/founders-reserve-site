"use server";

import { createClient as createServiceClient } from "@supabase/supabase-js";

const SITE_URL = "https://foundersreserve.wine";

export interface InviteResult {
  email: string;
  status: "invited" | "error";
  message?: string;
}

export interface CreateResult {
  email: string;
  status: "created" | "error";
  tempPassword?: string;
  message?: string;
}

export async function inviteMembers(emails: string[]): Promise<InviteResult[]> {
  const admin = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const results: InviteResult[] = [];

  for (const email of emails) {
    const normalized = email.trim().toLowerCase();
    if (!normalized) continue;

    try {
      const { error } = await admin.auth.admin.inviteUserByEmail(normalized, {
        redirectTo: `${SITE_URL}/auth/callback?next=/set-password`,
      });

      if (error) {
        results.push({ email: normalized, status: "error", message: error.message });
      } else {
        results.push({ email: normalized, status: "invited" });
      }
    } catch (err) {
      results.push({
        email: normalized,
        status: "error",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  return results;
}

function generateTempPassword(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let pass = "";
  for (let i = 0; i < 12; i++) {
    pass += chars[Math.floor(Math.random() * chars.length)];
  }
  return pass;
}

export async function createMembersWithPassword(emails: string[]): Promise<CreateResult[]> {
  const admin = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const results: CreateResult[] = [];

  for (const email of emails) {
    const normalized = email.trim().toLowerCase();
    if (!normalized) continue;

    const tempPassword = generateTempPassword();

    try {
      const { error } = await admin.auth.admin.createUser({
        email: normalized,
        password: tempPassword,
        email_confirm: true,
      });

      if (error) {
        results.push({ email: normalized, status: "error", message: error.message });
      } else {
        results.push({ email: normalized, status: "created", tempPassword });
      }
    } catch (err) {
      results.push({
        email: normalized,
        status: "error",
        message: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  return results;
}
