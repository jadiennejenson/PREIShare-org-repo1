-- supabase/migrations/20250315000001_match_properties_function.sql
-- Scaffold: names/types must match your earlier migration and data model.
-- Adjust vector(N), table/column names, and operator to YOUR docs.

create or replace function public.match_properties(
  query_embedding vector(1536),
  match_count int default 5
)
returns table (
  id uuid,
  title text,
  description text,
  location text,
  similarity float
)
language sql
stable
security invoker
set search_path = public
as $$
  select
    p.id,
    p.title,
    p.description,
    p.location,
    -- cosine distance operator <=> ; convert to similarity so HIGHER = better match
    (1 - (p.embedding <=> query_embedding))::float as similarity
  from public.properties p
  where p.embedding is not null
  order by p.embedding <=> query_embedding
  limit greatest(match_count, 1);
$$;

grant execute on function public.match_properties(vector(1536), int) to authenticated;
grant execute on function public.match_properties(vector(1536), int) to service_role;