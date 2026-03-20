import { useState, useEffect } from 'react';
import { sanityQueries } from '@/lib/sanity/queries';
import { transformAboutPage } from '@/utils/transformers';
import type { AboutPageData } from '@/types/about';

interface UseAboutPageReturn {
  data: AboutPageData | null;
  loading: boolean;
  error: string | null;
}

export function useAboutPage(): UseAboutPageReturn {
  const [data, setData] = useState<AboutPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAboutPage() {
      try {
        setLoading(true);
        setError(null);

        const sanityAboutPage = await sanityQueries.getAboutPage();
        
        if (sanityAboutPage) {
          const transformedData = transformAboutPage(sanityAboutPage);
          setData(transformedData);
        } else {
          // Fallback data when Sanity is not available
          const mockData: AboutPageData = {
            title: "Professional Powder Coating Services",
            heroImage: {
              url: "https://images.unsplash.com/photo-1581091226825-c6a89e7e4801?w=1920&h=800&fit=crop",
              alt: "Professional powder coating facility"
            },
            companyDescription: "With over 15 years of experience in the powder coating industry, we specialize in providing high-quality, durable finishes for automotive, industrial, and architectural applications. Our state-of-the-art facility and experienced team ensure every project meets the highest standards of quality and durability.",
            whyChooseUs: [
              {
                title: "Quality Guarantee",
                description: "We use only premium materials and proven techniques to deliver finishes that last. Every project comes with our comprehensive warranty.",
                icon: "quality"
              },
              {
                title: "Expert Experience",
                description: "Our certified technicians have decades of combined experience in powder coating applications across all industries.",
                icon: "experience"
              },
              {
                title: "Fast Turnaround",
                description: "We understand your time is valuable. Most projects are completed within 3-5 business days without compromising quality.",
                icon: "speed"
              },
              {
                title: "Eco-Friendly Process",
                description: "Our powder coating process is environmentally responsible, producing zero VOCs and minimizing waste through our reclaim system.",
                icon: "eco"
              }
            ],
            testimonials: [
              {
                name: "Sarah Johnson, Auto Restoration Shop",
                quote: "The quality of their powder coating is exceptional. Our customers are always impressed with the finish, and we've never had any durability issues."
              },
              {
                name: "Mike Chen, Manufacturing Company",
                quote: "Fast, professional service with excellent results. They've been coating our industrial parts for 3 years now with consistent quality."
              },
              {
                name: "David Rodriguez, Architect",
                quote: "Their architectural powder coating services are top-notch. The finish quality and color matching is perfect for our high-end projects."
              }
            ],
            callToAction: {
              heading: "Ready to Transform Your Project?",
              buttonText: "Get Your Quote Today"
            }
          };
          setData(mockData);
        }
      } catch (err) {
        console.error('Error fetching about page:', err);
        setError('Failed to load page content');
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchAboutPage();
  }, []);

  return { data, loading, error };
}
