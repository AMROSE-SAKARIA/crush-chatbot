import React, { useState, useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import Avatar from './Avatar';

const PersonalitySelector = () => {
  const { personality, updatePersonality } = useContext(ChatContext);
  
  const personalityTypes = [
    { id: 'crush', name: 'Crush' },
    { id: 'friend', name: 'Friend' },
    { id: 'mentor', name: 'Mentor' },
    { id: 'therapist', name: 'Therapist' }
  ];
  
  const [selectedType, setSelectedType] = useState(personality.type);
  
  const handleTypeChange = (typeId) => {
    setSelectedType(typeId);
    // Update personality with new type
    updatePersonality({ type: typeId });
  };
  
  return (
    <div className="personality-selector">
      <h2>Choose Personality Type</h2>
      
      <div className="personality-types">
        {personalityTypes.map(type => (
          <div 
            key={type.id}
            className={`personality-type ${selectedType === type.id ? 'selected' : ''}`}
            onClick={() => handleTypeChange(type.id)}
          >
            <div className="personality-icon">
              {type.id === 'crush' && '💕'}
              {type.id === 'friend' && '😊'}
              {type.id === 'mentor' && '🧠'}
              {type.id === 'therapist' && '🧘'}
            </div>
            <div className="personality-name">{type.name}</div>
          </div>
        ))}
      </div>
      
      <div className="current-personality">
        <h3>Currently Selected:</h3>
        <div className="personality-preview">
          <Avatar 
            url={personality.avatarUrl} 
            name={personality.name} 
            size="medium" 
          />
          <div className="personality-details">
            <h4>{personality.name}</h4>
            <p>{personalityTypes.find(t => t.id === personality.type)?.name || 'Custom'}</p>
            <div className="personality-traits">
              {personality.traits.map(trait => (
                <span key={trait} className="trait-tag">{trait}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalitySelector;