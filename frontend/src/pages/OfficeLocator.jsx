import React, { useState, useEffect } from "react";
import { Search, MapPin, Phone, Clock, Navigation } from "lucide-react";
import OfficeLocator from "./pages/OfficeLocator";
import "../styles/OfficeLocator.css";

const OfficeLocator = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [offices, setOffices] = useState([]);
  const [filteredOffices, setFilteredOffices] = useState([]);
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data - Replace with actual API call
  const mockOffices = [
    {
      id: 1,
      name: "Registrar General's Department",
      address: "234/A, Dewal kobbkaduwa Mawatha, Battaramulla, Colombo",
      phone: "+94 11 2861498",
      coordinates: { lat: 6.9031, lng: 79.8612 },
      workingHours: "8:00 AM - 4:00 PM",
      services: [
        "Birth Certificates",
        "Marriage Certificates",
        "Death Certificates",
      ],
      district: "Colombo",
    },
    {
      id: 2,
      name: "Department of Immigration & Emigration",
      address: "Suhurupaya, 41 Stanleykurua Road, Battaramulla, Colombo",
      phone: "+94 11 5329000",
      coordinates: { lat: 6.9271, lng: 79.9187 },
      workingHours: "8:00 AM - 4:30 PM",
      services: [
        "Passport Services",
        "Visa Applications",
        "Immigration Services",
      ],
      district: "Colombo",
    },
    {
      id: 3,
      name: "Department of Survey",
      address: "150 Kirula Road, Colombo 5",
      phone: "+94 11 2694688",
      coordinates: { lat: 6.8905, lng: 79.8748 },
      workingHours: "8:30 AM - 4:15 PM",
      services: ["Land Surveys", "Maps", "Survey Reports"],
      district: "Colombo",
    },
    {
      id: 4,
      name: "Department of Motor Traffic",
      address: "Werahera, Boralesgamuwa, Rajagiriya",
      phone: "+94 11 2889406",
      coordinates: { lat: 6.8484, lng: 79.8908 },
      workingHours: "8:00 AM - 4:00 PM",
      services: [
        "Driving Licenses",
        "Vehicle Registration",
        "Revenue Licenses",
      ],
      district: "Colombo",
    },
    {
      id: 5,
      name: "Immigration & Emigration Department",
      address: "2nd Fl, Suhurupaya, Battaramulla",
      phone: "+94 11 5329406",
      coordinates: { lat: 6.91, lng: 79.92 },
      workingHours: "8:00 AM - 4:30 PM",
      services: ["Visa Extensions", "Work Permits", "Residence Permits"],
      district: "Colombo",
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOffices(mockOffices);
      setFilteredOffices(mockOffices);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredOffices(offices);
    } else {
      const filtered = offices.filter(
        (office) =>
          office.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          office.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          office.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
          office.services.some((service) =>
            service.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
      setFilteredOffices(filtered);
    }
  }, [searchTerm, offices]);

  const handleSearch = () => {
    // This would typically make an API call
    console.log("Searching for:", searchTerm);
  };

  const handleOfficeSelect = (office) => {
    setSelectedOffice(office);
    // This would update the map view
    console.log("Selected office:", office);
  };

  const getDirections = (office) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${office.coordinates.lat},${office.coordinates.lng}`;
    window.open(url, "_blank");
  };

  if (loading) {
    return (
      <div className="office-locator">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading offices...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="office-locator">
        <div className="error-container">
          <p>Error loading offices: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="office-locator">
      <div className="office-locator-header">
        <h1>Government Office Locator</h1>
        <p>
          Find government offices near you and get all the information you need
          to visit them.
        </p>
      </div>

      <div className="search-container">
        <div className="search-box">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Enter your district or location (e.g., Colombo, Kandy)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Find Offices
          </button>
        </div>
        <div className="popular-searches">
          <span>Popular searches:</span>
          <button
            onClick={() => setSearchTerm("Battaramulla")}
            className="popular-search-tag"
          >
            Battaramulla
          </button>
          <button
            onClick={() => setSearchTerm("Kandy")}
            className="popular-search-tag"
          >
            Kandy
          </button>
          <button
            onClick={() => setSearchTerm("Matara")}
            className="popular-search-tag"
          >
            Matara
          </button>
        </div>
      </div>

      <div className="main-content">
        <div className="map-container">
          <div className="map-placeholder">
            <div className="map-content">
              <MapPin size={48} className="map-icon" />
              <h3>Interactive Map</h3>
              <p>Click on a marker to view office details</p>
              {selectedOffice && (
                <div className="selected-office-info">
                  <h4>{selectedOffice.name}</h4>
                  <p>{selectedOffice.address}</p>
                </div>
              )}
            </div>
          </div>
          <p className="map-instruction">
            Click on a marker to view office details
          </p>
        </div>

        <div className="offices-sidebar">
          <div className="sidebar-header">
            <h2>Nearby Offices</h2>
          </div>

          <div className="offices-list">
            {filteredOffices.map((office) => (
              <div
                key={office.id}
                className={`office-card ${
                  selectedOffice?.id === office.id ? "selected" : ""
                }`}
                onClick={() => handleOfficeSelect(office)}
              >
                <div className="office-header">
                  <h3>{office.name}</h3>
                </div>

                <div className="office-details">
                  <div className="office-detail">
                    <MapPin size={16} className="detail-icon" />
                    <span>{office.address}</span>
                  </div>

                  <div className="office-detail">
                    <Phone size={16} className="detail-icon" />
                    <span>{office.phone}</span>
                  </div>

                  <div className="office-detail">
                    <Clock size={16} className="detail-icon" />
                    <span>{office.workingHours}</span>
                  </div>
                </div>

                <div className="office-services">
                  <strong>Services:</strong>
                  <div className="services-tags">
                    {office.services.map((service, index) => (
                      <span key={index} className="service-tag">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="office-actions">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      getDirections(office);
                    }}
                    className="directions-button"
                  >
                    <Navigation size={16} />
                    Get Directions
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredOffices.length === 0 && (
            <div className="no-results">
              <p>
                No offices found for "{searchTerm}". Try a different search
                term.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfficeLocator;
