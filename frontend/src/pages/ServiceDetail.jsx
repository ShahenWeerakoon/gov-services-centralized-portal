import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaArrowLeft,
  FaFileAlt,
  FaChevronUp,
  FaChevronDown,
  FaArrowRight,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaCheckCircle,
  FaIdCard,
  FaCertificate,
  FaPassport,
  FaHome,
  FaCar,
  FaHeartbeat,
  FaGraduationCap,
  FaBriefcase,
  FaFire,
  FaMapMarkerAlt,
  FaBuilding,
} from "react-icons/fa";
import Chatbot from "../components/Chatbot";
import "../styles/ServiceDetail.css";
import "../styles/Shared.css";
import axios from "axios";

// const ServiceDetail = () => {
const ServiceDetail = ({ user }) => {
  const { t } = useTranslation();
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [expandedStep, setExpandedStep] = useState(0);

  // Comprehensive service data for all services
  const serviceData = {
    1: {
      id: 1,
      title: "National Identity Card (NIC) application/renewal",
      description: "Apply for new NIC or renew existing National Identity Card",
      icon: FaIdCard,
      category: "Identity & Civil Registration",
      processingTime: "7-14 days",
      fee: "LKR 500",
      trending: true,
      requirements: [
        "Birth Certificate",
        "Previous NIC (if renewing)",
        "Passport size photos (2 copies)",
        "Completed application form",
        "Proof of address",
      ],
      steps: [
        {
          id: 1,
          title: "Check Eligibility",
          description: "Verify you meet the requirements for NIC application",
          details:
            "You must be a Sri Lankan citizen aged 16 or above. For renewal, your current NIC should be expired or expiring within 6 months.",
        },
        {
          id: 2,
          title: "Gather Required Documents",
          description: "Collect all necessary documents",
          details:
            "Prepare your birth certificate, previous NIC (if applicable), 2 passport-size photos, proof of address, and any supporting documents.",
        },
        {
          id: 3,
          title: "Complete Application Form",
          description: "Fill out the NIC application form",
          details:
            "Download and complete the application form from the Department of Registration of Persons website or obtain it from the office.",
        },
        {
          id: 4,
          title: "Submit Application",
          description: "Submit your application and pay the fee",
          details:
            "Visit the nearest Department of Registration of Persons office with your documents and completed form. Pay the application fee.",
        },
        {
          id: 5,
          title: "Biometric Data Collection",
          description: "Provide fingerprints and photograph",
          details:
            "Your fingerprints will be captured digitally and a new photograph will be taken at the office.",
        },
      ],
      relatedServices: [
        { id: 2, name: "Birth Certificate issuance" },
        { id: 7, name: "Passport application / renewal" },
        { id: 5, name: "Change of name / personal details update" },
      ],
      offices: [
        {
          name: "Department of Registration of Persons - Colombo",
          address: "No. 123, Main Street, Colombo 01",
          phone: "011-2345678",
        },
        {
          name: "Department of Registration of Persons - Kandy",
          address: "No. 456, Temple Road, Kandy",
          phone: "081-2345678",
        },
      ],
    },
    2: {
      id: 2,
      title: "Birth Certificate issuance",
      description: "Obtain official birth certificate for various purposes",
      icon: FaCertificate,
      category: "Identity & Civil Registration",
      processingTime: "3-5 days",
      fee: "LKR 200",
      trending: false,
      requirements: [
        "Hospital records",
        "Parent's ID documents",
        "Witness statements",
        "Completed application form",
        "Proof of birth",
      ],
      steps: [
        {
          id: 1,
          title: "Verify Birth Records",
          description: "Check if birth was registered at the hospital",
          details:
            "Ensure your birth was properly recorded at the hospital where you were born. Obtain hospital birth records if available.",
        },
        {
          id: 2,
          title: "Gather Supporting Documents",
          description: "Collect required documents",
          details:
            "Prepare hospital records, parent's ID documents, witness statements, and any other supporting evidence of birth.",
        },
        {
          id: 3,
          title: "Complete Application",
          description: "Fill out the birth certificate application",
          details:
            "Complete the official birth certificate application form with accurate information about the birth.",
        },
        {
          id: 4,
          title: "Submit and Pay",
          description: "Submit application with required fee",
          details:
            "Submit your application to the Registrar of Births and Deaths office along with the processing fee.",
        },
      ],
      relatedServices: [
        { id: 1, name: "National Identity Card (NIC) application/renewal" },
        { id: 7, name: "Passport application / renewal" },
        { id: 3, name: "Marriage Certificate issuance" },
      ],
      offices: [
        {
          name: "Registrar of Births and Deaths - Colombo",
          address: "No. 789, Government Building, Colombo 01",
          phone: "011-3456789",
        },
      ],
    },
    7: {
      id: 7,
      title: "Passport application / renewal",
      description: "Apply for new passport or renew existing passport",
      icon: FaPassport,
      category: "Travel & Immigration",
      processingTime: "14-21 days",
      fee: "LKR 5,000 - 15,000",
      trending: true,
      requirements: [
        "NIC",
        "Birth Certificate",
        "Passport photos (4 copies)",
        "Application form",
        "Previous passport (if renewing)",
      ],
      steps: [
        {
          id: 1,
          title: "Check Passport Validity",
          description: "Determine if you need a new passport or renewal",
          details:
            "For renewal, your passport should be expired or expiring within 6 months. For new passport, ensure you have all required documents.",
        },
        {
          id: 2,
          title: "Prepare Documents",
          description: "Gather all required documents",
          details:
            "Collect your NIC, birth certificate, 4 passport-size photos, previous passport (if applicable), and any other required documents.",
        },
        {
          id: 3,
          title: "Complete Application",
          description: "Fill out the passport application form",
          details:
            "Complete the passport application form online or obtain it from the Department of Immigration and Emigration office.",
        },
        {
          id: 4,
          title: "Submit Application",
          description: "Submit application and pay fees",
          details:
            "Submit your application at the Department of Immigration and Emigration office along with all documents and required fees.",
        },
        {
          id: 5,
          title: "Biometric Collection",
          description: "Provide biometric data",
          details:
            "Your fingerprints and photograph will be captured digitally at the office.",
        },
      ],
      relatedServices: [
        { id: 1, name: "National Identity Card (NIC) application/renewal" },
        { id: 2, name: "Birth Certificate issuance" },
        { id: 8, name: "Immigration status inquiries" },
      ],
      offices: [
        {
          name: "Department of Immigration and Emigration - Colombo",
          address: "No. 321, Immigration Building, Colombo 01",
          phone: "011-4567890",
        },
      ],
    },
    14: {
      id: 14,
      title: "Driving License application / renewal (DMT)",
      description: "Apply for new driving license or renew existing license",
      icon: FaCar,
      category: "Transport & Vehicles",
      processingTime: "7-14 days",
      fee: "LKR 2,500",
      trending: true,
      requirements: [
        "NIC",
        "Medical certificate",
        "Theory test pass certificate",
        "Practical test pass certificate",
        "Eye test certificate",
      ],
      steps: [
        {
          id: 1,
          title: "Medical Examination",
          description: "Complete medical examination",
          details:
            "Visit an authorized medical practitioner for a comprehensive medical examination including eye test and general health check.",
        },
        {
          id: 2,
          title: "Theory Test",
          description: "Pass the written theory test",
          details:
            "Study the traffic rules and regulations, then take the theory test at an authorized testing center.",
        },
        {
          id: 3,
          title: "Practical Test",
          description: "Pass the practical driving test",
          details:
            "Complete the practical driving test with a qualified examiner to demonstrate your driving skills.",
        },
        {
          id: 4,
          title: "Submit Application",
          description: "Submit application with all certificates",
          details:
            "Submit your application to the Department of Motor Traffic along with medical certificate, theory test pass, and practical test pass certificates.",
        },
      ],
      relatedServices: [
        { id: 15, name: "Vehicle registration (RMV)" },
        { id: 16, name: "Vehicle revenue license renewal" },
        { id: 17, name: "Number plate services" },
      ],
      offices: [
        {
          name: "Department of Motor Traffic - Colombo",
          address: "No. 555, Motor Traffic Building, Colombo 01",
          phone: "011-5678901",
        },
      ],
    },
    9: {
      id: 9,
      title: "Land title registration",
      description: "Register land ownership and obtain title deeds",
      icon: FaHome,
      category: "Land & Housing",
      processingTime: "30-45 days",
      fee: "LKR 10,000 - 50,000",
      trending: true,
      requirements: [
        "Survey plans",
        "Deed of transfer",
        "Tax receipts",
        "Surveyor report",
        "Title deed application",
      ],
      steps: [
        {
          id: 1,
          title: "Property Survey",
          description: "Conduct property survey",
          details:
            "Engage a licensed surveyor to conduct a detailed survey of the property and prepare survey plans.",
        },
        {
          id: 2,
          title: "Prepare Documents",
          description: "Gather all required documents",
          details:
            "Collect survey plans, deed of transfer, tax receipts, surveyor report, and any other supporting documents.",
        },
        {
          id: 3,
          title: "Submit Application",
          description: "Submit title deed application",
          details:
            "Submit your application to the Land Registry along with all required documents and fees.",
        },
        {
          id: 4,
          title: "Verification Process",
          description: "Undergo verification and inspection",
          details:
            "The Land Registry will verify all documents and may conduct a site inspection of the property.",
        },
        {
          id: 5,
          title: "Title Deed Issuance",
          description: "Receive official title deed",
          details:
            "Once verification is complete, you will receive the official title deed for your property.",
        },
      ],
      relatedServices: [
        { id: 10, name: "Deeds and ownership transfers" },
        { id: 11, name: "Valuation of land and property" },
        { id: 12, name: "Housing scheme applications" },
      ],
      offices: [
        {
          name: "Land Registry - Colombo",
          address: "No. 777, Land Registry Building, Colombo 01",
          phone: "011-6789012",
        },
      ],
    },
  };

  const service = serviceData[serviceId];

  if (!service) {
    return (
      <div className="service-detail-page">
        <div className="container">
          <div className="service-not-found">
            <h1>Service Not Found</h1>
            <p>
              The service you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/services" className="btn btn-primary">
              Back to Services
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const toggleStep = (stepId) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  const handleApplyOnline = () => {
    // In a real app, this would redirect to the application form
    alert(
      `Apply online for ${service.title} - This would redirect to the application form`
    );
  };

  const handleRelatedService = (relatedServiceId) => {
    navigate(`/services/${relatedServiceId}`);
  };

  const handleAddToChecklist = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post("/checklist/add/", {
        service_id: service.id,
      });
      alert("Service added to your checklist!");
    } catch (error) {
      console.error("Error adding to checklist:", error.response || error);
      alert("Could not add to checklist.");
    }
  };

  return (
    <div className="service-detail-page">
      <div className="container">
        <div className="service-layout">
          {/* Main Content */}
          <div className="service-main">
            {/* Back Button */}
            <Link to="/services" className="back-button">
              <FaArrowLeft className="back-icon" />
              {t("services.backToServices")}
            </Link>

            {/* Service Header */}
            <div className="service-header">
              <div className="service-title-section">
                <div className="service-category">
                  <span className="category-badge">{service.category}</span>
                </div>
                <div className="service-title-row">
                  <h1 className="service-title">{service.title}</h1>
                  {service.trending && (
                    <span className="trending-badge">
                      <FaFire />
                      {t("servicesPage.trending")}
                    </span>
                  )}
                </div>
                <p className="service-description">{service.description}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button
                className="btn btn-primary btn-apply"
                onClick={handleApplyOnline}
              >
                {t("services.applyButton")}
              </button>
              {user ? (
                <button
                  className="btn btn-outline btn-checklist"
                  onClick={handleAddToChecklist}
                >
                  <FaFileAlt className="btn-icon" />
                  {t("services.addToChecklist")}
                </button>
              ) : (
                <button
                  className="btn btn-outline btn-checklist"
                  onClick={() => navigate("/login")}
                >
                  <FaFileAlt className="btn-icon" />
                  {t("services.loginToAddChecklist")}
                </button>
              )}
            </div>

            {/* Service Info Cards */}
            <div className="service-info-cards">
              <div className="info-card">
                <div className="info-icon">
                  <FaClock />
                </div>
                <div className="info-content">
                  <h3>{t("services.processingTime")}</h3>
                  <p>{service.processingTime}</p>
                </div>
              </div>
              <div className="info-card">
                <div className="info-icon">
                  <FaCheckCircle />
                </div>
                <div className="info-content">
                  <h3>{t("services.serviceFee")}</h3>
                  <p>{service.fee}</p>
                </div>
              </div>
            </div>

            {/* Requirements Section */}
            <div className="requirements-section">
              <h2>{t("services.requiredDocuments")}</h2>
              <div className="requirements-list">
                {service.requirements.map((requirement, index) => (
                  <div key={index} className="requirement-item">
                    <FaCheckCircle className="requirement-icon" />
                    <span>{requirement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Steps */}
            <div className="application-steps">
              <h2>{t("services.applicationSteps")}</h2>
              {service.steps.map((step) => (
                <div key={step.id} className="step-item">
                  <div
                    className={`step-header ${
                      expandedStep === step.id ? "expanded" : ""
                    }`}
                    onClick={() => toggleStep(step.id)}
                  >
                    <div className="step-number">
                      <span className="step-icon">{step.id}</span>
                    </div>
                    <div className="step-content">
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                    <div className="step-toggle">
                      {expandedStep === step.id ? (
                        <FaChevronUp className="chevron-icon" />
                      ) : (
                        <FaChevronDown className="chevron-icon" />
                      )}
                    </div>
                  </div>
                  {expandedStep === step.id && (
                    <div className="step-details">
                      <p>{step.details}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Service Offices */}
            {service.offices && (
              <div className="service-offices">
                <h2>{t("services.serviceLocations")}</h2>
                <div className="offices-list">
                  {service.offices.map((office, index) => (
                    <div
                      key={index}
                      className="office-item"
                      onClick={() => navigate("/map")}
                    >
                      <div className="office-header">
                        <FaBuilding className="office-icon" />
                        <h3>{office.name}</h3>
                        <FaMapMarkerAlt className="office-map-icon" />
                      </div>
                      <div className="office-details">
                        <div className="office-address">
                          <FaMapMarkerAlt className="address-icon" />
                          <span>{office.address}</span>
                        </div>
                        <div className="office-phone">
                          <FaPhone className="phone-icon" />
                          <span>{office.phone}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Navigation */}
            <div className="bottom-navigation">
              <Link to="/services" className="btn btn-outline">
                {t("services.backToServices")}
              </Link>
              <button className="btn btn-primary">
                {t("services.nextService")}
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="service-sidebar">
            {/* Related Services */}
            <div className="sidebar-section">
              <h3>{t("services.relatedServices")}</h3>
              <div className="related-services">
                {service.relatedServices.map((relatedService) => (
                  <div
                    key={relatedService.id}
                    className="related-service-item"
                    onClick={() => handleRelatedService(relatedService.id)}
                  >
                    <span className="related-service-name">
                      {relatedService.name}
                    </span>
                    <FaArrowRight className="related-service-arrow" />
                  </div>
                ))}
              </div>
            </div>

            {/* Need Help */}
            <div className="sidebar-section">
              <h3>{t("services.needHelp")}</h3>
              <div className="help-options">
                <button className="btn btn-primary btn-contact">
                  {t("services.contactSupport")}
                </button>
                <button className="btn btn-outline btn-faq">
                  {t("services.viewFAQ")}
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="sidebar-section">
              <h3>Quick Actions</h3>
              <div className="quick-actions">
                <button className="btn btn-outline btn-small">
                  {t("services.downloadForms")}
                </button>
                <button className="btn btn-outline btn-small">
                  {t("services.bookAppointment")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Chatbot />
    </div>
  );
};

export default ServiceDetail;
