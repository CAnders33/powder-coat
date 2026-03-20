import { Box, Alert } from '@mui/material';
import Hero from '@/components/common/Hero';
import TrustSection from '@/components/features/trust/TrustSection';
import ServicesPreview from '@/components/features/services/ServicesPreview';
import TestimonialsSection from '@/components/features/testimonials/TestimonialsSection';
import CTASection from '@/components/common/CTASection';
import { useSanityData } from '@/hooks/useSanityData';

// Default hero data if CMS is not available
const defaultHeroData = {
  title: 'Premium Powder Coating Services',
  subtitle: 'Professional Automotive & Industrial Coating',
  description: 'Transform your parts with durable, beautiful finishes that last. From automotive wheels to industrial equipment, we deliver quality coating services you can trust.',
  ctaText: 'Book Now',
  ctaLink: '/booking',
};

export default function Home() {
  const { data, loading, error } = useSanityData();

  // Show error state if there's a critical error (optional, can be removed for production)
  if (error && process.env.NODE_ENV === 'development') {
    console.warn('CMS data loading error:', error);
  }

  return (
    <Box>
      {/* Error Alert (only in development) */}
      {error && process.env.NODE_ENV === 'development' && (
        <Alert severity="warning" sx={{ m: 2 }}>
          {error} - Using fallback data.
        </Alert>
      )}

      {/* Hero Section */}
      <Hero 
        data={data.hero || defaultHeroData} 
        loading={loading && !data.hero} 
      />
      
      {/* Trust/Features Section */}
      <TrustSection 
        data={data.trustFeatures} 
        loading={loading && data.trustFeatures.length === 0} 
      />
      
      {/* Services Preview Section */}
      <ServicesPreview 
        data={data.services} 
        loading={loading && data.services.length === 0} 
      />
      
      {/* Testimonials Section */}
      <TestimonialsSection 
        data={data.testimonials} 
        loading={loading && data.testimonials.length === 0} 
      />
      
      {/* Call to Action Section */}
      <CTASection />
    </Box>
  );
}
