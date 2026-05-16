-- Historique d'entretien d'un matériel (1-N).
-- Le prix est stocké en centimes (integer) pour éviter les approximations float.
-- par_qui est texte libre : peut être un tiers (prestataire, technicien externe), pas une FK utilisateur.

create table public.materiels_entretiens (
  id uuid primary key default gen_random_uuid(),
  materiel_id uuid not null references public.materiels (id) on delete cascade,
  date date not null,
  commentaires text,
  par_qui text,
  prix_centimes integer check (prix_centimes is null or prix_centimes >= 0),
  created_at timestamptz not null default now()
);

create index materiels_entretiens_materiel_id_date_idx
  on public.materiels_entretiens (materiel_id, date desc);

alter table public.materiels_entretiens enable row level security;

create policy "materiels_entretiens_select_authenticated"
  on public.materiels_entretiens for select
  to authenticated
  using (true);
