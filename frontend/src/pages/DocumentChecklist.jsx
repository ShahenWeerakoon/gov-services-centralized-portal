import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams, Navigate, useLocation } from "react-router-dom";
import {
  FaCheckCircle,
  FaCircle,
  FaPlus,
  FaTrash,
  FaEdit,
  FaDownload,
  FaUpload,
  FaFileAlt,
  FaArrowLeft,
  FaSearch,
  FaFilter,
  FaSort,
  FaPrint,
  FaCamera,
  FaFileAlt as FaDocument,
  FaChevronDown,
} from "react-icons/fa";
import "../styles/DocumentChecklist.css";

const DocumentChecklist = ({ user }) => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  // Redirect to login if user is not authenticated
  if (!user) {
    // Include current path and search params as return URL
    const returnUrl = location.pathname + location.search;
    return (
      <Navigate to={`/login?return=${encodeURIComponent(returnUrl)}`} replace />
    );
  }

  const [checklists, setChecklists] = useState([]);
  const [selectedChecklist, setSelectedChecklist] = useState(null);
  const [newItem, setNewItem] = useState("");
  const [newChecklistName, setNewChecklistName] = useState("");
  const [showAddChecklist, setShowAddChecklist] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [showServiceSelection, setShowServiceSelection] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  // Function to remove duplicate checklists
  const removeDuplicateChecklists = (checklists) => {
    const seen = new Set();
    return checklists.filter((checklist) => {
      const key = checklist.name.toLowerCase();
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  };

  // Service data with required documents
  const servicesData = [
    {
      id: "passport",
      name: "Passport Application",
      category: "Travel & Immigration",
      icon: "🛂",
      requiredDocuments: [
        "Completed passport application form",
        "Passport size photographs (2 copies)",
        "Birth certificate (original + copy)",
        "National Identity Card (copy)",
        "Previous passport (if any)",
        "Marriage certificate (if applicable)",
        "Divorce certificate (if applicable)",
        "Death certificate of spouse (if applicable)",
        "Police clearance certificate",
        "Bank statement (last 3 months)",
      ],
    },
    {
      id: "driving-license",
      name: "Driving License Renewal",
      category: "Transport & Vehicles",
      icon: "🚗",
      requiredDocuments: [
        "Current driving license",
        "Medical certificate",
        "Eye test report",
        "Application fee payment receipt",
        "National Identity Card (copy)",
        "Passport size photographs (2 copies)",
        "Address proof",
        "Blood group certificate",
      ],
    },
    {
      id: "land-registration",
      name: "Land Title Registration",
      category: "Land & Housing",
      icon: "🏠",
      requiredDocuments: [
        "Deed of transfer",
        "Survey plan",
        "Tax clearance certificate",
        "Identity documents",
        "Registration fee payment",
        "Title deed",
        "Surveyor's report",
        "Valuation report",
        "Stamp duty payment receipt",
        "Legal documents",
      ],
    },
    {
      id: "birth-certificate",
      name: "Birth Certificate",
      category: "Identity & Civil Registration",
      icon: "📋",
      requiredDocuments: [
        "Hospital birth record",
        "Parent's marriage certificate",
        "Parent's NIC (copy)",
        "Application form",
        "Witness statements (2 people)",
        "Application fee payment",
        "Medical certificate",
        "Address proof",
      ],
    },
    {
      id: "marriage-certificate",
      name: "Marriage Certificate",
      category: "Identity & Civil Registration",
      icon: "💒",
      requiredDocuments: [
        "Marriage registration form",
        "Bride and groom's NIC (copy)",
        "Birth certificates (both parties)",
        "Passport size photographs (2 copies each)",
        "Witness statements (2 people)",
        "Application fee payment",
        "Divorce certificate (if previously married)",
        "Death certificate of previous spouse (if applicable)",
      ],
    },
  ];

  // Service data mapping from ServiceDetail component
  const serviceDetailMapping = {
    1: {
      id: "nic-application",
      name: "National Identity Card (NIC) application/renewal",
      category: "Identity & Civil Registration",
      icon: "🆔",
      requiredDocuments: [
        "Duly completed application (Form D.R.P/1,7,8)",
        "Birth certificate or extract of the birth registry certified by the Additional District Registrar",
        "ICAO standard photograph obtained within 06 month period",
        "Receipt of payment of application fee",
      ],
      additionalDocuments: [
        "Probable age certificate or results of search of registers (if birth certificate not available)",
        "Document as proof of name and date of birth (if birth certificate not available)",
        "Citizenship certificate issued by Department of Immigration and Emigration (for persons born abroad)",
        "Dual citizenship certificate (for dual citizenship holders)",
        "Samanera certificate or Upasampada certificate (for Buddhist monks)",
        "Certificates from relevant departments (for priests of other religions)",
        "Certificates of reclining of clergyship (for clergy)",
        "Form D.R.P/OP/02/03 (if not applied within prescribed period)",
        "Receipt of payment of prescribed fines (if late application)",
        "Marriage certificate attested by Additional District Registrar (for name/surname change)",
      ],
    },
    2: {
      id: "birth-certificate",
      name: "Birth Certificate issuance",
      category: "Identity & Civil Registration",
      icon: "📋",
      requiredDocuments: [
        "Duly filled Registration Form CR01",
        "Photocopy of parents' marriage certificate (if married)",
        "Photocopies of parents' birth certificates",
        "Original & photocopies of NICs of parents",
        "Report issued by hospital (if birth occurred in hospital)",
        "Grama Niladhari's report (for home births)",
      ],
      additionalDocuments: [
        "Grama Niladhari's report (for home births)",
        "Both parents must meet Registrar to include father's info (if parents unmarried)",
        "Declaration form Section 16 (for overseas births within 3 months)",
        "Declaration form Section 24 (for overseas births after 3 months)",
        "Birth certificate issued abroad + English translation (for overseas births)",
        "Parents' valid passports / travel documents at child's birth (for overseas births)",
        "Parents' birth & marriage certificates (for overseas births)",
      ],
    },
    3: {
      id: "marriage-certificate",
      name: "Marriage Certificate issuance",
      category: "Identity & Civil Registration",
      icon: "💒",
      requiredDocuments: [
        "Birth Certificate (or other document confirming name and date of birth)",
        "Marriage Notice (2 copies, certified)",
        "Valid NIC / Passport",
        "Proof of residency (in the relevant division for at least 10 days)",
        "If one party was abroad → the other party must have resided in Sri Lanka for at least 4 or 10 days depending on conditions",
        "Two witnesses for the registration",
      ],
      additionalDocuments: [
        "Marriage Notice certification by Marriage Registrar / Justice of Peace / Notary Public / Minister",
        "Special marriage license (if urgent - before 14 days)",
        "Special permission (if marriage outside Registrar's office)",
        "Exchange notices between Registrars (if parties reside in different divisions)",
      ],
    },
    4: {
      id: "death-certificate",
      name: "Death Certificate issuance",
      category: "Identity & Civil Registration",
      icon: "📜",
      requiredDocuments: [
        "Medical certificate of death",
        "Hospital records",
        "Witness statements",
        "Completed application form",
        "Identity documents of applicant",
        "Burial permit",
      ],
    },
    5: {
      id: "name-change",
      name: "Change of name / personal details update",
      category: "Identity & Civil Registration",
      icon: "✏️",
      requiredDocuments: [
        "Current NIC",
        "Birth certificate",
        "Legal name change document",
        "Affidavit",
        "Passport size photos",
        "Application form",
        "Supporting documents",
      ],
    },
    6: {
      id: "dual-citizenship",
      name: "Dual Citizenship services",
      category: "Identity & Civil Registration",
      icon: "🌍",
      requiredDocuments: [
        "Current passport",
        "Birth certificate",
        "Marriage certificate",
        "Police clearance certificate",
        "Bank statements",
        "Employment certificate",
        "Application form",
        "Passport photos",
      ],
    },
    7: {
      id: "passport",
      name: "Passport application / renewal",
      category: "Travel & Immigration",
      icon: "🛂",
      requiredDocuments: [
        "Completed passport application form",
        "Passport size photographs (2 copies)",
        "Birth certificate (original + copy)",
        "National Identity Card (copy)",
        "Previous passport (if any)",
        "Marriage certificate (if applicable)",
        "Divorce certificate (if applicable)",
        "Death certificate of spouse (if applicable)",
        "Police clearance certificate",
        "Bank statement (last 3 months)",
      ],
    },
    8: {
      id: "immigration-status",
      name: "Immigration status inquiries",
      category: "Travel & Immigration",
      icon: "🛂",
      requiredDocuments: [
        "Passport",
        "Visa documents",
        "Application reference number",
        "Identity documents",
        "Supporting documents",
      ],
    },
    9: {
      id: "land-registration",
      name: "Land title registration",
      category: "Land & Housing",
      icon: "🏠",
      requiredDocuments: [
        "Deed of transfer",
        "Survey plan",
        "Tax clearance certificate",
        "Identity documents",
        "Registration fee payment",
        "Title deed",
        "Surveyor's report",
        "Valuation report",
        "Stamp duty payment receipt",
        "Legal documents",
      ],
    },
    10: {
      id: "deeds-transfer",
      name: "Deeds and ownership transfers",
      category: "Land & Housing",
      icon: "📄",
      requiredDocuments: [
        "Original deed",
        "Survey plan",
        "Tax clearance",
        "Identity documents",
        "Transfer documents",
        "Legal documents",
        "Payment receipts",
      ],
    },
    11: {
      id: "property-valuation",
      name: "Valuation of land and property",
      category: "Land & Housing",
      icon: "💰",
      requiredDocuments: [
        "Title deed",
        "Survey plan",
        "Property documents",
        "Identity documents",
        "Application form",
        "Supporting documents",
      ],
    },
    12: {
      id: "housing-scheme",
      name: "Housing scheme applications (e.g., NHDA)",
      category: "Land & Housing",
      icon: "🏘️",
      requiredDocuments: [
        "Income certificate",
        "Family details",
        "Identity documents",
        "Address proof",
        "Application form",
        "Supporting documents",
        "Bank statements",
      ],
    },
    13: {
      id: "building-permits",
      name: "Building permits and planning approvals",
      category: "Land & Housing",
      icon: "🏗️",
      requiredDocuments: [
        "Architectural plans",
        "Land documents",
        "Environmental clearance",
        "Survey plan",
        "Application form",
        "Technical reports",
        "Payment receipts",
      ],
    },
    14: {
      id: "driving-license",
      name: "Driving License application / renewal (DMT)",
      category: "Transport & Vehicles",
      icon: "🚗",
      requiredDocuments: [
        "Current driving license",
        "Medical certificate",
        "Eye test report",
        "Application fee payment receipt",
        "National Identity Card (copy)",
        "Passport size photographs (2 copies)",
        "Address proof",
        "Blood group certificate",
      ],
    },
    15: {
      id: "vehicle-registration",
      name: "Vehicle registration (RMV)",
      category: "Transport & Vehicles",
      icon: "🚙",
      requiredDocuments: [
        "Vehicle documents",
        "Insurance certificate",
        "Tax payment receipt",
        "Import documents",
        "Identity documents",
        "Application form",
        "Technical inspection report",
      ],
    },
    16: {
      id: "revenue-license",
      name: "Vehicle revenue license renewal",
      category: "Transport & Vehicles",
      icon: "📋",
      requiredDocuments: [
        "Vehicle registration",
        "Insurance certificate",
        "Tax payment receipt",
        "Previous revenue license",
        "Application form",
      ],
    },
    17: {
      id: "number-plates",
      name: "Number plate services",
      category: "Transport & Vehicles",
      icon: "🔢",
      requiredDocuments: [
        "Vehicle registration",
        "Identity documents",
        "Application form",
        "Payment receipt",
        "Supporting documents",
      ],
    },
    18: {
      id: "health-welfare",
      name: "Health & Social Welfare services",
      category: "Health & Social Welfare",
      icon: "🏥",
      requiredDocuments: [
        "Medical reports",
        "Identity documents",
        "Income certificate",
        "Application form",
        "Supporting documents",
        "Bank statements",
      ],
    },
    19: {
      id: "university-admissions",
      name: "University admissions (UGC)",
      category: "Education",
      icon: "🎓",
      requiredDocuments: [
        "Academic certificates",
        "Identity documents",
        "Application form",
        "Passport photos",
        "Supporting documents",
        "Bank statements",
      ],
    },
    20: {
      id: "result-sheets",
      name: "Result sheets",
      category: "Education",
      icon: "📊",
      requiredDocuments: [
        "Student ID",
        "Identity documents",
        "Application form",
        "Payment receipt",
        "Supporting documents",
      ],
    },
    21: {
      id: "pension-services",
      name: "Pension and gratuity services",
      category: "Social Welfare",
      icon: "💰",
      requiredDocuments: [
        "Employment records",
        "Identity documents",
        "Bank details",
        "Application form",
        "Supporting documents",
        "Medical certificates",
      ],
    },
    22: {
      id: "epf-etf",
      name: "EPF/ETF services",
      category: "Social Welfare",
      icon: "💼",
      requiredDocuments: [
        "Employment records",
        "Identity documents",
        "Bank details",
        "Application form",
        "Supporting documents",
        "Payment receipts",
      ],
    },
  };

  // Check if user has existing checklists on first visit and handle service parameter
  useEffect(() => {
    const serviceId = searchParams.get("service");
    const existingChecklists = localStorage.getItem("userChecklists");

    // Always load existing checklists first
    if (existingChecklists) {
      const parsedChecklists = JSON.parse(existingChecklists);
      const cleanedChecklists = removeDuplicateChecklists(parsedChecklists);

      // Update localStorage if duplicates were found
      if (cleanedChecklists.length !== parsedChecklists.length) {
        localStorage.setItem(
          "userChecklists",
          JSON.stringify(cleanedChecklists)
        );
      }

      setChecklists(cleanedChecklists);
      setIsFirstVisit(false);

      // If service parameter exists, handle service-specific logic
      if (serviceId && serviceDetailMapping[serviceId]) {
        const service = serviceDetailMapping[serviceId];

        // Check if checklist for this service already exists
        const existingServiceChecklist = cleanedChecklists.find(
          (checklist) => checklist.name === service.name
        );

        if (existingServiceChecklist) {
          // If checklist exists, select it
          setSelectedChecklist(existingServiceChecklist);
        } else {
          // If checklist doesn't exist, create it immediately
          const allDocuments = [
            ...service.requiredDocuments,
            ...(service.additionalDocuments || []),
          ];

          const newChecklist = {
            id: Date.now(),
            name: service.name,
            service: service.category,
            items: allDocuments.map((doc, index) => ({
              id: index + 1,
              text: doc,
              completed: false,
            })),
            createdAt: new Date().toISOString().split("T")[0],
            progress: 0,
          };

          const updatedChecklists = [...cleanedChecklists, newChecklist];
          setChecklists(updatedChecklists);
          localStorage.setItem(
            "userChecklists",
            JSON.stringify(updatedChecklists)
          );
          setSelectedChecklist(newChecklist);
        }
      } else {
        // No service parameter, select first checklist if available
        if (cleanedChecklists.length > 0) {
          setSelectedChecklist(cleanedChecklists[0]);
        }
      }
    } else {
      // No existing checklists
      if (serviceId && serviceDetailMapping[serviceId]) {
        const service = serviceDetailMapping[serviceId];
        // Create new checklist for the service immediately
        const allDocuments = [
          ...service.requiredDocuments,
          ...(service.additionalDocuments || []),
        ];

        const newChecklist = {
          id: Date.now(),
          name: service.name,
          service: service.category,
          items: allDocuments.map((doc, index) => ({
            id: index + 1,
            text: doc,
            completed: false,
          })),
          createdAt: new Date().toISOString().split("T")[0],
          progress: 0,
        };

        setChecklists([newChecklist]);
        localStorage.setItem("userChecklists", JSON.stringify([newChecklist]));
        setSelectedChecklist(newChecklist);
        setIsFirstVisit(false);
      } else {
        // Show service selection for first-time users
        setShowServiceSelection(true);
      }
    }
  }, [searchParams]);

  // Show service selection if no checklists exist and no service parameter
  useEffect(() => {
    const serviceId = searchParams.get("service");
    if (checklists.length === 0 && !showServiceSelection && !serviceId) {
      setShowServiceSelection(true);
    }
  }, [checklists.length, showServiceSelection, searchParams]);

  const filteredChecklists = checklists.filter((checklist) => {
    const matchesSearch = checklist.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "completed" && checklist.progress === 100) ||
      (filterStatus === "in-progress" &&
        checklist.progress > 0 &&
        checklist.progress < 100) ||
      (filterStatus === "not-started" && checklist.progress === 0);
    return matchesSearch && matchesFilter;
  });

  const sortedChecklists = [...filteredChecklists].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "progress":
        return b.progress - a.progress;
      case "date":
        return new Date(b.createdAt) - new Date(a.createdAt);
      default:
        return 0;
    }
  });

  const toggleItem = (checklistId, itemId) => {
    const updatedChecklists = checklists.map((checklist) => {
      if (checklist.id === checklistId) {
        const updatedItems = checklist.items.map((item) =>
          item.id === itemId ? { ...item, completed: !item.completed } : item
        );
        const completedCount = updatedItems.filter(
          (item) => item.completed
        ).length;
        const progress = Math.round(
          (completedCount / updatedItems.length) * 100
        );
        return {
          ...checklist,
          items: updatedItems,
          progress,
        };
      }
      return checklist;
    });

    setChecklists(updatedChecklists);
    localStorage.setItem("userChecklists", JSON.stringify(updatedChecklists));

    // Update selectedChecklist if it's the one being modified
    if (selectedChecklist?.id === checklistId) {
      const updatedChecklist = updatedChecklists.find(
        (c) => c.id === checklistId
      );
      setSelectedChecklist(updatedChecklist);
    }
  };

  const addItem = (checklistId) => {
    if (!newItem.trim()) return;

    const updatedChecklists = checklists.map((checklist) => {
      if (checklist.id === checklistId) {
        const newId = Math.max(...checklist.items.map((item) => item.id)) + 1;
        const updatedItems = [
          ...checklist.items,
          { id: newId, text: newItem, completed: false },
        ];
        const completedCount = updatedItems.filter(
          (item) => item.completed
        ).length;
        const progress = Math.round(
          (completedCount / updatedItems.length) * 100
        );
        return {
          ...checklist,
          items: updatedItems,
          progress,
        };
      }
      return checklist;
    });

    setChecklists(updatedChecklists);
    localStorage.setItem("userChecklists", JSON.stringify(updatedChecklists));

    // Update selectedChecklist if it's the one being modified
    if (selectedChecklist?.id === checklistId) {
      const updatedChecklist = updatedChecklists.find(
        (c) => c.id === checklistId
      );
      setSelectedChecklist(updatedChecklist);
    }

    setNewItem("");
  };

  const deleteItem = (checklistId, itemId) => {
    const updatedChecklists = checklists.map((checklist) => {
      if (checklist.id === checklistId) {
        const updatedItems = checklist.items.filter(
          (item) => item.id !== itemId
        );
        const completedCount = updatedItems.filter(
          (item) => item.completed
        ).length;
        const progress =
          updatedItems.length > 0
            ? Math.round((completedCount / updatedItems.length) * 100)
            : 0;
        return {
          ...checklist,
          items: updatedItems,
          progress,
        };
      }
      return checklist;
    });

    setChecklists(updatedChecklists);
    localStorage.setItem("userChecklists", JSON.stringify(updatedChecklists));

    // Update selectedChecklist if it's the one being modified
    if (selectedChecklist?.id === checklistId) {
      const updatedChecklist = updatedChecklists.find(
        (c) => c.id === checklistId
      );
      setSelectedChecklist(updatedChecklist);
    }
  };

  const createChecklistFromServiceDetail = (service) => {
    // Check if checklist for this service already exists
    const existingChecklist = checklists.find(
      (checklist) => checklist.name === service.name
    );

    if (existingChecklist) {
      // If checklist exists, just select it
      setSelectedChecklist(existingChecklist);
      setShowServiceSelection(false);
      setIsFirstVisit(false);
      return;
    }

    // Create new checklist only if it doesn't exist
    const newChecklist = {
      id: Date.now(), // Use timestamp as unique ID
      name: service.name,
      service: service.category,
      items: service.requiredDocuments.map((doc, index) => ({
        id: index + 1,
        text: doc,
        completed: false,
      })),
      createdAt: new Date().toISOString().split("T")[0],
      progress: 0,
    };

    const updatedChecklists = [...checklists, newChecklist];
    setChecklists(updatedChecklists);

    // Save to localStorage
    localStorage.setItem("userChecklists", JSON.stringify(updatedChecklists));

    // Set as selected and close service selection
    setSelectedChecklist(newChecklist);
    setShowServiceSelection(false);
    setIsFirstVisit(false);
  };

  const createChecklistFromService = (service) => {
    // Check if checklist for this service already exists
    const existingChecklist = checklists.find(
      (checklist) => checklist.name === service.name
    );

    if (existingChecklist) {
      // If checklist exists, just select it
      setSelectedChecklist(existingChecklist);
      setShowServiceSelection(false);
      setIsFirstVisit(false);
      return;
    }

    // Create new checklist only if it doesn't exist
    const allDocuments = [
      ...service.requiredDocuments,
      ...(service.additionalDocuments || []),
    ];

    const newChecklist = {
      id: Date.now(), // Use timestamp as unique ID
      name: service.name,
      service: service.category,
      items: allDocuments.map((doc, index) => ({
        id: index + 1,
        text: doc,
        completed: false,
      })),
      createdAt: new Date().toISOString().split("T")[0],
      progress: 0,
    };

    const updatedChecklists = [...checklists, newChecklist];
    setChecklists(updatedChecklists);

    // Save to localStorage
    localStorage.setItem("userChecklists", JSON.stringify(updatedChecklists));

    // Set as selected and close service selection
    setSelectedChecklist(newChecklist);
    setShowServiceSelection(false);
    setIsFirstVisit(false);
  };

  const addChecklist = () => {
    if (!newChecklistName.trim()) return;

    const newChecklist = {
      id: Date.now(),
      name: newChecklistName,
      service: "Custom",
      items: [],
      createdAt: new Date().toISOString().split("T")[0],
      progress: 0,
    };

    const updatedChecklists = [...checklists, newChecklist];
    setChecklists(updatedChecklists);

    // Save to localStorage
    localStorage.setItem("userChecklists", JSON.stringify(updatedChecklists));

    setNewChecklistName("");
    setShowAddChecklist(false);
  };

  const deleteChecklist = (checklistId) => {
    const updatedChecklists = checklists.filter(
      (checklist) => checklist.id !== checklistId
    );
    setChecklists(updatedChecklists);
    localStorage.setItem("userChecklists", JSON.stringify(updatedChecklists));

    if (selectedChecklist?.id === checklistId) {
      setSelectedChecklist(null);
    }

    // Show service selection if no checklists remain and no service parameter
    const serviceId = searchParams.get("service");
    if (updatedChecklists.length === 0 && !serviceId) {
      setShowServiceSelection(true);
    }
  };

  const getProgressColor = (progress) => {
    if (progress === 100) return "#10b981";
    if (progress >= 50) return "#f59e0b";
    return "#ef4444";
  };

  const getStatusText = (progress) => {
    if (progress === 100) return t("checklist.completed");
    if (progress > 0) return t("checklist.inProgress");
    return t("checklist.notStarted");
  };

  // Print checklist functionality
  const printChecklist = () => {
    if (!currentChecklist) {
      alert("Please select a checklist to print");
      return;
    }

    const printWindow = window.open("", "_blank");
    const printContent = generatePrintContent(currentChecklist);

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  // Download checklist functionality
  const downloadChecklist = () => {
    if (!currentChecklist) {
      alert("Please select a checklist to download");
      return;
    }

    const content = generateDownloadContent(currentChecklist);
    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${currentChecklist.name.replace(
      /\s+/g,
      "_"
    )}_checklist.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // Generate print content
  const generatePrintContent = (checklist) => {
    const sections = organizeItemsIntoSections(checklist.items);
    const currentDate = new Date().toLocaleDateString();

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${checklist.name} - Document Checklist</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .header h1 { color: #1f2937; margin-bottom: 10px; }
            .header p { color: #6b7280; }
            .section { margin-bottom: 25px; }
            .section-title { font-size: 18px; font-weight: bold; color: #1f2937; margin-bottom: 15px; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px; }
            .item { margin-bottom: 10px; display: flex; align-items: center; }
            .checkbox { margin-right: 10px; font-size: 16px; }
            .completed { text-decoration: line-through; color: #9ca3af; }
            .progress { margin-top: 20px; text-align: center; font-weight: bold; color: #3b82f6; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${checklist.name}</h1>
            <p>Document Checklist - Generated on ${currentDate}</p>
          </div>
          
          ${
            sections.documents.length > 0
              ? `
            <div class="section">
              <div class="section-title">Documents</div>
              ${sections.documents
                .map(
                  (item) => `
                <div class="item">
                  <span class="checkbox">☐</span>
                  <span class="${item.completed ? "completed" : ""}">${
                    item.text
                  }</span>
                </div>
              `
                )
                .join("")}
            </div>
          `
              : ""
          }
          
          ${
            sections.photographs.length > 0
              ? `
            <div class="section">
              <div class="section-title">Photographs</div>
              ${sections.photographs
                .map(
                  (item) => `
                <div class="item">
                  <span class="checkbox">☐</span>
                  <span class="${item.completed ? "completed" : ""}">${
                    item.text
                  }</span>
                </div>
              `
                )
                .join("")}
            </div>
          `
              : ""
          }
          
          ${
            sections.additional.length > 0
              ? `
            <div class="section">
              <div class="section-title">Additional Documents</div>
              ${sections.additional
                .map(
                  (item) => `
                <div class="item">
                  <span class="checkbox">☐</span>
                  <span class="${item.completed ? "completed" : ""}">${
                    item.text
                  }</span>
                </div>
              `
                )
                .join("")}
            </div>
          `
              : ""
          }
          
          <div class="progress">
            Progress: ${checklist.progress}% Complete
          </div>
        </body>
      </html>
    `;
  };

  // Generate download content
  const generateDownloadContent = (checklist) => {
    const sections = organizeItemsIntoSections(checklist.items);
    const currentDate = new Date().toLocaleDateString();

    let content = `${checklist.name} - Document Checklist\n`;
    content += `Generated on: ${currentDate}\n`;
    content += `Service: ${checklist.service}\n`;
    content += `Progress: ${checklist.progress}% Complete\n\n`;

    if (sections.documents.length > 0) {
      content += `DOCUMENTS:\n`;
      content += `${"=".repeat(20)}\n`;
      sections.documents.forEach((item) => {
        content += `☐ ${item.text}${item.completed ? " ✓" : ""}\n`;
      });
      content += `\n`;
    }

    if (sections.photographs.length > 0) {
      content += `PHOTOGRAPHS:\n`;
      content += `${"=".repeat(20)}\n`;
      sections.photographs.forEach((item) => {
        content += `☐ ${item.text}${item.completed ? " ✓" : ""}\n`;
      });
      content += `\n`;
    }

    if (sections.additional.length > 0) {
      content += `ADDITIONAL DOCUMENTS:\n`;
      content += `${"=".repeat(20)}\n`;
      sections.additional.forEach((item) => {
        content += `☐ ${item.text}${item.completed ? " ✓" : ""}\n`;
      });
      content += `\n`;
    }

    content += `\nTotal Items: ${checklist.items.length}\n`;
    content += `Completed Items: ${
      checklist.items.filter((item) => item.completed).length
    }\n`;
    content += `Remaining Items: ${
      checklist.items.filter((item) => !item.completed).length
    }\n`;

    return content;
  };

  // Get current checklist or create a default one
  const currentChecklist = selectedChecklist
    ? checklists.find((c) => c.id === selectedChecklist.id) || selectedChecklist
    : checklists.length > 0
    ? checklists[0]
    : null;

  // Organize items into sections
  const organizeItemsIntoSections = (items) => {
    const documents = [];
    const photographs = [];
    const additional = [];

    items.forEach((item) => {
      const text = item.text.toLowerCase();
      if (
        text.includes("photo") ||
        text.includes("photograph") ||
        text.includes("picture")
      ) {
        photographs.push(item);
      } else if (
        text.includes("certificate") ||
        text.includes("card") ||
        text.includes("passport") ||
        text.includes("birth") ||
        text.includes("identity")
      ) {
        documents.push(item);
      } else {
        additional.push(item);
      }
    });

    return { documents, photographs, additional };
  };

  const sections = currentChecklist
    ? organizeItemsIntoSections(currentChecklist.items)
    : { documents: [], photographs: [], additional: [] };

  return (
    <div className="document-checklist-page">
      <div className="container">
        {/* Header */}
        <div className="checklist-header">
          <h1>{t("checklist.title")}</h1>
          <div className="header-actions">
            <button
              className="btn btn-outline btn-action"
              onClick={printChecklist}
              disabled={!currentChecklist}
            >
              <FaPrint className="btn-icon" />
              {t("checklist.printChecklist")}
            </button>
            <button
              className="btn btn-outline btn-action"
              onClick={downloadChecklist}
              disabled={!currentChecklist}
            >
              <FaDownload className="btn-icon" />
              {t("checklist.downloadChecklist")}
            </button>
          </div>
        </div>

        {/* Service Selection Dropdown */}
        <div className="service-selection">
          <div className="dropdown-container">
            <select
              value={currentChecklist?.id || ""}
              onChange={(e) => {
                const checklist = checklists.find(
                  (c) => c.id === parseInt(e.target.value)
                );
                setSelectedChecklist(checklist);
              }}
              className="service-dropdown"
            >
              <option value="">{t("checklist.selectService")}</option>
              {checklists.map((checklist) => (
                <option key={checklist.id} value={checklist.id}>
                  {checklist.name}
                </option>
              ))}
            </select>
            <FaChevronDown className="dropdown-icon" />
          </div>
        </div>

        {/* Checklist Content */}
        {currentChecklist && (
          <div className="checklist-content">
            {/* Service Header - Show when coming from service detail page */}
            {searchParams.get("service") && (
              <div className="service-header">
                <h2 className="service-title">{currentChecklist.name}</h2>
                <div className="service-meta">
                  <span className="service-progress">
                    {currentChecklist.progress}% {t("checklist.completed")}
                  </span>
                </div>
              </div>
            )}
            {/* Documents Section */}
            {sections.documents.length > 0 && (
              <div className="checklist-section">
                <h2 className="section-title">{t("checklist.documents")}</h2>
                <div className="items-list">
                  {sections.documents.map((item) => (
                    <div key={item.id} className="checklist-item">
                      <FaDocument className="item-icon" />
                      <span
                        className={`item-text ${
                          item.completed ? "completed" : ""
                        }`}
                      >
                        {item.text}
                      </span>
                      <button
                        className={`item-checkbox ${
                          item.completed ? "completed" : ""
                        }`}
                        onClick={() => toggleItem(currentChecklist.id, item.id)}
                      >
                        {item.completed ? (
                          <FaCheckCircle className="check-icon" />
                        ) : (
                          <FaCircle className="check-icon" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Photographs Section */}
            {sections.photographs.length > 0 && (
              <div className="checklist-section">
                <h2 className="section-title">{t("checklist.photographs")}</h2>
                <div className="items-list">
                  {sections.photographs.map((item) => (
                    <div key={item.id} className="checklist-item">
                      <FaCamera className="item-icon" />
                      <span
                        className={`item-text ${
                          item.completed ? "completed" : ""
                        }`}
                      >
                        {item.text}
                      </span>
                      <button
                        className={`item-checkbox ${
                          item.completed ? "completed" : ""
                        }`}
                        onClick={() => toggleItem(currentChecklist.id, item.id)}
                      >
                        {item.completed ? (
                          <FaCheckCircle className="check-icon" />
                        ) : (
                          <FaCircle className="check-icon" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Documents Section */}
            {sections.additional.length > 0 && (
              <div className="checklist-section">
                <h2 className="section-title">
                  {t("checklist.additionalDocuments")}
                </h2>
                <div className="items-list">
                  {sections.additional.map((item) => (
                    <div key={item.id} className="checklist-item">
                      <FaDocument className="item-icon" />
                      <span
                        className={`item-text ${
                          item.completed ? "completed" : ""
                        }`}
                      >
                        {item.text}
                      </span>
                      <button
                        className={`item-checkbox ${
                          item.completed ? "completed" : ""
                        }`}
                        onClick={() => toggleItem(currentChecklist.id, item.id)}
                      >
                        {item.completed ? (
                          <FaCheckCircle className="check-icon" />
                        ) : (
                          <FaCircle className="check-icon" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* No Checklist Message */}
        {!currentChecklist && (
          <div className="no-checklist-message">
            <p>{t("checklist.noChecklistSelected")}</p>
            <button
              className="btn btn-primary"
              onClick={() => setShowServiceSelection(true)}
            >
              {t("checklist.createNewChecklist")}
            </button>
          </div>
        )}

        {/* Service Selection Modal */}
        {showServiceSelection && (
          <div className="modal-overlay">
            <div className="service-selection-modal">
              <div className="modal-header">
                <h2>{t("checklist.selectService")}</h2>
                <p>{t("checklist.selectServiceDesc")}</p>
                {checklists.length === 0 && (
                  <div className="no-checklists-message">
                    <p>{t("checklist.noChecklistsMessage")}</p>
                  </div>
                )}
              </div>

              <div className="services-grid-modal">
                {servicesData.map((service) => (
                  <div
                    key={service.id}
                    className="service-card-modal"
                    onClick={() => createChecklistFromService(service)}
                  >
                    <div className="service-icon-modal">
                      <span className="service-emoji">{service.icon}</span>
                    </div>
                    <div className="service-info-modal">
                      <h3>{service.name}</h3>
                      <p className="service-category">{service.category}</p>
                      <div className="service-docs-count">
                        {service.requiredDocuments.length}{" "}
                        {t("checklist.requiredDocuments")}
                      </div>
                    </div>
                    <div className="service-arrow">
                      <FaArrowLeft className="arrow-icon" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    // Only allow skipping if user has existing checklists
                    if (checklists.length > 0) {
                      setShowServiceSelection(false);
                    }
                  }}
                  disabled={checklists.length === 0}
                  style={{
                    opacity: checklists.length === 0 ? 0.5 : 1,
                    cursor: checklists.length === 0 ? "not-allowed" : "pointer",
                  }}
                >
                  {t("checklist.skipForNow")}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Checklist Modal */}
        {showAddChecklist && (
          <div
            className="modal-overlay"
            onClick={() => setShowAddChecklist(false)}
          >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>{t("checklist.createNewChecklist")}</h3>
              <input
                type="text"
                placeholder={t("checklist.checklistNamePlaceholder")}
                value={newChecklistName}
                onChange={(e) => setNewChecklistName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addChecklist()}
                className="modal-input"
              />
              <div className="modal-actions">
                <button
                  className="btn btn-outline"
                  onClick={() => setShowAddChecklist(false)}
                >
                  {t("checklist.cancel")}
                </button>
                <button className="btn btn-primary" onClick={addChecklist}>
                  {t("checklist.create")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentChecklist;
