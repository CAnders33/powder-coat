import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Alert,
  Divider,
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  AccessTime,
  Send,
  CheckCircle,
} from '@mui/icons-material';
import Input from '@/components/ui/Input';

// Contact form data types
interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface ContactFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

type SubmissionState = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [validationErrors, setValidationErrors] = useState<ContactFormErrors>({});
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [responseMessage, setResponseMessage] = useState<string>('');

  // Contact information
  const contactInfo = {
    phone: '(555) 123-4567',
    email: 'info@powdercoatpro.com',
    address: '123 Industrial Avenue, Manufacturing District, City, ST 12345',
    hours: {
      weekdays: 'Monday - Friday: 8:00 AM - 6:00 PM',
      saturday: 'Saturday: 9:00 AM - 3:00 PM',
      sunday: 'Sunday: Closed',
    },
  };

  // Form validation
  const validateForm = (data: ContactFormData): ContactFormErrors => {
    const errors: ContactFormErrors = {};

    if (!data.firstName.trim()) {
      errors.firstName = 'First name is required';
    }

    if (!data.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }

    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!data.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\(?[\d\s\-\(\)]{10,}$/.test(data.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    if (!data.subject.trim()) {
      errors.subject = 'Subject is required';
    }

    if (!data.message.trim()) {
      errors.message = 'Message is required';
    } else if (data.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    return errors;
  };

  const hasValidationErrors = (errors: ContactFormErrors): boolean => {
    return Object.keys(errors).length > 0;
  };

  // Handle form input changes
  const handleInputChange = (field: keyof ContactFormData) => (value: string) => {
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

  const handleTextFieldChange = (field: keyof ContactFormData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
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

  // Handle form submission
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmissionState('success');
        setResponseMessage('Thank you for your message! We\'ll get back to you within 24 hours.');
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      } else {
        setSubmissionState('error');
        setResponseMessage(result.error || 'Failed to send message');
        
        if (result.errors) {
          setValidationErrors(result.errors);
        }
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmissionState('error');
      setResponseMessage('Network error. Please try again or call us directly.');
    }
  };

  const resetForm = () => {
    setSubmissionState('idle');
    setResponseMessage('');
    setValidationErrors({});
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 'bold',
              mb: 3,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            Contact Us
          </Typography>
          <Typography
            variant="h5"
            sx={{
              opacity: 0.9,
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            Get in touch with our powder coating experts. We're here to help with your project!
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              
              {/* Phone */}
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
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
                    <Phone />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Call Us
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {contactInfo.phone}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Speak directly with our team for immediate assistance
                  </Typography>
                </CardContent>
              </Card>

              {/* Email */}
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
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
                    <Email />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Email Us
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {contactInfo.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Send us detailed information about your project
                  </Typography>
                </CardContent>
              </Card>

              {/* Address */}
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
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
                    <LocationOn />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Visit Us
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {contactInfo.address}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tour our facility and see our work in person
                  </Typography>
                </CardContent>
              </Card>

              {/* Business Hours */}
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccessTime color="primary" />
                    Business Hours
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText
                        primary={contactInfo.hours.weekdays}
                        primaryTypographyProps={{ variant: 'body1' }}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem>
                      <ListItemText
                        primary={contactInfo.hours.saturday}
                        primaryTypographyProps={{ variant: 'body1' }}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem>
                      <ListItemText
                        primary={contactInfo.hours.sunday}
                        primaryTypographyProps={{ variant: 'body1' }}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>

            </Box>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <Paper elevation={2} sx={{ p: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
                Send Us a Message
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Have a question about our services or want to discuss your project? 
                Fill out the form below and we'll get back to you within 24 hours.
              </Typography>

              {/* Status Messages */}
              {submissionState === 'success' && (
                <Alert 
                  severity="success" 
                  sx={{ mb: 4 }}
                  action={
                    <Button color="inherit" size="small" onClick={resetForm}>
                      Send Another
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
                  {/* First Name */}
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

                  {/* Last Name */}
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

                  {/* Email */}
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

                  {/* Phone */}
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

                  {/* Subject */}
                  <Grid item xs={12}>
                    <Input
                      name="subject"
                      label="Subject"
                      placeholder="What is your message about?"
                      value={formData.subject}
                      onChange={handleInputChange('subject')}
                      error={validationErrors.subject}
                      required
                    />
                  </Grid>

                  {/* Message */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={6}
                      label="Message"
                      placeholder="Tell us about your project or ask any questions..."
                      value={formData.message}
                      onChange={handleTextFieldChange('message')}
                      error={!!validationErrors.message}
                      helperText={validationErrors.message || 'Please provide details about your inquiry'}
                      required
                    />
                  </Grid>

                  {/* Submit Button */}
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      startIcon={<Send />}
                      disabled={submissionState === 'loading'}
                      sx={{
                        py: 2,
                        px: 4,
                        fontSize: '1.1rem',
                        textTransform: 'none',
                        minWidth: 200,
                      }}
                    >
                      {submissionState === 'loading' ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
