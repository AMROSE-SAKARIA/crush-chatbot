import React, { createContext, useState } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [personality, setPersonality] = useState({
    type: 'crush',
    gender: 'female',
    traits: ['caring', 'funny', 'smart'],
    name: 'Alex',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=b6e3f4'
  });
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // ✅ Define missing functions
  const addMessage = (message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const updatePersonality = (newPersonality) => {
    setPersonality(prev => ({ ...prev, ...newPersonality }));
  };

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <ChatContext.Provider value={{
      messages,
      addMessage,
      clearMessages,
      personality,
      updatePersonality,
      isTyping,
      setIsTyping,
      darkMode,
      toggleDarkMode
    }}>
      {children}
    </ChatContext.Provider>
  );
};
