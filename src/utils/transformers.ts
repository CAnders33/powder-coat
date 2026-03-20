import { getImageUrl } from '@/lib/sanity/client';
import type {
  SanityHero,
  SanityService,
  SanityTestimonial,
  SanityTrustFeature,
  SanityAboutPage,
} from '@/lib/sanity/types';
import type {
  HeroSection,
  Testimonial,
  TrustFeature,
} from '@/types/content';
import type { Service } from '@/types/services';
import type { AboutPageData } from '@/types/about';

// Transform Sanity Hero to frontend HeroSection
export function transformHero(sanityHero: SanityHero | null): HeroSection | null {
  if (!sanityHero) return null;

  return {
    title: sanityHero.title,
    subtitle: sanityHero.subtitle,
    description: sanityHero.description,
    ctaText: sanityHero.ctaText,
    ctaLink: sanityHero.ctaLink,
    backgroundImage: sanityHero.backgroundImage ? {
      url: getImageUrl(sanityHero.backgroundImage, 1920, 1080),
      alt: sanityHero.backgroundImage.alt || sanityHero.title,
    } : undefined,
  };
}

// Transform Sanity Service to frontend Service
export function transformService(sanityService: SanityService): Service {
  return {
    id: sanityService._id,
    title: sanityService.title,
    description: sanityService.description,
    shortDescription: sanityService.shortDescription,
    features: sanityService.features,
    image: sanityService.image ? {
      url: getImageUrl(sanityService.image, 400, 300),
      alt: sanityService.image.alt || sanityService.title,
    } : undefined,
    price: sanityService.price ? {
      amount: sanityService.price.amount,
      currency: sanityService.price.currency || 'USD',
      unit: sanityService.price.unit,
    } : undefined,
  };
}

// Transform Sanity Testimonial to frontend Testimonial
export function transformTestimonial(sanityTestimonial: SanityTestimonial): Testimonial {
  return {
    id: sanityTestimonial._id,
    name: sanityTestimonial.name,
    company: sanityTestimonial.company,
    content: sanityTestimonial.content,
    rating: sanityTestimonial.rating,
    image: sanityTestimonial.image ? {
      url: getImageUrl(sanityTestimonial.image, 100, 100),
      alt: sanityTestimonial.image.alt || sanityTestimonial.name,
    } : undefined,
  };
}

// Transform Sanity Trust Feature to frontend Trust Feature
export function transformTrustFeature(sanityTrustFeature: SanityTrustFeature): TrustFeature {
  return {
    id: sanityTrustFeature._id,
    title: sanityTrustFeature.title,
    description: sanityTrustFeature.description,
    icon: sanityTrustFeature.icon,
  };
}

// Batch transform functions
export function transformServices(sanityServices: SanityService[]): Service[] {
  return sanityServices.map(transformService);
}

export function transformTestimonials(sanityTestimonials: SanityTestimonial[]): Testimonial[] {
  return sanityTestimonials.map(transformTestimonial);
}

export function transformTrustFeatures(sanityTrustFeatures: SanityTrustFeature[]): TrustFeature[] {
  return sanityTrustFeatures.map(transformTrustFeature);
}

// Transform Sanity About Page to frontend About Page
export function transformAboutPage(sanityAboutPage: SanityAboutPage | null): AboutPageData | null {
  if (!sanityAboutPage) return null;

  return {
    title: sanityAboutPage.title,
    heroImage: sanityAboutPage.heroImage ? {
      url: getImageUrl(sanityAboutPage.heroImage, 1920, 800),
      alt: sanityAboutPage.heroImage.alt || sanityAboutPage.title,
    } : {
      url: '/placeholder-hero.jpg',
      alt: 'About us',
    },
    companyDescription: sanityAboutPage.companyDescription,
    whyChooseUs: sanityAboutPage.whyChooseUs || [],
    testimonials: sanityAboutPage.testimonials || [],
    callToAction: sanityAboutPage.callToAction || {
      heading: 'Ready to Get Started?',
      buttonText: 'Book Now',
    },
  };
}
