import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Modal,
  IconButton,
  Fade,
} from '@mui/material';
import {
  Close,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';
import { colors } from '../theme';

interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  category: string;
  featured?: boolean;
  image: {
    url: string;
    thumbnailUrl: string;
    alt: string;
  };
}

// Static gallery data for automotive powder coating projects
const galleryImages: GalleryImage[] = [
  {
    id: "1",
    title: "Custom Automotive Rims",
    category: "wheels",
    description: "High-gloss black powder coating on custom aluminum wheels with perfect finish",
    featured: true,
    image: {
      url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      alt: "Custom powder coated automotive rims"
    }
  },
  {
    id: "2",
    title: "Vintage Car Frame Restoration",
    category: "frames",
    description: "Complete frame restoration with durable red powder coating",
    image: {
      url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop",
      alt: "Vintage car frame powder coating"
    }
  },
  {
    id: "3",
    title: "Motorcycle Frame Components",
    category: "frames",
    description: "Glossy blue coating on custom motorcycle frame and swing arm",
    featured: true,
    image: {
      url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
      alt: "Motorcycle frame powder coating"
    }
  },
  {
    id: "4",
    title: "Classic Car Bumpers",
    category: "exterior",
    description: "Chrome-look powder coating on vintage car bumpers for durability",
    image: {
      url: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&h=600&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=300&fit=crop",
      alt: "Classic car bumpers"
    }
  },
  {
    id: "5",
    title: "Truck Running Boards",
    category: "exterior",
    description: "Textured black coating for enhanced grip and weather protection",
    image: {
      url: "https://images.unsplash.com/photo-1544558586-5f465aa4b951?w=800&h=600&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1544558586-5f465aa4b951?w=400&h=300&fit=crop",
      alt: "Truck running boards"
    }
  },
  {
    id: "6",
    title: "Custom Suspension Parts",
    category: "suspension",
    description: "Durable coating for coilovers, control arms, and suspension components",
    featured: true,
    image: {
      url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop",
      alt: "Custom suspension parts"
    }
  },
  {
    id: "7",
    title: "Custom Exhaust Systems",
    category: "exhaust",
    description: "Heat-resistant ceramic coating for performance exhaust manifolds",
    featured: true,
    image: {
      url: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
      alt: "Custom exhaust systems"
    }
  },
  {
    id: "8",
    title: "Roll Cage Components",
    category: "frames",
    description: "Matte black safety coating for racing roll cage construction",
    image: {
      url: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=800&h=600&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=400&h=300&fit=crop",
      alt: "Roll cage components"
    }
  },
  {
    id: "9",
    title: "Sport Wheels Collection",
    category: "wheels",
    description: "Various custom wheel finishes including metallic and matte options",
    image: {
      url: "https://images.unsplash.com/photo-1549399683-d6f2d0e19a2b?w=800&h=600&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1549399683-d6f2d0e19a2b?w=400&h=300&fit=crop",
      alt: "Sport wheels collection"
    }
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (image: GalleryImage) => {
    setSelectedImage(image);
    setCurrentImageIndex(galleryImages.findIndex(img => img.id === image.id));
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    
    const newIndex = direction === 'prev' 
      ? (currentImageIndex - 1 + galleryImages.length) % galleryImages.length
      : (currentImageIndex + 1) % galleryImages.length;
    
    setCurrentImageIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!selectedImage) return;
    
    switch (event.key) {
      case 'Escape':
        closeModal();
        break;
      case 'ArrowLeft':
        navigateImage('prev');
        break;
      case 'ArrowRight':
        navigateImage('next');
        break;
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 'bold',
            mb: 3,
            background: `linear-gradient(45deg, ${colors.primaryAccent}, ${colors.secondaryAccent})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Automotive Powder Coating Gallery
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ mb: 2, maxWidth: '800px', mx: 'auto' }}
        >
          Showcasing our professional automotive powder coating results
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: '600px', mx: 'auto' }}
        >
          Browse through our portfolio of completed automotive projects, from custom wheels 
          to complete vehicle restorations, all finished with premium powder coating techniques.
        </Typography>
      </Box>

      {/* Gallery Grid */}
      <Grid container spacing={3}>
        {galleryImages.map((image) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={image.id}>
            <Card
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: (theme) => theme.shadows[8],
                },
              }}
              onClick={() => openModal(image)}
            >
              <CardMedia
                component="img"
                height="250"
                image={image.image.thumbnailUrl}
                alt={image.image.alt}
                loading="lazy"
                sx={{ 
                  objectFit: 'cover',
                  backgroundColor: colors.cardSurface,
                }}
              />
              <CardContent sx={{ height: 150, display: 'flex', flexDirection: 'column' }}>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{ 
                    fontWeight: 'bold', 
                    mb: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {image.title}
                </Typography>
                
                {image.description && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      flexGrow: 1,
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {image.description}
                  </Typography>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip
                    label={image.category}
                    size="small"
                    variant="outlined"
                    color="primary"
                  />
                  {image.featured && (
                    <Chip
                      label="Featured"
                      size="small"
                      color="secondary"
                    />
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal/Lightbox */}
      <Modal
        open={!!selectedImage}
        onClose={closeModal}
        closeAfterTransition
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
        onKeyDown={handleKeyDown}
      >
        <Fade in={!!selectedImage}>
          <Box
            sx={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              backgroundColor: colors.cardSurface,
              borderRadius: 2,
              boxShadow: 24,
              outline: 'none',
            }}
          >
            {selectedImage && (
              <>
                {/* Close Button */}
                <IconButton
                  onClick={closeModal}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    zIndex: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    },
                  }}
                  aria-label="Close modal"
                >
                  <Close />
                </IconButton>

                {/* Navigation Buttons */}
                {galleryImages.length > 1 && (
                  <>
                    <IconButton
                      onClick={() => navigateImage('prev')}
                      sx={{
                        position: 'absolute',
                        left: 8,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        zIndex: 1,
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        },
                      }}
                      aria-label="Previous image"
                    >
                      <ChevronLeft />
                    </IconButton>

                    <IconButton
                      onClick={() => navigateImage('next')}
                      sx={{
                        position: 'absolute',
                        right: 8,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        zIndex: 1,
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        },
                      }}
                      aria-label="Next image"
                    >
                      <ChevronRight />
                    </IconButton>
                  </>
                )}

                {/* Image */}
                <img
                  src={selectedImage.image.url}
                  alt={selectedImage.image.alt}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '70vh',
                    objectFit: 'contain',
                    borderRadius: '8px 8px 0 0',
                  }}
                />

                {/* Image Info */}
                <Box sx={{ p: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {selectedImage.title}
                  </Typography>
                  
                  {selectedImage.description && (
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                      {selectedImage.description}
                    </Typography>
                  )}

                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Chip
                      label={selectedImage.category}
                      variant="outlined"
                      color="primary"
                    />
                    {selectedImage.featured && (
                      <Chip
                        label="Featured"
                        color="secondary"
                      />
                    )}
                    {galleryImages.length > 1 && (
                      <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                        {currentImageIndex + 1} of {galleryImages.length}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
}