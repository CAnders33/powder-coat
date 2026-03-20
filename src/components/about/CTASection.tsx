import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { CallToAction } from '@/types/about';

interface CTASectionProps {
  callToAction: CallToAction;
}

const CTASection: React.FC<CTASectionProps> = ({ callToAction }) => {
  const navigate = useNavigate();

  const sectionStyles: React.CSSProperties = {
    background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
    color: 'white',
    padding: '4rem 2rem',
    textAlign: 'center',
  };

  const containerStyles: React.CSSProperties = {
    maxWidth: '800px',
    margin: '0 auto',
  };

  const headingStyles: React.CSSProperties = {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 700,
    marginBottom: '1.5rem',
    margin: '0 0 1.5rem 0',
  };

  const buttonStyles: React.CSSProperties = {
    background: 'white',
    color: '#1976d2',
    border: 'none',
    borderRadius: '8px',
    padding: '1rem 2.5rem',
    fontSize: '1.1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = 'translateY(-2px)';
    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
  };

  const handleBookNow = () => {
    navigate('/booking');
  };

  return (
    <section style={sectionStyles}>
      <div style={containerStyles}>
        <h2 style={headingStyles}>{callToAction.heading}</h2>
        <button
          style={buttonStyles}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleBookNow}
          aria-label="Navigate to booking page"
        >
          {callToAction.buttonText}
        </button>
      </div>
    </section>
  );
};

export default CTASection;
