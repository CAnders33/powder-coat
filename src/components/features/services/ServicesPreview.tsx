import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Skeleton,
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface Service {
  id: string;
  title: string;
  description: string;
  image?: string;
  features?: string[];
}

interface ServicesPreviewProps {
  data?: Service[];
  loading?: boolean;
}

// Default services data
const defaultServices: Service[] = [
  {
    id: "1",
    title: "Automotive Coating",
    description: "Professional powder coating for wheels, frames, and automotive parts with durable finishes.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    features: ["Custom Colors", "Durable Finish", "Corrosion Resistance"]
  },
  {
    id: "2", 
    title: "Industrial Coating",
    description: "Heavy-duty coating solutions for industrial equipment and machinery components.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
    features: ["High Temperature", "Chemical Resistance", "Long-lasting"]
  },
  {
    id: "3",
    title: "Custom Projects",
    description: "Specialized coating services for unique projects and custom requirements.",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop",
    features: ["Custom Solutions", "Expert Consultation", "Quality Guaranteed"]
  }
];

export default function ServicesPreview({ data = defaultServices, loading = false }: ServicesPreviewProps) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <Box sx={{ py: 8, backgroundColor: 'white' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Skeleton variant="text" width="50%" height={60} sx={{ mx: 'auto', mb: 2 }} />
            <Skeleton variant="text" width="70%" height={30} sx={{ mx: 'auto' }} />
          </Box>
          <Grid container spacing={4}>
            {[1, 2, 3].map((item) => (
              <Grid item xs={12} md={4} key={item}>
                <Card>
                  <Skeleton variant="rectangular" height={250} />
                  <CardContent>
                    <Skeleton variant="text" width="80%" height={30} sx={{ mb: 1 }} />
                    <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
                    <Skeleton variant="text" width="90%" height={20} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 8, backgroundColor: 'white' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              color: 'text.primary',
            }}
          >
            Our Services
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: '600px', mx: 'auto', mb: 4 }}
          >
            Professional powder coating services for all your needs
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {data.slice(0, 3).map((service) => (
            <Grid item xs={12} md={4} key={service.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: (theme) => theme.shadows[8],
                  },
                }}
              >
                {service.image && (
                  <CardMedia
                    component="img"
                    height="250"
                    image={service.image}
                    alt={service.title}
                    sx={{ objectFit: 'cover' }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{ fontWeight: 'bold', mb: 2 }}
                  >
                    {service.title}
                  </Typography>
                  
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, flexGrow: 1 }}
                  >
                    {service.description}
                  </Typography>

                  {service.features && (
                    <Box sx={{ mb: 2 }}>
                      {service.features.slice(0, 3).map((feature, index) => (
                        <Typography
                          key={index}
                          variant="caption"
                          sx={{
                            display: 'inline-block',
                            backgroundColor: 'primary.light',
                            color: 'primary.contrastText',
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            mr: 1,
                            mb: 1,
                          }}
                        >
                          {feature}
                        </Typography>
                      ))}
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            variant="outlined"
            size="large"
            endIcon={<ArrowForward />}
            onClick={() => navigate('/services')}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              textTransform: 'none',
              borderRadius: 2,
            }}
          >
            View All Services
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
