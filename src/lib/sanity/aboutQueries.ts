// GROQ Query for About Page
// Use this query in Sanity Studio's Vision plugin or API calls

// Main About Page Query
export const aboutPageQuery = `*[_type == "aboutPage"][0] {
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
}`;

// Example of using the query directly:
// import { sanityClient } from '@/lib/sanity/client';
// 
// const aboutData = await sanityClient.fetch(aboutPageQuery);

// Alternative: Query with image transformations
export const aboutPageQueryWithImages = `*[_type == "aboutPage"][0] {
  _id,
  title,
  heroImage {
    asset->{
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
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
}`;

// Query for testing in Sanity Studio Vision:
/*
*[_type == "aboutPage"] {
  title,
  heroImage {
    asset->,
    alt
  },
  companyDescription,
  whyChooseUs,
  testimonials,
  callToAction
}
*/
