import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  useTheme,
  useMediaQuery,
  Chip,
} from '@mui/material';
import {
  DirectionsCar,
  Settings,
  Palette,
  Shield,
  Terrain,
  Build,
  Engineering,
  Phone,
  BookOnline,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const servicesData = [
  {
    id: 'wheels',
    title: 'Powder Coating Wheels',
    description: 'Transform your wheels with durable, custom powder coating that resists chips, scratches, and corrosion while enhancing your vehicle\'s appearance.',
    icon: <DirectionsCar />,
    price: 'Starting at $120/wheel',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop',
    popular: true,
  },
  {
    id: 'brake-calipers',
    title: 'Brake Calipers',
    description: 'High-temperature powder coating for brake calipers that withstands extreme heat while providing a professional, long-lasting finish.',
    icon: <Settings />,
    price: 'Starting at $80/caliper',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&h=400&fit=crop',
  },
  {
    id: 'chrome-delete',
    title: 'Chrome Delete',
    description: 'Modern chrome delete services using powder coating for trim pieces, grilles, and accents to achieve that sleek, murdered-out look.',
    icon: <Palette />,
    price: 'Starting at $150',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&h=400&fit=crop',
  },
  {
    id: 'ceramic-coating',
    title: 'Ceramic Coating',
    description: 'Premium ceramic powder coating for ultimate protection and durability. Perfect for high-performance applications and extreme environments.',
    icon: <Shield />,
    price: 'Starting at $200',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=400&fit=crop',
    popular: true,
  },
  {
    id: 'off-road',
    title: 'Off Road Components',
    description: 'Rugged powder coating solutions for off-road vehicles, including bumpers, rock sliders, roll cages, and protective equipment.',
    icon: <Terrain />,
    price: 'Starting at $180',
    image: 'https://images.unsplash.com/photo-1544558586-5f465aa4b951?w=500&h=400&fit=crop',
  },
  {
    id: 'engine-components',
    title: 'Engine Components',
    description: 'Specialized coating for engine parts including manifolds, headers, valve covers, and brackets with high-temperature formulations.',
    icon: <Build />,
    price: 'Starting at $100',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500&h=400&fit=crop',
  },
  {
    id: 'industrial',
    title: 'Industrial Applications',
    description: 'Heavy-duty industrial powder coating for machinery, equipment, structural components, and manufacturing applications.',
    icon: <Engineering />,
    price: 'Quote on request',
    image: 'https://images.unsplash.com/photo-1565372195458-9de0b320ef04?w=500&h=400&fit=crop',
  },
];

export default function Services() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleCallClick = () => {
    window.location.href = 'tel:+15551234567';
  };

  const handleBookClick = () => {
    navigate('/booking');
  };

  return (
    <Box>
      {/* Header Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant={isMobile ? 'h3' : 'h2'}
            component="h1"
            gutterBottom
            fontWeight="bold"
          >
            Professional Powder Coating Services
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              opacity: 0.9, 
              maxWidth: 800, 
              mx: 'auto',
              mb: 4,
              lineHeight: 1.4 
            }}
          >
            From automotive wheels to industrial equipment, we provide premium powder coating 
            solutions with exceptional durability and stunning finishes.
          </Typography>
          
          {/* CTA Buttons */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<BookOnline />}
              onClick={handleBookClick}
              sx={{
                backgroundColor: 'white',
                color: 'primary.main',
                fontWeight: 'bold',
                px: 4,
                py: 1.5,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                },
              }}
            >
              Book Now
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<Phone />}
              onClick={handleCallClick}
              sx={{
                borderColor: 'white',
                color: 'white',
                fontWeight: 'bold',
                px: 4,
                py: 1.5,
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Call Us: (555) 123-4567
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Services Blurb */}
      <Box sx={{ py: 6, backgroundColor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', maxWidth: 900, mx: 'auto' }}>
            <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" color="primary.main">
              Why Choose Our Powder Coating Services?
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'text.secondary', mb: 3 }}>
              Our state-of-the-art powder coating facility offers superior finishes that outlast traditional paint. 
              Whether you're looking to restore automotive components, protect industrial equipment, or create 
              custom finishes, our expert team delivers exceptional results with faster turnaround times and 
              environmentally friendly processes.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'text.secondary' }}>
              From high-temperature engine components to delicate decorative pieces, we have the expertise 
              and equipment to handle projects of all sizes. Every item is carefully prepared, coated with 
              precision, and quality-checked to ensure a flawless finish that will last for years to come.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Services Grid */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
            Our Specialized Services
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Professional coating solutions tailored to your specific needs
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {servicesData.map((service) => (
            <Grid item xs={12} md={6} lg={4} key={service.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease-in-out',
                  position: 'relative',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.shadows[12],
                  },
                }}
              >
                {service.popular && (
                  <Chip
                    label="Popular"
                    color="secondary"
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      zIndex: 1,
                      fontWeight: 'bold',
                    }}
                  />
                )}
                
                <Box
                  component="img"
                  src={service.image}
                  alt={service.title}
                  sx={{ 
                    width: '100%', 
                    height: 220, 
                    objectFit: 'cover',
                    filter: 'brightness(0.9)',
                  }}
                />
                
                <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        backgroundColor: 'primary.main',
                        color: 'white',
                        mr: 2,
                        flexShrink: 0,
                      }}
                    >
                      {service.icon}
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {service.title}
                      </Typography>
                      <Typography variant="h6" color="primary.main" fontWeight="bold">
                        {service.price}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" paragraph sx={{ flexGrow: 1 }}>
                    {service.description}
                  </Typography>
                  
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<BookOnline />}
                    onClick={handleBookClick}
                    sx={{ mt: 'auto' }}
                  >
                    Get Quote
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Bottom CTA Section */}
        <Box sx={{ textAlign: 'center', mt: 8, p: 4, backgroundColor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Ready to Get Started?
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: 600, mx: 'auto' }}>
            Contact us today for a free consultation and detailed quote. Our experts are ready to help 
            you achieve the perfect finish for your project.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<BookOnline />}
              onClick={handleBookClick}
              sx={{ px: 4 }}
            >
              Book Appointment
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<Phone />}
              onClick={handleCallClick}
              sx={{ px: 4 }}
            >
              Call (555) 123-4567
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}