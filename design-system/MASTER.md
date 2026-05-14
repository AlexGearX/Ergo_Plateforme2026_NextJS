# Design System — Plateforme Ergo ADAPEI

> **Source de vérité globale.** Tout écran et tout composant doit suivre ce document, sauf override explicite dans `design-system/pages/<page>.md`.
>
> **Stack cible** : Next.js 16 · React 19 · Tailwind v4 · shadcn/ui (`new-york`, base `neutral`) · Lucide · Supabase.

---

## 1. Identité & ton

**Produit** : outil interne pour une ergothérapeute (admin) + soignants (lecture). Remplace Excel/Word pour suivre le matériel et les aides au repas.

**Ressenti voulu** :

- **Calme** — pas de surcharge visuelle, pas d'éléments qui s'agitent.
- **Sérieux et rassurant** — contexte médico-social, données sensibles.
- **Net et fonctionnel** — la lecture rapide d'une fiche prime sur la séduction.
- **Accessible par défaut** — utilisatrices/utilisateurs adultes, lecture intensive, parfois fatigue cognitive.

**Ce qu'on n'est PAS** :

- pas un SaaS B2B grand public à la Linear/Notion (trop tech, trop dense)
- pas un produit consumer/lifestyle (pas de gradient, pas de fun)
- pas un dashboard d'analyste (densité confortable, pas data-trader)

---

## 2. Style retenu

**Hybride : Minimalism fonctionnel (Swiss) + Inclusive Design.**

| Dimension    | Choix                                                                                  |
| ------------ | -------------------------------------------------------------------------------------- |
| Layout       | Grid sobre, hiérarchie typo claire, beaucoup d'espace blanc                            |
| Couleurs     | Palette restreinte autour d'un **sage tendre** + vert plus saturé pour les validations |
| Effets       | **Sans glassmorphism, sans gradient, sans neon, sans skeuomorphism**                   |
| Densité      | **Confortable** — pas data-dense, pas marketing-airy                                   |
| A11y         | Cible **WCAG AA partout, AAA sur texte principal**                                     |
| Iconographie | Lucide uniquement, stroke 1.5–2 cohérent, jamais d'emoji                               |

**Note** : le moteur de recommandation a proposé "Real-Time / Operations Landing" — non retenu, ce n'est pas une landing mais un outil interne. Le style "Data-Dense Dashboard" est partiellement repris (efficacité, KPI cards), mais on relâche la densité pour favoriser la lisibilité.

---

## 3. Couleurs — tokens OKLCH

