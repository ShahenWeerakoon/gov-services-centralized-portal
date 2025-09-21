import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { offices } from "../data/offices";
import L from "leaflet";
import {
  FaMapMarkerAlt,
  FaSearch,
  FaPhone,
  FaEnvelope,
  FaMapPin,
  FaBuilding,
} from "react-icons/fa";
import "../styles/MapPage.css";

// Fix default marker icon issue in Leaflet + React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Center map when a location is selected
const MapUpdater = ({ position }) => {
  const map = useMap();
  if (position) {
    map.setView(position, 15);
  }
  return null;
};

const MapPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");

  // Filter offices by city or office name
  const filteredOffices = offices.filter(
    (office) =>
      office.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group offices by city
  const officesByCity = filteredOffices.reduce((groups, office) => {
    const city = office.city;
    if (!groups[city]) groups[city] = [];
    groups[city].push(office);
    return groups;
  }, {});

  // Get unique cities for filter
  const cities = [...new Set(offices.map((office) => office.city))];

  const handleSelectOffice = (office) => {
    setSelectedOffice(office);
  };

  const handleCityFilter = (city) => {
    setSelectedCity(city);
    setSearchTerm(city);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCity("");
    setSelectedOffice(null);
  };

  return (
    <div className="office-locator">
      {/* City Filter Bar */}
      <div className="city-filter-section">
        <div className="filter-container">
          <div className="filter-title">
            <FaMapMarkerAlt className="filter-icon" />
            <span>Filter by City</span>
          </div>
          <div className="city-buttons">
            <button
              className={`city-btn ${selectedCity === "" ? "active" : ""}`}
              onClick={clearFilters}
            >
              All Cities
            </button>
            {cities.map((city) => (
              <button
                key={city}
                className={`city-btn ${selectedCity === city ? "active" : ""}`}
                onClick={() => handleCityFilter(city)}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="office-content">
        {/* Office List Section */}
        <div className="office-list-section">
          <div className="office-list-header">
            <div className="list-title">
              <FaBuilding className="list-icon" />
              <h2>Available Offices</h2>
            </div>
            <div className="office-stats">
              <span className="total-offices">
                {offices.length} Total Offices
              </span>
              <span className="cities-count">{cities.length} Cities</span>
            </div>
          </div>

          <div className="office-grid">
            {Object.keys(officesByCity).map((city) => (
              <div key={city} className="city-section">
                <div className="city-header">
                  <FaMapMarkerAlt className="city-icon" />
                  <h3>{city}</h3>
                  <span className="city-badge">
                    {officesByCity[city].length}
                  </span>
                </div>
                <div className="offices-grid">
                  {officesByCity[city].map((office) => (
                    <div
                      key={office.id}
                      onClick={() => handleSelectOffice(office)}
                      className={`office-card-header-only ${
                        selectedOffice?.id === office.id ? "selected" : ""
                      }`}
                    >
                      <div className="office-header-content">
                        <h4>{office.name}</h4>
                        <div className="office-type">Government Office</div>
                      </div>
                      <div className="office-select-indicator">
                        {selectedOffice?.id === office.id ? (
                          <div className="selected-indicator">✓</div>
                        ) : (
                          <div className="select-indicator">→</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="map-section">
          <div className="map-header">
            <div className="map-header-content">
              <FaMapMarkerAlt className="map-header-icon" />
              <h3>Interactive Map</h3>
            </div>
            <p>Click office names to view details</p>
          </div>

          <div className="map-container">
            <MapContainer center={[6.9271, 79.8612]} zoom={7} className="map">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />

              {filteredOffices.map((office) => (
                <Marker
                  key={office.id}
                  position={[office.latitude, office.longitude]}
                >
                  <Popup className="custom-popup">
                    <div className="popup-content">
                      <h4>{office.name}</h4>
                      <p>{office.address}</p>
                      {office.phone && (
                        <p>
                          <FaPhone /> {office.phone}
                        </p>
                      )}
                      {office.email && (
                        <p>
                          <FaEnvelope /> {office.email}
                        </p>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}

              {selectedOffice && (
                <MapUpdater
                  position={[selectedOffice.latitude, selectedOffice.longitude]}
                />
              )}
            </MapContainer>
          </div>
        </div>
      </div>

      {/* Floating Selected Office Details */}
      {selectedOffice && (
        <div className="floating-office-details">
          <div className="floating-header">
            <FaBuilding className="floating-icon" />
            <h4>{selectedOffice.name}</h4>
            <button
              className="close-btn"
              onClick={() => setSelectedOffice(null)}
            >
              ×
            </button>
          </div>
          <div className="floating-content">
            <div className="floating-detail-item">
              <FaMapMarkerAlt className="floating-detail-icon" />
              <span>{selectedOffice.address}</span>
            </div>
            {selectedOffice.phone && (
              <div className="floating-detail-item">
                <FaPhone className="floating-detail-icon" />
                <span>{selectedOffice.phone}</span>
              </div>
            )}
            {selectedOffice.email && (
              <div className="floating-detail-item">
                <FaEnvelope className="floating-detail-icon" />
                <span>{selectedOffice.email}</span>
              </div>
            )}
            <div className="floating-detail-item">
              <FaMapMarkerAlt className="floating-detail-icon" />
              <span>{selectedOffice.city}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapPage;
