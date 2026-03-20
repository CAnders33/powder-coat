import { sanityClient } from './client';
import type {
  SanityHero,
  SanityService,
  SanityTestimonial,
  SanityGalleryImage,
  SanityAbout,
  SanityTrustFeature,
  SanityAboutPage,
} from './types';

// GROQ queries for fetching CMS content
export const queries = {
  // Hero section
  hero: `*[_type == "hero"][0] {
    _id,
    title,
    subtitle,
    description,
    ctaText,
    ctaLink,
    backgroundImage {
      asset->,
      alt,
      hotspot
    }
  }`,

  // Services
  services: `*[_type == "service"] | order(order asc) {
    _id,
    title,
    description,
    shortDescription,
    features,
    image {
      asset->,
      alt,
      hotspot
    },
    price,
    order
  }`,

  // Featured testimonials
  featuredTestimonials: `*[_type == "testimonial" && featured == true] | order(_createdAt desc) [0...3] {
    _id,
    name,
    company,
    content,
    rating,
    image {
      asset->,
      alt,
      hotspot
    }
  }`,

  // All testimonials
  allTestimonials: `*[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    name,
    company,
    content,
    rating,
    image {
      asset->,
      alt,
      hotspot
    }
  }`,

  // Gallery images
  galleryImages: `*[_type == "galleryImage"] | order(order asc, _createdAt desc) {
    _id,
    title,
    description,
    image {
      asset->,
      alt,
      hotspot
    },
    category,
    featured,
    order
  }`,

  // Featured gallery images
  featuredGalleryImages: `*[_type == "galleryImage" && featured == true] | order(order asc, _createdAt desc) [0...6] {
    _id,
    title,
    description,
    image {
      asset->,
      alt,
      hotspot
    },
    category
  }`,

  // About page
  aboutPage: `*[_type == "aboutPage"][0] {
    _id,
    title,
    heroImage {
      asset->,
      alt
    },
    companyDescription,
    whyChooseUs[] {
      title,
      description,
      icon
    },
    testimonials[] {
      name,
      quote
    },
    callToAction {
      heading,
      buttonText
    }
  }`,

  // About section (legacy)
  about: `*[_type == "about"][0] {
    _id,
    title,
    description,
    image {
      asset->,
      alt,
      hotspot
    },
    features,
    yearsExperience
  }`,

  // Trust features
  trustFeatures: `*[_type == "trustFeature"] | order(order asc) {
    _id,
    title,
    description,
    icon,
    order
  }`,
};

// Fetch functions with proper typing and error handling
export const sanityQueries = {
  async getHero(): Promise<SanityHero | null> {
    try {
      const hero = await sanityClient.fetch<SanityHero>(queries.hero);
      return hero;
    } catch (error) {
      console.error('Error fetching hero:', error);
      return null;
    }
  },

  async getServices(): Promise<SanityService[]> {
    try {
      const services = await sanityClient.fetch<SanityService[]>(queries.services);
      return services;
    } catch (error) {
      console.error('Error fetching services:', error);
      return [];
    }
  },

  async getFeaturedTestimonials(): Promise<SanityTestimonial[]> {
    try {
      const testimonials = await sanityClient.fetch<SanityTestimonial[]>(queries.featuredTestimonials);
      return testimonials;
    } catch (error) {
      console.error('Error fetching featured testimonials:', error);
      return [];
    }
  },

  async getAllTestimonials(): Promise<SanityTestimonial[]> {
    try {
      const testimonials = await sanityClient.fetch<SanityTestimonial[]>(queries.allTestimonials);
      return testimonials;
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      return [];
    }
  },

  async getGalleryImages(): Promise<SanityGalleryImage[]> {
    try {
      const images = await sanityClient.fetch<SanityGalleryImage[]>(queries.galleryImages);
      return images;
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      return [];
    }
  },

  async getFeaturedGalleryImages(): Promise<SanityGalleryImage[]> {
    try {
      const images = await sanityClient.fetch<SanityGalleryImage[]>(queries.featuredGalleryImages);
      return images;
    } catch (error) {
      console.error('Error fetching featured gallery images:', error);
      return [];
    }
  },

  async getAboutPage(): Promise<SanityAboutPage | null> {
    try {
      const aboutPage = await sanityClient.fetch<SanityAboutPage>(queries.aboutPage);
      return aboutPage;
    } catch (error) {
      console.error('Error fetching about page:', error);
      return null;
    }
  },

  async getAbout(): Promise<SanityAbout | null> {
    try {
      const about = await sanityClient.fetch<SanityAbout>(queries.about);
      return about;
    } catch (error) {
      console.error('Error fetching about:', error);
      return null;
    }
  },

  async getTrustFeatures(): Promise<SanityTrustFeature[]> {
    try {
      const features = await sanityClient.fetch<SanityTrustFeature[]>(queries.trustFeatures);
      return features;
    } catch (error) {
      console.error('Error fetching trust features:', error);
      return [];
    }
  },
};
