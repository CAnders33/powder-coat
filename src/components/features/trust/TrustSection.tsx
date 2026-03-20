import { Box, Container, Typography, Grid, Card, CardContent, Avatar } from '@mui/material';
import { 
  Security as SecurityIcon, 
  Speed as SpeedIcon, 
  Star as StarIcon,
  CheckCircle as CheckIcon,
  Build as BuildIcon,
  Nature as EcoIcon,
} from '@mui/icons-material';
import type { TrustFeature } from '@/types/content';

interface TrustSectionProps {
  data: TrustFeature[];
  loading?: boolean;
}

// Icon mapping for different trust features
const iconMap: Record<string, React.ReactNode> = {
  security: <SecurityIcon />,
  speed: <SpeedIcon />,
  star: <StarIcon />,
  check: <CheckIcon />,
  build: <BuildIcon />,
  eco: <EcoIcon />,
};

// Default trust features if CMS data is not available
const defaultTrustFeatures: TrustFeature[] = [
  {
    id: '1',
    title: 'Quality Guaranteed',
    description: 'Professional-grade powder coating with industry-leading durability standards.',
    icon: 'star',
  },
  {
    id: '2', 
    title: 'Fast Turnaround',
    description: 'Quick service without compromising quality. Most jobs completed within 3-5 days.',
    icon: 'speed',
  },
  {
    id: '3',
    title: 'Eco-Friendly Process',
    description: 'Environmentally safe powder coating process with minimal waste and emissions.',
    icon: 'eco',
  },
];

export default function TrustSection({ data, loading }: TrustSectionProps) {
  const features = data.length > 0 ? data : defaultTrustFeatures;

  if (loading) {
    return (
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
            Loading...
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
            Why Choose Us
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            Trusted by customers for professional powder coating services
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid item xs={12} md={4} key={feature.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  textAlign: 'center',
                  p: 3,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                  },
                  border: '1px solid',
                  borderColor: 'grey.200',
                }}
              >
                <CardContent>
                  <Avatar
                    sx={{
                      bgcolor: 'primary.main',
                      width: 64,
                      height: 64,
                      mx: 'auto',
                      mb: 3,
                    }}
                  >
                    {iconMap[feature.icon] || <CheckIcon />}
                  </Avatar>
                  
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 600,
                      color: 'text.primary',
                      mb: 2,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ lineHeight: 1.7 }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
