import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Phone as PhoneIcon, Schedule as ScheduleIcon } from '@mui/icons-material';
import { COMPANY_INFO } from '@/utils/constants';

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <Box 
      sx={{ 
        py: { xs: 8, md: 12 },
        bgcolor: 'primary.main',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.1) 75%), linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.1) 75%)',
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 30px 30px',
          opacity: 0.1,
        }}
      />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box textAlign="center" maxWidth={800} mx="auto">
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom
            sx={{ 
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 'bold',
              mb: 3,
            }}
          >
            Ready to Get Started?
          </Typography>
          
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 4,
              opacity: 0.95,
              lineHeight: 1.6,
              fontSize: { xs: '1.1rem', md: '1.25rem' },
            }}
          >
            Get a professional powder coating service that exceeds expectations. 
            Book your consultation today and transform your parts with our premium finishes.
          </Typography>

          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={3} 
            justifyContent="center"
            alignItems="center"
            sx={{ mb: 4 }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<ScheduleIcon />}
              onClick={() => navigate('/booking')}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 3,
                minWidth: 200,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                '&:hover': {
                  bgcolor: 'grey.100',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                },
                transition: 'all 0.3s ease-in-out',
              }}
            >
              Book Now
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<PhoneIcon />}
              href={`tel:${COMPANY_INFO.phone.replace(/\D/g, '')}`}
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 3,
                minWidth: 200,
                borderWidth: 2,
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderWidth: 2,
                },
                transition: 'all 0.3s ease-in-out',
              }}
            >
              Call Us
            </Button>
          </Stack>

          <Typography 
            variant="body1" 
            sx={{ 
              opacity: 0.8,
              fontSize: '1rem',
            }}
          >
            Questions? Call us at{' '}
            <Box 
              component="span" 
              sx={{ fontWeight: 600 }}
            >
              {COMPANY_INFO.phone}
            </Box>
            {' '}or email{' '}
            <Box 
              component="span" 
              sx={{ fontWeight: 600 }}
            >
              {COMPANY_INFO.email}
            </Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
