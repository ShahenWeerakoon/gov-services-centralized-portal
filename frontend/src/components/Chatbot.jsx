import React, { useState } from "react";
import { FaRobot, FaMinus, FaPaperPlane } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Chatbot = () => {
  const { t } = useTranslation();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: t("chatbot.welcomeMessage"),
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: chatInput,
      sender: "user",
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        t("chatbot.response1"),
        t("chatbot.response2"),
        t("chatbot.response3"),
        t("chatbot.response4"),
      ];
      const randomResponse =
        botResponses[Math.floor(Math.random() * botResponses.length)];

      const botMessage = {
        id: Date.now() + 1,
        text: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setChatMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={`chatbot-widget ${isChatbotOpen ? "open" : ""}`}>
      <div
        className="chatbot-header"
        onClick={() => setIsChatbotOpen(!isChatbotOpen)}
      >
        {isChatbotOpen ? (
          <>
            <div className="chatbot-header-content">
              <div className="chatbot-avatar">
                <FaRobot />
              </div>
              <div className="chatbot-info">
                <h4>{t("chatbot.title")}</h4>
                <span className="chatbot-status">{t("chatbot.status")}</span>
              </div>
            </div>
            <div className="chatbot-toggle">
              <FaMinus />
            </div>
          </>
        ) : (
          <div className="chatbot-icon-only">
            <FaRobot />
          </div>
        )}
      </div>

      {isChatbotOpen && (
        <div className="chatbot-body">
          <div className="chatbot-messages">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`chatbot-message ${message.sender}`}
              >
                {message.sender === "bot" && (
                  <div className="message-avatar">
                    <FaRobot />
                  </div>
                )}
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

            {isTyping && (
              <div className="chatbot-message bot">
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
          </div>

          <form onSubmit={handleChatSubmit} className="chatbot-input-form">
            <div className="chatbot-input-wrapper">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={t("chatbot.inputPlaceholder")}
                className="chatbot-input"
                autoComplete="off"
              />
              <button type="submit" className="chatbot-send">
                <FaPaperPlane />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
