import { useState, useEffect } from 'react';
import { sanityClient } from '@/lib/sanity/client';
import { getImageUrl } from '@/lib/sanity/client';
import type { SanityGalleryImage } from '@/lib/sanity/types';

export interface GalleryImage {
  id: string;
  title?: string;
  description?: string;
  image: {
    url: string;
    thumbnailUrl: string;
    alt: string;
  };
  category?: string;
  featured?: boolean;
}

interface UseGalleryReturn {
  images: GalleryImage[];
  loading: boolean;
  error: string | null;
  categories: string[];
}

const GALLERY_QUERY = `*[_type == "galleryImage"] | order(featured desc, _createdAt desc) {
  _id,
  title,
  description,
  image {
    asset,
    alt,
    hotspot
  },
  category,
  featured
}`;

function transformGalleryImage(sanityImage: SanityGalleryImage): GalleryImage {
  return {
    id: sanityImage._id,
    title: sanityImage.title,
    description: sanityImage.description,
    image: {
      url: getImageUrl(sanityImage.image, 800, 600),
      thumbnailUrl: getImageUrl(sanityImage.image, 400, 300),
      alt: sanityImage.image.alt || sanityImage.title || 'Gallery image',
    },
    category: sanityImage.category,
    featured: sanityImage.featured,
  };
}

export function useGallery(): UseGalleryReturn {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    async function fetchGallery() {
      try {
        setLoading(true);
        setError(null);

        if (!sanityClient) {
          console.warn('Sanity client not available, using mock data');
          // Mock data for development
          const mockImages: GalleryImage[] = [
            {
              id: 'mock-1',
              title: 'Automotive Parts Coating',
              description: 'High-quality powder coating on automotive components',
              image: {
                url: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop',
                thumbnailUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop',
                alt: 'Automotive parts powder coating',
              },
              category: 'automotive',
              featured: true,
            },
            {
              id: 'mock-2',
              title: 'Industrial Equipment',
              description: 'Durable coating for heavy machinery',
              image: {
                url: 'https://images.unsplash.com/photo-1581091226825-c6a89e7e4801?w=800&h=600&fit=crop',
                thumbnailUrl: 'https://images.unsplash.com/photo-1581091226825-c6a89e7e4801?w=400&h=300&fit=crop',
                alt: 'Industrial equipment coating',
              },
              category: 'industrial',
              featured: false,
            },
            {
              id: 'mock-3',
              title: 'Furniture Restoration',
              description: 'Beautiful finish on restored furniture pieces',
              image: {
                url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
                thumbnailUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
                alt: 'Furniture powder coating',
              },
              category: 'furniture',
              featured: true,
            },
            {
              id: 'mock-4',
              title: 'Architectural Elements',
              description: 'Weather-resistant coating for outdoor structures',
              image: {
                url: 'https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&h=600&fit=crop',
                thumbnailUrl: 'https://images.unsplash.com/photo-1448630360428-65456885c650?w=400&h=300&fit=crop',
                alt: 'Architectural powder coating',
              },
              category: 'architectural',
              featured: false,
            },
            {
              id: 'mock-5',
              title: 'Custom Color Matching',
              description: 'Precision color matching for unique applications',
              image: {
                url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop',
                thumbnailUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
                alt: 'Custom color coating',
              },
              category: 'custom',
              featured: true,
            },
            {
              id: 'mock-6',
              title: 'Marine Grade Application',
              description: 'Corrosion-resistant coating for marine environments',
              image: {
                url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
                thumbnailUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
                alt: 'Marine grade coating',
              },
              category: 'marine',
              featured: false,
            },
          ];
          
          setImages(mockImages);
          setCategories(['automotive', 'industrial', 'furniture', 'architectural', 'custom', 'marine']);
          return;
        }

        const sanityImages = await sanityClient.fetch<SanityGalleryImage[]>(GALLERY_QUERY);
        
        if (sanityImages && sanityImages.length > 0) {
          const transformedImages = sanityImages.map(transformGalleryImage);
          setImages(transformedImages);
          
          // Extract unique categories
          const uniqueCategories = Array.from(
            new Set(transformedImages.map(img => img.category).filter(Boolean))
          ) as string[];
          setCategories(uniqueCategories);
        } else {
          setImages([]);
          setCategories([]);
        }
      } catch (err) {
        console.error('Error fetching gallery:', err);
        setError('Failed to fetch gallery images');
        setImages([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    }

    fetchGallery();
  }, []);

  return { images, loading, error, categories };
}
