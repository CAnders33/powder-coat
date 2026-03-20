import React from 'react';
import { useAboutPage } from '@/hooks/useAboutPage';
import HeroSection from '@/components/about/HeroSection';
import FeatureCard from '@/components/about/FeatureCard';
import TestimonialCard from '@/components/about/TestimonialCard';
import CTASection from '@/components/about/CTASection';

export default function About() {
  const { data, loading, error } = useAboutPage();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !data) {
    return <ErrorMessage error={error} />;
  }

  return (
    <main>
      {/* Hero Section */}
      <HeroSection title={data.title} heroImage={data.heroImage} />

      {/* Company Description Section */}
      <section style={sectionStyles}>
        <div style={containerStyles}>
          <div style={descriptionContainerStyles}>
            <h2 style={sectionTitleStyles}>About Our Company</h2>
            <p style={descriptionStyles}>{data.companyDescription}</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      {data.whyChooseUs.length > 0 && (
        <section style={{ ...sectionStyles, backgroundColor: '#f8f9fa' }}>
          <div style={containerStyles}>
            <h2 style={{ ...sectionTitleStyles, textAlign: 'center', marginBottom: '3rem' }}>
              Why Choose Us
            </h2>
            <div style={gridStyles}>
              {data.whyChooseUs.map((feature, index) => (
                <FeatureCard key={index} feature={feature} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {data.testimonials.length > 0 && (
        <section style={sectionStyles}>
          <div style={containerStyles}>
            <h2 style={{ ...sectionTitleStyles, textAlign: 'center', marginBottom: '3rem' }}>
              What Our Customers Say
            </h2>
            <div style={testimonialGridStyles}>
              {data.testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action Section */}
      <CTASection callToAction={data.callToAction} />
    </main>
  );
}

// Loading component
const LoadingSpinner: React.FC = () => {
  const spinnerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    flexDirection: 'column',
  };

  const loadingTextStyles: React.CSSProperties = {
    marginTop: '1rem',
    color: '#666',
    fontSize: '1.1rem',
  };

  const spinnerCircleStyles: React.CSSProperties = {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #1976d2',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  };

  return (
    <div style={spinnerStyles}>
      <div style={spinnerCircleStyles}></div>
      <p style={loadingTextStyles}>Loading...</p>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

// Error component
const ErrorMessage: React.FC<{ error: string | null }> = ({ error }) => {
  const errorStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    flexDirection: 'column',
    textAlign: 'center',
    padding: '2rem',
  };

  const errorTitleStyles: React.CSSProperties = {
    color: '#d32f2f',
    fontSize: '1.5rem',
    marginBottom: '1rem',
  };

  const errorTextStyles: React.CSSProperties = {
    color: '#666',
    fontSize: '1rem',
    maxWidth: '500px',
  };

  return (
    <div style={errorStyles}>
      <h2 style={errorTitleStyles}>Oops! Something went wrong</h2>
      <p style={errorTextStyles}>
        {error || 'Unable to load the page content. Please try again later.'}
      </p>
    </div>
  );
};

// Shared styles
const sectionStyles: React.CSSProperties = {
  padding: '4rem 2rem',
};

const containerStyles: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto',
};

const descriptionContainerStyles: React.CSSProperties = {
  maxWidth: '800px',
  margin: '0 auto',
  textAlign: 'center',
};

const sectionTitleStyles: React.CSSProperties = {
  fontSize: 'clamp(2rem, 4vw, 2.5rem)',
  fontWeight: 700,
  color: '#2c3e50',
  marginBottom: '2rem',
  margin: '0 0 2rem 0',
};

const descriptionStyles: React.CSSProperties = {
  fontSize: '1.2rem',
  lineHeight: 1.7,
  color: '#5a6c7d',
  margin: 0,
};

const gridStyles: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '2rem',
  alignItems: 'stretch',
};

const testimonialGridStyles: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '2rem',
  alignItems: 'stretch',
};
