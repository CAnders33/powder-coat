import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  Skeleton,
} from '@mui/material';
import {
  Build,
  Speed,
  Security,
  Nature,
} from '@mui/icons-material';

interface TrustFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface TrustSectionProps {
  data?: TrustFeature[];
  loading?: boolean;
}

// Default trust features data
const defaultTrustFeatures: TrustFeature[] = [
  {
    icon: <Build />,
    title: 'Expert Craftsmanship',
    description: 'Over 15 years of professional powder coating experience with meticulous attention to detail',
  },
  {
    icon: <Speed />,
    title: 'Fast Turnaround',
    description: 'Quick project completion without compromising on quality - most jobs completed within 3-5 days',
  },
  {
    icon: <Security />,
    title: 'Durable Protection',
    description: 'Superior coating that resists chipping, fading, and corrosion for long-lasting beauty',
  },
  {
    icon: <Nature />,
    title: 'Eco-Friendly Process',
    description: 'Environmentally conscious coating process with zero VOC emissions and recyclable materials',
  },
];

export default function TrustSection({ data = defaultTrustFeatures, loading = false }: TrustSectionProps) {
  const theme = useTheme();

  if (loading) {
    return (
      <Box sx={{ py: 8, backgroundColor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Skeleton variant="text" width="60%" height={60} sx={{ mx: 'auto', mb: 2 }} />
            <Skeleton variant="text" width="80%" height={30} sx={{ mx: 'auto' }} />
          </Box>
          <Grid container spacing={4}>
            {[1, 2, 3, 4].map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item}>
                <Card sx={{ height: '100%', textAlign: 'center' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Skeleton variant="circular" width={60} height={60} sx={{ mx: 'auto', mb: 2 }} />
                    <Skeleton variant="text" width="80%" height={30} sx={{ mx: 'auto', mb: 1 }} />
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
    <Box sx={{ py: 8, backgroundColor: 'grey.50' }}>
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
            Why Choose Our Services?
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: '600px', mx: 'auto' }}
          >
            We deliver exceptional results with industry-leading techniques and unmatched customer service
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {data.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.shadows[8],
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      backgroundColor: 'primary.main',
                      color: 'white',
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{ fontWeight: 'bold', mb: 2 }}
                  >
                    {feature.title}
                  </Typography>
                  
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.6 }}
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
