import React, { useState } from 'react';

const Avatar = ({ url, name, size = 'medium', animated = false }) => {
  const [hasError, setHasError] = useState(false);
  const sizeClass = size === 'small' ? 'avatar-small' : 
                    size === 'large' ? 'avatar-large' : 'avatar-medium';
  
  const animationClass = animated ? 'animate-avatar' : '';
  
  // Fallback avatar if the provided URL fails
  const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
  
  const handleImageError = () => {
    setHasError(true);
  };
  
  return (
    <div className={`avatar ${sizeClass} ${animationClass}`}>
      <img 
        src={hasError ? fallbackUrl : url} 
        alt={`${name}'s avatar`}
        onError={handleImageError}
      />
    </div>
  );
};

export default Avatar;