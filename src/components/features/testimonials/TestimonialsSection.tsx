import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Avatar,
  Rating,
  Stack,
} from '@mui/material';
import { FormatQuote as QuoteIcon } from '@mui/icons-material';
import type { Testimonial } from '@/types/content';

interface TestimonialsSectionProps {
  data: Testimonial[];
  loading?: boolean;
}

// Default testimonials if CMS data is not available
const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Mike Johnson',
    company: 'Custom Motorcycles LLC',
    content: 'Outstanding powder coating service! My motorcycle frame came out perfect with a finish that\'s both beautiful and incredibly durable. Highly recommend!',
    rating: 5,
  },
  {
    id: '2',
    name: 'Sarah Chen',
    company: 'Auto Restoration Pro',
    content: 'Professional service from start to finish. The team delivered exactly what was promised on time and within budget. The quality is exceptional.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Robert Williams',
    content: 'Had my car wheels powder coated and they look amazing! Great customer service and attention to detail. Will definitely use them again.',
    rating: 5,
  },
];

export default function TestimonialsSection({ data, loading }: TestimonialsSectionProps) {
  const testimonials = data.length > 0 ? data.slice(0, 3) : defaultTestimonials;

  if (loading) {
    return (
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'primary.50' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
            Loading Testimonials...
          </Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'grey.50' }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom
            sx={{ 
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 'bold',
              color: 'text.primary',
              mb: 2,
            }}
          >
            What Our Customers Say
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            Don't just take our word for it - hear from our satisfied customers
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {testimonials.map((testimonial) => (
            <Grid item xs={12} md={4} key={testimonial.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  position: 'relative',
                  p: 3,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                  },
                }}
              >
                <QuoteIcon 
                  sx={{ 
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    fontSize: 40,
                    color: 'primary.main',
                    opacity: 0.3,
                  }} 
                />
                
                <CardContent sx={{ p: 0 }}>
                  <Rating 
                    value={testimonial.rating} 
                    readOnly 
                    sx={{ mb: 2 }}
                  />
                  
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      mb: 3,
                      fontStyle: 'italic',
                      lineHeight: 1.7,
                      color: 'text.primary',
                    }}
                  >
                    "{testimonial.content}"
                  </Typography>

                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar 
                      src={testimonial.image?.url}
                      alt={testimonial.name}
                      sx={{ 
                        width: 48, 
                        height: 48,
                        bgcolor: 'primary.main',
                      }}
                    >
                      {testimonial.name.charAt(0).toUpperCase()}
                    </Avatar>
                    
                    <Box>
                      <Typography 
                        variant="subtitle1" 
                        sx={{ fontWeight: 600, color: 'text.primary' }}
                      >
                        {testimonial.name}
                      </Typography>
                      {testimonial.company && (
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                        >
                          {testimonial.company}
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
