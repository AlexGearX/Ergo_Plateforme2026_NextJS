-- Fonction transactionnelle : enregistre un mouvement et met à jour le cache
-- d'affectation courante (materiels.piece_id, personne_id) en une seule unité.
-- Garantit qu'on ne peut pas avoir un historique qui diverge de l'état courant.
--
-- Le `type` est déduit automatiquement :
--   - personne après ≠ null              → 'pret'
--   - personne après = null et avant ≠ null → 'retour'
--   - sinon (changement de pièce seul)   → 'deplacement'
-- L'appelant peut forcer un type spécial ('perte', 'casse', 'reparation') via p_type.

create or replace function public.record_materiel_mouvement(
  p_materiel_id uuid,
  p_piece_apres_id uuid,
  p_personne_apres_id uuid default null,
  p_date_retour_prevue date default null,
  p_commentaire text default null,
  p_type public.mouvement_type default null
)
returns public.materiel_mouvements
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_piece_avant_id uuid;
  v_personne_avant_id uuid;
  v_type public.mouvement_type;
  v_mouvement public.materiel_mouvements;
begin
  select piece_id, personne_id
    into v_piece_avant_id, v_personne_avant_id
  from public.materiels
  where id = p_materiel_id
  for update;

  if not found then
    raise exception 'Matériel introuvable: %', p_materiel_id;
  end if;

  v_type := coalesce(
    p_type,
    case
      when p_personne_apres_id is not null then 'pret'::public.mouvement_type
      when v_personne_avant_id is not null and p_personne_apres_id is null then 'retour'::public.mouvement_type
      else 'deplacement'::public.mouvement_type
    end
  );

  insert into public.materiel_mouvements (
    materiel_id, type,
    piece_avant_id, piece_apres_id,
    personne_avant_id, personne_apres_id,
    date_retour_prevue, commentaire, created_by
  ) values (
    p_materiel_id, v_type,
    v_piece_avant_id, p_piece_apres_id,
    v_personne_avant_id, p_personne_apres_id,
    p_date_retour_prevue, p_commentaire, auth.uid()
  )
  returning * into v_mouvement;

  update public.materiels
     set piece_id = p_piece_apres_id,
         personne_id = p_personne_apres_id,
         updated_at = now()
   where id = p_materiel_id;

  return v_mouvement;
end;
$$;

grant execute on function public.record_materiel_mouvement(
  uuid, uuid, uuid, date, text, public.mouvement_type
) to authenticated;
