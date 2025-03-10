import React from 'react';
import Avatar from './Avatar';

const Message = ({ message, personality }) => {
  const isBot = message.sender === 'bot';
  
  // Generate reliable avatar URLs
  const userAvatarUrl = 'https://api.dicebear.com/7.x/avataaars/svg?seed=User&backgroundColor=d1d4f9';
  
  return (
    <div className={`message ${isBot ? 'bot-message' : 'user-message'}`}>
      <div className="message-avatar">
        <Avatar 
          url={isBot ? personality.avatarUrl : userAvatarUrl} 
          name={isBot ? personality.name : 'You'} 
        />
      </div>
      <div className="message-content">
        <div className="message-bubble">
          <p>{message.text}</p>
        </div>
        <div className="message-timestamp">
          {new Date(message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
};

export default Message;