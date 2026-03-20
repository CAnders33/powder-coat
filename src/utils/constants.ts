export const COMPANY_INFO = {
  name: 'Premium Powder Coating',
  tagline: 'Professional Automotive Powder Coating Services',
  phone: '(123) 456-7890',
  email: 'email@email.com',
  address: {
    street: '123 Something Street',
    city: 'City',
    state: 'CO',
    zip: '12345',
  },
  hours: {
    weekday: 'Monday - Friday: 8:00 AM - 6:00 PM',
    weekend: 'Saturday: 9:00 AM - 4:00 PM, Sunday: Closed',
  },
};

export const NAVIGATION_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export const BOOKING_CONFIG = {
  minPartsCount: 1,
  maxPartsCount: 100,
  minAdvanceBookingDays: 1,
  maxAdvanceBookingDays: 90,
} as const;

export const GALLERY_CONFIG = {
  imagesPerPage: 12,
  thumbnailSize: 300,
  modalMaxWidth: 1200,
} as const;

export const API_ENDPOINTS = {
  booking: '/api/booking',
  contact: '/api/contact',
} as const;
