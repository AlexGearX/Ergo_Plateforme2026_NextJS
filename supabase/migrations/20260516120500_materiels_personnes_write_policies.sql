-- Policies d'écriture temporaires : tout utilisateur authentifié peut écrire.
-- À DURCIR dès que le rôle "admin" sera câblé : seul admin pourra INSERT/UPDATE/DELETE,
-- les autres (lecteurs) garderont uniquement SELECT (déjà en place).

-- personnes
create policy "personnes_insert_authenticated"
  on public.personnes for insert
  to authenticated
  with check (true);

create policy "personnes_update_authenticated"
  on public.personnes for update
  to authenticated
  using (true)
  with check (true);

create policy "personnes_delete_authenticated"
  on public.personnes for delete
  to authenticated
  using (true);

-- materiels
create policy "materiels_insert_authenticated"
  on public.materiels for insert
  to authenticated
  with check (true);

create policy "materiels_update_authenticated"
  on public.materiels for update
  to authenticated
  using (true)
  with check (true);

create policy "materiels_delete_authenticated"
  on public.materiels for delete
  to authenticated
  using (true);

-- materiels_fauteuil_roulant
create policy "materiels_fauteuil_roulant_insert_authenticated"
  on public.materiels_fauteuil_roulant for insert
  to authenticated
  with check (true);

create policy "materiels_fauteuil_roulant_update_authenticated"
  on public.materiels_fauteuil_roulant for update
  to authenticated
  using (true)
  with check (true);

create policy "materiels_fauteuil_roulant_delete_authenticated"
  on public.materiels_fauteuil_roulant for delete
  to authenticated
  using (true);

-- corsets_sieges
create policy "corsets_sieges_insert_authenticated"
  on public.corsets_sieges for insert
  to authenticated
  with check (true);

create policy "corsets_sieges_update_authenticated"
  on public.corsets_sieges for update
  to authenticated
  using (true)
  with check (true);

create policy "corsets_sieges_delete_authenticated"
  on public.corsets_sieges for delete
  to authenticated
  using (true);

-- materiels_entretiens
create policy "materiels_entretiens_insert_authenticated"
  on public.materiels_entretiens for insert
  to authenticated
  with check (true);

create policy "materiels_entretiens_update_authenticated"
  on public.materiels_entretiens for update
  to authenticated
  using (true)
  with check (true);

create policy "materiels_entretiens_delete_authenticated"
  on public.materiels_entretiens for delete
  to authenticated
  using (true);
