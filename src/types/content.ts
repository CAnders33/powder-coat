export interface HeroSection {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: {
    url: string;
    alt: string;
  };
}

export interface AboutSection {
  title: string;
  description: string;
  image?: {
    url: string;
    alt: string;
  };
  features: string[];
  yearsExperience?: number;
}

export interface Testimonial {
  id: string;
  name: string;
  company?: string;
  content: string;
  rating: number;
  image?: {
    url: string;
    alt: string;
  };
}

export interface TrustFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  hours: {
    weekday: string;
    weekend: string;
  };
}
