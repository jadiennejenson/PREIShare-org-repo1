// Scaffold shape — wire to YOUR Supabase client and generateEmbedding export.

import { supabase } from './supabase'; // existing server/browser client
import { generatePropertyEmbedding } from './embeddings/generate';
import { EMBEDDING_DIMENSIONS } from './embeddings/types';

export type PropertyMatch = {
  id: string;
  title: string;
  description: string;
  location: string;
  similarity: number;
};

export async function searchPropertiesByText(
  query: string,
  matchCount = 5
): Promise<PropertyMatch[]> {
  const trimmed = query.trim();
  if (!trimmed) {
    return [];
  }

  const embeddingResult = await generatePropertyEmbedding({
    title: trimmed,
    description: trimmed,
  });

  if (!embeddingResult.ok) {
    throw new Error(`Failed to generate embedding: ${embeddingResult.message}`);
  }

  if (embeddingResult.embedding.length !== EMBEDDING_DIMENSIONS) {
    throw new Error(
      `Embedding length mismatch: expected ${EMBEDDING_DIMENSIONS}, got ${embeddingResult.embedding.length}`
    );
  }

  const { data, error } = await supabase.rpc('match_properties', {
    query_embedding: embeddingResult.embedding,
    match_count: matchCount,
  });

  if (error) {
    throw new Error(`match_properties failed: ${error.message}`);
  }

  return (data ?? []) as PropertyMatch[];
}