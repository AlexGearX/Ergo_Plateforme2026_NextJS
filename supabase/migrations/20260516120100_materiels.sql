-- Matériels : table principale de l'inventaire.
-- Seuls type, modele et piece_id sont obligatoires : le reste est saisi au cas par cas
-- car beaucoup de matériel pré-existant n'a pas toutes les informations renseignées.

create type public.materiel_type as enum (
  'materiel_transfert',
  'brancard_douche',
  'baignoire',
  'lit',
  'matelas',
  'fauteuil_roulant',
  'chaise_douche',
  'wc'
);

create table public.materiels (
  id uuid primary key default gen_random_uuid(),

  type public.materiel_type not null,
  nom text,
  modele text not null,
  reference text,
  numero_serie text,
  date_achat date,
  numero_mas text,
  duree_vie_annees smallint check (duree_vie_annees is null or duree_vie_annees > 0),
  commentaire text,

  piece_id uuid not null references public.pieces (id) on delete restrict,
  personne_id uuid references public.personnes (id) on delete set null,

  date_pret date,
  date_retour_prevue date,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index materiels_piece_id_idx on public.materiels (piece_id);
create index materiels_personne_id_idx on public.materiels (personne_id);
create index materiels_type_idx on public.materiels (type);

-- RLS : lecture authentifiée, écriture différée jusqu'au câblage des rôles.
alter table public.materiels enable row level security;

create policy "materiels_select_authenticated"
  on public.materiels for select
  to authenticated
  using (true);
