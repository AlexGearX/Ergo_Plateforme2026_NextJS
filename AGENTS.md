<!-- BEGIN:nextjs-agent-rules -->

# Ce n'est PAS le Next.js que tu connais

Cette version contient des breaking changes — les APIs, conventions et la structure de fichiers peuvent toutes différer de tes données d'entraînement. Lis le guide pertinent dans `node_modules/next/dist/docs/` avant d'écrire du code. Tiens compte des notices de dépréciation.

<!-- END:nextjs-agent-rules -->

Changements clés de Next.js 16 à retenir :

- `middleware.ts` est **déprécié** et renommé en `proxy.ts` (racine du projet ou `src/`).
- `cookies()`, `headers()`, `params`, `searchParams` sont **async** — toujours les `await`.
- `next typegen` tourne en `postinstall` pour générer les types de routes.

# Contexte produit

**Plateforme de gestion de matériel pour une ergothérapeute de l'ADAPEI 63** (Association départementale de parents et amis de personnes handicapées mentales du Puy-de-Dôme).

**Objectif :** remplacer une multitude de documents Excel / Word actuellement utilisés pour suivre le matériel d'ergothérapie.

**Utilisateurs et droits :**

- **L'ergothérapeute** — utilisatrice principale, **admin** : droits complets (CRUD), c'est elle qui crée les comptes des autres utilisateurs (pas d'auto-inscription).
- **Autres soignants** — accès en **lecture seule** (visualisation, pas de modification).

**Modèle de domaine (vocabulaire métier) :**

- **Site** — l'établissement géré. Pour le moment **un seul site**, mais ne pas hardcoder cette hypothèse trop profondément (multi-site possible plus tard).
- **Maison** — un site contient plusieurs maisons.
- **Pièce** — une maison contient plusieurs pièces. Une pièce a un **type** (chambre, salle de bain, cuisine, salon…) et il peut y avoir **plusieurs pièces du même type** dans une maison (ex : 2 salles de bain).
- **Personne** — caractérisée par son rapport à l'hébergement :
  - **Interne** : réside dans une **chambre** (= pièce de type chambre) du site.
  - **Externe** : n'est pas hébergée sur le site.
- **Matériel** — équipement géré en **stock** (ex : fauteuils, aides à la mobilité…). Toujours rattaché à **une pièce**, et **optionnellement** aussi à **une personne** (max 1 personne à la fois) :
  - Pièce seule → équipement partagé.
  - Pièce + personne → matériel attribué à la personne dans cette pièce.
  - Champs prêt : `doit_etre_rendu` (boolean) et `date_retour` (date, optionnel — parfois non connue).
- **Aide technique au repas** — **entité distincte du matériel** : liste de fournitures prêtées temporairement, saisie **au cas par cas**, **sans stock ni gestion de mouvement** (contrairement au matériel) :
  - Champs : `commentaire` (texte libre), `statut` (en cours, perdu, cassé, rendu…), `date_retour_prevue`.
  - Rattachée à une personne (à confirmer à la modélisation).

**Implications techniques à garder en tête :**

- `materiel.piece_id` requis, `materiel.personne_id` nullable.
- `piece.type` est un enum (ou table de référence) — la « chambre » n'est pas une entité séparée, c'est un type de pièce.
- Le système de rôles (admin / lecteur) doit être pensé dès le début côté Supabase RLS.
- Données potentiellement sensibles (identification de personnes vulnérables, suivi médical indirect) → RLS Supabase indispensable, attention RGPD / données de santé.

# Architecture — feature-first

Le projet est organisé **feature-first**, pas type-first. Tout ce qui appartient à une feature (composants, server actions, hooks, schémas Zod, types, helpers locaux) vit **dans le dossier de la feature**. Les dossiers globaux sont réservés à ce qui est réellement partagé entre plusieurs features.

```
supabase/migrations/                  # Migrations SQL (via Supabase CLI ou SQL Editor)
src/
  app/
    layout.tsx                        # Layout serveur racine
    globals.css                       # Tailwind v4 + tokens shadcn
    page.tsx                          # Entrée serveur racine — rend home-client.tsx
    home-client.tsx                   # UI 'use client' de la home
    <feature>/                        # Feature routée — tout colocaliser
      page.tsx                        # Entrée serveur
      <feature>-client.tsx            # UI 'use client' (seulement si nécessaire)
      [id|slug]/                      # Routes dynamiques de la feature
        page.tsx
        <feature>-detail-client.tsx
        edition/
    auth/callback/route.ts            # Échange du code OAuth Supabase
  features/                           # Logique métier réutilisable hors route
    <feature>/                        # Mêmes règles de colocation
      actions.ts                      # Server actions de la feature
      schemas.ts                      # Schémas Zod
      queries.ts                      # Lectures Supabase
      types.ts / constants.ts         # Types et énumérations partagés
      components/                     # Composants riches (forms, selects, cellules…)
      tokens.ts                       # Tokens visuels propres à la feature
  components/
    ui/                               # Primitives shadcn (via CLI shadcn) — partagé
    layout/                           # client-providers, header, footer, navigation — partagé
    detail/                           # Composants de pages détail mutualisés (section-heading, meta-card…)
    form/                             # Composants de formulaire mutualisés (form-chapter, text-field…)
  hooks/                              # Hooks React cross-cutting — partagé uniquement
  lib/
    supabase/                         # client (browser) / server / middleware / database.types
    auth/                             # AuthProvider, useAuth, type AuthUser
    i18n/                             # LocaleProvider, config, traductions typées
    routes.ts                         # Constantes de routes
    utils.ts                          # helper cn()
  proxy.ts                            # Proxy Next 16 — refresh session Supabase
```

**Sur l'absence de segment `[locale]/`** : le projet est mono-locale (FR) pour le moment, donc les routes vivent sous `src/app/` directement (pas de `[locale]/`). L'i18n typé via `src/lib/i18n/` est conservée pour basculer plus tard sans douleur. **Ne pas réintroduire `[locale]/` sans demander** — c'est une migration qui touche tous les `Link href` et le `proxy.ts`.

**Règle générale :** avant de placer un fichier dans un dossier global, se demander _est-ce qu'il est réellement réutilisé par 2 features ou plus ?_ Si non, le garder colocalisé avec la feature.

# Conventions

## Routing & rendu

- **Routes sous `src/app/` direct** (pas de `[locale]/` tant qu'on est mono-locale). `proxy.ts` ne fait que rafraîchir la session Supabase.
- **Composants serveur par défaut.** N'ajouter `'use client'` que si vraiment nécessaire (interactivité, APIs navigateur, state local). Quand on en ajoute un, expliquer pourquoi.
- **Split serveur / client** : garder `page.tsx` en serveur (data, metadata) et mettre l'interactivité dans un sibling `*-client.tsx`.

## Style de code

- **Jamais de `any`** — utiliser `unknown` + narrowing (typeof, instanceof, parsing Zod, type guards).
- **Pas de commentaires sauf si vraiment nécessaire** — le nommage doit porter le sens. Commentaire uniquement pour un _pourquoi_ non-évident (workaround, invariant caché, contrainte externe).

## Forms

- Utiliser **`react-hook-form` + `@hookform/resolvers/standard-schema`** (Zod 4 = Standard Schema, plus de `zodResolver`).
- **Jamais de `useState` local** pour gérer les champs d'un formulaire.
- Le même schéma Zod valide côté client et dans la server action.
- Réutiliser les briques `src/components/form/` (`form-chapter`, `text-field`, `form-footer`) plutôt que de redéclarer ces patterns dans chaque feature.

## Supabase

- **Row Level Security activée partout, sans exception.** Toujours penser policies _avant_ d'écrire une requête.
- Toute nouvelle table dans `supabase/migrations/` doit venir avec ses policies (même migration ou migration immédiatement suivante).
- **Clients Supabase** :
  - Code navigateur (`'use client'`) → `import { createClient } from '@/lib/supabase/client'`
  - Composants serveur / route handlers / server actions → `import { createClient } from '@/lib/supabase/server'`
  - Refresh du token dans `proxy.ts` → `import { updateSession } from '@/lib/supabase/middleware'`

## Auth

- Wrapper avec `AuthProvider` (déjà dans `ClientProviders`), consommer avec `useAuth()`.
- Le listener d'état d'auth doit rester **synchrone** — les callbacks async deadlockent Supabase sous React StrictMode.

## i18n

- Les traductions vivent dans `src/locales/<locale>.json` et sont typées via `src/lib/i18n/translations.ts` (`type Translations = typeof fr`). Ajouter une clé = l'ajouter dans le JSON puis l'utiliser via `useLocale().t.<chemin>`.
- Ajouter une locale dans `src/lib/i18n/config.ts#locales` pour l'activer.
- Toute string user-facing passe par le système typé — jamais en dur. Beaucoup de strings sont encore en dur dans les `*-client.tsx` historiques : migration progressive acceptée.

## shadcn

- Lancer `pnpm dlx shadcn@latest add <component>` — `components.json` est configuré (`new-york`, base color neutral).

## Schéma DB

- Écrire un fichier SQL numéroté dans `supabase/migrations/`. Régénérer les types avec `pnpm supabase:types` (nécessite `SUPABASE_PROJECT_ID` dans l'env).

# Workflow

- `pnpm dev` — serveur de dev Turbopack
- `pnpm build` — build de production
- `pnpm typecheck` — `tsc --noEmit`
- `pnpm lint` — ESLint (règles Next + prettier)
- `pnpm prettier:write` — format
- `pnpm supabase:types` — régénère les types Supabase

**Avant de rendre une tâche de code à l'utilisateur**, lancer `pnpm typecheck`, `pnpm lint` et `pnpm prettier:write`. Corriger ce qui est rouge avant de déclarer la tâche terminée.

# Variables d'environnement

Copier `.env.local.example` vers `.env.local` et remplir :

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_PROJECT_ID` (uniquement pour `supabase:types`)
