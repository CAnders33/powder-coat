import { Box } from '@mui/material';
import Hero from '@/components/common/Hero';
import TrustSection from '@/components/features/trust/TrustSection';
import ServicesPreview from '@/components/features/services/ServicesPreview';
import TestimonialsSection from '@/components/features/testimonials/TestimonialsSection';
import CTASection from '@/components/common/CTASection';

// Default hero data
const defaultHeroData = {
  title: 'Premium Powder Coating Services',
  subtitle: 'Professional Automotive & Industrial Coating',
  description: 'Transform your parts with durable, beautiful finishes that last. From automotive wheels to industrial equipment, we deliver quality coating services you can trust.',
  ctaText: 'Book Now',
  ctaLink: '/booking',
};

export default function Home() {
  return (
    <Box>
      {/* Hero Section */}
      <Hero 
        data={defaultHeroData} 
      />
      
      {/* Trust/Features Section */}
      <TrustSection />
      
      {/* Services Preview Section */}
      <ServicesPreview />
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* Call to Action Section */}
      <CTASection />
    </Box>
  );
}

