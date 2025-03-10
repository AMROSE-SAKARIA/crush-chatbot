import React, { useState, useRef, useEffect } from 'react';
import Message from './Message';
import Typing from './Typing';
import useChatbot from '../hooks/useChatbot';
import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';

const ChatInterface = () => {
  const [input, setInput] = useState('');
  const { messages, isTyping, personality } = useContext(ChatContext);
  const { sendMessage, error } = useChatbot();
  const messagesEndRef = useRef(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);
  
  return (
    <div className="chat-interface">
      <div className="chat-header">
        <div className="chat-profile">
          <img 
            src={personality.avatarUrl} 
            alt={personality.name} 
            className="avatar-large animate-pulse" 
          />
          <h2>{personality.name}</h2>
        </div>
      </div>
      
      <div className="message-container">
        {messages.length === 0 ? (
          <div className="empty-chat">
            <p>Say hello to {personality.name}! 👋</p>
          </div>
        ) : (
          messages.map((message) => (
            <Message
              key={message.id}
              message={message}
              personality={personality}
            />
          ))
        )}
        
        {isTyping && <Typing name={personality.name} />}
        {error && <div className="error-message">{error}</div>}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="message-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="message-input"
        />
        <button 
          type="submit" 
          className="send-button"
          disabled={!input.trim() || isTyping}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="send-icon">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;