import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaIdCard,
  FaCertificate,
  FaPassport,
  FaHome,
  FaCar,
  FaHeartbeat,
  FaGraduationCap,
  FaBriefcase,
  FaArrowRight,
  FaSearch,
  FaTimes,
  FaFire,
} from "react-icons/fa";
import Chatbot from "../components/Chatbot";
import "../styles/Services.css";

const Services = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    // Identity & Civil Registration
    {
      id: 1,
      name: "National Identity Card (NIC) application/renewal",
      category: "Identity & Civil Registration",
      description: "Apply for new NIC or renew existing National Identity Card",
      icon: FaIdCard,
      trending: true,
      estimatedTime: "7-14 days",
      requirements: [
        "Birth Certificate",
        "Previous NIC (if renewing)",
        "Passport size photos",
      ],
    },
    {
      id: 2,
      name: "Birth Certificate issuance",
      category: "Identity & Civil Registration",
      description: "Obtain official birth certificate for various purposes",
      icon: FaCertificate,
      trending: false,
      estimatedTime: "3-5 days",
      requirements: ["Hospital records", "Parent's ID", "Witness statements"],
    },
    {
      id: 3,
      name: "Marriage Certificate issuance",
      category: "Identity & Civil Registration",
      description: "Get official marriage certificate for legal purposes",
      icon: FaCertificate,
      trending: true,
      estimatedTime: "5-7 days",
      requirements: [
        "Marriage registration",
        "Witness statements",
        "ID documents",
      ],
    },
    {
      id: 4,
      name: "Death Certificate issuance",
      category: "Identity & Civil Registration",
      description:
        "Obtain death certificate for legal and administrative purposes",
      icon: FaCertificate,
      trending: false,
      estimatedTime: "3-5 days",
      requirements: ["Medical certificate", "Hospital records", "Family ID"],
    },
    {
      id: 5,
      name: "Change of name / personal details update",
      category: "Identity & Civil Registration",
      description: "Update personal information on official documents",
      icon: FaIdCard,
      trending: false,
      estimatedTime: "10-15 days",
      requirements: [
        "Supporting documents",
        "Affidavit",
        "Newspaper publication",
      ],
    },
    {
      id: 6,
      name: "Dual Citizenship services",
      category: "Identity & Civil Registration",
      description: "Apply for dual citizenship status",
      icon: FaPassport,
      trending: true,
      estimatedTime: "30-60 days",
      requirements: [
        "Original citizenship",
        "Residence proof",
        "Character certificate",
      ],
    },

    // Travel & Immigration
    {
      id: 7,
      name: "Passport application / renewal",
      category: "Travel & Immigration",
      description: "Apply for new passport or renew existing passport",
      icon: FaPassport,
      trending: true,
      estimatedTime: "14-21 days",
      requirements: [
        "NIC",
        "Birth Certificate",
        "Passport photos",
        "Application form",
      ],
    },
    {
      id: 8,
      name: "Immigration status inquiries",
      category: "Travel & Immigration",
      description: "Check immigration status and visa information",
      icon: FaPassport,
      trending: false,
      estimatedTime: "1-3 days",
      requirements: ["Passport", "Visa documents", "Application reference"],
    },

    // Land & Housing
    {
      id: 9,
      name: "Land title registration",
      category: "Land & Housing",
      description: "Register land ownership and obtain title deeds",
      icon: FaHome,
      trending: true,
      estimatedTime: "30-45 days",
      requirements: [
        "Survey plans",
        "Deed of transfer",
        "Tax receipts",
        "Surveyor report",
      ],
    },
    {
      id: 10,
      name: "Deeds and ownership transfers",
      category: "Land & Housing",
      description: "Transfer property ownership and update deeds",
      icon: FaHome,
      trending: false,
      estimatedTime: "21-30 days",
      requirements: ["Original deeds", "Transfer documents", "Tax clearance"],
    },
    {
      id: 11,
      name: "Valuation of land and property",
      category: "Land & Housing",
      description: "Get official property valuation for various purposes",
      icon: FaHome,
      trending: false,
      estimatedTime: "7-14 days",
      requirements: ["Property documents", "Survey plans", "Access permission"],
    },
    {
      id: 12,
      name: "Housing scheme applications (e.g., NHDA)",
      category: "Land & Housing",
      description: "Apply for government housing schemes and subsidies",
      icon: FaHome,
      trending: true,
      estimatedTime: "60-90 days",
      requirements: [
        "Income certificate",
        "Family details",
        "Property documents",
      ],
    },
    {
      id: 13,
      name: "Building permits and planning approvals",
      category: "Land & Housing",
      description: "Obtain permits for construction and development",
      icon: FaHome,
      trending: false,
      estimatedTime: "14-30 days",
      requirements: [
        "Architectural plans",
        "Land documents",
        "Environmental clearance",
      ],
    },

    // Transport & Vehicles
    {
      id: 14,
      name: "Driving License application / renewal (DMT)",
      category: "Transport & Vehicles",
      description: "Apply for new driving license or renew existing license",
      icon: FaCar,
      trending: true,
      estimatedTime: "7-14 days",
      requirements: [
        "NIC",
        "Medical certificate",
        "Theory test pass",
        "Practical test",
      ],
    },
    {
      id: 15,
      name: "Vehicle registration (RMV)",
      category: "Transport & Vehicles",
      description: "Register new vehicles with Department of Motor Traffic",
      icon: FaCar,
      trending: false,
      estimatedTime: "3-7 days",
      requirements: [
        "Vehicle documents",
        "Insurance",
        "Tax payment",
        "Import documents",
      ],
    },
    {
      id: 16,
      name: "Vehicle revenue license renewal (online e-Services available)",
      category: "Transport & Vehicles",
      description: "Renew vehicle revenue license online or in person",
      icon: FaCar,
      trending: true,
      estimatedTime: "1-3 days",
      requirements: ["Vehicle registration", "Insurance", "Tax payment"],
    },
    {
      id: 17,
      name: "Number plate services",
      category: "Transport & Vehicles",
      description: "Apply for personalized or replacement number plates",
      icon: FaCar,
      trending: false,
      estimatedTime: "7-14 days",
      requirements: [
        "Vehicle registration",
        "Application form",
        "Payment receipt",
      ],
    },

    // Health & Social Welfare
    {
      id: 18,
      name: "Health & Social Welfare services",
      category: "Health & Social Welfare",
      description: "Access various health and social welfare programs",
      icon: FaHeartbeat,
      trending: true,
      estimatedTime: "Varies",
      requirements: ["Medical reports", "Income certificate", "Family details"],
    },

    // Education & Exams
    {
      id: 19,
      name: "University admissions (UGC)",
      category: "Education & Exams",
      description: "Apply for university admissions through UGC",
      icon: FaGraduationCap,
      trending: true,
      estimatedTime: "30-60 days",
      requirements: [
        "A/L results",
        "Application form",
        "Character certificate",
      ],
    },
    {
      id: 20,
      name: "Result sheets",
      category: "Education & Exams",
      description: "Obtain official result sheets and transcripts",
      icon: FaGraduationCap,
      trending: false,
      estimatedTime: "3-7 days",
      requirements: ["Student ID", "Application form", "Payment receipt"],
    },

    // Employment & Labour
    {
      id: 21,
      name: "Pension and gratuity services",
      category: "Employment & Labour",
      description: "Apply for pension and gratuity benefits",
      icon: FaBriefcase,
      trending: false,
      estimatedTime: "30-45 days",
      requirements: ["Service record", "Retirement documents", "Bank details"],
    },
    {
      id: 22,
      name: "EPF/ETF services (Employee Provident Fund / Trust Fund)",
      category: "Employment & Labour",
      description: "Manage EPF and ETF contributions and withdrawals",
      icon: FaBriefcase,
      trending: true,
      estimatedTime: "7-14 days",
      requirements: ["Employment record", "Bank details", "Application form"],
    },
  ];

  const categories = [
    "all",
    t("servicesPage.categories.identity"),
    t("servicesPage.categories.travel"),
    t("servicesPage.categories.land"),
    t("servicesPage.categories.transport"),
    t("servicesPage.categories.health"),
    t("servicesPage.categories.education"),
    t("servicesPage.categories.employment"),
  ];

  const filteredServices = services.filter((service) => {
    // Category filtering only
    return selectedCategory === "all" || service.category === selectedCategory;
  });

  const clearFilters = () => {
    setSelectedCategory("all");
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Identity & Civil Registration":
        return FaIdCard;
      case "Travel & Immigration":
        return FaPassport;
      case "Land & Housing":
        return FaHome;
      case "Transport & Vehicles":
        return FaCar;
      case "Health & Social Welfare":
        return FaHeartbeat;
      case "Education & Exams":
        return FaGraduationCap;
      case "Employment & Labour":
        return FaBriefcase;
      default:
        return FaIdCard;
    }
  };

  return (
    <div className="services-page">
      {/* All Services Section */}
      <div className="all-services-section">
        <div className="container">
          <div className="section-header">
            <div className="header-content">
              <div className="header-text">
                <h2>{t("servicesPage.title")}</h2>
                <p>
                  {t("servicesPage.subtitle")}
                  {selectedCategory !== "all" && (
                    <span className="results-count">
                      {" "}
                      - {filteredServices.length}{" "}
                      {t("servicesPage.resultsCount")} {selectedCategory}
                    </span>
                  )}
                </p>
              </div>
              <div className="category-dropdown-container">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="category-dropdown"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all"
                        ? t("servicesPage.allCategories")
                        : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="services-grid">
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => {
                return (
                  <Link
                    key={service.id}
                    to={`/services/${service.id}`}
                    className="service-card-link"
                  >
                    <div className="service-card">
                      <div className="card-content">
                        <div className="service-header">
                          <h3>{service.name}</h3>
                          {service.trending && (
                            <span className="trending-label">
                              {t("servicesPage.trending")}
                            </span>
                          )}
                        </div>
                        <p>{service.description}</p>
                        <div className="service-meta">
                          <span className="time">{service.estimatedTime}</span>
                        </div>
                        <div className="service-link">
                          {t("servicesPage.learnMore")} <FaArrowRight />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="no-results">
                <div className="no-results-content">
                  <FaSearch className="no-results-icon" />
                  <h3>{t("servicesPage.noResults")}</h3>
                  <p>{t("servicesPage.noResultsDesc")}</p>
                  <button onClick={clearFilters} className="clear-filters-btn">
                    <FaTimes />
                    {t("servicesPage.clearFilters")}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Chatbot />
    </div>
  );
};

export default Services;
