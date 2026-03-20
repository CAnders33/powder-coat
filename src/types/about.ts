// TypeScript interfaces for About page content

export interface AboutImage {
  url: string;
  alt: string;
}

export interface WhyChooseUsItem {
  title: string;
  description: string;
  icon?: string;
}

export interface Testimonial {
  name: string;
  quote: string;
}

export interface CallToAction {
  heading: string;
  buttonText: string;
}

export interface AboutPageData {
  title: string;
  heroImage: AboutImage;
  companyDescription: string;
  whyChooseUs: WhyChooseUsItem[];
  testimonials: Testimonial[];
  callToAction: CallToAction;
}

// Sanity-specific types for raw CMS data
export interface SanityAboutImage {
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

export interface SanityAboutPage {
  _id: string;
  _type: 'aboutPage';
  title: string;
  heroImage: SanityAboutImage;
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
