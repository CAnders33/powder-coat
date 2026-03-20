import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Chip,
  Button,
  Skeleton,
  Alert,
} from '@mui/material';
import { AttachMoney, Build, Palette } from '@mui/icons-material';
import { useServices } from '@/hooks/useServices';
import type { Service } from '@/types/services';

const SERVICES_QUERY = `*[_type == "service"] | order(_createdAt asc) {
  _id,
  title,
  shortDescription,
  description,
  features,
  price,
  image {
    asset,
    alt
  }
}`;

export default function Services() {
  const { data: services, loading, error } = useServices(SERVICES_QUERY);

  // Mock data for when Sanity is not available
  const mockServices: Service[] = [
    {
      id: 'mock-1',
      title: 'Automotive Powder Coating',
      description: 'Professional powder coating services for automotive parts and components.',
      shortDescription: 'High-quality powder coating for automotive parts with excellent durability and finish.',
      features: ['Corrosion Resistant', 'UV Protection', 'Multiple Colors Available', '5-Year Warranty'],
      price: {
        amount: 25,
        currency: 'USD',
        unit: 'per sq ft'
      },
    },
    {
      id: 'mock-2',
      title: 'Industrial Equipment Coating',
      description: 'Durable powder coating solutions for industrial equipment and machinery.',
      shortDescription: 'Heavy-duty coating solutions designed for industrial applications and harsh environments.',
      features: ['Chemical Resistance', 'High Temperature Rating', 'Anti-Corrosive', 'Custom Colors'],
      price: {
        amount: 35,
        currency: 'USD',
        unit: 'per sq ft'
      },
    },
    {
      id: 'mock-3',
      title: 'Architectural Coating',
      description: 'Beautiful and long-lasting powder coating for architectural elements.',
      shortDescription: 'Architectural powder coating for railings, facades, and structural components.',
      features: ['Weather Resistant', 'Fade Resistant', 'Easy Maintenance', 'AAMA Certified'],
      price: {
        amount: 30,
        currency: 'USD',
        unit: 'per sq ft'
      },
    },
    {
      id: 'mock-4',
      title: 'Custom Color Matching',
      description: 'Precision color matching services for unique and branded applications.',
      shortDescription: 'Expert color matching and custom coating solutions for specialized requirements.',
      features: ['Exact Color Match', 'Brand Compliance', 'Sample Testing', 'Quality Assurance'],
      price: {
        amount: 45,
        currency: 'USD',
        unit: 'per sq ft'
      },
    },
    {
      id: 'mock-5',
      title: 'Furniture Restoration',
      description: 'Transform and protect furniture with professional powder coating.',
      shortDescription: 'Furniture powder coating for both residential and commercial applications.',
      features: ['Scratch Resistant', 'Easy to Clean', 'Multiple Textures', 'Eco-Friendly'],
      price: {
        amount: 20,
        currency: 'USD',
        unit: 'per piece'
      },
    },
    {
      id: 'mock-6',
      title: 'Marine Grade Coating',
      description: 'Specialized powder coating designed for marine and coastal environments.',
      shortDescription: 'Marine-grade coating solutions that withstand saltwater and coastal conditions.',
      features: ['Salt Spray Resistant', 'Marine Grade', 'Anti-Fouling', '10-Year Warranty'],
      price: {
        amount: 50,
        currency: 'USD',
        unit: 'per sq ft'
      },
    },
  ];

  const displayServices = services.length > 0 ? services : mockServices;

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          Unable to load services. Please try again later.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 'bold',
            mb: 3,
            background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Our Services
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ mb: 2, maxWidth: '800px', mx: 'auto' }}
        >
          Professional powder coating solutions for every application
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: '600px', mx: 'auto' }}
        >
          From automotive parts to architectural elements, we provide high-quality powder coating
          services with exceptional durability, finish, and environmental protection.
        </Typography>
      </Box>

      {/* Services Grid */}
      <Grid container spacing={4}>
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Card sx={{ height: '100%' }}>
                  <Skeleton variant="rectangular" height={200} />
                  <CardContent>
                    <Skeleton variant="text" width="80%" height={32} />
                    <Skeleton variant="text" width="100%" height={20} />
                    <Skeleton variant="text" width="90%" height={20} />
                    <Box sx={{ mt: 2 }}>
                      <Skeleton variant="rectangular" width={120} height={32} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          : displayServices.map((service) => (
              <Grid item xs={12} md={6} lg={4} key={service.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: (theme) => theme.shadows[8],
                    },
                  }}
                >
                  {service.image ? (
                    <CardMedia
                      component="img"
                      height="200"
                      image={service.image.url}
                      alt={service.image.alt}
                      sx={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <Box
                      sx={{
                        height: 200,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'grey.100',
                        color: 'grey.500',
                      }}
                    >
                      <Box sx={{ textAlign: 'center' }}>
                        <Palette sx={{ fontSize: 48, mb: 1 }} />
                        <Typography variant="body2">Service Image</Typography>
                      </Box>
                    </Box>
                  )}
                  
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{ fontWeight: 'bold', mb: 2 }}
                    >
                      {service.title}
                    </Typography>
                    
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 3, flexGrow: 1 }}
                    >
                      {service.shortDescription}
                    </Typography>

                    {/* Features */}
                    {service.features && service.features.length > 0 && (
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                          Features:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {service.features.slice(0, 4).map((feature, index) => (
                            <Chip
                              key={index}
                              label={feature}
                              size="small"
                              variant="outlined"
                              color="primary"
                            />
                          ))}
                          {service.features.length > 4 && (
                            <Chip
                              label={`+${service.features.length - 4} more`}
                              size="small"
                              variant="outlined"
                              color="default"
                            />
                          )}
                        </Box>
                      </Box>
                    )}

                    {/* Price */}
                    {service.price && (
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <AttachMoney color="primary" sx={{ mr: 1 }} />
                        <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                          {service.price.amount
                            ? `$${service.price.amount}`
                            : service.price.from && service.price.to
                            ? `$${service.price.from}-${service.price.to}`
                            : 'Contact for pricing'
                          }
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                          {service.price.unit}
                        </Typography>
                      </Box>
                    )}

                    {/* Action Buttons */}
                    <Box sx={{ mt: 'auto', display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{ textTransform: 'none' }}
                        startIcon={<Build />}
                      >
                        Get Quote
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
      </Grid>

      {/* Bottom CTA Section */}
      <Box sx={{ textAlign: 'center', mt: 8, py: 6, backgroundColor: 'grey.50', borderRadius: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
          Need a Custom Solution?
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}>
          Our experienced team can work with you to develop custom powder coating solutions
          that meet your specific requirements and industry standards.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            size="large"
            sx={{ textTransform: 'none', minWidth: 160 }}
          >
            Contact Us Today
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{ textTransform: 'none', minWidth: 160 }}
          >
            View Gallery
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