Aligné Tailwind v4 / shadcn. À coller dans `src/app/globals.css` quand on déclenche le pass de couleur (les tokens actuels sont neutres B&W — c'est OK pour démarrer).

### Light

```css
:root {
  --radius: 0.625rem;

  --background: oklch(1 0 0);
  --foreground: oklch(0.2 0.02 200);

  --card: oklch(1 0 0);
  --card-foreground: oklch(0.2 0.02 200);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.2 0.02 200);

  --primary: oklch(0.75 0.09 165); /* jade clair doux — identité, CTA */
  --primary-foreground: oklch(0.22 0.07 165); /* jade très foncé — texte sur primary */

  --secondary: oklch(0.97 0.005 200);
  --secondary-foreground: oklch(0.3 0.03 200);

  --muted: oklch(0.97 0.005 200);
  --muted-foreground: oklch(0.5 0.02 200);

  --accent: oklch(0.94 0.035 165); /* jade très pâle — fond hover */
  --accent-foreground: oklch(0.32 0.1 165); /* jade profond — texte accent / eyebrow */

  --success: oklch(0.58 0.16 142); /* vert plus jaune et saturé — validations, rendus */
  --success-foreground: oklch(0.985 0 0);

  --warning: oklch(0.7 0.15 60); /* amber-500 — perdu, attention */
  --warning-foreground: oklch(0.25 0.05 60);

  --destructive: oklch(0.58 0.22 27); /* red-600 — suppression, cassé */
  --destructive-foreground: oklch(0.985 0 0);

  --border: oklch(0.92 0.005 200);
  --input: oklch(0.92 0.005 200);
  --ring: oklch(0.6 0.13 165); /* jade saturé — focus visible */

  --chart-1: oklch(0.75 0.09 165);
  --chart-2: oklch(0.58 0.16 142);
  --chart-3: oklch(0.7 0.15 60);
  --chart-4: oklch(0.58 0.22 27);
  --chart-5: oklch(0.5 0.02 200);
}
```

### Dark

```css
.dark {
  --background: oklch(0.18 0.02 180);
  --foreground: oklch(0.97 0.01 200);

  --card: oklch(0.22 0.02 180);
  --card-foreground: oklch(0.97 0.01 200);
  --popover: oklch(0.22 0.02 180);
  --popover-foreground: oklch(0.97 0.01 200);

  --primary: oklch(0.75 0.12 165);
  --primary-foreground: oklch(0.18 0.06 165);

  --secondary: oklch(0.28 0.02 200);
  --secondary-foreground: oklch(0.97 0.01 200);

  --muted: oklch(0.28 0.02 200);
  --muted-foreground: oklch(0.7 0.02 200);

  --accent: oklch(0.3 0.07 165);
  --accent-foreground: oklch(0.86 0.1 165);

  --success: oklch(0.72 0.14 142);
  --success-foreground: oklch(0.16 0.04 142);

  --warning: oklch(0.78 0.15 70);
  --warning-foreground: oklch(0.2 0.04 60);

  --destructive: oklch(0.7 0.19 22);
  --destructive-foreground: oklch(0.985 0 0);

  --border: oklch(1 0 0 / 12%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.75 0.12 165);

  --chart-1: oklch(0.75 0.12 165);
  --chart-2: oklch(0.72 0.14 142);
  --chart-3: oklch(0.78 0.15 70);
  --chart-4: oklch(0.7 0.19 22);
  --chart-5: oklch(0.7 0.02 200);
}
```

### Règles d'usage

- **Tokens sémantiques uniquement** dans les composants : `bg-primary`, `text-muted-foreground`, jamais `bg-green-500`.
- **`success` / `warning`** ne sont pas livrés par shadcn par défaut — déjà mappés dans `@theme inline`. Utilisables en `bg-success`, `text-warning`, etc.
- **`primary` est un jade clair et doux** (L ≈ 0.75, C ≈ 0.09, hue 165 → vert tirant légèrement vers le bleuté, calme et un peu précieux). Conséquence directe : **ne pas utiliser `text-primary` sur fond clair** (contraste ~2.6:1, insuffisant pour body text). Pour un texte « teinté primaire » (eyebrow, état actif texte), utiliser **`text-accent-foreground`** qui est un jade profond (L ≈ 0.32) et reste lisible.
- **`primary` ne sert pas pour les statuts** : trop proche de `success`. Le statut « Attribué / en cours » utilise un neutre (`border-border bg-muted text-foreground`). Le statut « Rendu » utilise `success`. Voir §6 — Badges de statut.
- **Couleur jamais seule porteuse de sens** : un statut affiche **icône + couleur + texte**, pas la pastille verte seule.
- **Contraste minimum** : 4.5:1 corps de texte (AA), cible 7:1 sur `foreground` (AAA). `foreground` sur `background` dépasse 12:1 ; `primary-foreground` sur `primary` dépasse 9:1.

---

## 4. Typographie

### Pile (décidée)

| Rôle                         | Police                         | Pourquoi                                                                                                       |
| ---------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| Titres, KPI, display         | **Lexend**                     | Designed for reading proficiency. Lisibilité supérieure à toutes tailles, pertinent en contexte médico-social. |
| Corps                        | **Geist Sans** (déjà installé) | Neutre, multilingue, excellente lisibilité écran.                                                              |
| Mono (IDs, codes inventaire) | **Geist Mono** (déjà installé) | Chiffres tabulaires natifs.                                                                                    |

**Implémentation** : Lexend via `next/font/google` dans `src/app/layout.tsx`, exposé en `--font-lexend`, exposé Tailwind via `--font-display: var(--font-lexend)` dans `@theme inline`. Utiliser `font-display` ou `font-sans` selon le contexte.

### Échelle (Tailwind classes)

| Usage                           | Classes                   | Taille | Poids |
| ------------------------------- | ------------------------- | ------ | ----- |
| Display (rare, KPI gros)        | `text-4xl tracking-tight` | 36px   | 600   |
| H1                              | `text-3xl tracking-tight` | 30px   | 600   |
| H2                              | `text-2xl tracking-tight` | 24px   | 600   |
| H3 (carte)                      | `text-lg`                 | 18px   | 600   |
| Body                            | `text-base`               | 16px   | 400   |
| Body small (table cell, helper) | `text-sm`                 | 14px   | 400   |
| Caption / metadata              | `text-xs`                 | 12px   | 500   |

**Règles** :

- Body **jamais sous 14px**, idéalement 16px.
- `line-height` : `leading-relaxed` (1.625) sur paragraphes longs, `leading-snug` (1.375) sur titres.
- **Tabular numerals** pour toute donnée chiffrée (quantités, dates, IDs) : `font-variant-numeric: tabular-nums` ou `tabular-nums` utility.
- Pas d'italique pour titres ni boutons.

---

## 5. Espacement, layout & radius

### Échelle

Tailwind native 4/8. Densité **confortable** :

| Token   | Valeur | Usage                        |
| ------- | ------ | ---------------------------- |
| `p-2`   | 8px    | gap dans une stack dense     |
| `p-3`   | 12px   | padding interne input/button |
| `p-4`   | 16px   | padding carte compacte       |
| `p-6`   | 24px   | padding carte standard       |
| `p-8`   | 32px   | section interne              |
| `py-10` | 40px   | section de page              |
| `py-12` | 48px   | hero / grande respiration    |

### Touch targets et hauteurs

- **Min 44×44px** sur tout élément interactif (norme WCAG 2.5.5 AAA).
- Boutons standard : `h-10` (40px) → ajouter `min-h-11` si touch-critique.
- Inputs : `h-10` minimum.
- Table rows : `h-12` à `h-14` (48–56px).
- Sidebar items : `h-10` confortable.

### Layout

- **Container max** : `max-w-7xl` (1280px) pour les vues données ; `max-w-6xl` (1152px) pour les vues formulaires.
- **Gutters page** : `px-4` mobile, `px-6` tablette, `px-8` desktop.
- **Grid** : 12 colonnes desktop, gap `gap-6`.
- **Breakpoints** : `sm:640` `md:768` `lg:1024` `xl:1280` `2xl:1536` (défaut Tailwind, **on ne le redéfinit pas**).

### Radius

- `--radius: 0.625rem` (10px) — déjà configuré.
- `rounded-md` (~8px) sur la majorité (boutons, inputs, badges, cards).
- `rounded-lg` (10px) sur cards principales et modals.
- **Jamais `rounded-full` sur les boutons texte** (réservé avatars, dot, switch).

### Élévation / shadows

| Niveau | Token       | Usage                            |
| ------ | ----------- | -------------------------------- |
| 0      | aucun       | cards de contenu (border suffit) |
| 1      | `shadow-sm` | dropdowns, popovers, tooltip     |
| 2      | `shadow-md` | sheets latéraux                  |
| 3      | `shadow-lg` | modals/dialogs                   |

**On ne mélange pas border + shadow forte** (effet sale). Carte = border ; modal = shadow-lg sans border.

---

## 6. Composants — règles transverses

### Boutons (`<Button>` shadcn)

| Variant       | Quand                                                                               |
| ------------- | ----------------------------------------------------------------------------------- |
| `default`     | action primaire de la vue (1 seule par écran)                                       |
| `outline`     | action secondaire neutre                                                            |
| `secondary`   | action tertiaire dans la même grappe                                                |
| `ghost`       | action discrète dans une cellule/header                                             |
| `destructive` | suppression / action irréversible — **toujours derrière un dialog de confirmation** |
| `link`        | lien stylé                                                                          |

- **Loading state obligatoire** sur toute action async : `disabled` + spinner Lucide (`Loader2` avec `animate-spin`), texte conservé.
- Min `h-10`, `font-medium`, **jamais en MAJUSCULES**.
- Pas de scale agressif en hover ; `active:scale-[0.98]` autorisé, discret.

### Inputs / formulaires

- **`react-hook-form` + zod resolver** obligatoire (rappel AGENTS.md).
- **Label toujours visible** au-dessus du champ (`<Label htmlFor>`). Placeholder = exemple uniquement, jamais le label.
- **Helper text** sous le champ en `text-sm text-muted-foreground` pour expliquer un format ou une contrainte.
- **Erreur** : bordure `border-destructive` + message `text-sm text-destructive` sous le champ + `role="alert"` + `aria-invalid="true"`.
- **Required** : astérisque visible `<span aria-hidden="true" className="text-destructive">*</span>` + `aria-required="true"`.
- **Validation `onBlur`**, pas `onChange` (sinon erreur pendant la frappe → bruit).
- Au submit raté : focus automatique sur le premier champ invalide.
- `autocomplete` / `inputmode` corrects (`tel`, `email`, `numeric`…).

### Cards

- `bg-card`, `border`, `rounded-lg`, `p-6`.
- Pas de shadow par défaut.
- Header : titre `text-lg font-semibold`, description `text-sm text-muted-foreground`.
- Actions card en haut à droite ou en footer, jamais empilées au milieu.

### Tables (vue stock matériel, liste personnes…)

- Header sticky en haut, fond `bg-muted/50`.
- Lignes `h-12` à `h-14`, hover `hover:bg-muted/50`.
- **Pas de zebra striping** — bruit visuel, on garde border-bottom 1px discret.
- Tri : chevron Lucide cliquable dans le header, `aria-sort` mis à jour.
- Filtres au-dessus : search global + facettes (select / chips).
- Pagination ou virtualisation si > 50 lignes.
- Empty state explicite : illustration sobre (icône Lucide encadrée) + texte d'explication + CTA d'action ("Ajouter du matériel").
- Mobile (< 768px) : transformer en **liste de cards** plutôt que scroll horizontal pour les vues > 4 colonnes critiques.
- Numéros, quantités, dates : `tabular-nums`.

### Badges de statut (matériel, aide repas)

Système commun, **icône + label + couleur** :

| Statut               | Couleur token                                         | Icône Lucide    |
| -------------------- | ----------------------------------------------------- | --------------- |
| En cours / Attribué  | **neutre** (`border-border bg-muted text-foreground`) | `CircleDot`     |
| Rendu                | `success`                                             | `Check`         |
| À rendre bientôt     | `warning`                                             | `Clock`         |
| Perdu                | `warning` (saturé)                                    | `HelpCircle`    |
| Cassé / Hors service | `destructive`                                         | `AlertTriangle` |

> Pourquoi neutre pour « Attribué » : `primary` (sage clair) et `success` (vert saturé) sont déjà deux verts. Donner du vert à « Attribué » en plus créerait trois statuts quasi-identiques. Le neutre fait le tampon visuel.

### Dialogs / Modals

- Overlay : `bg-black/40 backdrop-blur-sm`.
- Animation : scale 0.96 → 1 + fade, **180–220ms ease-out**.
- Largeur : `max-w-md` (form simple) à `max-w-2xl` (form riche). Pleine largeur mobile avec gutters.
- Bouton close (X) en haut à droite + `Escape` + click overlay (sauf form avec modifs non sauvées → confirm).
- Action primaire à droite, cancel à gauche.
- **Confirmation obligatoire** sur toute suppression : `AlertDialog` shadcn avec verbe explicite ("Supprimer", pas "OK").

### Navigation

- **Pas de bottom nav** — c'est un outil web, pas une app mobile.
- **Sidebar gauche** desktop ≥ `lg` (1024px), collapsible. Items : icône Lucide + label, état actif `bg-accent text-accent-foreground` + indicateur 2px à gauche.
- **Drawer (Sheet)** mobile, ouvert via hamburger dans le header.
- **Top header** : titre de page + actions contextuelles à droite + menu user.
- **Breadcrumbs** dès qu'on dépasse 2 niveaux de profondeur (ex. Maisons / Les Bleuets / Salle de bain 1 / Matériel attribué).
- Item actif **toujours visible** (couleur + poids + indicateur), pas seulement couleur.

### Toasts (notifications)

- Component shadcn `sonner` recommandé (à installer si besoin).
- Position : `bottom-right` desktop, `top-center` mobile.
- Auto-dismiss 4–5s ; persistant pour erreurs critiques.
- `aria-live="polite"` (succès) ou `role="alert"` (erreur).
- Toujours un libellé explicite : pas "Erreur", mais "Impossible d'enregistrer le matériel — vérifier la connexion".

---

## 7. Motion & interactions

| Cas                   | Durée                                               | Easing                                        |
| --------------------- | --------------------------------------------------- | --------------------------------------------- |
| Hover bg/color        | 150ms                                               | `ease-out`                                    |
| Dropdown/popover open | 180ms                                               | `ease-out`                                    |
| Dialog open           | 200ms                                               | `cubic-bezier(0.16, 1, 0.3, 1)` (spring soft) |
| Dialog close          | 140ms                                               | `ease-in` (exit ≈ 70% enter)                  |
| Page transition       | éviter — préférer rendu instantané sur outil métier | —                                             |

**Règles dures** :

- `@media (prefers-reduced-motion: reduce)` → transitions ramenées à `1ms` ou supprimées sur transform/opacity décoratifs.
- **Anime `transform` + `opacity` uniquement**, jamais `width/height/top/left`.
- **Une seule animation primaire à l'écran à la fois** (pas de stagger sur 12 lignes).
- Toute animation **interruptible** par un tap/clic utilisateur.

---

## 8. Accessibilité — non-négociable

Checklist appliquée à chaque écran livré :

- [ ] Contraste texte ≥ **4.5:1** (cible 7:1 sur `foreground`)
- [ ] Focus visible **2–4px ring** sur tout élément interactif (jamais `outline:none` sans remplacement)
- [ ] Ordre de tabulation = ordre visuel
- [ ] Labels associés (`htmlFor`) sur tous les inputs
- [ ] Erreurs annoncées (`role="alert"` ou `aria-live`)
- [ ] Icônes seules : `aria-label` explicite
- [ ] **Couleur jamais seule porteuse** de sens (toujours icône + texte aussi)
- [ ] Skip link `Aller au contenu principal` en début de `<body>`
- [ ] `lang="fr"` sur `<html>` (déjà géré par i18n)
- [ ] Heading hierarchy sans saut (h1 → h2 → h3)
- [ ] `prefers-reduced-motion` respecté
- [ ] Touch targets ≥ 44×44px
- [ ] Test clavier complet (Tab, Shift+Tab, Enter, Space, Escape, Arrows pour selects)

---

## 9. Anti-patterns — ce qu'on n'utilise PAS

- ❌ Emoji comme icône (toujours Lucide)
- ❌ Glassmorphism, backdrop-blur décoratif (seul usage : overlay modal)
- ❌ Gradient flashy, néon, brutalist
- ❌ Animations d'entrée décoratives (parallax, stagger fade-up de listes)
- ❌ Texte gris clair sur fond gris (`text-gray-400` sur `bg-gray-100`)
- ❌ Placeholder comme label (`<input placeholder="Email">` sans `<Label>`)
- ❌ Submit sans état (pas de spinner, pas de toast)
- ❌ Destructive sans dialog de confirmation
- ❌ Color-only meaning (juste un point rouge sans icône ni texte)
- ❌ Densité data-trader (8 colonnes, 14px, padding 4px)
- ❌ Bottom nav (outil web admin)
- ❌ Custom cursor, scroll snapping créatif, hover-only interactions
- ❌ `any` TypeScript, useState pour les champs de formulaire (rappel AGENTS.md)

---

## 10. Implémentation — checklist de démarrage

Quand on déclenche le pass "habillage" :

1. **Coller les tokens** de §3 dans `src/app/globals.css` (remplacer les blocs `:root` et `.dark`).
2. **Ajouter `success` / `warning`** dans `@theme inline` :
   ```css
   --color-success: var(--success);
   --color-success-foreground: var(--success-foreground);
   --color-warning: var(--warning);
   --color-warning-foreground: var(--warning-foreground);
   ```
3. **Ajouter Lexend** via `next/font/google` dans `src/app/layout.tsx` (poids 400/500/600/700), exposer en `--font-lexend`, l'ajouter dans `@theme inline` en `--font-display: var(--font-lexend)`.
4. **Composants shadcn de base** à installer en priorité :
   `pnpm dlx shadcn@latest add button input label form card dialog alert-dialog dropdown-menu select table badge tabs sheet skeleton sonner separator tooltip`.
5. **Créer `src/components/layout/skip-link.tsx`** (a11y, à monter dans le root layout).
6. **Créer `src/components/layout/app-shell.tsx`** (sidebar + header pattern réutilisable).
7. **Convention status** : un seul composant `<StatusBadge status="returned" />` qui mappe statut → couleur + icône + label.

---

## 11. Prompt template — pour briefer un écran

Quand on demandera d'implémenter un écran, partir de ce prompt :

```
Je construis la page <Nom>. Lire design-system/MASTER.md et, s'il existe,
design-system/pages/<page-slug>.md (qui override le master).
Stack : Next.js 16 App Router + RSC, Tailwind v4, shadcn new-york, Lucide.
Forms : react-hook-form + zod. Supabase RLS partout.
Respecter §8 (a11y) et §9 (anti-patterns).
```

---

## 12. Évolutions à confirmer (questions ouvertes)

- Densité tables : confirmer `h-12` (48px) vs `h-14` (56px) après le premier vrai écran liste.

## 13. Décisions actées

- **Typo** : Lexend (display) + Geist Sans (body) + Geist Mono.
- **Dark mode** : livré dès la v1 — tokens light + dark définis simultanément, aucun écran n'est validé sans test des deux thèmes.
- **Rôle lecture seule (soignants)** : combinaison **B + D**.
  - **B — boutons d'action masqués** : pas de rendu des CTAs `Ajouter / Modifier / Supprimer` côté soignant. L'écran reste épuré, pas de boutons grisés en sapin de Noël.
  - **D — badge discret dans le menu user** : pastille `Lecture seule` à côté du nom dans le header, pour que le soignant comprenne son rôle sans bandeau anxiogène permanent.
  - **Implémentation** : un hook `useCanWrite()` (lecture du rôle Supabase) qui retourne un boolean ; les composants d'action retournent `null` si `!canWrite`. **Mais ne JAMAIS s'en remettre au front pour la sécurité** — toutes les server actions doivent re-checker le rôle, et les RLS Supabase bloquent les writes côté DB.
