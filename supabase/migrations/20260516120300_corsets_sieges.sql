-- Corset siège : sous-entité optionnelle 1-1 d'un fauteuil roulant.
-- La FK vers materiels_fauteuil_roulant garantit l'invariant (pas besoin de trigger supplémentaire).

create table public.corsets_sieges (
  materiel_id uuid primary key
    references public.materiels_fauteuil_roulant (materiel_id) on delete cascade,
  orthoprothesiste text,
  type text,
  commentaires text,
  date_livraison date,
  annee_renouvellement smallint check (annee_renouvellement is null or annee_renouvellement between 1900 and 2999),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.corsets_sieges enable row level security;

create policy "corsets_sieges_select_authenticated"
  on public.corsets_sieges for select
  to authenticated
  using (true);
