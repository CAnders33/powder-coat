import React, { useState, useMemo } from 'react';
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
  Skeleton,
  Alert,
  Tabs,
  Tab,
  Paper,
  Fade,
} from '@mui/material';
import {
  Close,
  ChevronLeft,
  ChevronRight,
  PhotoLibrary,
  FilterAlt,
} from '@mui/icons-material';
import { useGallery, type GalleryImage } from '@/hooks/useGallery';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Gallery() {
  const { images, loading, error, categories } = useGallery();
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  // Filter images by category
  const filteredImages = useMemo(() => {
    if (activeTab === 0) return images; // "All" tab
    const selectedCategory = categories[activeTab - 1];
    return images.filter(img => img.category === selectedCategory);
  }, [images, categories, activeTab]);

  const openModal = (image: GalleryImage) => {
    setSelectedImage(image);
    setCurrentImageIndex(filteredImages.findIndex(img => img.id === image.id));
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    
    const newIndex = direction === 'prev' 
      ? (currentImageIndex - 1 + filteredImages.length) % filteredImages.length
      : (currentImageIndex + 1) % filteredImages.length;
    
    setCurrentImageIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
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

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }

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
            background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Our Work Gallery
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ mb: 2, maxWidth: '800px', mx: 'auto' }}
        >
          Showcasing our professional powder coating results
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: '600px', mx: 'auto' }}
        >
          Browse through our portfolio of completed projects, from automotive parts 
          to architectural elements, all finished with premium powder coating techniques.
        </Typography>
      </Box>

      {/* Category Tabs */}
      {!loading && categories.length > 0 && (
        <Paper sx={{ mb: 4 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab
              label="All"
              icon={<PhotoLibrary />}
              iconPosition="start"
              sx={{ textTransform: 'none', minHeight: 64 }}
            />
            {categories.map((category) => (
              <Tab
                key={category}
                label={category.charAt(0).toUpperCase() + category.slice(1)}
                icon={<FilterAlt />}
                iconPosition="start"
                sx={{ textTransform: 'none', minHeight: 64 }}
              />
            ))}
          </Tabs>
        </Paper>
      )}

      {/* Gallery Grid */}
      <TabPanel value={activeTab} index={activeTab}>
        {loading ? (
          <Grid container spacing={3}>
            {Array.from({ length: 12 }).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card>
                  <Skeleton variant="rectangular" height={250} />
                  <CardContent>
                    <Skeleton variant="text" width="80%" height={24} />
                    <Skeleton variant="text" width="60%" height={20} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : filteredImages.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <PhotoLibrary sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No images found for this category
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredImages.map((image) => (
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
                      backgroundColor: 'grey.100',
                    }}
                  />
                  <CardContent sx={{ height: 120, display: 'flex', flexDirection: 'column' }}>
                    {image.title && (
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
                    )}
                    
                    {image.description && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          flexGrow: 1,
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {image.description}
                      </Typography>
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {image.category && (
                        <Chip
                          label={image.category}
                          size="small"
                          variant="outlined"
                          color="primary"
                        />
                      )}
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
        )}
      </TabPanel>

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
              backgroundColor: 'white',
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
                {filteredImages.length > 1 && (
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
                  {selectedImage.title && (
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {selectedImage.title}
                    </Typography>
                  )}
                  
                  {selectedImage.description && (
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                      {selectedImage.description}
                    </Typography>
                  )}

                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    {selectedImage.category && (
                      <Chip
                        label={selectedImage.category}
                        variant="outlined"
                        color="primary"
                      />
                    )}
                    {selectedImage.featured && (
                      <Chip
                        label="Featured"
                        color="secondary"
                      />
                    )}
                    {filteredImages.length > 1 && (
                      <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                        {currentImageIndex + 1} of {filteredImages.length}
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
