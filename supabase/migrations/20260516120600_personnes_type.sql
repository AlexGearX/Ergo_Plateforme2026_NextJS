-- Ajout du type interne / externe sur personnes.
-- 'interne' = réside dans une chambre du site ; 'externe' = pas hébergée sur le site.
-- Default 'interne' pour les lignes existantes (cas majoritaire à l'ADAPEI 63).

create type public.personne_type as enum ('interne', 'externe');

alter table public.personnes
  add column type public.personne_type not null default 'interne';
