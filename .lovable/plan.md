

## Plan: Fix RLS policies for admin slot management

### Problem
The "Adicionar slot" form fails with RLS error because:
1. `imported_skins` table has no INSERT policy for `anon` role — the admin panel runs unauthenticated
2. `showcase_slots` table has no DELETE policy for `anon` — deleting slots will also fail
3. `showcase_categories` table has no DELETE/UPDATE policy for `anon` — category updates fail

### Solution
Add missing RLS policies via a database migration:

**Migration — add anon write policies:**
```sql
-- Allow anon to insert into imported_skins
CREATE POLICY "Anon can insert imported_skins"
ON public.imported_skins FOR INSERT TO anon
WITH CHECK (true);

-- Allow anon to delete from imported_skins  
CREATE POLICY "Anon can delete imported_skins"
ON public.imported_skins FOR DELETE TO anon
USING (true);

-- Allow anon to delete from showcase_slots
CREATE POLICY "Anon can delete showcase_slots"
ON public.showcase_slots FOR DELETE TO anon
USING (true);

-- Allow anon to insert into showcase_slots
CREATE POLICY "Anon can insert showcase_slots"
ON public.showcase_slots FOR INSERT TO anon
WITH CHECK (true);

-- Allow anon to update showcase_categories
CREATE POLICY "Anon can update showcase_categories"
ON public.showcase_categories FOR UPDATE TO anon
USING (true);

-- Allow anon to delete showcase_categories
CREATE POLICY "Anon can delete showcase_categories"
ON public.showcase_categories FOR DELETE TO anon
USING (true);

-- Allow anon to insert showcase_categories
CREATE POLICY "Anon can insert showcase_categories"
ON public.showcase_categories FOR INSERT TO anon
WITH CHECK (true);
```

### Security note
These open policies allow unauthenticated writes. This works for now but should be locked down with proper admin authentication in the future.

### Files changed
- **Database migration only** — no code changes needed

### After fix
- Adding a slot will save correctly to the database
- Deleting slots will work
- Category management (add/delete) will work

