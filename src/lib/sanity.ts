import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const config = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01',
  useCdn: true,
};

export const sanityClient = sanityClient(config);
const builder = imageUrlBuilder(sanityClient);

export const urlFor = (source: any) => builder.image(source);
export default sanityClient;
