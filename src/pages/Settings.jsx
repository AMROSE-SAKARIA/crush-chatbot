import React, { useState, useContext } from 'react';
import { ChatContext } from '../context/ChatContext';

const Settings = () => {
  const { personality, updatePersonality, clearMessages, darkMode, toggleDarkMode } = useContext(ChatContext);
  
  const [tempPersonality, setTempPersonality] = useState({...personality});
  const [selectedTraits, setSelectedTraits] = useState(personality.traits);
  
  const traitOptions = [
    'caring', 'funny', 'smart', 'outgoing', 'shy', 'flirty', 
    'artistic', 'athletic', 'nerdy', 'adventurous', 'mysterious'
  ];
  
  const avatarOptions = {
    female: [
      '/avatars/female-1.png',
      '/avatars/female-2.png',
      '/avatars/female-3.png',
      '/avatars/female-4.png',
    ],
    male: [
      '/avatars/male-1.png',
      '/avatars/male-2.png',
      '/avatars/male-3.png',
      '/avatars/male-4.png',
    ]
  };
  
  const handleTraitToggle = (trait) => {
    if (selectedTraits.includes(trait)) {
      // Remove trait if already selected
      setSelectedTraits(prev => prev.filter(t => t !== trait));
    } else if (selectedTraits.length < 5) {
      // Add trait if less than 5 are selected
      setSelectedTraits(prev => [...prev, trait]);
    }
  };
  
  const handleGenderChange = (gender) => {
    // Update gender and select first avatar of that gender
    setTempPersonality({
      ...tempPersonality,
      gender,
      avatarUrl: avatarOptions[gender][0]
    });
  };
  
  const handleSave = () => {
    updatePersonality({
      ...tempPersonality,
      traits: selectedTraits
    });
  };
  
  return (
    <div className="settings-page">
      <h1>Customize Your Chatbot</h1>
      
      <div className="settings-section">
        <h2>Basic Information</h2>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={tempPersonality.name}
            onChange={(e) => setTempPersonality({...tempPersonality, name: e.target.value})}
            maxLength={15}
          />
        </div>
        
        <div className="form-group">
          <label>Gender:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={tempPersonality.gender === 'female'}
                onChange={() => handleGenderChange('female')}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={tempPersonality.gender === 'male'}
                onChange={() => handleGenderChange('male')}
              />
              Male
            </label>
          </div>
        </div>
      </div>
      
      <div className="settings-section">
        <h2>Personality Traits (Choose up to 5)</h2>
        <div className="traits-grid">
          {traitOptions.map(trait => (
            <button
              key={trait}
              className={`trait-button ${selectedTraits.includes(trait) ? 'selected' : ''}`}
              onClick={() => handleTraitToggle(trait)}
              disabled={!selectedTraits.includes(trait) && selectedTraits.length >= 5}
            >
              {trait}
            </button>
          ))}
        </div>
      </div>
      
      <div className="settings-section">
        <h2>Choose Avatar</h2>
        <div className="avatars-grid">
          {avatarOptions[tempPersonality.gender].map((avatarUrl, index) => (
            <div 
              key={index}
              className={`avatar-option ${tempPersonality.avatarUrl === avatarUrl ? 'selected' : ''}`}
              onClick={() => setTempPersonality({...tempPersonality, avatarUrl})}
            >
              <img src={avatarUrl} alt={`Avatar option ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
      
      <div className="settings-section">
        <h2>Preferences</h2>
        <div className="preference-item">
          <label htmlFor="dark-mode">Dark Mode</label>
          <div className="toggle-switch">
            <input
              id="dark-mode"
              type="checkbox"
              checked={darkMode}
              onChange={toggleDarkMode}
            />
            <label htmlFor="dark-mode" className="toggle-label"></label>
          </div>
        </div>
        
        <div className="danger-zone">
          <h3>Danger Zone</h3>
          <button 
            className="danger-button" 
            onClick={() => {
              if (window.confirm('Are you sure you want to clear all chat history?')) {
                clearMessages();
              }
            }}
          >
            Clear Chat History
          </button>
        </div>
      </div>
      
      <div className="settings-actions">
        <button className="save-button" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;