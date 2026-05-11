import { useState, useEffect } from 'react';

interface WordPressConfig {
  baseUrl: string;
  apiBase: string;
  acfBase: string;
}

const config: WordPressConfig = {
  baseUrl: import.meta.env.VITE_WORDPRESS_URL || 'https://your-wordpress-site.com',
  apiBase: import.meta.env.VITE_WORDPRESS_API_BASE || '/wp-json/wp/v2',
  acfBase: import.meta.env.VITE_WORDPRESS_ACF_BASE || '/wp-json/acf/v3',
};

export const useWordPressData = <T>(
  endpoint: string,
  options: {
    fallback?: T;
    transform?: (data: any) => T;
    dependencies?: any[];
  } = {}
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { fallback, transform, dependencies = [] } = options;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = `${config.baseUrl}${config.apiBase}${endpoint}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const rawData = await response.json();
        const transformedData = transform ? transform(rawData) : rawData;

        setData(transformedData);
      } catch (err) {
        console.error(`Error fetching ${endpoint}:`, err);
        setError(err instanceof Error ? err.message : 'Unknown error');

        if (fallback) {
          setData(fallback);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error, refetch: () => fetchData() };
};

export const useWordPressACF = <T>(
  postId: number | string,
  fieldName: string,
  fallback?: T
) => {
  return useWordPressData<T>(
    `/posts/${postId}`,
    {
      fallback,
      transform: (data) => data.acf?.[fieldName] || fallback,
    }
  );
};

export const useWordPressPage = <T>(
  slug: string,
  fallback?: T
) => {
  return useWordPressData<T>(
    `/pages?slug=${slug}&_embed`,
    {
      fallback,
      transform: (data) => data[0] || fallback,
    }
  );
};

export { config };