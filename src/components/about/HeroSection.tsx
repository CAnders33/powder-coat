import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';

interface HeroSectionProps {
  title: string;
  heroImage?: {
    url: string;
    alt: string;
  };
}

const HeroSection = ({ title, heroImage }: HeroSectionProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        background: heroImage?.url 
          ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${heroImage.url})`
          : 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        py: { xs: 8, md: 12 },
        textAlign: 'center',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant={isMobile ? 'h3' : 'h2'}
          component="h1"
          sx={{
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          {title}
        </Typography>
      </Container>
    </Box>
  );
};

export default HeroSection;
