import { BookingFormData, BookingFormErrors } from '@/types/booking';

export const validateBookingForm = (data: BookingFormData): BookingFormErrors => {
  const errors: BookingFormErrors = {};

  // Name validation
  if (!data.name.trim()) {
    errors.name = 'Name is required';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  // Phone validation
  if (!data.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^[\d\s\-\+\(\)]+$/.test(data.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  // Date validation
  if (!data.date) {
    errors.date = 'Date is required';
  } else {
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      errors.date = 'Please select a future date';
    }
  }

  // Make and model validation
  if (!data.makeModel.trim()) {
    errors.makeModel = 'Make and model are required';
  } else if (data.makeModel.trim().length < 3) {
    errors.makeModel = 'Please provide more details about your vehicle';
  }

  // Number of parts validation
  if (data.numberOfParts < 1) {
    errors.numberOfParts = 'Number of parts must be at least 1';
  } else if (data.numberOfParts > 100) {
    errors.numberOfParts = 'Please contact us directly for large orders (>100 parts)';
  }

  // Details validation (optional but should have minimum length if provided)
  if (data.details && data.details.trim().length > 0 && data.details.trim().length < 10) {
    errors.details = 'Please provide more detailed information';
  }

  return errors;
};

export const hasValidationErrors = (errors: BookingFormErrors): boolean => {
  return Object.keys(errors).length > 0;
};
