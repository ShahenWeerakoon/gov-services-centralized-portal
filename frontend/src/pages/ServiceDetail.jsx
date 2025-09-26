import React, { useState, useEffect } from "react";
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
  FaHeart,
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

// const ServiceDetail = () => {
const ServiceDetail = ({ user }) => {
  const { t } = useTranslation();
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [expandedStep, setExpandedStep] = useState(0);

  // Scroll to top when component mounts or serviceId changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  // Comprehensive service data for all services
  const serviceData = {
    1: {
      id: 1,
      title: "National Identity Card (NIC) application/renewal",
      description: "Apply for new NIC or renew existing National Identity Card",
      icon: FaIdCard,
      category: "Identity & Civil Registration",
      processingTime: "7-14 days",
      fee: "LKR 200 (First time), LKR 120 (Postal service), LKR 2500 (Penalty)",
      trending: true,
      onlineApplication: "https://drp.gov.lk/en/assets/formats/application.pdf",
      requirements: [
        "Duly completed application (Form D.R.P/1,7,8)",
        "Birth certificate or extract of the birth registry certified by the Additional District Registrar",
        "ICAO standard photograph obtained within 06 month period",
        "Receipt of payment of application fee",
      ],
      additionalRequirements: [
        {
          category: "If birth certificate is not available",
          documents: [
            "Probable age certificate or results of search of registers",
            "Document as proof of name and date of birth (Birth certificate of a child/School leaving certificate of the applicant/Estate leaving certificate of the applicant/certified copy of the applicant's horoscope/marriage certificate of the applicant/citizenship certificate of the applicant/Document issued by the principal, certifying the Applicant's date of birth)",
          ],
        },
        {
          category: "For persons born abroad to Sri Lankan parents",
          documents: [
            "Citizenship certificate issued by the Department of Immigration and Emigration to prove that Sri Lankan citizenship has been obtained",
          ],
        },
        {
          category: "For dual citizenship holders",
          documents: ["Dual citizenship certificate"],
        },
        {
          category: "For clergy",
          documents: [
            "For Buddhist monk: Samanera certificate or Upasampada certificate issued by the Department of Buddhist Affairs",
            "For priests of other religions: Certificates issued by the relevant departments to prove the clergy ship of other religions",
            "Certificates of reclining of clergyship issued by relevant departments",
          ],
        },
        {
          category: "If applicant has not applied within prescribed period",
          documents: [
            "Duly filled application form (Form D.R.P/OP/02/03)",
            "Receipt of payment of prescribed fines",
          ],
        },
        {
          category: "For name/surname change",
          documents: [
            "Marriage certificate attested by Additional District Registrar if applying for husband's name or surname",
          ],
        },
      ],
      basicRequirements: [
        "Every person who is a citizen of Sri Lanka and who has attained or attains the age of 15 years shall apply for a National Identity card",
      ],
      certifyingOfficers: [
        {
          applicant: "School Applicants",
          officer: "Principal or Parivenadhipathi",
        },
        {
          applicant:
            "Applicants who have fulfilled the above basic requirements",
          officer:
            "Grama Niladhari of the area of residence (Counter signature of the Divisional Secretary is mandatory)",
        },
        {
          applicant:
            "Estate residents who have fulfilled the above basic qualifications",
          officer: "Estate Superintendent",
        },
      ],
      fees: [
        {
          description:
            "Fee for issuance of National Identity card for the first time",
          amount: "Rs. 200.00",
        },
        {
          description:
            "Fee for sending National Identity card by registered post under normal service",
          amount: "Rs. 120.00",
        },
        {
          description:
            "Penalty fee for an applicant who does not apply for National Identity card within one year from the date of attaining 15 years of age",
          amount: "Rs. 2500.00",
        },
        {
          description:
            "Penalty fee for an applicant who has not obtained National Identity card within 06 months from the date of issue of the dual citizenship certificate under Section 19(2) of Citizenship Act",
          amount: "Rs. 2500.00",
        },
      ],
      steps: [
        {
          id: 1,
          title: "Fill Application Form",
          description: "Complete the NIC application form",
          details:
            "Download and complete the application form (Form D.R.P/1,7,8) from https://drp.gov.lk/en/assets/formats/application.pdf or obtain it from the office.",
        },
        {
          id: 2,
          title: "Submit Application",
          description: "Submit via appropriate office",
          details:
            "Submit via Grama Niladhari / Divisional Secretariat or directly at DRP head office / provincial offices depending on the service. If using One-Day Service, must go to DRP Head Office or Galle provincial office with completed documents.",
        },
        {
          id: 3,
          title: "Pay Fees and Fines",
          description: "Pay applicable fees and penalties",
          details:
            "Pay fee + if late, fines. The aforesaid fees can be paid through the certifying officers certifying the application, and the fines should be paid to Shroff of the relevant Divisional Secretariat.",
        },
        {
          id: 4,
          title: "Wait for Issuance",
          description: "Receive your National Identity Card",
          details:
            "For normal service it may be posted; for one-day service you get it same day (if conditions met).",
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
      fee: "Free (within 3 months), Late fees apply (after 3 months)",
      trending: false,
      onlineApplication: "https://online.ebmd.rgd.gov.lk/",
      applicationForms: [
        {
          name: "Application Form Download (CR01)",
          url: "https://rgd.gov.lk/web/images/application/civil/CR01.pdf",
          description: "Main birth registration form",
        },
        {
          name: "Application for Certified Copy of Birth Certificate",
          url: "https://rgd.gov.lk/web/images/pdf/births/Application_for_birth_certificate_or_search_registeres_2017-04-25.pdf",
          description: "For obtaining certified copies",
        },
      ],
      serviceFees: [
        {
          category: "Birth Registration",
          fees: [
            {
              description: "Within 3 months",
              amount: "Free",
            },
            {
              description: "After 3 months",
              amount: "Late registration fees apply",
            },
            {
              description: "Overseas birth registration (citizenship)",
              amount: "Rs. 5,750 (if within prescribed period)",
            },
            {
              description: "Delayed applications",
              amount: "Extra per year",
            },
          ],
        },
        {
          category: "Certified Copies of Birth Certificate",
          fees: [
            {
              description: "If certificate number & date known",
              amount: "Rs. 120 per copy",
            },
            {
              description: "If details unknown (search required, < 2 years)",
              amount: "Rs. 250 per copy",
            },
          ],
        },
      ],
      paymentInfo:
        "Payment can be made directly at Divisional Secretariat OR by depositing to RGD Account No. 7039827 (BOC Battaramulla)",
      appointmentBooking:
        "Currently, RGD does not provide an online appointment booking system (only direct submission or via post/mission).",
      requirements: [
        "Duly filled Registration Form CR01",
        "Photocopy of parents' marriage certificate (if married)",
        "Photocopies of parents' birth certificates",
        "Original & photocopies of NICs of parents",
        "Report issued by hospital (if birth occurred in hospital)",
        "Grama Niladhari's report (for home births)",
      ],
      additionalRequirements: [
        {
          category: "For home births",
          documents: ["Grama Niladhari's report"],
        },
        {
          category: "If parents unmarried",
          documents: [
            "Both parents must meet Registrar to include father's info",
          ],
        },
        {
          category: "For overseas births",
          documents: [
            "Declaration form (Section 16 if within 3 months, Section 24 if after 3 months)",
            "Birth certificate issued abroad + English translation (if not in English)",
            "Parents' valid passports / travel documents at child's birth",
            "Parents' birth & marriage certificates",
          ],
        },
      ],
      steps: [
        {
          id: 1,
          title: "Obtain and Fill Form",
          description: "Get Form CR01 or overseas declaration form",
          details:
            "Obtain and fill Form CR01 (or overseas declaration form if applicable). Download Form CR01 from the Registrar General's Department website.",
        },
        {
          id: 2,
          title: "Submit Application",
          description: "Submit to appropriate office",
          details:
            "Submit to: Local Registrar of Births & Deaths (for births in Sri Lanka) or Sri Lankan Mission overseas (for overseas births).",
        },
        {
          id: 3,
          title: "Handle Late Registration",
          description: "Address late registration requirements",
          details:
            "If late: Within 3 months → free registration. After 3 months → explanation required, late fees apply. After 1 year → formal approval needed.",
        },
        {
          id: 4,
          title: "Collect Certificate",
          description: "Receive your birth certificate",
          details:
            "Certificate issued free of charge (one copy) to the informer. If applied overseas, delivered via Sri Lankan mission or posted.",
        },
      ],
      relatedServices: [
        { id: 1, name: "National Identity Card (NIC) application/renewal" },
        { id: 7, name: "Passport application / renewal" },
        { id: 3, name: "Marriage Certificate issuance" },
      ],
      offices: [
        {
          name: "Registrar General's Department (RGD)",
          address:
            "234/A3, Denzil Kobbekaduwa Mawatha, Battaramulla, Sri Lanka",
          phone: "+94 112 889 488 – 489",
          email: "info@rgd.gov.lk",
        },
        {
          name: "Divisional Secretariats",
          address: "Various locations island-wide",
          phone: "For obtaining certified / translated copies",
        },
        {
          name: "Sri Lankan Missions Overseas",
          address: "Various countries",
          phone: "For births abroad",
        },
      ],
    },
    3: {
      id: 3,
      title: "Marriage Certificate issuance",
      description: "Registration of Marriages (General) – Sri Lanka",
      icon: FaHeart,
      category: "Identity & Civil Registration",
      processingTime: "14 days waiting period + ceremony",
      fee: "Rs. 120 (notice) + Rs. 900 (ceremony)",
      trending: false,
      onlineApplication:
        "https://rgd.gov.lk/web/images/pdf/marriage/Application_for_certificate_of_marriage_2017-04-25.pdf",
      eligibility: [
        "Both parties must be 18 years or older",
        "Parties must not be within prohibited degrees of relationship",
        "Neither party should already be in a valid marriage",
        "Applies to all races/religions except Muslims (since Muslim marriages are under a separate law)",
      ],
      requirements: [
        "Birth Certificate (or other document confirming name and date of birth)",
        "Marriage Notice (2 copies, certified)",
        "Valid NIC / Passport",
        "Proof of residency (in the relevant division for at least 10 days)",
        "If one party was abroad → the other party must have resided in Sri Lanka for at least 4 or 10 days depending on conditions",
        "Two witnesses for the registration",
      ],
      steps: [
        {
          id: 1,
          title: "Submit Marriage Notice",
          description: "File marriage notice with Registrar",
          details:
            "Submit Marriage Notice (in duplicate) to the Marriage Registrar of the relevant division. Must be certified by: Marriage Registrar / Justice of Peace / Notary Public / Minister.",
        },
        {
          id: 2,
          title: "Residency Requirement",
          description: "Meet residency requirements",
          details:
            "At least one party must be resident in Sri Lanka. If parties reside in different divisions → notices must be exchanged between Registrars.",
        },
        {
          id: 3,
          title: "Waiting Period",
          description: "14 days waiting period",
          details:
            "14 days must pass from submission of the notice before registration. If urgent → Apply for a special license to marry before 14 days.",
        },
        {
          id: 4,
          title: "Special Permission (if needed)",
          description: "For marriages outside Registrar's office",
          details:
            "If marriage is to be held outside the Registrar's Office, obtain special permission and pay the required fee.",
        },
        {
          id: 5,
          title: "Marriage Registration Ceremony",
          description: "Conduct marriage ceremony",
          details:
            "Marriage Registration Ceremony is conducted before the Registrar with 2 witnesses. The bride receives the 3rd copy of the Marriage Certificate.",
        },
      ],
      serviceLocations: [
        "Divisional Secretariat Offices",
        "Registrar's Offices (Marriage Registrar / Additional District Registrar / District Registrar)",
        "Approved Religious Places (with registration license)",
      ],
      appointmentBooking:
        "No direct online appointment booking. You must visit the Divisional Secretariat / Registrar's Office of your area.",
      serviceFees: [
        {
          no: 1,
          service: "Filing marriage notice at Registrar's office",
          paymentTo: "Registrar",
          whoPays: "Applicant",
          fee: "Rs. 120",
          mode: "Cash",
        },
        {
          no: 2,
          service:
            "Filing marriage notice at Additional/District Registrar's office",
          paymentTo: "Govt",
          whoPays: "Applicant",
          fee: "Rs. 120",
          mode: "Cash",
        },
        {
          no: 3,
          service: "Issuing Registrar's certificate on notice",
          paymentTo: "Registrar",
          whoPays: "Couple",
          fee: "Rs. 120",
          mode: "Cash",
        },
        {
          no: 4,
          service: "Issuing District Registrar's certificate on notice",
          paymentTo: "Govt",
          whoPays: "Couple",
          fee: "Rs. 120",
          mode: "Cash",
        },
        {
          no: 5,
          service: "Marriage at Registrar's office",
          paymentTo: "Registrar",
          whoPays: "Couple",
          fee: "Rs. 900",
          mode: "Cash",
        },
        {
          no: 6,
          service: "Marriage at District Registrar's office",
          paymentTo: "Govt",
          whoPays: "Couple",
          fee: "Rs. 900",
          mode: "Cash",
        },
        {
          no: 7,
          service: "Marriage outside Registrar's office",
          paymentTo: "Registrar",
          whoPays: "Couple",
          fee: "Rs. 900",
          mode: "Cash",
        },
        {
          no: 8,
          service: "Marriage outside District Registrar's office",
          paymentTo: "Govt",
          whoPays: "Couple",
          fee: "Rs. 900",
          mode: "Cash",
        },
        {
          no: 9,
          service: "Special marriage license",
          paymentTo: "Govt",
          whoPays: "Couple",
          fee: "Rs. 120",
          mode: "Cash",
        },
        {
          no: 10,
          service: "Marriage at registered religious place",
          paymentTo: "Govt",
          whoPays: "Couple",
          fee: "Rs. 900",
          mode: "Cash",
        },
        {
          no: 11,
          service: "Home license (outside Registrar's office)",
          paymentTo: "Govt",
          whoPays: "Couple",
          fee: "Rs. 60",
          mode: "Cash",
        },
      ],
      correctionOfErrors: {
        title: "Correction of Errors in Marriage Certificates",
        process:
          "Apply through the District Court with assistance of an Attorney-at-Law",
        requirements: [
          "Original Marriage Certificate",
          "Any Court-requested documents",
        ],
        note: "If it's a documentary error → can be corrected by checking the duplicate with the Additional District Registrar.",
      },
      relatedServices: [
        { id: 2, name: "Birth Certificate issuance" },
        { id: 1, name: "National Identity Card (NIC) application/renewal" },
        { id: 7, name: "Passport application / renewal" },
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

  const service = serviceData[parseInt(serviceId)];

  // Temporary test for Marriage Certificate service
  if (parseInt(serviceId) === 3) {
    console.log("Marriage Certificate service test:", service);
    if (!service) {
      console.error("Marriage Certificate service not found!");
      return (
        <div className="service-detail-page">
          <div className="container">
            <div className="service-not-found">
              <h1>Marriage Certificate Service Not Found</h1>
              <p>Service ID: {serviceId}</p>
              <p>Available services: {Object.keys(serviceData).join(", ")}</p>
            </div>
          </div>
        </div>
      );
    }
  }

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
    if (service.onlineApplication) {
      // Open the online application form in a new tab
      window.open(service.onlineApplication, "_blank");
    } else {
      // Fallback for services without online application
      alert(
        `Apply online for ${service.title} - This would redirect to the application form`
      );
    }
  };

  const handleRelatedService = (relatedServiceId) => {
    navigate(`/services/${relatedServiceId}`);
  };

  const handleAddToChecklist = async () => {
    // Redirect to checklist page with service information
    navigate(`/checklist?service=${serviceId}`);
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
              <h2>Documents to be submitted along with the application</h2>
              <div className="requirements-list">
                {service.requirements.map((requirement, index) => (
                  <div key={index} className="requirement-item">
                    <div className="requirement-number">{index + 1}</div>
                    <span>{requirement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Requirements Section - Only for NIC */}
            {service.additionalRequirements && (
              <div className="additional-requirements-section">
                <h2>Documents required in addition to the above</h2>
                <div className="additional-requirements-list">
                  {service.additionalRequirements.map((reqGroup, index) => (
                    <div key={index} className="additional-requirement-group">
                      <div className="requirement-group-header">
                        <div className="requirement-group-number">
                          {index + 1}
                        </div>
                        <h3 className="requirement-group-title">
                          {reqGroup.category}
                        </h3>
                      </div>
                      <div className="requirement-group-documents">
                        {reqGroup.documents.map((document, docIndex) => (
                          <div
                            key={docIndex}
                            className="requirement-group-document"
                          >
                            <FaCheckCircle className="document-icon" />
                            <span>{document}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Basic Requirements Section - Only for NIC */}
            {service.basicRequirements && (
              <div className="basic-requirements-section">
                <h2>Basic Requirements</h2>
                <div className="basic-requirements-list">
                  {service.basicRequirements.map((requirement, index) => (
                    <div key={index} className="basic-requirement-item">
                      <FaCheckCircle className="requirement-icon" />
                      <span>{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifying Officers Section - Only for NIC */}
            {service.certifyingOfficers && (
              <div className="certifying-officers-section">
                <h2>Certifying Officers</h2>
                <p className="section-description">
                  It is mandatory for every applicant to forward the application
                  for the National Identity card through the relevant certifying
                  officer.
                </p>
                <div className="certifying-officers-table">
                  <div className="table-header">
                    <div className="header-cell">Applicant Type</div>
                    <div className="header-cell">Certifying Officer</div>
                  </div>
                  {service.certifyingOfficers.map((item, index) => (
                    <div key={index} className="table-row">
                      <div className="cell applicant-cell">
                        {item.applicant}
                      </div>
                      <div className="cell officer-cell">{item.officer}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Detailed Fees Section - Only for NIC */}
            {service.fees && (
              <div className="detailed-fees-section">
                <h2>Levy of Fees / Fines</h2>
                <div className="fees-list">
                  {service.fees.map((fee, index) => (
                    <div key={index} className="fee-item">
                      <div className="fee-number">{index + 1}</div>
                      <div className="fee-content">
                        <div className="fee-description">{fee.description}</div>
                        <div className="fee-amount">{fee.amount}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="payment-note">
                  <p>
                    <strong>Payment Information:</strong> The aforesaid fees can
                    be paid through the certifying officers certifying the
                    application, and the fines should be paid to Shroff of the
                    relevant Divisional Secretariat.
                  </p>
                </div>
              </div>
            )}

            {/* Service Fees Section - For Birth Certificate */}
            {service.serviceFees && (
              <div className="service-fees-section">
                <h2>Service Fees</h2>
                <div className="service-fees-list">
                  {service.serviceFees.map((feeCategory, index) => (
                    <div key={index} className="fee-category">
                      <h3 className="fee-category-title">
                        {feeCategory.category}
                      </h3>
                      <div className="fee-category-items">
                        {feeCategory.fees.map((fee, feeIndex) => (
                          <div key={feeIndex} className="fee-category-item">
                            <div className="fee-category-description">
                              {fee.description}
                            </div>
                            <div className="fee-category-amount">
                              {fee.amount}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {service.paymentInfo && (
                  <div className="payment-info">
                    <p>
                      <strong>Payment Information:</strong>{" "}
                      {service.paymentInfo}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Application Forms Section - For Birth Certificate */}
            {service.applicationForms && (
              <div className="application-forms-section">
                <h2>Application Forms</h2>
                <div className="forms-list">
                  {service.applicationForms.map((form, index) => (
                    <div key={index} className="form-item">
                      <div className="form-content">
                        <h3 className="form-name">{form.name}</h3>
                        <p className="form-description">{form.description}</p>
                      </div>
                      <a
                        href={form.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="form-download-btn"
                      >
                        Download Form
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Appointment Booking Section - For Birth Certificate */}
            {service.appointmentBooking && (
              <div className="appointment-booking-section">
                <h2>Appointment Booking</h2>
                <div className="appointment-info">
                  <p>{service.appointmentBooking}</p>
                </div>
              </div>
            )}

            {/* Eligibility Section - For Marriage Certificate */}
            {service.eligibility && (
              <div className="eligibility-section">
                <h2>✅ Eligibility</h2>
                <div className="eligibility-list">
                  {service.eligibility.map((requirement, index) => (
                    <div key={index} className="eligibility-item">
                      <span className="eligibility-bullet">•</span>
                      <span>{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Service Locations Section - For Marriage Certificate */}
            {service.serviceLocations && (
              <div className="service-locations-section">
                <h2>Service Locations</h2>
                <div className="locations-list">
                  {service.serviceLocations.map((location, index) => (
                    <div key={index} className="location-item">
                      <span className="location-bullet">•</span>
                      <span>{location}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Marriage Service Fees Table - For Marriage Certificate */}
            {service.serviceFees && service.serviceFees.length > 0 && (
              <div className="marriage-fees-section">
                <h2>Service Fees (as per Gazette)</h2>
                <div className="fees-table-container">
                  <table className="fees-table">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Service</th>
                        <th>Payment To</th>
                        <th>Who Pays</th>
                        <th>Fee (Rs.)</th>
                        <th>Mode</th>
                      </tr>
                    </thead>
                    <tbody>
                      {service.serviceFees.map((fee, index) => (
                        <tr key={index}>
                          <td>{fee.no}</td>
                          <td>{fee.service}</td>
                          <td>{fee.paymentTo}</td>
                          <td>{fee.whoPays}</td>
                          <td className="fee-amount">{fee.fee}</td>
                          <td>{fee.mode}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Correction of Errors Section - For Marriage Certificate */}
            {service.correctionOfErrors && (
              <div className="correction-errors-section">
                <h2>{service.correctionOfErrors.title}</h2>
                <div className="correction-process">
                  <p>
                    <strong>Process:</strong>{" "}
                    {service.correctionOfErrors.process}
                  </p>
                </div>
                <div className="correction-requirements">
                  <h3>Required:</h3>
                  <ul>
                    {service.correctionOfErrors.requirements.map(
                      (req, index) => (
                        <li key={index}>{req}</li>
                      )
                    )}
                  </ul>
                </div>
                <div className="correction-note">
                  <p>
                    <strong>Note:</strong> {service.correctionOfErrors.note}
                  </p>
                </div>
              </div>
            )}

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
