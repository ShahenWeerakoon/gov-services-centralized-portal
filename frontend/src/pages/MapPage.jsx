// import React, { useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { offices } from "../data/offices";
// import L from "leaflet";
// import "../styles/MapPage.css";

// // Fix default marker icon issue in Leaflet + React
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// // Component to center map when a location is selected
// const MapUpdater = ({ position }) => {
//   const map = useMap();
//   if (position) {
//     map.setView(position, 15); // Zoom in when a place is selected
//   }
//   return null;
// };

// const MapPage = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedOffice, setSelectedOffice] = useState(null);

//   const filteredOffices = offices.filter((office) =>
//     office.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleSelectOffice = (office) => {
//     setSelectedOffice(office);
//     setSearchTerm(office.name);
//   };

//   return (
//     <div>
//       <h2>Government Offices Map</h2>
//       <input
//         type="text"
//         placeholder="Search for an office..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         style={{ width: "300px", padding: "8px", marginBottom: "10px" }}
//       />

//       <div style={{ marginBottom: "10px" }}>
//         {filteredOffices.map((office) => (
//           <div
//             key={office.id}
//             onClick={() => handleSelectOffice(office)}
//             style={{
//               cursor: "pointer",
//               padding: "5px",
//               borderBottom: "1px solid #ccc",
//             }}
//           >
//             {office.name}
//           </div>
//         ))}
//       </div>

//       <MapContainer
//         center={[6.9271, 79.8612]}
//         zoom={7}
//         style={{ width: "100%", height: "600px" }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//         />

//         {filteredOffices.map((office) => (
//           <Marker
//             key={office.id}
//             position={[office.latitude, office.longitude]}
//           >
//             <Popup>
//               <h4>{office.name}</h4>
//               <p>{office.address}</p>
//             </Popup>
//           </Marker>
//         ))}

//         {selectedOffice && (
//           <MapUpdater
//             position={[selectedOffice.latitude, selectedOffice.longitude]}
//           />
//         )}
//       </MapContainer>
//     </div>
//   );
// };

// export default MapPage;
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { offices } from "../data/offices";
import L from "leaflet";

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

  const handleSelectOffice = (office) => {
    setSelectedOffice(office);
    setSearchTerm(office.city);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Government Offices Map</h2>

      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <input
          type="text"
          placeholder="Search by city or office..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "350px",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {filteredOffices.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          No offices found for "{searchTerm}"
        </p>
      ) : (
        <div style={{ marginBottom: "20px" }}>
          {Object.keys(officesByCity).map((city) => (
            <div key={city} style={{ marginBottom: "10px" }}>
              <h3>{city}</h3>
              {officesByCity[city].map((office) => (
                <div
                  key={office.id}
                  onClick={() => handleSelectOffice(office)}
                  style={{
                    cursor: "pointer",
                    padding: "8px",
                    marginBottom: "5px",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#f0f8ff")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "white")
                  }
                >
                  <strong>{office.name}</strong>
                  <p style={{ margin: "3px 0" }}>{office.address}</p>
                  {office.phone && (
                    <p style={{ margin: "3px 0" }}>Phone: {office.phone}</p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <MapContainer
        center={[6.9271, 79.8612]} // Default center Colombo
        zoom={7}
        style={{ width: "100%", height: "600px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {filteredOffices.map((office) => (
          <Marker
            key={office.id}
            position={[office.latitude, office.longitude]}
          >
            <Popup>
              <strong>{office.name}</strong>
              <p>{office.address}</p>
              {office.phone && <p>Phone: {office.phone}</p>}
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
  );
};

export default MapPage;
