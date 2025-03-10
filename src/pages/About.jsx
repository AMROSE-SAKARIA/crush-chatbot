import React from 'react';

const About = () => {
  return (
    <div className="about-page">
      <h1>About This Chatbot</h1>
      
      <section className="about-section">
        <h2>How It Works</h2>
        <p>
          This chatbot uses advanced AI technology to create personalized conversations 
          that adapt to your preferences. You can customize the personality, appearance, 
          and behavior to create your ideal chat companion.
        </p>
      </section>
      
      <section className="about-section">
        <h2>Technology</h2>
        <p>
          Built with React for the frontend and powered by OpenAI's language models, 
          this application combines modern web technologies with state-of-the-art AI 
          to deliver a seamless chat experience.
        </p>
      </section>
      
      <section className="about-section">
        <h2>Privacy</h2>
        <p>
          Your conversations are stored locally on your device and are not shared 
          with third parties. The AI processing happens securely through encrypted 
          connections.
        </p>
      </section>
      
      <section className="about-section">
        <h2>Credits</h2>
        <div className="credits-list">
          <div className="credit-item">
            <h3>Development</h3>
            <p>Created by [Your Name]</p>
          </div>
          <div className="credit-item">
            <h3>AI Technology</h3>
            <p>Powered by OpenAI</p>
          </div>
          <div className="credit-item">
            <h3>Icons & Graphics</h3>
            <p>Various artists (see individual attributions)</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;