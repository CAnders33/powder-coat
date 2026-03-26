import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  Alert,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
} from '@mui/material';
import {
  Build,
  Description,
  CheckCircle,
  Schedule,
  AttachMoney,
  Star,
} from '@mui/icons-material';
import Input from '@/components/ui/Input';
// Form submission states
type SubmissionState = 'idle' | 'loading' | 'success' | 'error';

interface BookingFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  yearMakeModel: string;
  color: string;
  numberOfParts: number;
  details: string;
}

interface BookingFormErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  yearMakeModel?: string;
  color?: string;
  numberOfParts?: string;
  details?: string;
}

interface BookingResponse {
  success: boolean;
  message?: string;
  data?: {
    id: string;
    status: string;
  };
  error?: string;
  errors?: BookingFormErrors;
}

export default function Booking() {
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    yearMakeModel: '',
    color: '',
    numberOfParts: 1,
    details: '',
  });

  const [validationErrors, setValidationErrors] = useState<BookingFormErrors>({});
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [responseMessage, setResponseMessage] = useState<string>('');

  const validateForm = (data: BookingFormData): BookingFormErrors => {
    const errors: BookingFormErrors = {};

    if (!data.firstName.trim()) {
      errors.firstName = 'First name is required';
    }

    if (!data.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }

    if (!data.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\(?[\d\s\-\(\)]{10,}$/.test(data.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!data.yearMakeModel.trim()) {
      errors.yearMakeModel = 'Year/Make/Model is required';
    }

    if (!data.color.trim()) {
      errors.color = 'Color preference is required';
    }

    if (!data.numberOfParts || data.numberOfParts < 1) {
      errors.numberOfParts = 'Number of parts must be at least 1';
    }

    return errors;
  };

  const hasValidationErrors = (errors: BookingFormErrors): boolean => {
    return Object.keys(errors).length > 0;
  };

  const handleInputChange = (field: keyof BookingFormData) => (value: string) => {
    const parsedValue = field === 'numberOfParts' 
      ? parseInt(value) || 1
      : value;

    setFormData(prev => ({
      ...prev,
      [field]: parsedValue,
    }));

    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleTextFieldChange = (field: keyof BookingFormData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = field === 'numberOfParts' 
      ? parseInt(event.target.value) || 1
      : event.target.value;

    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Validate form
    const errors = validateForm(formData);
    setValidationErrors(errors);

    if (hasValidationErrors(errors)) {
      return;
    }

    // Submit form
    setSubmissionState('loading');
    setResponseMessage('');

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result: BookingResponse = await response.json();

      if (result.success) {
        setSubmissionState('success');
        setResponseMessage(result.message || 'Estimate request submitted successfully!');
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          yearMakeModel: '',
          color: '',
          numberOfParts: 1,
          details: '',
        });
      } else {
        setSubmissionState('error');
        setResponseMessage(result.error || 'Failed to submit estimate request');
        
        if (result.errors) {
          setValidationErrors(result.errors);
        }
      }
    } catch (error) {
      console.error('Estimate request submission error:', error);
      setSubmissionState('error');
      setResponseMessage('Network error. Please try again.');
    }
  };

  const resetForm = () => {
    setSubmissionState('idle');
    setResponseMessage('');
    setValidationErrors({});
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
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
          Get Your Free Estimate
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ mb: 2, maxWidth: '600px', mx: 'auto' }}
        >
          Request a free quote for your powder coating project
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: '500px', mx: 'auto' }}
        >
          Fill out the form below and we'll get back to you within 24 hours with a detailed estimate and project timeline.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Booking Form */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
              Free Estimate Request
            </Typography>

            {/* Status Messages */}
            {submissionState === 'success' && (
              <Alert 
                severity="success" 
                sx={{ mb: 4 }}
                action={
                  <Button color="inherit" size="small" onClick={resetForm}>
                    Request Another
                  </Button>
                }
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircle />
                  {responseMessage}
                </Box>
              </Alert>
            )}

            {submissionState === 'error' && (
              <Alert 
                severity="error" 
                sx={{ mb: 4 }}
                action={
                  <Button color="inherit" size="small" onClick={resetForm}>
                    Try Again
                  </Button>
                }
              >
                {responseMessage}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* First Name Field */}
                <Grid item xs={12} sm={6}>
                  <Input
                    name="firstName"
                    label="First Name"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleInputChange('firstName')}
                    error={validationErrors.firstName}
                    required
                  />
                </Grid>

                {/* Last Name Field */}
                <Grid item xs={12} sm={6}>
                  <Input
                    name="lastName"
                    label="Last Name"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleInputChange('lastName')}
                    error={validationErrors.lastName}
                    required
                  />
                </Grid>

                {/* Phone Field */}
                <Grid item xs={12} sm={6}>
                  <Input
                    name="phone"
                    label="Phone Number"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={handleInputChange('phone')}
                    error={validationErrors.phone}
                    required
                  />
                </Grid>

                {/* Email Field */}
                <Grid item xs={12} sm={6}>
                  <Input
                    name="email"
                    label="Email Address"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    error={validationErrors.email}
                    required
                  />
                </Grid>

                {/* Year/Make/Model Field */}
                <Grid item xs={12} sm={6}>
                  <Input
                    name="yearMakeModel"
                    label="Year/Make/Model"
                    placeholder="e.g., 2020 Toyota Camry"
                    value={formData.yearMakeModel}
                    onChange={handleInputChange('yearMakeModel')}
                    error={validationErrors.yearMakeModel}
                    required
                  />
                </Grid>

                {/* Color Field */}
                <Grid item xs={12} sm={6}>
                  <Input
                    name="color"
                    label="Preferred Color"
                    placeholder="e.g., Matte Black, Red, Custom"
                    value={formData.color}
                    onChange={handleInputChange('color')}
                    error={validationErrors.color}
                    required
                  />
                </Grid>

                {/* Number of Parts */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Number of Parts"
                    type="number"
                    value={formData.numberOfParts}
                    onChange={handleTextFieldChange('numberOfParts')}
                    error={!!validationErrors.numberOfParts}
                    helperText={validationErrors.numberOfParts || 'How many parts need coating?'}
                    required
                    inputProps={{ min: 1, max: 100 }}
                    InputProps={{
                      startAdornment: <Build sx={{ mr: 1, color: 'action.active' }} />,
                    }}
                  />
                </Grid>

                {/* Additional Details */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Additional Details"
                    placeholder="Describe the parts that need coating, any special requirements, timeline, etc..."
                    value={formData.details}
                    onChange={handleTextFieldChange('details')}
                    error={!!validationErrors.details}
                    helperText={validationErrors.details || 'Provide any additional information about your project'}
                    InputProps={{
                      startAdornment: (
                        <Description sx={{ mr: 1, mt: 1, color: 'action.active', alignSelf: 'flex-start' }} />
                      ),
                    }}
                  />
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={submissionState === 'loading'}
                    sx={{
                      py: 2,
                      px: 4,
                      fontSize: '1.1rem',
                      textTransform: 'none',
                      minWidth: 200,
                    }}
                  >
                    {submissionState === 'loading' ? 'Submitting...' : 'Get Free Estimate'}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>

        {/* Sidebar Information */}
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            
            {/* Process Info */}
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Schedule color="primary" />
                  What Happens Next?
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <Chip label="1" size="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Estimate Review"
                      secondary="We'll review your request and prepare a detailed estimate"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Chip label="2" size="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Quick Response"
                      secondary="You'll receive your free estimate within 24 hours"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Chip label="3" size="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Schedule Service"
                      secondary="Once approved, we'll schedule your project"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            {/* Pricing Info */}
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AttachMoney color="primary" />
                  Pricing Information
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary="Automotive Parts"
                      secondary="Starting at $25 per sq ft"
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemText
                      primary="Industrial Components"
                      secondary="Starting at $35 per sq ft"
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemText
                      primary="Custom Color Matching"
                      secondary="Additional $10-15 per sq ft"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            {/* Quality Assurance */}
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Star color="primary" />
                  Quality Guarantee
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="5-Year Warranty" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Professional Grade Materials" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Expert Application Process" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Quality Control Testing" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>

          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
