import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaGlobe,
  FaFileAlt,
  FaChevronUp,
  FaChevronDown,
  FaArrowRight,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
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

  // Service data - in a real app, this would come from an API
  const serviceData = {
    passport: {
      id: "passport",
      title: t("services.passport.title"),
      description: t("services.passport.description"),
      icon: "🛂",
      processingTime: t("services.passport.processingTime"),
      fee: t("services.passport.fee"),
      applyButton: t("services.passport.applyButton"),
      checklistButton: t("services.passport.checklistButton"),
      steps: [
        {
          id: 1,
          title: t("services.passport.steps.checkEligibility.title"),
          description: t(
            "services.passport.steps.checkEligibility.description"
          ),
          details: t("services.passport.steps.checkEligibility.details"),
        },
        {
          id: 2,
          title: t("services.passport.steps.gatherDocuments.title"),
          description: t("services.passport.steps.gatherDocuments.description"),
          details: t("services.passport.steps.gatherDocuments.details"),
        },
        {
          id: 3,
          title: t("services.passport.steps.completeForm.title"),
          description: t("services.passport.steps.completeForm.description"),
          details: t("services.passport.steps.completeForm.details"),
        },
        {
          id: 4,
          title: t("services.passport.steps.submitPay.title"),
          description: t("services.passport.steps.submitPay.description"),
          details: t("services.passport.steps.submitPay.details"),
        },
      ],
      relatedServices: [
        { id: "nic", name: t("services.nic.title") },
        { id: "birth-certificate", name: t("services.birthCertificate.title") },
        {
          id: "marriage-certificate",
          name: t("services.marriageCertificate.title"),
        },
        { id: "police-clearance", name: t("services.policeClearance.title") },
      ],
    },
    nic: {
      id: "nic",
      title: t("services.nic.title"),
      description: t("services.nic.description"),
      icon: "🆔",
      processingTime: t("services.nic.processingTime"),
      fee: t("services.nic.fee"),
      applyButton: t("services.nic.applyButton"),
      checklistButton: t("services.nic.checklistButton"),
      steps: [
        {
          id: 1,
          title: t("services.nic.steps.checkEligibility.title"),
          description: t("services.nic.steps.checkEligibility.description"),
          details: t("services.nic.steps.checkEligibility.details"),
        },
        {
          id: 2,
          title: t("services.nic.steps.gatherDocuments.title"),
          description: t("services.nic.steps.gatherDocuments.description"),
          details: t("services.nic.steps.gatherDocuments.details"),
        },
        {
          id: 3,
          title: t("services.nic.steps.completeForm.title"),
          description: t("services.nic.steps.completeForm.description"),
          details: t("services.nic.steps.completeForm.details"),
        },
        {
          id: 4,
          title: t("services.nic.steps.submitPay.title"),
          description: t("services.nic.steps.submitPay.description"),
          details: t("services.nic.steps.submitPay.details"),
        },
      ],
      relatedServices: [
        { id: "passport", name: t("services.passport.title") },
        { id: "birth-certificate", name: t("services.birthCertificate.title") },
        {
          id: "marriage-certificate",
          name: t("services.marriageCertificate.title"),
        },
        { id: "police-clearance", name: t("services.policeClearance.title") },
      ],
    },
  };

  const service = serviceData[serviceId];

  if (!service) {
    return (
      <div className="service-detail-page">
        <div className="container">
          <div className="service-not-found">
            <h1>{t("services.notFound.title")}</h1>
            <p>{t("services.notFound.description")}</p>
            <Link to="/services" className="btn btn-primary">
              {t("services.notFound.backToServices")}
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
    console.log(`Apply online for ${service.title}`);
  };

  const handleDocumentChecklist = () => {
    // In a real app, this would show the document checklist
    console.log(`Show document checklist for ${service.title}`);
  };

  //Feature1
  const handleRelatedService = (relatedServiceId) => {
    navigate(`/services/${relatedServiceId}`);
  };
  const handleAddToChecklist = async () => {
    try {
      await axios.post("/checklist/add/", { service_id: serviceId });
      alert("Service added to your checklist!");
    } catch (error) {
      console.error("Error adding to checklist:", error);
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
                <h1 className="service-title">{service.title}</h1>
                <p className="service-description">{service.description}</p>
              </div>
              <div className="service-icon">
                <FaGlobe />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button
                className="btn btn-primary btn-apply"
                onClick={handleApplyOnline}
              >
                {service.applyButton}
              </button>
              {/* <button
                className="btn btn-outline btn-checklist"
                onClick={handleDocumentChecklist}
              >
                <FaFileAlt className="btn-icon" />
                {service.checklistButton}
              </button> */}
              {user ? (
                <button
                  className="btn btn-outline btn-checklist"
                  onClick={handleAddToChecklist} // We'll create this function
                >
                  <FaFileAlt className="btn-icon" />
                  {service.checklistButton}
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
              <button className="btn btn-primary btn-contact">
                {t("services.contactSupport")}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Chatbot />
    </div>
  );
};

export default ServiceDetail;
