import React, { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUser,
  FaPaperPlane,
  FaClock,
  FaBuilding,
  FaHeadset,
  FaRocket,
  FaShieldAlt,
  FaUsers,
  FaGlobe,
  FaStar,
} from "react-icons/fa";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineClock,
  HiOutlineUsers,
  HiOutlineLightningBolt,
  HiOutlineStar,
  HiOutlineClock as HiClock,
} from "react-icons/hi";
import { useTranslation } from "react-i18next";
import Chatbot from "../components/Chatbot";
import "../styles/Contact.css";
import "../styles/Shared.css";

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [animatedCounters, setAnimatedCounters] = useState({
    users: 0,
    services: 0,
    satisfaction: 0,
    responseTime: 0,
  });
  const [isVisible, setIsVisible] = useState(false);

  // Static contact information
  const contactInfo = {
    email: "info@talkgov.lk",
    phone: "+94 11 2 345 678",
    address: "123 Government Complex, Colombo 01, Sri Lanka",
    hours: "Monday - Friday: 8:00 AM - 5:00 PM",
  };

  // Modern stats data
  const statsData = {
    users: 50000,
    services: 150,
    satisfaction: 98,
    responseTime: 2,
  };

  // Animate counters when component mounts
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    const element = document.querySelector(".contact-info-section");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounters = () => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    Object.keys(statsData).forEach((key) => {
      const targetValue = statsData[key];
      const increment = targetValue / steps;
      let currentValue = 0;

      const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
          currentValue = targetValue;
          clearInterval(timer);
        }

        setAnimatedCounters((prev) => ({
          ...prev,
          [key]: Math.floor(currentValue),
        }));
      }, stepDuration);
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
    // Clear success message when user starts typing
    if (success) {
      setSuccess(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t("contact.nameRequired");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("contact.emailRequired");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("contact.emailInvalid");
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t("contact.subjectRequired");
    }

    if (!formData.message.trim()) {
      newErrors.message = t("contact.messageRequired");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccess(false);

    // Validate form before submission
    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      // Simulate API call - replace with actual endpoint
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setErrors({ general: t("contact.generalError") });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Main Content */}
      <div className="contact-main">
        <div className="container">
          <div className="contact-layout">
            {/* Contact Information */}
            <div className="contact-info-section">
              <div className="contact-info-card">
                <div className="contact-header">
                  <h2>{t("contact.getInTouch")}</h2>
                  <p>{t("contact.getInTouchSubtitle")}</p>
                </div>

                {/* Modern Stats Section */}
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-icon">
                      <HiOutlineUsers />
                    </div>
                    <div className="stat-content">
                      <div className="stat-number">
                        {animatedCounters.users.toLocaleString()}+
                      </div>
                      <div className="stat-label">
                        {t("contact.activeUsers")}
                      </div>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon">
                      <HiOutlineLightningBolt />
                    </div>
                    <div className="stat-content">
                      <div className="stat-number">
                        {animatedCounters.services}+
                      </div>
                      <div className="stat-label">
                        {t("contact.servicesAvailable")}
                      </div>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon">
                      <HiOutlineStar />
                    </div>
                    <div className="stat-content">
                      <div className="stat-number">
                        {animatedCounters.satisfaction}%
                      </div>
                      <div className="stat-label">
                        {t("contact.satisfactionRate")}
                      </div>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon">
                      <HiOutlineClock />
                    </div>
                    <div className="stat-content">
                      <div className="stat-number">
                        {animatedCounters.responseTime}h
                      </div>
                      <div className="stat-label">
                        {t("contact.avgResponseTime")}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="contact-details">
                  <div className="contact-item modern-contact-item">
                    <div className="contact-icon">
                      <HiOutlineMail />
                    </div>
                    <div className="contact-content">
                      <h3>{t("contact.email")}</h3>
                      <p>{contactInfo.email}</p>
                      <div className="contact-action">
                        <a
                          href={`mailto:${contactInfo.email}`}
                          className="action-link"
                        >
                          {t("contact.sendEmail")}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="contact-item modern-contact-item">
                    <div className="contact-icon">
                      <HiOutlinePhone />
                    </div>
                    <div className="contact-content">
                      <h3>{t("contact.phone")}</h3>
                      <p>{contactInfo.phone}</p>
                      <div className="contact-action">
                        <a
                          href={`tel:${contactInfo.phone}`}
                          className="action-link"
                        >
                          {t("contact.callNow")}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="contact-item modern-contact-item">
                    <div className="contact-icon">
                      <HiOutlineLocationMarker />
                    </div>
                    <div className="contact-content">
                      <h3>{t("contact.address")}</h3>
                      <p>{contactInfo.address}</p>
                      <div className="contact-action">
                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent(
                            contactInfo.address
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="action-link"
                        >
                          {t("contact.viewOnMap")}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="contact-item modern-contact-item">
                    <div className="contact-icon">
                      <HiOutlineClock />
                    </div>
                    <div className="contact-content">
                      <h3>{t("contact.businessHours")}</h3>
                      <p>{contactInfo.hours}</p>
                      <div className="contact-action">
                        <span className="status-indicator online">
                          {t("contact.currentlyOnline")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-section">
              <div className="contact-form-card">
                <h2>{t("contact.sendMessage")}</h2>
                <p>{t("contact.sendMessageSubtitle")}</p>

                {success ? (
                  <div className="success-message">
                    <div className="success-icon">✓</div>
                    <h3>{t("contact.successTitle")}</h3>
                    <p>{t("contact.successMessage")}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {errors.general && (
                      <div className="error-message">{errors.general}</div>
                    )}

                    <div className="form-group">
                      <label htmlFor="name">
                        <FaUser className="input-icon" />
                        {t("contact.fullName")}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t("contact.fullName")}
                        className={errors.name ? "error-input" : ""}
                        required
                      />
                      {errors.name && (
                        <span className="error">{errors.name}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">
                        <FaEnvelope className="input-icon" />
                        {t("contact.emailAddress")}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t("contact.emailAddress")}
                        className={errors.email ? "error-input" : ""}
                        required
                      />
                      {errors.email && (
                        <span className="error">{errors.email}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="subject">
                        <FaPaperPlane className="input-icon" />
                        {t("contact.subject")}
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder={t("contact.subject")}
                        className={errors.subject ? "error-input" : ""}
                        required
                      />
                      {errors.subject && (
                        <span className="error">{errors.subject}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="message">
                        <FaPaperPlane className="input-icon" />
                        {t("contact.message")}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows="6"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={t("contact.message")}
                        className={errors.message ? "error-input" : ""}
                        required
                      ></textarea>
                      {errors.message && (
                        <span className="error">{errors.message}</span>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-primary"
                    >
                      {loading
                        ? t("contact.sendingButton")
                        : t("contact.sendButton")}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Chatbot />
    </div>
  );
};

export default Contact;
