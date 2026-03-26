import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Rating,
  Box,
} from '@mui/material';
import { FormatQuote } from '@mui/icons-material';

interface Testimonial {
  name: string;
  company?: string;
  comment: string;
  rating: number;
  avatar?: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <Card
      sx={{
        height: '100%',
        position: 'relative',
        p: 3,
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          color: 'primary.main',
          opacity: 0.3,
        }}
      >
        <FormatQuote sx={{ fontSize: 40 }} />
      </Box>

      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar
            src={testimonial.avatar}
            alt={testimonial.name}
            sx={{
              width: 64,
              height: 64,
              mr: 2,
              border: (theme) => `3px solid ${theme.palette.primary.main}`,
            }}
          />
          <Box>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
              {testimonial.name}
            </Typography>
            {testimonial.company && (
              <Typography variant="body2" color="text.secondary">
                {testimonial.company}
              </Typography>
            )}
          </Box>
        </Box>

        <Rating
          value={testimonial.rating}
          readOnly
          sx={{ mb: 2 }}
        />

        <Typography
          variant="body2"
          sx={{
            fontStyle: 'italic',
            lineHeight: 1.6,
            color: 'text.secondary',
          }}
        >
          "{testimonial.comment}"
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
