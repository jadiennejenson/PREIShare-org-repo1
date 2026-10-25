# Data model and RLS matrix

## Tables

### public.sponsors
| Column | Type | Constraints | Notes |
| --- | --- | --- | --- |
| id | uuid | PRIMARY KEY, REFERENCES auth.users(id) ON DELETE CASCADE | 1:1 with auth.users |
| display_name | text | NOT NULL | Sponsor-facing display name |
| email | text | NOT NULL, UNIQUE | Contact email for sponsor record |
| created_at | timestamptz | NOT NULL DEFAULT now() | Audit timestamp |

### public.properties
| Column | Type | Constraints | Notes |
| --- | --- | --- | --- |
| id | uuid | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique property identifier |
| sponsor_id | uuid | NOT NULL, REFERENCES public.sponsors(id) ON DELETE CASCADE | Owner linkage |
| title | text | NOT NULL | Short listing title |
| short_description | text | nullable | Summary text |
| listing_url | text | nullable | Optional external listing URL |
| status | text | NOT NULL DEFAULT 'draft', CHECK IN ('draft','published','archived') | Lifecycle state |
| created_at | timestamptz | NOT NULL DEFAULT now() | Creation timestamp |
| updated_at | timestamptz | NOT NULL DEFAULT now() | Update timestamp |

## RLS policy matrix

### public.sponsors
- `sponsors_select_own`: authenticated users can select only their own row where `id = auth.uid()`
- `sponsors_update_own`: authenticated users can update only their own row where `id = auth.uid()` and `WITH CHECK (id = auth.uid())`

### public.properties
- `properties_select_own`: authenticated users can select only rows where `sponsor_id = auth.uid()`
- `properties_insert_own`: authenticated users can insert only rows where `sponsor_id = auth.uid()`
- `properties_update_own`: authenticated users can update only rows where `sponsor_id = auth.uid()` and `WITH CHECK (sponsor_id = auth.uid())`
- `properties_delete_own`: authenticated users can delete only rows where `sponsor_id = auth.uid()`

## Review checklist
- [x] RLS enabled on every sponsor-owned table
- [x] No open `USING (true)` on sponsor/property data
- [x] INSERT/UPDATE policies include `WITH CHECK` tied to `auth.uid()`
- [x] Column list and foreign keys match the implemented migration

## Policy fix note
The review cycle captured a concrete fix: the original update policies were missing `WITH CHECK` constraints, and those were added to both `sponsors_update_own` and `properties_update_own` so ownership cannot be changed outside the authenticated user’s own record.