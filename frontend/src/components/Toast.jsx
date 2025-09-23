import React, { useState, useEffect } from "react";
import {
  FaCheckCircle,
  FaTimes,
  FaExclamationCircle,
  FaInfoCircle,
} from "react-icons/fa";
import "./Toast.css";

const Toast = ({
  message,
  type = "success",
  duration = 3000,
  onClose,
  position = "top-right",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Show toast after a brief delay
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Auto-hide toast after duration
    const hideTimer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) {
        onClose();
      }
    }, 300);
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <FaCheckCircle className="toast-icon success-icon" />;
      case "error":
        return <FaExclamationCircle className="toast-icon error-icon" />;
      case "info":
        return <FaInfoCircle className="toast-icon info-icon" />;
      default:
        return <FaCheckCircle className="toast-icon success-icon" />;
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`toast toast-${type} toast-${position} ${
        isExiting ? "toast-exiting" : ""
      }`}
    >
      <div className="toast-content">
        {getIcon()}
        <span className="toast-message">{message}</span>
        <button
          className="toast-close"
          onClick={handleClose}
          aria-label="Close notification"
        >
          <FaTimes />
        </button>
      </div>
      <div className="toast-progress">
        <div className="toast-progress-bar"></div>
      </div>
    </div>
  );
};

export default Toast;
