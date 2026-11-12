{
  "_comment": "Scaffold shape only — your listings should be original and diverse. Field names must match your migration.",
  "properties": [
    {
      "id": "sample-cabin-lake-01",
      "title": "Quiet cedar cabin steps from the lake",
      "description": "Peaceful waterfront cabin surrounded by trees. Ideal weekend escape with strong short-term rental potential in summer. No highway noise; kayak launch nearby.",
      "city": "Lakeview",
      "state": "MN",
      "property_type": "cabin",
      "bedrooms": 2,
      "bathrooms": 1,
      "price": 325000
    },
    {
      "id": "sample-loft-downtown-02",
      "title": "Bright downtown loft near nightlife",
      "description": "Open-plan loft above busy restaurants and late-night venues. Walk to offices and transit. Great for investors targeting young professionals who want city energy.",
      "city": "Minneapolis",
      "state": "MN",
      "property_type": "loft",
      "bedrooms": 1,
      "bathrooms": 1,
      "price": 410000
    },
    {
      "id": "sample-suburb-family-03",
      "title": "Four-bedroom suburban family home",
      "description": "Spacious house on a quiet cul-de-sac with a fenced yard and highly rated schools. Long-term tenant demand from families; not a vacation rental play.",
      "city": "Eden Prairie",
      "state": "MN",
      "property_type": "house",
      "bedrooms": 4,
      "bathrooms": 3,
      "price": 575000
    }
  ]
}

// scripts/seed-property-embeddings.ts — structural scaffold (agent fills real client setup)
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';

import { generatePropertyEmbedding } from '../src/lib/embeddings/generate';

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

    const { error } = await supabase
      .from('properties')
      .upsert(
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