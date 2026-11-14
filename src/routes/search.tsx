import { createFileRoute } from '@tanstack/react-router';
import { useState, type FormEvent } from 'react';

export const Route = createFileRoute('/search')({
  component: PropertySearchPage,
});

type SearchResult = {
  id: string;
  title: string;
  description: string;
  similarity: number;
};

function PropertySearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'done'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setStatus('done');
      setErrorMessage('Type a description of the property you want.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/properties/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: trimmed }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Search failed');
      }

      setResults(Array.isArray(data.results) ? data.results : []);
      setStatus('done');
    } catch (err) {
      setResults([]);
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Search failed');
    }
  }

  return (
    <main style={{ maxWidth: 640, margin: '2rem auto', fontFamily: 'system-ui' }}>
      <h1>PREIshare property search</h1>
      <p>Describe the kind of investment property you want. We match meaning, not only keywords.</p>

      <form onSubmit={onSubmit}>
        <label htmlFor="q">Search</label>
        <input
          id="q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="quiet cabin near water with rental upside"
          style={{ display: 'block', width: '100%', margin: '0.5rem 0' }}
        />
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Searching…' : 'Search'}
        </button>
      </form>

      {errorMessage ? <p role="alert">{errorMessage}</p> : null}

      {status === 'done' && results.length === 0 && !errorMessage ? (
        <p>No matching properties yet. Try different words from the sample listings.</p>
      ) : null}

      <ul>
        {results.map((r) => (
          <li key={r.id} style={{ marginBottom: '1rem' }}>
            <strong>{r.title}</strong>
            <div>
              {r.description.slice(0, 160)}
              {r.description.length > 160 ? '…' : ''}
            </div>
            <div>Similarity: {typeof r.similarity === 'number' ? r.similarity.toFixed(3) : '—'}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
