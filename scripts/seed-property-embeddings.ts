import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';

import { generatePropertyEmbedding } from '../src/lib/embeddings/generate';
import { EMBEDDING_DIMENSIONS } from '../src/lib/embeddings/types';

type SampleProperty = {
  id: string;
  title: string;
  description: string;
  city: string;
  state: string;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  price: number;
};

type SamplePropertiesPayload = {
  properties: SampleProperty[];
};

async function main() {
  const filePath = path.join(process.cwd(), 'data', 'sample-properties.json');
  const raw = await readFile(filePath, 'utf8');
  const { properties } = JSON.parse(raw) as SamplePropertiesPayload;

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      'Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before running the seed script.'
    );
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  for (const property of properties) {
    const embeddingResult = await generatePropertyEmbedding({
      title: property.title,
      description: property.description,
      locationSummary: `${property.city}, ${property.state}`,
    });

    if (!embeddingResult.ok) {
      throw new Error(
        `Failed to generate embedding for ${property.id}: ${embeddingResult.message}`
      );
    }

    if (embeddingResult.embedding.length !== EMBEDDING_DIMENSIONS) {
      throw new Error(
        `Embedding mismatch for ${property.id}: expected ${EMBEDDING_DIMENSIONS}, got ${embeddingResult.embedding.length}.`
      );
    }

    const { error } = await supabase.from('properties').upsert(
      {
        id: property.id,
        title: property.title,
        description: property.description,
        city: property.city,
        state: property.state,
        property_type: property.property_type,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        price: property.price,
        embedding: embeddingResult.embedding,
      },
      { onConflict: 'id' }
    );

    if (error) {
      console.error(`Failed to seed ${property.id}:`, error.message);
      process.exitCode = 1;
      continue;
    }

    console.log(
      `Seeded ${property.id} with embedding dims: ${embeddingResult.embedding.length}`
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});