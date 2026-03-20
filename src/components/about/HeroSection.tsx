import React from 'react';
import type { AboutImage } from '@/types/about';

interface HeroSectionProps {
  title: string;
  heroImage: AboutImage;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, heroImage }) => {
  const heroStyles: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '60vh',
    minHeight: '400px',
    overflow: 'hidden',
  };

  const containerStyles: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
  };

  const imageStyles: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  };

  const overlayStyles: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(0, 0, 0, 0.7) 0%, rgba(25, 118, 210, 0.4) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const titleStyles: React.CSSProperties = {
    color: 'white',
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: 700,
    textAlign: 'center',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    margin: 0,
  };

  return (
    <section style={heroStyles}>
      <div style={containerStyles}>
        <img 
          src={heroImage.url} 
          alt={heroImage.alt}
          style={imageStyles}
        />
        <div style={overlayStyles}>
          <h1 style={titleStyles}>{title}</h1>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
