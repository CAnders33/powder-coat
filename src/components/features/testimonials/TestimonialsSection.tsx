import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Rating,
  Skeleton,
  useTheme,
} from '@mui/material';
import { FormatQuote } from '@mui/icons-material';

interface Testimonial {
  id: string;
  name: string;
  company?: string;
  rating: number;
  comment: string;
  avatar?: string;
}

interface TestimonialsSectionProps {
  data?: Testimonial[];
  loading?: boolean;
}

// Default testimonials data
const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Mike Johnson",
    company: "Johnson Auto Shop",
    rating: 5,
    comment: "Outstanding work! They powder coated my custom wheels and the finish is flawless. The attention to detail and customer service exceeded my expectations.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: "2",
    name: "Sarah Martinez",
    company: "Martinez Manufacturing",
    rating: 5,
    comment: "We've been using their industrial coating services for years. Consistently high quality, fast turnaround, and competitive pricing. Highly recommended!",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: "3",
    name: "David Chen",
    company: "Custom Fabrication Co.",
    rating: 5,
    comment: "Professional service from start to finish. They handled our complex project with expertise and delivered exactly what we needed on time.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  }
];

export default function TestimonialsSection({ data = defaultTestimonials, loading = false }: TestimonialsSectionProps) {
  const theme = useTheme();

  if (loading) {
    return (
      <Box sx={{ py: 8, backgroundColor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Skeleton variant="text" width="60%" height={60} sx={{ mx: 'auto', mb: 2 }} />
            <Skeleton variant="text" width="80%" height={30} sx={{ mx: 'auto' }} />
          </Box>
          <Grid container spacing={4}>
            {[1, 2, 3].map((item) => (
              <Grid item xs={12} md={4} key={item}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Skeleton variant="circular" width={80} height={80} sx={{ mx: 'auto', mb: 2 }} />
                    <Skeleton variant="text" width="80%" height={30} sx={{ mx: 'auto', mb: 1 }} />
                    <Skeleton variant="text" width="60%" height={20} sx={{ mx: 'auto', mb: 2 }} />
                    <Skeleton variant="rectangular" width="100%" height={100} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 8, backgroundColor: 'grey.50' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              color: 'text.primary',
            }}
          >
            What Our Customers Say
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: '600px', mx: 'auto' }}
          >
            Don't just take our word for it - hear from our satisfied customers
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {data.slice(0, 3).map((testimonial) => (
            <Grid item xs={12} md={4} key={testimonial.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.shadows[8],
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

                <CardContent
                  sx={{
                    textAlign: 'center',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    p: 3,
                  }}
                >
                  <Avatar
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    sx={{
                      width: 80,
                      height: 80,
                      mx: 'auto',
                      mb: 2,
                      border: `3px solid ${theme.palette.primary.main}`,
                    }}
                  />

                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{ fontWeight: 'bold', mb: 1 }}
                  >
                    {testimonial.name}
                  </Typography>

                  {testimonial.company && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {testimonial.company}
                    </Typography>
                  )}

                  <Rating
                    value={testimonial.rating}
                    readOnly
                    sx={{ mb: 2, mx: 'auto' }}
                  />

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontStyle: 'italic',
                      lineHeight: 1.6,
                      flexGrow: 1,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    "{testimonial.comment}"
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
