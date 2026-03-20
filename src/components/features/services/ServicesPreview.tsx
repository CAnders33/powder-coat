import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  Button,
  Chip,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowForward as ArrowIcon } from '@mui/icons-material';
import type { Service } from '@/types/services';
import { formatPrice } from '@/utils/formatting';

interface ServicesPreviewProps {
  data: Service[];
  loading?: boolean;
}

// Default services data if CMS is not available
const defaultServices: Service[] = [
  {
    id: '1',
    title: 'Automotive Parts',
    description: 'Professional powder coating for car wheels, bumpers, trim, and body parts.',
    shortDescription: 'Wheels, bumpers, trim, and body parts',
    features: ['Durable finish', 'Corrosion resistant', 'Custom colors'],
    price: { from: 50, to: 200, unit: 'part' },
  },
  {
    id: '2',
    title: 'Motorcycle Components',
    description: 'Specialized coating for motorcycle frames, wheels, and engine parts.',
    shortDescription: 'Frames, wheels, and engine components',
    features: ['Heat resistant', 'Chip resistant', 'Professional finish'],
    price: { from: 75, to: 300, unit: 'part' },
  },
  {
    id: '3',
    title: 'Industrial Equipment',
    description: 'Heavy-duty coating for industrial machinery and equipment.',
    shortDescription: 'Machinery and industrial equipment',
    features: ['Heavy-duty protection', 'Weather resistant', 'Long-lasting'],
    price: { from: 100, to: 500, unit: 'part' },
  },
];

export default function ServicesPreview({ data, loading }: ServicesPreviewProps) {
  const navigate = useNavigate();
  const services = data.length > 0 ? data.slice(0, 3) : defaultServices;

  if (loading) {
    return (
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
            Loading Services...
          </Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
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
            Our Services
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}
          >
            Professional powder coating services for automotive, motorcycle, and industrial applications
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          {services.map((service) => (
            <Grid item xs={12} md={4} key={service.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                  },
                }}
              >
                {service.image && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={service.image.url}
                    alt={service.image.alt || service.title}
                  />
                )}
                
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom
                    sx={{ fontWeight: 600, mb: 2 }}
                  >
                    {service.title}
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ mb: 3, lineHeight: 1.6 }}
                  >
                    {service.shortDescription || service.description}
                  </Typography>

                  <Stack direction="row" spacing={1} sx={{ mb: 3 }} flexWrap="wrap" useFlexGap>
                    {service.features.slice(0, 2).map((feature, index) => (
                      <Chip
                        key={index}
                        label={feature}
                        size="small"
                        variant="outlined"
                        color="primary"
                      />
                    ))}
                  </Stack>

                  {service.price && (
                    <Typography 
                      variant="h6" 
                      color="primary"
                      sx={{ fontWeight: 600, mb: 2 }}
                    >
                      {service.price.from && service.price.to 
                        ? `${formatPrice(service.price.from)} - ${formatPrice(service.price.to)}`
                        : service.price.from 
                          ? `From ${formatPrice(service.price.from)}`
                          : 'Quote on request'
                      }
                      {service.price.unit && (
                        <Typography 
                          component="span" 
                          variant="body2" 
                          color="text.secondary"
                        >
                          {' '}per {service.price.unit}
                        </Typography>
                      )}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box textAlign="center">
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowIcon />}
            onClick={() => navigate('/services')}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              fontSize: '1rem',
              fontWeight: 600,
            }}
          >
            View All Services
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
