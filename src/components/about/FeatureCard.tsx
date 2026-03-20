import React from 'react';
import type { WhyChooseUsItem } from '@/types/about';

interface FeatureCardProps {
  feature: WhyChooseUsItem;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  const cardStyles: React.CSSProperties = {
    background: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  };

  const iconStyles: React.CSSProperties = {
    fontSize: '3rem',
    marginBottom: '1rem',
    color: '#1976d2',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#2c3e50',
    marginBottom: '1rem',
    margin: 0,
  };

  const descriptionStyles: React.CSSProperties = {
    color: '#5a6c7d',
    lineHeight: 1.6,
    margin: 0,
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'translateY(-8px)';
    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)';
  };

  // Simple icon mapping
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'shield':
        return '🛡️';
      case 'quality':
        return '⭐';
      case 'speed':
        return '⚡';
      case 'experience':
        return '👨‍🔧';
      case 'warranty':
        return '✅';
      case 'eco':
        return '🌱';
      default:
        return '🔧';
    }
  };

  return (
    <div 
      style={cardStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={iconStyles}>
        {getIcon(feature.icon)}
      </div>
      <h3 style={titleStyles}>{feature.title}</h3>
      <p style={descriptionStyles}>{feature.description}</p>
    </div>
  );
};

export default FeatureCard;
