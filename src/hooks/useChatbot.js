// hooks/useChatbot.js
import { useState, useContext, useCallback } from 'react';
import { ChatContext } from '../context/ChatContext';
import { generateChatbotResponse } from '../services/api';

export const useChatbot = () => {
  const { 
    messages, 
    addMessage, 
    personality, 
    setIsTyping 
  } = useContext(ChatContext);
  const [error, setError] = useState(null);
  
  const sendMessage = useCallback(async (text) => {
    // Add user message
    const userMessage = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    
    addMessage(userMessage);
    
    // Simulate typing
    setIsTyping(true);
    
    try {
      // Filter only the last 10 messages to keep context manageable
      const recentMessages = [...messages.slice(-9), userMessage];
      
      // Get response from API
      const response = await generateChatbotResponse(recentMessages, personality);
      
      // Add a random delay to make it feel more human (750-2500ms)
      const typingDelay = 750 + Math.random() * 1750;
      await new Promise(resolve => setTimeout(resolve, typingDelay));
      
      // Add bot message
      const botMessage = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      
      addMessage(botMessage);
      setError(null);
    } catch (err) {
      setError('Failed to get a response. Please try again.');
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  }, [messages, addMessage, personality, setIsTyping]);
  
  return {
    sendMessage,
    error
  };
};

export default useChatbot;