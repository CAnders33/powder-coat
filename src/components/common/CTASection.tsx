import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Phone, Email, ArrowForward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function CTASection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate('/booking');
  };

  const handleContactClick = () => {
    navigate('/about');
  };

  return (
    <Box
      sx={{
        py: 8,
        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography
              variant={isMobile ? 'h4' : 'h3'}
              component="h2"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              Ready to Transform Your Project?
            </Typography>
            
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                opacity: 0.9,
                fontWeight: 300,
              }}
            >
              Get started with professional powder coating services today. 
              Contact us for a free consultation and quote.
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone sx={{ fontSize: 20 }} />
                <Typography variant="body1">
                  (555) 123-4567
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ fontSize: 20 }} />
                <Typography variant="body1">
                  info@powdercoatpro.com
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={4} sx={{ textAlign: isMobile ? 'center' : 'right' }}>
            <Box sx={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                onClick={handleBookingClick}
                sx={{
                  backgroundColor: 'white',
                  color: 'primary.main',
                  fontWeight: 'bold',
                  px: 4,
                  py: 2,
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  borderRadius: 2,
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.3)',
                  },
                  transition: 'all 0.3s ease',
                  flex: isMobile ? 1 : 'none',
                }}
              >
                Book Now
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={handleContactClick}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  fontWeight: 'bold',
                  px: 4,
                  py: 2,
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  borderRadius: 2,
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                  flex: isMobile ? 1 : 'none',
                }}
              >
                Learn More
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
