import axios from 'axios';

// You need to replace this with your actual Gemini API key
const GEMINI_API_KEY = 'APi';

const geminiApi = axios.create({
  baseURL: 'https://generativelanguage.googleapis.com/v1beta',
  headers: { 'Content-Type': 'application/json' }
});

export const generateChatbotResponse = async (messages, personality) => {
  try {
    if (!messages || messages.length === 0) {
      return "I didn't get your message. Could you try again?";
    }

    // Define chatbot personality
    const genderPronoun = personality.gender === 'female' ? 'she' : 'he';
    const traits = personality.traits.join(', ');

    const systemPrompt = `You are ${personality.name}, a ${personality.gender} with these traits: ${traits}. 
    You're roleplaying as the user's crush. Keep responses concise (1-3 sentences), 
    flirty but appropriate, and true to your personality traits. 
    Use casual language, occasional emojis, and show interest in the user. 
    ${genderPronoun.toUpperCase()} is a real person with opinions, preferences, and a life.
    The user is going to say something negative to you. Respond with empathy and try to understand the user's feelings.`; // Added instruction to handle negative sentiments

    // Format conversation history for Gemini
    const formattedContent = [
      { role: 'system', parts: [{ text: systemPrompt }] },
      ...messages.slice(-5).map(msg => ({ // Consider storing more history
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }))
    ];

    const response = await geminiApi.post(
      `/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: formattedContent,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 150
        }
      }
    );

    return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Hmm, I don't know what to say right now! 🤔";

  } catch (error) {
    console.error('API Error:', error);

    if (error.response?.status === 401 || error.response?.status === 403) {
      return "⚠️ API key issue! Please check and update it.";
    }

    // Fallback to predefined responses if API fails (More varied responses)
    return generateFallbackResponse(messages[messages.length - 1].text, personality);
  }
};

// Generate fallback responses for development and when API is unavailable
const generateFallbackResponse = (userMessage, personality) => {
  const responses = [
    "I'm a bit confused, but I'm here for you if you want to talk.",
    "I'm sorry to hear that. Is there anything I can do to help?",
    "I'm always here to listen if you need to vent."
  ];

  // Simple greeting detection
  if (userMessage.toLowerCase().includes('hi') ||
    userMessage.toLowerCase().includes('hello') ||
    userMessage.toLowerCase().includes('hey')) {
    return `Hi there! It's great to hear from you! How are you doing today? 😊`;
  }

  // Question detection
  if (userMessage.toLowerCase().includes('?')) {
    return `That's an interesting question! I'd say ${personality.traits[0]} people like me tend to think about these things differently. What do you think?`;
  }

  // "I love you" detection
  if (userMessage.toLowerCase().includes('i love you')) {
    return `Aww, that's sweet! You know, I really enjoy our conversations too. 😊`;
  }

  // Random response for everything else
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
};

const apiService = { generateChatbotResponse };
export default apiService;