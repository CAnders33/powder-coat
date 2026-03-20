import { useState, useEffect } from 'react';
import { sanityClient } from '@/lib/sanity/client';
import { transformServices } from '@/utils/transformers';
import type { Service } from '@/types/services';
import type { SanityService } from '@/lib/sanity/types';

interface UseServicesReturn {
  data: Service[];
  loading: boolean;
  error: string | null;
}

export function useServices(query: string): UseServicesReturn {
  const [data, setData] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        setLoading(true);
        setError(null);

        if (!sanityClient) {
          console.warn('Sanity client not available, using empty data');
          setData([]);
          return;
        }

        const sanityServices = await sanityClient.fetch<SanityService[]>(query);
        
        if (sanityServices) {
          const transformedServices = transformServices(sanityServices);
          setData(transformedServices);
        } else {
          setData([]);
        }
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to fetch services');
        setData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, [query]);

  return { data, loading, error };
}
