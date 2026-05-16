---
name: refacto-review
description: Refacto + review du code selon le stack du projet (Next 16, React 19, TS strict, Tailwind v4, shadcn/radix, react-hook-form + zod, Supabase SSR, gsap, sonner, i18n typé). Découpe les fichiers >150 lignes, impose l'archi feature-first, vérifie les patterns serveur/client, et lance les checks pré-handoff. À déclencher quand l'utilisateur demande "refacto", "review", "nettoyer", "découper", "auditer" du code.
---

# refacto-review

Tu vas faire une **review puis un refacto ciblé** d'un fichier (ou d'un dossier feature). Tu opères avec les conventions de `AGENTS.md` et le stack fixé par `package.json`. Tu ne sors **pas** du périmètre demandé.

## 0. Cadrage

Si la cible n'est pas précisée par l'utilisateur, demande-la en une question (fichier, feature, ou diff courant). Sinon, commence directement.

Avant toute modif :

1. `git status` + `git diff` pour voir l'état courant.
2. Lis **intégralement** le(s) fichier(s) cible(s) et leurs voisins immédiats (page/layout/actions/schemas/components co-localisés).
3. Repère les **points d'entrée** (route, server action, hook public) — ne change pas leur signature sans raison.

## 1. Stack de référence (depuis `package.json`)

| Sujet      | Version / lib                                                                                                    | Implication directe                                                                                                                                                                                                             |
| ---------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework  | `next@16.2.6`                                                                                                    | `proxy.ts` (pas `middleware.ts`), `cookies()`/`headers()`/`params`/`searchParams` **async**, `next typegen` en postinstall, types de routes générés                                                                             |
| UI runtime | `react@19.2.4` + `react-dom@19.2.4`                                                                              | Server Components par défaut, Server Actions, `useActionState`, `useOptimistic`, `useFormStatus`, `use()` pour unwrap promesses, **`ref` est une prop** (plus de `forwardRef`), `useTransition` pour les actions non-bloquantes |
| Types      | `typescript@^5`                                                                                                  | **Zéro `any`** : `unknown` + narrowing (`typeof`, `instanceof`, parsing Zod, type guards)                                                                                                                                       |
| Styles     | `tailwindcss@^4`, `@tailwindcss/postcss`, `tw-animate-css`, `clsx`, `tailwind-merge`, `class-variance-authority` | Tokens via `globals.css` (pas de `tailwind.config.js` v3-style), composer via `cn()` (`@/lib/utils`), variants via `cva`                                                                                                        |
| Composants | `shadcn@^3.8.5` (CLI), `@radix-ui/*`, `radix-ui`, `lucide-react`, `sonner`                                       | Ajouter via `pnpm dlx shadcn@latest add <component>`. Toasts via `sonner`, jamais d'ad-hoc                                                                                                                                      |
| Forms      | `react-hook-form@^7.75`, `@hookform/resolvers@^5`, `zod@^4`                                                      | **Jamais** de `useState` pour les champs. Même schéma Zod côté client + server action                                                                                                                                           |
| Data       | `@supabase/ssr@^0.8`, `@supabase/supabase-js@^2.98`                                                              | 3 clients distincts (`client` / `server` / `middleware`), RLS **toujours**, listener d'auth **synchrone**                                                                                                                       |
| Anim       | `gsap@^3.15`                                                                                                     | Centraliser via hooks (`useGSAP`-like) dans `hooks/` de la feature, **cleanup obligatoire** (`gsap.context()` ou `ctx.revert()`)                                                                                                |

> Toute lib non listée ci-dessus ne doit pas apparaître dans un refacto sans accord explicite.

## 2. Checklist de review (par ordre de priorité)

Coche chaque ligne mentalement, puis liste uniquement les manquements dans ton rapport.

### A. Frontière serveur / client

- [ ] `page.tsx` reste **server component** (data fetching + metadata).
- [ ] `'use client'` uniquement si : state local, effets, APIs navigateur, écouteurs, hook tiers client.
- [ ] Aucune secret/clé ni `createClient` server importé dans un fichier `'use client'`.
- [ ] `params` / `searchParams` / `cookies()` / `headers()` sont **`await`-és**.
- [ ] Pas de `middleware.ts` — uniquement `proxy.ts`.

### B. React 19

- [ ] Pas de `forwardRef` — `ref` passé comme prop.
- [ ] Mutations via **Server Actions** (`actions.ts` de la feature), pas via `fetch` ad-hoc côté client.
- [ ] Formulaires utilisent `useActionState` + `useFormStatus` quand l'action est en jeu, sinon `react-hook-form` + `zod`.
- [ ] `useOptimistic` envisagé pour les listes éditables si pertinent.
- [ ] Pas de `useEffect` pour fetch des données qui peuvent vivre côté serveur.

### C. TypeScript

- [ ] Zéro `any`, zéro `as` non justifié.
- [ ] Types DB tirés de `src/lib/supabase/database.types.ts`, pas redéfinis à la main.
- [ ] Discriminated unions plutôt que flags booléens en cascade.
- [ ] Props composées via `type Props = …` exporté seulement si réutilisé hors fichier.

