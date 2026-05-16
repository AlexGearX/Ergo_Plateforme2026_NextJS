-- Extension 1-1 des matériels pour les fauteuils roulants.
-- Un trigger garantit que cette ligne ne peut exister que si materiels.type = 'fauteuil_roulant'.

create table public.materiels_fauteuil_roulant (
  materiel_id uuid primary key references public.materiels (id) on delete cascade,
  prestataire text,
  appartenance text,
  accessoires text,
  taille text,
  type_fauteuil text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.check_materiel_fauteuil_type()
returns trigger
language plpgsql
as $$
declare
  parent_type public.materiel_type;
begin
  select type into parent_type from public.materiels where id = new.materiel_id;
  if parent_type is null then
    raise exception 'materiel % introuvable', new.materiel_id;
  end if;
  if parent_type <> 'fauteuil_roulant' then
    raise exception 'materiels_fauteuil_roulant nécessite materiels.type = fauteuil_roulant (actuel: %)', parent_type;
  end if;
  return new;
end;
$$;

create trigger materiels_fauteuil_roulant_check_type
  before insert or update of materiel_id
  on public.materiels_fauteuil_roulant
  for each row execute function public.check_materiel_fauteuil_type();

alter table public.materiels_fauteuil_roulant enable row level security;

create policy "materiels_fauteuil_roulant_select_authenticated"
  on public.materiels_fauteuil_roulant for select
  to authenticated
  using (true);
