import { useState, useEffect } from 'react';
import { sanityQueries } from '@/lib/sanity/queries';
import { 
  transformHero, 
  transformServices, 
  transformTestimonials, 
  transformTrustFeatures 
} from '@/utils/transformers';
import type { 
  HeroSection, 
  TrustFeature, 
  Testimonial 
} from '@/types/content';
import type { Service } from '@/types/services';

interface HomePageData {
  hero: HeroSection | null;
  services: Service[];
  testimonials: Testimonial[];
  trustFeatures: TrustFeature[];
}

interface UseSanityDataReturn {
  data: HomePageData;
  loading: boolean;
  error: string | null;
}

export function useSanityData(): UseSanityDataReturn {
  const [data, setData] = useState<HomePageData>({
    hero: null,
    services: [],
    testimonials: [],
    trustFeatures: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch all data in parallel
        const [hero, services, testimonials, trustFeatures] = await Promise.all([
          sanityQueries.getHero(),
          sanityQueries.getServices(),
          sanityQueries.getFeaturedTestimonials(),
          sanityQueries.getTrustFeatures(),
        ]);

        setData({
          hero: transformHero(hero),
          services: transformServices(services),
          testimonials: transformTestimonials(testimonials),
          trustFeatures: transformTrustFeatures(trustFeatures),
        });
      } catch (err) {
        console.error('Error fetching Sanity data:', err);
        setError('Failed to load content. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}

// Hook for fetching specific content types
export function useHeroData() {
  const [hero, setHero] = useState<HeroSection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHero() {
      try {
        setLoading(true);
        const heroData = await sanityQueries.getHero();
        setHero(transformHero(heroData));
      } catch (err) {
        console.error('Error fetching hero data:', err);
        setError('Failed to load hero content.');
      } finally {
        setLoading(false);
      }
    }

    fetchHero();
  }, []);

  return { hero, loading, error };
}

export function useServicesData() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        setLoading(true);
        const servicesData = await sanityQueries.getServices();
        setServices(transformServices(servicesData));
      } catch (err) {
        console.error('Error fetching services data:', err);
        setError('Failed to load services.');
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  return { services, loading, error };
}

export function useTestimonialsData() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        setLoading(true);
        const testimonialsData = await sanityQueries.getFeaturedTestimonials();
        setTestimonials(transformTestimonials(testimonialsData));
      } catch (err) {
        console.error('Error fetching testimonials data:', err);
        setError('Failed to load testimonials.');
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  return { testimonials, loading, error };
}
