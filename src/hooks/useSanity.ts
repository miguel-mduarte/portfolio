import { useEffect, useState } from 'react';
import sanityClient from '../lib/sanity';

export const useSanity = <T>(query: string, params: Record<string, unknown> = {}, fallback?: T) => {
  const [data, setData] = useState<T | null>(fallback || null);
  const [loading, setLoading] = useState(!fallback);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let canceled = false;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await sanityClient.fetch(query, params);
        
        console.log('SANITY RESULT:', result);

        if (!canceled) {
          setData(result || fallback || null);
        }
      } catch (err) {
        if (!canceled) {
          setError(err instanceof Error ? err.message : 'Erro desconhecido');
          if (fallback !== undefined) {
            setData(fallback);
          }
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      canceled = true;
    };
  }, [query, JSON.stringify(params)]);

  return { data, loading, error };
};
