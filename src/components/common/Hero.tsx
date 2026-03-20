import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { HeroSection } from '@/types/content';

interface HeroProps {
  data: HeroSection;
  loading?: boolean;
}

export default function Hero({ data, loading }: HeroProps) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h1" component="h1" gutterBottom>
              Loading...
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  }

  const handleCTAClick = () => {
    if (data.ctaLink.startsWith('/')) {
      navigate(data.ctaLink);
    } else {
      window.open(data.ctaLink, '_blank');
    }
  };

  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: data.backgroundImage?.url 
          ? `linear-gradient(rgba(14, 165, 233, 0.8), rgba(2, 132, 199, 0.8)), url(${data.backgroundImage.url})`
          : 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
          <Typography 
            variant="h1" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 'bold',
              mb: 2,
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            {data.title}
          </Typography>
          
          {data.subtitle && (
            <Typography 
              variant="h4" 
              component="h2" 
              gutterBottom
              sx={{ 
                fontSize: { xs: '1.25rem', md: '1.75rem' },
                fontWeight: 400,
                mb: 3,
                opacity: 0.95,
                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
              }}
            >
              {data.subtitle}
            </Typography>
          )}
          
          <Typography 
            variant="h6" 
            component="p"
            sx={{ 
              mb: 4,
              opacity: 0.9,
              lineHeight: 1.6,
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            {data.description}
          </Typography>
          
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            justifyContent="center"
            alignItems="center"
          >
            <Button
              variant="contained"
              size="large"
              onClick={handleCTAClick}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                '&:hover': {
                  bgcolor: 'grey.100',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                },
                transition: 'all 0.3s ease-in-out',
              }}
            >
              {data.ctaText}
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
