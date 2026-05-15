-- Maisons & pièces : seed initial du site (7 maisons identiques en structure).
-- Aucune policy d'écriture : tant que les rôles admin/lecteur ne sont pas câblés,
-- la donnée reste figée à ce seed.

create type public.piece_type as enum (
  'chambre',
  'salle_de_bain',
  'salle_de_vie',
  'cuisine',
  'autre'
);

create table public.maisons (
  id uuid primary key default gen_random_uuid(),
  numero smallint not null unique check (numero between 1 and 99),
  nom text not null,
  slug text not null unique,
  position smallint not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.pieces (
  id uuid primary key default gen_random_uuid(),
  maison_id uuid not null references public.maisons (id) on delete cascade,
  type public.piece_type not null,
  nom text not null,
  position smallint not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (maison_id, nom)
);

create index pieces_maison_id_idx on public.pieces (maison_id);
create index pieces_maison_id_type_idx on public.pieces (maison_id, type);

-- Seed des 7 maisons
insert into public.maisons (numero, nom, slug, position) values
  (1, 'Maison 1', 'maison-1', 1),
  (2, 'Maison 2', 'maison-2', 2),
  (3, 'Maison 3', 'maison-3', 3),
  (4, 'Maison 4', 'maison-4', 4),
  (5, 'Maison 5', 'maison-5', 5),
  (6, 'Maison 6', 'maison-6', 6),
  (7, 'Maison 7', 'maison-7', 7);

-- Seed des pièces : 8 chambres + 2 SDB + 1 salle de vie par maison
insert into public.pieces (maison_id, type, nom, position)
select
  m.id,
  'chambre'::public.piece_type,
  'Chambre ' || m.numero || ' - ' || c.n,
  c.n
from public.maisons m
cross join generate_series(1, 8) as c(n);

insert into public.pieces (maison_id, type, nom, position)
select m.id, 'salle_de_bain'::public.piece_type, 'Salle de bain gauche', 9
from public.maisons m;

insert into public.pieces (maison_id, type, nom, position)
select m.id, 'salle_de_bain'::public.piece_type, 'Salle de bain droite', 10
from public.maisons m;

insert into public.pieces (maison_id, type, nom, position)
select m.id, 'salle_de_vie'::public.piece_type, 'Salle de vie', 11
from public.maisons m;

-- RLS : lecture pour tout utilisateur authentifié, aucune écriture pour l'instant.
alter table public.maisons enable row level security;
alter table public.pieces enable row level security;

create policy "maisons_select_authenticated"
  on public.maisons for select
  to authenticated
  using (true);

create policy "pieces_select_authenticated"
  on public.pieces for select
  to authenticated
  using (true);
