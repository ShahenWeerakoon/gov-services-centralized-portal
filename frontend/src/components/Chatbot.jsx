import React, { useState, useEffect, useRef } from "react";
import {
  FaRobot,
  FaTimes,
  FaPaperPlane,
  FaUser,
  FaSpinner,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { API_CONFIG, GOVERNMENT_SERVICES } from "../config/api";
import "../styles/Chatbot.css";

const Chatbot = () => {
  const { t } = useTranslation();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [autoCloseTimer, setAutoCloseTimer] = useState(null);
  const messagesEndRef = useRef(null);
  const chatbotRef = useRef(null);

  // Test function to verify API connection
  const testAPIConnection = async () => {
    try {
      console.log("Testing API connection...");
      const response = await fetch(API_CONFIG.COHERE_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_CONFIG.COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "command",
          prompt: "Hello, this is a test message.",
          max_tokens: 50,
          temperature: 0.7,
        }),
      });

      console.log("Test API Response status:", response.status);
      if (response.ok) {
        const data = await response.json();
        console.log("Test API Response:", data);
        return true;
      } else {
        const errorText = await response.text();
        console.error("Test API Error:", errorText);
        return false;
      }
    } catch (error) {
      console.error("Test API Connection Error:", error);
      return false;
    }
  };

  // Function to call Cohere API
  const callCohereAPI = async (userMessage) => {
    try {
      console.log("Calling Cohere API with message:", userMessage);

      const response = await fetch(API_CONFIG.COHERE_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_CONFIG.COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "command",
          prompt: `You are TalkGOV Assistant, a friendly guide for Sri Lankan government services. Make responses clear and easy to understand.

Guidelines:
- Use simple, clear language
- Be friendly and helpful
- Use emojis for visual appeal
- Structure information in clear points
- Break down processes into numbered steps
- Always mention costs, timelines, and locations
- Use bullet points (•) for lists
- Use bold text (**text**) for headings

Format responses like this:
📋 **Section Title:**
• Point 1
• Point 2

🚀 **Process:**
1. Step 1
2. Step 2

User question: ${userMessage}

Provide a clear, structured response about Sri Lankan government services using bullet points and clear sections.`,
          max_tokens: 500,
          temperature: 0.7,
          k: 0,
          p: 0.75,
          frequency_penalty: 0,
          presence_penalty: 0,
          stop_sequences: [],
          return_likelihoods: "NONE",
        }),
      });

      console.log("API Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const data = await response.json();
      console.log("API Response data:", data);

      if (data.generations && data.generations[0] && data.generations[0].text) {
        return data.generations[0].text.trim();
      } else {
        console.error("Unexpected API response format:", data);
        return null;
      }
    } catch (error) {
      console.error("Cohere API error:", error);
      return null;
    }
  };

  // Function to find relevant government service (more specific matching)
  const findGovernmentService = (userMessage) => {
    const message = userMessage.toLowerCase();

    // More specific matching to avoid false positives
    for (const [key, service] of Object.entries(GOVERNMENT_SERVICES)) {
      // Check for exact service name matches
      if (
        message.includes(key) ||
        message.includes(service.title.toLowerCase())
      ) {
        return service;
      }

      // Check for specific keywords that clearly indicate a service request
      if (
        (message.includes("nic") &&
          (message.includes("card") || message.includes("identity"))) ||
        (message.includes("passport") &&
          (message.includes("apply") ||
            message.includes("get") ||
            message.includes("need"))) ||
        (message.includes("driving") && message.includes("license")) ||
        (message.includes("birth") && message.includes("certificate")) ||
        (message.includes("marriage") && message.includes("certificate")) ||
        (message.includes("business") && message.includes("registration")) ||
        (message.includes("land") && message.includes("registration"))
      ) {
        return service;
      }
    }
    return null;
  };

  // Function to format government service response
  const formatServiceResponse = (service) => {
    return `🎯 **${service.title}**

📝 **What is it?**
${service.description}

📋 **Required Documents:**
${service.requirements.map((req) => `• ${req}`).join("\n")}

🚀 **Application Process:**
${service.process.map((step, index) => `${index + 1}. ${step}`).join("\n")}

💰 **Fees:** ${service.fees}
⏰ **Validity:** ${service.validity}
📍 **Apply at:** ${service.offices}

💡 **Need more details?** Ask me about any specific step or requirement!`;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isTyping]);

  // Test API connection on component mount
  useEffect(() => {
    testAPIConnection();
  }, []);

  // Initialize welcome message when component mounts or language changes
  useEffect(() => {
    if (chatMessages.length === 0) {
      setChatMessages([
        {
          id: 1,
          text: '👋 Hello! I\'m TalkGOV Assistant, your friendly guide to Sri Lankan government services!\n\n📋 **I can help you with:**\n• National Identity Card (NIC)\n• Passport applications\n• Driving License\n• Birth Certificate\n• Marriage Certificate\n• Business Registration\n• Land Registration\n\n💡 **Ask me like this:**\n• "How do I get a passport?"\n• "What documents do I need for NIC?"\n• "Tell me about driving license process"\n\n🎯 **I will provide:**\n• Required documents list\n• Step-by-step process\n• Fees and costs\n• Where to apply\n• Validity periods\n\nWhat government service do you need help with?',
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    }
  }, [t, chatMessages.length]);

  // Auto-close functionality
  useEffect(() => {
    if (isChatbotOpen) {
      // Set auto-close timer for 30 seconds of inactivity
      const timer = setTimeout(() => {
        setIsChatbotOpen(false);
      }, 30000);
      setAutoCloseTimer(timer);
    } else {
      // Clear timer when chatbot is closed
      if (autoCloseTimer) {
        clearTimeout(autoCloseTimer);
        setAutoCloseTimer(null);
      }
    }

    return () => {
      if (autoCloseTimer) {
        clearTimeout(autoCloseTimer);
      }
    };
  }, [isChatbotOpen, autoCloseTimer]);

  // Click outside detection
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
        setIsChatbotOpen(false);
      }
    };

    if (isChatbotOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isChatbotOpen]);

  // Escape key functionality
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && isChatbotOpen) {
        setIsChatbotOpen(false);
      }
    };

    if (isChatbotOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isChatbotOpen]);

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    // Reset auto-close timer on user interaction
    if (autoCloseTimer) {
      clearTimeout(autoCloseTimer);
    }
    const newTimer = setTimeout(() => {
      setIsChatbotOpen(false);
    }, 30000);
    setAutoCloseTimer(newTimer);

    const userMessage = {
      id: Date.now(),
      text: chatInput,
      sender: "user",
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    const currentInput = chatInput;
    setChatInput("");
    setIsTyping(true);

    try {
      // First, check if user is asking about a specific government service
      const matchedService = findGovernmentService(currentInput);
      console.log("Matched service:", matchedService);

      let botResponse;

      if (matchedService) {
        // Use our knowledge base for specific government services
        console.log("Using knowledge base for:", matchedService.title);
        botResponse = formatServiceResponse(matchedService);
      } else {
        // Use Cohere API for general questions
        console.log("Using Cohere API for general question");
        botResponse = await callCohereAPI(currentInput);

        // Fallback response if Cohere API fails
        if (!botResponse) {
          console.log("Cohere API failed, using fallback response");
          botResponse = `🤖 Hi! I'm TalkGOV Assistant, your Sri Lankan government services guide! 

📋 **Available Services:**
• National Identity Card (NIC)
• Passport applications  
• Driving License
• Birth Certificate
• Marriage Certificate
• Business Registration
• Land Registration

💡 **How to ask:**
• "How do I get a passport?"
• "What do I need for NIC?"
• "Tell me about driving license"

🎯 **What you'll get:**
• Complete document list
• Step-by-step process
• Exact fees and costs
• Office locations
• Validity information

What government service do you need help with?`;
        } else {
          console.log("Cohere API response received:", botResponse);
        }
      }

      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setChatMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error processing chat:", error);

      const errorMessage = {
        id: Date.now() + 1,
        text: '😅 Oops! I\'m having a small technical hiccup right now. But don\'t worry - I\'m still here to help!\n\n📋 **I can help you with:**\n• NIC (National Identity Card)\n• Passport applications\n• Driving License\n• Birth Certificate\n• Marriage Certificate\n• Business Registration\n• Land Registration\n\n💡 **Ask me like this:**\n• "How do I get a passport?"\n• "What documents do I need for NIC?"\n• "Tell me about driving license process"\n\n🎯 **I\'ll provide:**\n• Required documents\n• Step-by-step process\n• Fees and costs\n• Office locations\n\nWhat would you like to know about?',
        sender: "bot",
        timestamp: new Date(),
      };

      setChatMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleChatSubmit(e);
    }
  };

  return (
    <div
      className={`modern-chatbot ${isChatbotOpen ? "open" : ""}`}
      ref={chatbotRef}
    >
      {/* Chatbot Toggle Button */}
      <div
        className="chatbot-toggle-btn"
        onClick={() => setIsChatbotOpen(!isChatbotOpen)}
        role="button"
        tabIndex={0}
        aria-label={isChatbotOpen ? "Close chatbot" : "Open chatbot"}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsChatbotOpen(!isChatbotOpen);
          }
        }}
      >
        {isChatbotOpen ? <FaTimes /> : <FaRobot />}
      </div>

      {/* Chatbot Window */}
      {isChatbotOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-avatar">
              <FaRobot />
            </div>
            <div className="chatbot-info">
              <h3>TalkGOV Assistant</h3>
              <span className="status-indicator">
                <span className="status-dot"></span>
                Online
              </span>
            </div>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {chatMessages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                <div className="message-avatar">
                  {message.sender === "bot" ? <FaRobot /> : <FaUser />}
                </div>
                <div className="message-content">
                  <div className="message-bubble">
                    <p>{message.text}</p>
                    <span className="message-time">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="message bot typing">
                <div className="message-avatar">
                  <FaRobot />
                </div>
                <div className="message-content">
                  <div className="message-bubble typing">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleChatSubmit} className="chatbot-input-form">
            <div className="input-wrapper">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me about government services..."
                className="chatbot-input"
                autoComplete="off"
                disabled={isTyping}
              />
              <button
                type="submit"
                className="send-button"
                disabled={!chatInput.trim() || isTyping}
              >
                {isTyping ? (
                  <FaSpinner className="spinning" />
                ) : (
                  <FaPaperPlane />
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
