import {
  EMBEDDING_DIMENSIONS,
  type EmbeddingResult,
  type PropertyEmbeddingInput,
} from './types';

/**
 * Combine property fields into one string for the embedding model.
 * Keep this pure and easy to unit-test mentally: same fields → same text.
 */
export function buildEmbeddingText(input: PropertyEmbeddingInput): string {
  const parts = [input.title, input.description, input.locationSummary ?? '']
    .map((part) => part.trim())
    .filter(Boolean);
  return parts.join('\n\n');
}

/**
 * Returns true when the vector is a number[] of the expected length.
 */
export function assertEmbeddingDimension(
  embedding: number[],
  expected = EMBEDDING_DIMENSIONS
): boolean {
  return (
    Array.isArray(embedding) &&
    embedding.length === expected &&
    embedding.every((n) => typeof n === 'number' && Number.isFinite(n))
  );
}

/**
 * Generate an embedding for property text.
 * - Reads API credentials from environment variables (never hard-code).
 * - Validates empty input and dimension length before returning ok: true.
 */
export async function generatePropertyEmbedding(
  input: PropertyEmbeddingInput
): Promise<EmbeddingResult> {
  const text = buildEmbeddingText(input);
  if (!text) {
    return {
      ok: false,
      code: 'EMPTY_INPUT',
      message: 'Property title and description are empty; nothing to embed.',
    };
  }

  const apiKey = process.env.EMBEDDING_API_KEY;
  if (!apiKey) {
    return {
      ok: false,
      code: 'MISSING_API_KEY',
      message: 'Set EMBEDDING_API_KEY in your environment before generating embeddings.',
    };
  }

  try {
    // Agent implements the real provider HTTP/SDK call here.
    // It must request a model whose output length === EMBEDDING_DIMENSIONS.
    const embedding: number[] = await callEmbeddingProvider(text, apiKey);

    if (!assertEmbeddingDimension(embedding)) {
      return {
        ok: false,
        code: 'DIMENSION_MISMATCH',
        message: `Expected ${EMBEDDING_DIMENSIONS} numbers, got ${embedding.length}.`,
      };
    }

    return {
      ok: true,
      embedding,
      model: process.env.EMBEDDING_MODEL ?? 'default-embedding-model',
      dimensions: embedding.length,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown provider error';
    return { ok: false, code: 'PROVIDER_ERROR', message };
  }
}

/** Internal helper — keep provider details out of the public export surface. */
async function callEmbeddingProvider(
  _text: string,
  _apiKey: string
): Promise<number[]> {
  // Replace with real provider integration in the agent implementation.
  // Must return number[EMBEDDING_DIMENSIONS].
  throw new Error('callEmbeddingProvider not implemented');
}
