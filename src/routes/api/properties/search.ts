import { json } from '@tanstack/react-start';
import { createAPIFileRoute } from '@tanstack/react-start/api';

import { searchPropertiesByText } from '../../lib/property-search';

export const APIRoute = createAPIFileRoute('/api/properties/search')({
  POST: async ({ request }) => {
    try {
      const body = (await request.json().catch(() => ({}))) as { query?: string };
      const query = typeof body.query === 'string' ? body.query.trim() : '';

      if (!query) {
        return json(
          { error: 'Query is required', results: [] },
          { status: 400 }
        );
      }

      const results = await searchPropertiesByText(query);

      return json({ query, results });
    } catch (err) {
      console.error('property search failed', err);
      return json(
        { error: 'Search failed', results: [] },
        { status: 500 }
      );
    }
  },
});
