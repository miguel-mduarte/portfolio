import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId =
  import.meta.env.VITE_SANITY_PROJECT_ID || '';

const dataset =
  import.meta.env.VITE_SANITY_DATASET || 'production';

const apiVersion =
  import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01';

console.log({
  projectId,
  dataset,
  apiVersion,
});

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

const builder = imageUrlBuilder(sanityClient);

export const urlFor = (source: any) =>
  builder.image(source);

export default sanityClient;