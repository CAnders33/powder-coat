import {
  Box,
  Container,
  Typography,
  Grid,
} from '@mui/material';
import HeroSection from '@/components/about/HeroSection';
import FeatureCard from '@/components/about/FeatureCard';
import TestimonialCard from '@/components/about/TestimonialCard';
import CTASection from '@/components/about/CTASection';

// Static data for the About page
const aboutPageData = {
  title: 'About Our Company',
  heroImage: {
    url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=600&fit=crop',
    alt: 'Powder coating facility'
  },
  companyDescription: `Founded in 2008, our powder coating business started with a simple mission: to provide 
  the highest quality metal finishing services in the region. What began as a small family operation has grown 
  into a trusted partner for automotive enthusiasts, industrial manufacturers, and homeowners alike. We are 
  passionate about transforming metal surfaces with durable, beautiful finishes that exceed our customers' 
  expectations while maintaining the highest standards of quality, environmental responsibility, and customer service.`,
  
  whyChooseUs: [
    {
      title: 'Expert Craftsmanship',
      description: 'Over 15 years of professional powder coating experience with meticulous attention to detail',
      icon: 'build'
    },
    {
      title: 'Fast Turnaround',
      description: 'Quick project completion without compromising on quality - most jobs completed within 3-5 days',
      icon: 'speed'
    },
    {
      title: 'Quality Guarantee',
      description: '100% satisfaction guaranteed on all our work with comprehensive warranty coverage',
      icon: 'security'
    },
    {
      title: 'Eco-Friendly Process',
      description: 'Environmentally responsible coating processes with zero harmful emissions',
      icon: 'nature'
    }
  ],

  testimonials: [
    {
      name: 'John Smith',
      company: 'Smith Auto Restoration',
      rating: 5,
      comment: 'Outstanding work! They powder coated my classic car parts and the finish is absolutely perfect. The attention to detail and customer service exceeded my expectations.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Sarah Martinez',
      company: 'Industrial Solutions Inc.',
      rating: 5,
      comment: 'We have been using their services for our industrial equipment for years. Consistently high quality, fast turnaround, and competitive pricing. Highly recommended!',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Mike Johnson',
      company: 'Custom Fabrication',
      rating: 5,
      comment: 'Professional service from start to finish. They handled our complex project with expertise and delivered exactly what we needed on time and within budget.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    }
  ],

  callToAction: {
    title: 'Ready to Transform Your Project?',
    description: 'Get started today with a free consultation and detailed quote. Our experts are ready to help you achieve the perfect finish.',
    primaryButtonText: 'Get Free Estimate',
    primaryButtonLink: '/booking',
    secondaryButtonText: 'Call Us Now',
    secondaryButtonLink: '/contact'
  }
};

export default function About() {
  const data = aboutPageData;

  return (
    <Box component="main">
      {/* Hero Section */}
      <HeroSection title={data.title} heroImage={data.heroImage} />

      {/* Company Description Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '800px', mx: 'auto', textAlign: 'center' }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 'bold',
                color: 'text.primary',
                mb: 4,
              }}
            >
              About Our Company
            </Typography>
            <Typography
              variant="h6"
              sx={{
                lineHeight: 1.7,
                color: 'text.secondary',
              }}
            >
              {data.companyDescription}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Why Choose Us Section */}
      {data.whyChooseUs.length > 0 && (
        <Box sx={{ backgroundColor: 'grey.50', py: 8 }}>
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 'bold',
                textAlign: 'center',
                mb: 6,
                color: 'text.primary',
              }}
            >
              Why Choose Us
            </Typography>
            <Grid container spacing={4}>
              {data.whyChooseUs.map((feature, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <FeatureCard feature={feature} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}

      {/* Testimonials Section */}
      {data.testimonials.length > 0 && (
        <Box sx={{ py: 8 }}>
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 'bold',
                textAlign: 'center',
                mb: 6,
                color: 'text.primary',
              }}
            >
              What Our Customers Say
            </Typography>
            <Grid container spacing={4}>
              {data.testimonials.map((testimonial, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <TestimonialCard testimonial={testimonial} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}

      {/* Call to Action Section */}
      <CTASection callToAction={data.callToAction} />
    </Box>
  );
}
