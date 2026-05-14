<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

Key Next.js 16 changes to remember:

- `middleware.ts` is **deprecated** and renamed to `proxy.ts` (project root or `src/`).
- `cookies()`, `headers()`, `params`, `searchParams` are **async** — always `await` them.
- `next typegen` runs as `postinstall` to generate route types.

# Architecture

```
supabase/migrations/                  # SQL migrations (run via Supabase CLI or SQL Editor)
src/
  app/
    layout.tsx                        # Root server layout — reads x-locale from headers
    globals.css                       # Tailwind v4 + shadcn tokens
    [locale]/                         # All user-facing routes live here
      layout.tsx                      # Validates locale, mounts ClientProviders
      page.tsx                        # Server entry — renders *-client.tsx
      home-client.tsx                 # 'use client' UI
      <route>/{page,*-client}.tsx
    auth/callback/route.ts            # Supabase OAuth code exchange
  components/
    ui/                               # shadcn primitives (managed via shadcn CLI)
    layout/                           # client-providers, header, footer, navigation
    <domain>/                         # Domain-grouped components (auth, billing, …)
  hooks/                              # Cross-cutting React hooks (use-*)
  lib/
    supabase/                         # client (browser) / server / middleware / database.types
    auth/                             # AuthProvider, useAuth, AuthUser type
    i18n/                             # LocaleProvider, config, type-safe translations
    utils.ts                          # cn() helper
  proxy.ts                            # Next 16 proxy — locale redirect + Supabase session refresh
```

# Conventions

- **Routes go under `[locale]/`** — proxy.ts redirects bare paths to the preferred locale.
- **Server / client split**: keep `page.tsx` server (data, metadata) and put interactivity in a sibling `*-client.tsx` with `'use client'`.
- **Supabase clients**:
  - Browser code (`'use client'`) → `import { createClient } from '@/lib/supabase/client'`
  - Server components / route handlers / server actions → `import { createClient } from '@/lib/supabase/server'`
  - Token refresh in `proxy.ts` → `import { updateSession } from '@/lib/supabase/middleware'`
- **Auth**: wrap with `AuthProvider` (already in `ClientProviders`), consume with `useAuth()`. Auth state listener must stay synchronous — async callbacks deadlock Supabase under React StrictMode.
- **i18n**: add a new key to `src/lib/i18n/translations.ts` (typed, no string keys). Add a locale to `src/lib/i18n/config.ts#locales` to enable it.
- **shadcn**: run `pnpm dlx shadcn@latest add <component>` — `components.json` is configured (`new-york`, neutral base color).
- **DB schema**: write a numbered SQL file in `supabase/migrations/`. Regenerate types with `pnpm supabase:types` (needs `SUPABASE_PROJECT_ID` in env).

# Workflow

- `pnpm dev` — Turbopack dev server
- `pnpm build` — production build
- `pnpm typecheck` — `tsc --noEmit`
- `pnpm lint` — ESLint (Next + prettier rules)
- `pnpm prettier:write` — format
- `pnpm supabase:types` — regenerate Supabase types

# Environment variables

Copy `.env.local.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_PROJECT_ID` (only for `supabase:types`)
