import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET;
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION;

if (!projectId || !dataset || !apiVersion) {
  throw new Error('Missing Sanity environment variables');
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Use CDN for better performance
});

// Image URL builder
const builder = imageUrlBuilder(sanityClient);

export const urlFor = (source: any) => builder.image(source);

// Helper function to generate responsive image URLs
export const getImageUrl = (
  source: any,
  width?: number,
  height?: number,
  quality = 80
) => {
  let builder = urlFor(source);
  
  if (width) builder = builder.width(width);
  if (height) builder = builder.height(height);
  
  return builder.quality(quality).format('webp').url();
};
