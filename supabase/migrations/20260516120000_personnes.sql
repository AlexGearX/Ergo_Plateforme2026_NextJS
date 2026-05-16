-- Personnes : version minimale (nom, prénom, lien Google Drive vers fiche, pièce de rattachement).
-- Les notions interne/externe et chambre vs autre pièce seront introduites plus tard.

create table public.personnes (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  prenom text not null,
  lien text,
  piece_id uuid references public.pieces (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index personnes_piece_id_idx on public.personnes (piece_id);
create index personnes_nom_prenom_idx on public.personnes (nom, prenom);

-- RLS : lecture pour tout utilisateur authentifié, aucune écriture tant que le rôle admin n'est pas câblé.
alter table public.personnes enable row level security;

create policy "personnes_select_authenticated"
  on public.personnes for select
  to authenticated
  using (true);
