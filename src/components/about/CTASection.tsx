import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { ArrowForward, Phone } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface CallToAction {
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

interface CTASectionProps {
  callToAction: CallToAction;
}

const CTASection = ({ callToAction }: CTASectionProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handlePrimaryClick = () => {
    navigate(callToAction.primaryButtonLink);
  };

  const handleSecondaryClick = () => {
    if (callToAction.secondaryButtonLink) {
      navigate(callToAction.secondaryButtonLink);
    }
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
        color: 'white',
        py: 8,
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
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant={isMobile ? 'h4' : 'h3'}
            component="h2"
            sx={{
              fontWeight: 'bold',
              mb: 3,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            {callToAction.title}
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              opacity: 0.9,
              fontWeight: 300,
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            {callToAction.description}
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              onClick={handlePrimaryClick}
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
              }}
            >
              {callToAction.primaryButtonText}
            </Button>

            {callToAction.secondaryButtonText && (
              <Button
                variant="outlined"
                size="large"
                startIcon={<Phone />}
                onClick={handleSecondaryClick}
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
                }}
              >
                {callToAction.secondaryButtonText}
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CTASection;
