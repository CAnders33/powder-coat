// Sanity document types for CMS content
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface SanityHero {
  _id: string;
  _type: 'hero';
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: SanityImage;
}

export interface SanityService {
  _id: string;
  _type: 'service';
  title: string;
  description: string;
  shortDescription?: string;
  features: string[];
  image?: SanityImage;
  price?: {
    amount?: number;
    currency?: string;
    unit?: string;
  };
  order?: number;
}

export interface SanityTestimonial {
  _id: string;
  _type: 'testimonial';
  name: string;
  company?: string;
  content: string;
  rating: number;
  image?: SanityImage;
  featured?: boolean;
}

export interface SanityGalleryImage {
  _id: string;
  _type: 'galleryImage';
  title?: string;
  description?: string;
  image: SanityImage;
  category?: string;
  featured?: boolean;
  order?: number;
}

export interface SanityAbout {
  _id: string;
  _type: 'about';
  title: string;
  description: string;
  image?: SanityImage;
  features: string[];
  yearsExperience?: number;
}

export interface SanityTrustFeature {
  _id: string;
  _type: 'trustFeature';
  title: string;
  description: string;
  icon: string;
  order?: number;
}

export interface SanityAboutPage {
  _id: string;
  _type: 'aboutPage';
  title: string;
  heroImage: SanityImage;
  companyDescription: string;
  whyChooseUs: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  testimonials: Array<{
    name: string;
    quote: string;
  }>;
  callToAction: {
    heading: string;
    buttonText: string;
  };
}
