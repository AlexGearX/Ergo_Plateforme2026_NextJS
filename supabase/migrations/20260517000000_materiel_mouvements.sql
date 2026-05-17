-- Historique des mouvements de matériel (déplacements, prêts, retours, etc.)
-- L'état courant du matériel reste mis en cache sur materiels.piece_id /
-- personne_id : il est mis à jour dans la même transaction que l'insert du
-- mouvement par la server action enregistrerMouvement.

create type public.mouvement_type as enum (
  'deplacement',
  'pret',
  'retour',
  'perte',
  'casse',
  'reparation'
);

create table public.materiel_mouvements (
  id uuid primary key default gen_random_uuid(),

  materiel_id uuid not null references public.materiels (id) on delete cascade,
  type public.mouvement_type not null,

  -- Snapshot avant/après : trace lisible même si une pièce ou une personne
  -- est renommée par la suite. set null si l'entité référencée disparaît.
  piece_avant_id uuid references public.pieces (id) on delete set null,
  piece_apres_id uuid references public.pieces (id) on delete set null,
  personne_avant_id uuid references public.personnes (id) on delete set null,
  personne_apres_id uuid references public.personnes (id) on delete set null,

  date_retour_prevue date,
  commentaire text,

  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create index materiel_mouvements_materiel_id_idx
  on public.materiel_mouvements (materiel_id, created_at desc);
create index materiel_mouvements_personne_apres_id_idx
  on public.materiel_mouvements (personne_apres_id)
  where personne_apres_id is not null;
create index materiel_mouvements_piece_apres_id_idx
  on public.materiel_mouvements (piece_apres_id);

-- Backfill : pour chaque matériel existant, on enregistre un mouvement initial
-- qui matérialise son affectation actuelle. 'pret' si une personne ou une date
-- de prêt sont déjà connues, sinon 'deplacement' (mise en stock initiale).
insert into public.materiel_mouvements (
  materiel_id, type,
  piece_avant_id, piece_apres_id,
  personne_avant_id, personne_apres_id,
  date_retour_prevue, created_at
)
select
  m.id,
  case
    when m.personne_id is not null or m.date_pret is not null then 'pret'::mouvement_type
    else 'deplacement'::mouvement_type
  end,
  null,
  m.piece_id,
  null,
  m.personne_id,
  m.date_retour_prevue,
  coalesce(m.date_pret::timestamptz, m.created_at)
from public.materiels m;

-- Les infos de prêt vivent désormais sur le dernier mouvement.
alter table public.materiels drop column date_pret;
alter table public.materiels drop column date_retour_prevue;

alter table public.materiel_mouvements enable row level security;

create policy "materiel_mouvements_select_authenticated"
  on public.materiel_mouvements for select
  to authenticated
  using (true);

create policy "materiel_mouvements_insert_authenticated"
  on public.materiel_mouvements for insert
  to authenticated
  with check (true);

-- Pas d'update/delete : l'historique est immuable. À ouvrir plus tard si on
-- a besoin de corriger une saisie erronée.
