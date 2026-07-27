export type MembershipTier = 'basic' | 'premium' | 'elite';

export const TIER_RANK: Record<MembershipTier, number> = {
  basic: 0,
  premium: 1,
  elite: 2,
};

export function tierAllows(userTier: MembershipTier, requiredTier: MembershipTier): boolean {
  return TIER_RANK[userTier] >= TIER_RANK[requiredTier];
}

export const TIER_LABELS: Record<MembershipTier, string> = {
  basic: 'Basic',
  premium: 'Premium',
  elite: 'Elite',
};

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  membership_tier: MembershipTier;
  created_at: string;
}

export interface Video {
  id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  video_url: string;
  category: string;
  duration: string | null;
  created_at: string;
}

export interface Release {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  video_url: string | null;
  content: string | null;
  required_tier: MembershipTier;
  release_date: string;
  created_at: string;
}
