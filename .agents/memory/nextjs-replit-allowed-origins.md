---
name: Next.js allowedDevOrigins on Replit
description: Next.js 15 blocks RSC payloads from the Replit proxy without allowedDevOrigins — causes client-component routes to 404.
---

## Rule
Any Next.js 15 app on Replit must include `allowedDevOrigins` in `next.config.mjs`.

**Why:** The Replit preview is served through a proxy on `*.worf.replit.dev`. Next.js 15 treats requests from that domain as cross-origin and blocks the RSC fetch calls for pages that are fully `"use client"`. Root pages backed by server components may still return 200 because they don't rely on client-side RSC fetches, but any route that is a pure client component (e.g. a login page) will return 404.

**How to apply:**
```js
const nextConfig = {
  allowedDevOrigins: [
    '*.worf.replit.dev',
    '*.replit.dev',
  ],
  // ... rest of config
};
```

Add this to every new Next.js artifact on Replit before any routes are tested.
