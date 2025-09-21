import React from "react";
import {
  FaUsers,
  FaRocket,
  FaShieldAlt,
  FaGlobe,
  FaHeart,
  FaLightbulb,
  FaHandshake,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Chatbot from "../components/Chatbot";
import "../styles/About.css";
import "../styles/Shared.css";

const About = () => {
  const { t } = useTranslation();

  const values = [
    {
      icon: FaShieldAlt,
      title: t("about.values.transparency.title"),
      description: t("about.values.transparency.description"),
    },
    {
      icon: FaUsers,
      title: t("about.values.accessibility.title"),
      description: t("about.values.accessibility.description"),
    },
    {
      icon: FaRocket,
      title: t("about.values.innovation.title"),
      description: t("about.values.innovation.description"),
    },
    {
      icon: FaHeart,
      title: t("about.values.service.title"),
      description: t("about.values.service.description"),
    },
  ];

  const stats = [
    {
      icon: FaUsers,
      number: "1M+",
      label: t("about.stats.users"),
    },
    {
      icon: FaCheckCircle,
      number: "50+",
      label: t("about.stats.services"),
    },
    {
      icon: FaClock,
      number: "24/7",
      label: t("about.stats.support"),
    },
    {
      icon: FaGlobe,
      number: "3",
      label: t("about.stats.languages"),
    },
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">{t("about.hero.title")}</h1>
            <p className="hero-subtitle">{t("about.hero.subtitle")}</p>
            <div className="hero-stats">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="stat-item">
                    <div className="stat-icon">
                      <IconComponent />
                    </div>
                    <div className="stat-number">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>{t("about.mission.title")}</h2>
              <p className="mission-description">
                {t("about.mission.description")}
              </p>
              <div className="mission-points">
                <div className="mission-point">
                  <FaLightbulb className="point-icon" />
                  <div className="point-content">
                    <h3>{t("about.mission.point1.title")}</h3>
                    <p>{t("about.mission.point1.description")}</p>
                  </div>
                </div>
                <div className="mission-point">
                  <FaHandshake className="point-icon" />
                  <div className="point-content">
                    <h3>{t("about.mission.point2.title")}</h3>
                    <p>{t("about.mission.point2.description")}</p>
                  </div>
                </div>
                <div className="mission-point">
                  <FaGlobe className="point-icon" />
                  <div className="point-content">
                    <h3>{t("about.mission.point3.title")}</h3>
                    <p>{t("about.mission.point3.description")}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mission-visual">
              <div className="mission-image">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Government Services Innovation"
                  className="mission-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <h2>{t("about.values.title")}</h2>
            <p className="section-subtitle">{t("about.values.subtitle")}</p>
          </div>
          <div className="values-grid">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="value-card">
                  <div className="value-icon">
                    <IconComponent />
                  </div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>{t("about.cta.title")}</h2>
            <p>{t("about.cta.description")}</p>
            <div className="cta-buttons">
              <a href="/contact" className="btn btn-primary">
                {t("about.cta.contactButton")}
              </a>
              <a href="/services" className="btn btn-outline">
                {t("about.cta.servicesButton")}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Chatbot />
    </div>
  );
};

export default About;