### D. Forms

- [ ] `useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) })`.
- [ ] Schéma Zod **partagé** client / server action.
- [ ] Erreurs affichées via composants shadcn `Form*` (pas de gestion manuelle).
- [ ] Submit appelle une server action (`actions.ts`) avec re-parse Zod côté serveur.

### E. Supabase

- [ ] Bon client selon le contexte (`client` / `server` / `middleware`).
- [ ] Migration SQL accompagnée de ses **policies RLS** dans `supabase/migrations/`.
- [ ] Pas de requête qui suppose un user — toujours filtrer via RLS + check `auth.uid()`.
- [ ] Régénération types : `pnpm supabase:types` si schéma touché.

### F. i18n & UX

- [ ] Toute string user-facing passe par `translations.ts` typé.
- [ ] Routes sous `[locale]/`.
- [ ] Feedback utilisateur via `sonner` (`toast.success` / `toast.error`).

### G. Architecture feature-first

- [ ] Composants / hooks / schemas / actions **co-localisés** dans la feature.
- [ ] Rien remonté en global tant qu'il n'est pas utilisé par **≥ 2 features**.
- [ ] Pas de barrel `index.ts` géant — imports directs.

### H. Lisibilité & taille

- [ ] **< 150 lignes par fichier** (cible). Au-delà : découper (voir §3).
- [ ] Nommage porteur de sens, pas de commentaires sauf _pourquoi_ non-évident.
- [ ] Code mort supprimé (imports, props, branches inatteignables).

### I. Perf / accessibilité

- [ ] `next/image` pour toute image, dimensions explicites.
- [ ] `next/font` pour les fonts (pas d'import CSS externe).
- [ ] `aria-*` et focus states cohérents (radix gère ça par défaut — ne pas casser).
- [ ] Animations gsap : `prefers-reduced-motion` respecté, cleanup en `revert()`.

## 3. Règle des 150 lignes — comment découper

Tu ne découpes pas pour découper. Tu découpes quand **au moins un** des signaux suivants apparaît :

1. Le fichier dépasse ~150 lignes **et** mélange plusieurs responsabilités.
2. Un bloc JSX a sa propre logique d'état / d'effet → extraire en composant.
3. Un calcul est réutilisé ou testable indépendamment → extraire en hook (`use*`) ou util pur.
4. Un schéma Zod ou un type partagé → `schemas.ts` ou `types.ts` de la feature.
5. Une server action grossit → la déplacer dans `actions.ts` à part du composant.

Cibles de découpe par type de fichier :

```
<feature>/
  page.tsx                  # < 60 lignes — data + metadata, déléguer le rendu
  <feature>-client.tsx      # < 150 lignes — orchestration UI, pas de logique métier
  actions.ts                # < 150 lignes — une action = une export
  schemas.ts                # < 150 lignes — Zod + types inférés
  components/
    <Component>.tsx         # < 150 lignes — un composant, ses sous-éléments locaux dessous
  hooks/
    use-<thing>.ts          # < 80 lignes — une responsabilité par hook
```

Si tu découpes, **mets à jour tous les imports** et vérifie qu'aucun chemin n'est cassé.

## 4. Workflow d'exécution

1. **Lecture** : lis la cible et son contexte direct. Note la taille en lignes.
2. **Rapport de review** (court, en français) :
   - **Constat** : 1–3 phrases.
   - **Problèmes par catégorie** (uniquement celles qui posent souci, format : `• [Catégorie] description — fichier:ligne`).
   - **Plan de refacto** : liste ordonnée des changements proposés, chacun avec un _pourquoi_.
3. **Refacto** : applique les changements via `Edit` / `Write`, fichier par fichier, en gardant chaque diff lisible.
4. **Checks pré-handoff** (obligatoires, dans cet ordre) :
   ```bash
   pnpm typecheck
   pnpm lint
   pnpm prettier:write
   ```
   Corrige tout ce qui est rouge avant de rendre la main.
5. **Synthèse finale** : 2–3 phrases — quoi changé, pourquoi, ce qui reste ouvert.

## 5. Garde-fous

- Ne change **jamais** le schéma DB sans demander.
- Ne touche **pas** à `proxy.ts`, `lib/supabase/*`, `lib/auth/*`, `lib/i18n/*` sans accord — ce sont des points névralgiques.
- N'ajoute aucune dépendance. Si un besoin justifie une lib, signale-le **avant** de l'installer.
- Ne crée pas de `README.md` / docs en passant — uniquement si l'utilisateur le demande.
- Ne renomme pas un export public (route, server action, hook exporté) sans confirmation.
- Si tu hésites entre deux découpes équivalentes, garde la plus proche du code existant.

## 6. Sortie attendue

Un seul message final, structuré ainsi :

```
## Review
<constat + problèmes par catégorie>

## Refacto appliqué
<liste des fichiers modifiés / créés / supprimés, 1 ligne chacun>

## Checks
typecheck ✅ / lint ✅ / prettier ✅
(ou détail des erreurs résiduelles si bloquant)

## Reste ouvert
<ce qui mérite un suivi, max 3 puces>
```
