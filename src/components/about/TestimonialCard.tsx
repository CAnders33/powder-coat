import React from 'react';
import type { Testimonial } from '@/types/about';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const cardStyles: React.CSSProperties = {
    background: '#f8f9fa',
    borderRadius: '16px',
    padding: '2rem',
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #e9ecef',
  };

  const quoteIconStyles: React.CSSProperties = {
    fontSize: '3rem',
    color: '#1976d2',
    opacity: 0.3,
    position: 'absolute',
    top: '1rem',
    left: '1.5rem',
    lineHeight: 1,
  };

  const quoteStyles: React.CSSProperties = {
    fontStyle: 'italic',
    fontSize: '1.1rem',
    lineHeight: 1.7,
    color: '#34495e',
    marginTop: '2rem',
    marginBottom: '1.5rem',
    flexGrow: 1,
  };

  const authorStyles: React.CSSProperties = {
    fontWeight: 600,
    color: '#2c3e50',
    fontSize: '1rem',
    marginTop: 'auto',
  };

  const dashStyles: React.CSSProperties = {
    color: '#1976d2',
    marginRight: '0.5rem',
  };

  return (
    <div style={cardStyles}>
      <div style={quoteIconStyles}>"</div>
      <blockquote style={quoteStyles}>
        {testimonial.quote}
      </blockquote>
      <cite style={authorStyles}>
        <span style={dashStyles}>—</span>
        {testimonial.name}
      </cite>
    </div>
  );
};

export default TestimonialCard;
