# The Vintage Circle

An exclusive wine club membership site with Supabase authentication, a members-only video library, and tier-gated individual wine release pages.

## Run & Operate

- `pnpm --filter @workspace/wine-club run dev` — run the Next.js frontend (port assigned by workflow)
- `pnpm --filter @workspace/api-server run dev` — run the Express API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages

## Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS v4, shadcn/ui, Framer Motion
- **Auth & Database**: Supabase (SSR with @supabase/ssr)
- **API**: Express 5 (for future server-side features)
- **Monorepo**: pnpm workspaces, TypeScript 5.9

## Where things live

- `artifacts/wine-club/` — Next.js app (App Router)
- `artifacts/wine-club/src/app/` — Pages and layouts
- `artifacts/wine-club/src/lib/supabase/` — Supabase client helpers (client.ts = browser, server.ts = server)
- `artifacts/wine-club/src/lib/types.ts` — Shared TypeScript types (Profile, Video, Release, MembershipTier)
- `artifacts/wine-club/src/middleware.ts` — Auth route protection (redirects /members → /login)
- `artifacts/wine-club/src/app/auth/callback/route.ts` — Supabase OAuth/magic-link callback handler
- `artifacts/wine-club/supabase/schema.sql` — SQL schema to run in Supabase SQL Editor
- `artifacts/api-server/` — Express backend (unused for now, available for future features)

## Pages

| Route | Description |
|---|---|
| `/` | Public landing page with membership tiers |
| `/login` | Login with email/password or magic link |
| `/auth/callback` | Supabase auth redirect handler |
| `/members` | Members-only video library (requires auth) |
| `/members/releases` | Wine release listing (requires auth) |
| `/members/releases/[slug]` | Individual release (tier-gated) |

## Membership Tiers

- **Basic** — can access Basic releases and the full video library
- **Premium** — can access Basic + Premium releases
- **Elite** — can access all releases including Elite allocations

## Supabase Setup (one-time)

1. Go to your Supabase project → SQL Editor
2. Run the contents of `artifacts/wine-club/supabase/schema.sql`
3. In Supabase → Authentication → URL Configuration, add your app URL to "Redirect URLs": `https://your-domain.com/auth/callback`
4. The schema creates: `profiles`, `videos`, and `releases` tables with RLS policies

## Required Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL` — set (shared env)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — set (shared env)
- `SUPABASE_SERVICE_ROLE_KEY` — needs to be set as a Secret

## Architecture Decisions

- Uses Supabase SSR (`@supabase/ssr`) for cookie-based auth — tokens refresh automatically via middleware
- Middleware runs on every non-static route, refreshes the session, and redirects unauthenticated users away from `/members`
- Tier access control is enforced server-side on each release page using `tierAllows()` utility
- The Replit-managed PostgreSQL database is unused — Supabase is the sole data store
- `shadcn/ui` components all have `'use client'` directive prepended for Next.js RSC compatibility

## User Preferences

- No en dashes (–) anywhere in UI copy or code comments — use a regular hyphen or em dash instead.

## Gotchas

- `@plugin "tw-animate-css"` doesn't work in Next.js PostCSS config — use `@import "tw-animate-css"` instead
- Next.js `cookies()` is async in Next.js 15 — always `await cookies()` in server.ts
- Dynamic page params are a `Promise` in Next.js 15 — destructure with `const { slug } = await params`
