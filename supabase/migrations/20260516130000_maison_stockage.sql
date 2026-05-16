-- Maison de type "stockage" : un local central qui sert de réserve pour le matériel
-- non encore attribué à une chambre / personne. Discriminant via maison_type plutôt
-- qu'une nouvelle entité — la hiérarchie Maison → Pièce → Matériel reste valable.

create type public.maison_type as enum (
  'habitation',
  'stockage'
);

alter table public.maisons
  add column type public.maison_type not null default 'habitation';

-- numero=0 réservé à la maison de stockage (les maisons d'habitation sont 1..99).
alter table public.maisons
  drop constraint if exists maisons_numero_check;
alter table public.maisons
  add constraint maisons_numero_check check (numero between 0 and 99);

-- Seed : une seule maison stockage. position=0 pour la placer logiquement avant
-- les habitations dans tout tri par position.
insert into public.maisons (numero, nom, slug, position, type) values
  (0, 'Stockage', 'stockage', 0, 'stockage');

-- Zones de stockage par défaut (type 'autre' — les zones n'ont pas de sémantique
-- chambre/SDB, on réutilise l'enum existant pour ne pas multiplier les types).
insert into public.pieces (maison_id, type, nom, position)
select m.id, 'autre'::public.piece_type, z.nom, z.position
from public.maisons m
cross join (values
  ('Réserve principale', 1),
  ('Atelier', 2),
  ('Étagères transferts', 3),
  ('Étagères fauteuils', 4)
) as z(nom, position)
where m.slug = 'stockage';
