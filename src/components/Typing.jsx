import React from 'react';

const Typing = ({ name }) => {
  return (
    <div className="typing-indicator">
      <span>{name} is typing</span>
      <div className="typing-dots">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  );
};

export default Typing;