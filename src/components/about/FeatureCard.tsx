import {
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import {
  Build,
  Speed,
  Security,
  Nature,
} from '@mui/icons-material';

interface Feature {
  title: string;
  description: string;
  icon?: string;
}

interface FeatureCardProps {
  feature: Feature;
}

const getIcon = (iconName?: string) => {
  switch (iconName) {
    case 'build':
      return <Build />;
    case 'speed':
      return <Speed />;
    case 'security':
      return <Security />;
    case 'nature':
      return <Nature />;
    default:
      return <Build />;
  }
};

const FeatureCard = ({ feature }: FeatureCardProps) => {
  return (
    <Card
      sx={{
        height: '100%',
        textAlign: 'center',
        p: 3,
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'inline-flex',
            p: 2,
            borderRadius: '50%',
            backgroundColor: 'primary.main',
            color: 'white',
            mb: 2,
          }}
        >
          {getIcon(feature.icon)}
        </Box>
        <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
          {feature.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
          {feature.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
