import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import Avatar from '../components/Avatar';

const Home = () => {
  const { personality } = useContext(ChatContext);
  
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Chat with <span className="highlight">{personality.name}</span></h1>
          <p className="hero-subtitle">
            Your personal AI companion with a unique personality
          </p>
          <div className="hero-avatar">
            <Avatar 
              url={personality.avatarUrl} 
              name={personality.name} 
              size="large" 
              animated={true} 
            />
          </div>
          <Link to="/chat" className="cta-button">
            Start Chatting
          </Link>
        </div>
      </div>
      
      <div className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🧠</div>
            <h3>Customizable Personality</h3>
            <p>Choose traits, gender, and style to create your perfect companion</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Natural Conversations</h3>
            <p>Enjoy realistic and engaging chats powered by advanced AI</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎭</div>
            <h3>Multiple Avatars</h3>
            <p>Select from various avatar styles to visualize your AI friend</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌙</div>
            <h3>Dark Mode</h3>
            <p>Chat comfortably day or night with theme options</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;