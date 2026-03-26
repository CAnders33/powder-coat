
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  Skeleton,
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

interface HeroProps {
  data: HeroData;
  loading?: boolean;
}

export default function Hero({ data, loading = false }: HeroProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleCTAClick = () => {
    navigate(data.ctaLink);
  };

  if (loading) {
    return (
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: 'white',
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: '800px' }}>
            <Skeleton variant="text" width="60%" height={80} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
            <Skeleton variant="text" width="40%" height={40} sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 3 }} />
            <Skeleton variant="text" width="80%" height={30} sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 1 }} />
            <Skeleton variant="text" width="70%" height={30} sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 4 }} />
            <Skeleton variant="rectangular" width={200} height={50} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
        color: 'white',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
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
        <Box
          sx={{
            maxWidth: '800px',
            textAlign: isMobile ? 'center' : 'left',
          }}
        >
          <Typography
            variant={isMobile ? 'h3' : 'h2'}
            component="h1"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            {data.title}
          </Typography>

          <Typography
            variant={isMobile ? 'h6' : 'h5'}
            sx={{
              mb: 3,
              opacity: 0.9,
              fontWeight: 300,
            }}
          >
            {data.subtitle}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 4,
              fontSize: '1.1rem',
              lineHeight: 1.6,
              opacity: 0.9,
              maxWidth: '600px',
            }}
          >
            {data.description}
          </Typography>

          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            onClick={handleCTAClick}
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
            {data.ctaText}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
