# RLS policy review — property listings

Date: 2026-10-27

## Scope
Review the `public.property_listings` migration and confirm the row-level security model enforces sponsor-owned data isolation.

## Findings

### 1. Ownership column is aligned with auth.uid()
The table uses:
- `owner uuid not null references auth.users(id) on delete cascade`

This is the correct pattern for sponsor ownership because it ties each row to the authenticated user identity in `auth.users`. The policy checks can safely compare `owner = auth.uid()`.

### 2. RLS is enabled
`alter table public.property_listings enable row level security;`

This ensures all access is filtered by policy unless explicitly bypassed by a privileged server role.

### 3. Policies match the project’s ownership model
The migration includes owner-only policies:
- `property_listings_select_own`
- `property_listings_insert_own`
- `property_listings_update_own`
- `property_listings_delete_own`

Each policy uses `owner = auth.uid()`, which prevents Sponsor B from reading or mutating Sponsor A rows.

### 4. Update policy preserves ownership
`with check (owner = auth.uid())` on update prevents a sponsor from changing row ownership to another user.

### 5. The trigger is low risk
The `set_updated_at()` trigger updates `updated_at` before updates and does not expose data or change access rules.

## Assessment
This migration is consistent with the sponsor-isolation requirement in the RLS matrix:
- Each property row is tied to the sponsor account via `owner`.
- Reads, inserts, updates, and deletes are restricted to the owning sponsor.
- Cross-sponsor access is denied by policy unless a server-side privileged context is used.

## Validation checklist
- [x] `owner` column points to `auth.users(id)`
- [x] `auth.uid()` is used in row policies
- [x] `with check` prevents ownership drift
- [x] RLS is enabled on the table
- [x] Update timestamp trigger does not alter policy semantics

## Follow-up
Validate in a live app run with two sponsor accounts and known seeded property rows to confirm:
1. Sponsor A sees only Sponsor A rows.
2. Sponsor B cannot list or mutate Sponsor A rows.
3. Create-as-owner inserts keep `owner = auth.uid()`.
4. The empty-state and error paths do not reveal other sponsors’ rows.
