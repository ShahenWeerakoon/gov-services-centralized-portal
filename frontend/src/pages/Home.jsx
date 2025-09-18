import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaPassport,
  FaIdCard,
  FaHome,
  FaCreditCard,
  FaBuilding,
  FaRobot,
  FaUsers,
  FaClipboardCheck,
  FaSearch,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import heroVideo from "../assets/hero.mp4";
import "../styles/Home.css";
import "../styles/Shared.css";

const Home = ({ user }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality
    console.log("Searching for:", searchQuery);
  };

  const popularServices = [
    {
      name: t("home.passport"),
      description: t("home.passportDesc"),
      icon: FaPassport,
      color: "blue",
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      name: t("home.nic"),
      description: t("home.nicDesc"),
      icon: FaIdCard,
      color: "green",
      image:
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      name: t("home.drivingLicense"),
      description: t("home.drivingLicenseDesc"),
      icon: FaCreditCard,
      color: "yellow",
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      name: t("home.birthCertificate"),
      description: t("home.birthCertificateDesc"),
      icon: FaHome,
      color: "purple",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
  ];

  const helpFeatures = [
    {
      title: t("home.allServices"),
      icon: FaBuilding,
      description: t("home.allServicesDesc"),
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      color: "blue",
    },
    {
      title: t("home.askAssistant"),
      icon: FaRobot,
      description: t("home.askAssistantDesc"),
      image:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      color: "green",
    },
    {
      title: t("home.getHumanHelp"),
      icon: FaUsers,
      description: t("home.getHumanHelpDesc"),
      image:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      color: "purple",
    },
    {
      title: t("home.checkDocuments"),
      icon: FaClipboardCheck,
      description: t("home.checkDocumentsDesc"),
      image:
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      color: "orange",
    },
  ];

  return (
    <div className="talkgov-home">
      {/* Hero Banner */}
      <div className="hero-banner">
        <video className="hero-video" autoPlay muted loop playsInline>
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-container">
          <div className="hero-content">
            <h1>{t("home.heroTitle")}</h1>
            <p>{t("home.heroSubtitle")}</p>
            <form onSubmit={handleSearch} className="hero-search-form">
              <div className="hero-search-wrapper">
                <FaSearch className="hero-search-icon" />
                <input
                  type="text"
                  placeholder={t("home.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="hero-search-input"
                />
                <button type="submit" className="hero-search-button">
                  {t("home.searchButton")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Popular Services */}
      <div className="popular-services-section">
        <div className="container">
          <div className="section-header">
            <h2>{t("home.popularServices")}</h2>
            <p className="section-subtitle">
              {t("home.popularServicesSubtitle")}
            </p>
          </div>
          <div className="services-grid">
            {popularServices.map((service, index) => {
              const IconComponent = service.icon;
              const serviceId =
                service.name === t("home.passport")
                  ? "passport"
                  : service.name === t("home.nic")
                  ? "nic"
                  : service.name === t("home.drivingLicense")
                  ? "driving-license"
                  : service.name === t("home.birthCertificate")
                  ? "birth-certificate"
                  : "passport";
              return (
                <Link
                  key={index}
                  to={`/services/${serviceId}`}
                  className={`service-card ${service.color}`}
                >
                  <div className="service-image">
                    <img src={service.image} alt={service.name} />
                    <div className="service-overlay">
                      <div className="service-icon">
                        <IconComponent />
                      </div>
                    </div>
                  </div>
                  <div className="service-content">
                    <div className="service-name">{service.name}</div>
                    <div className="service-description">
                      {service.description}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* How TalkGov Helps You */}
      <div className="help-section">
        <div className="container">
          <div className="section-header">
            <h2>{t("home.howTalkGovHelps")}</h2>
            <p className="section-subtitle">
              {t("home.howTalkGovHelpsSubtitle")}
            </p>
          </div>
          <div className="help-grid">
            {helpFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className={`help-card ${feature.color}`}>
                  <div className="help-image">
                    <img src={feature.image} alt={feature.title} />
                    <div className="help-overlay">
                      <div className="help-icon">
                        <IconComponent />
                      </div>
                    </div>
                  </div>
                  <div className="help-content">
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />

      <Chatbot />
    </div>
  );
};

export default Home;
