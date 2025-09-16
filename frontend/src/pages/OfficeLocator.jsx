import React, { useState, useEffect } from "react";
import {
  MapPin,
  Search,
  Phone,
  Clock,
  Navigation,
  Building,
} from "lucide-react";

const SriLankaGovOfficeLocator = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [offices, setOffices] = useState([]);
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [loading, setLoading] = useState(false);

  // Sri Lankan provinces and districts
  const provinces = {
    Western: ["Colombo", "Gampaha", "Kalutara"],
    Central: ["Kandy", "Matale", "Nuwara Eliya"],
    Southern: ["Galle", "Matara", "Hambantota"],
    Northern: ["Jaffna", "Kilinochchi", "Mannar", "Vavuniya", "Mullaitivu"],
    Eastern: ["Trincomalee", "Batticaloa", "Ampara"],
    "North Western": ["Kurunegala", "Puttalam"],
    "North Central": ["Anuradhapura", "Polonnaruwa"],
    Uva: ["Badulla", "Moneragala"],
    Sabaragamuwa: ["Ratnapura", "Kegalle"],
  };

  // Sample government offices data (replace with API calls to your Django backend)
  const sampleOffices = [
    {
      id: 1,
      name: "Registrar General's Department",
      type: "Birth and Death Registration",
      address: "Independence Square, Colombo 7",
      district: "Colombo",
      province: "Western",
      phone: "+94 11 2691307",
      hours: "8:30 AM - 4:15 PM",
      services: [
        "Birth Certificates",
        "Death Certificates",
        "Marriage Registration",
      ],
      coordinates: { lat: 6.9034, lng: 79.8737 },
    },
    {
      id: 2,
      name: "Department of Immigration & Emigration",
      type: "Immigration Services",
      address: "Colombo 10",
      district: "Colombo",
      province: "Western",
      phone: "+94 11 2329000",
      hours: "8:30 AM - 4:30 PM",
      services: [
        "Passport Services",
        "Visa Processing",
        "Immigration Clearance",
      ],
      coordinates: { lat: 6.9271, lng: 79.8612 },
    },
    {
      id: 3,
      name: "Department of Motor Traffic",
      type: "Vehicle Registration",
      address: "Werahera, Boralesgamuwa",
      district: "Colombo",
      province: "Western",
      phone: "+94 11 2873873",
      hours: "8:30 AM - 4:30 PM",
      services: ["Driving License", "Vehicle Registration", "Revenue License"],
      coordinates: { lat: 6.8374, lng: 79.9037 },
    },
    {
      id: 4,
      name: "Divisional Secretariat - Negombo",
      type: "Administrative Services",
      address: "Main Street, Negombo",
      district: "Gampaha",
      province: "Western",
      phone: "+94 31 2222261",
      hours: "8:30 AM - 4:15 PM",
      services: ["Grama Niladhari Services", "Samurdhi", "Social Services"],
      coordinates: { lat: 7.2084, lng: 79.8358 },
    },
    {
      id: 5,
      name: "Department of Survey",
      type: "Land Survey Services",
      address: "Kirula Road, Narahenpita, Colombo 5",
      district: "Colombo",
      province: "Western",
      phone: "+94 11 2368431",
      hours: "8:30 AM - 4:15 PM",
      services: ["Land Survey", "Property Mapping", "Survey Records"],
      coordinates: { lat: 6.8936, lng: 79.8792 },
    },
  ];

  useEffect(() => {
    // Initialize with sample data
    setOffices(sampleOffices);
  }, []);

  const handleSearch = async () => {
    setLoading(true);

    // In a real implementation, this would be an API call to your Django backend
    // Example: const response = await fetch(`/api/offices/search?q=${searchQuery}&province=${selectedProvince}&district=${selectedDistrict}`);

    let filteredOffices = sampleOffices.filter((office) => {
      const matchesSearch =
        searchQuery === "" ||
        office.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        office.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        office.services.some((service) =>
          service.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesProvince =
        selectedProvince === "" || office.province === selectedProvince;
      const matchesDistrict =
        selectedDistrict === "" || office.district === selectedDistrict;

      return matchesSearch && matchesProvince && matchesDistrict;
    });

    setTimeout(() => {
      setOffices(filteredOffices);
      setLoading(false);
    }, 500);
  };

  const getDirections = (office) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${office.coordinates.lat},${office.coordinates.lng}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-600">TalkGov</div>
              <div className="ml-2 text-sm text-gray-500">Sri Lanka</div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-blue-600">
                Home
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                Services
              </a>
              <a href="#" className="text-blue-600 font-medium">
                Office Locator
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                Document Checklist
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                Contact
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <select className="text-sm border rounded px-2 py-1">
                <option>සිංහල</option>
                <option>English</option>
                <option>தமிழ்</option>
              </select>
              <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Government Office Locator
          </h1>
          <p className="text-gray-600">
            Find government offices near you and get all the information you
            need to visit them.
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search Services
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by service or office name"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Province
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedProvince}
                onChange={(e) => {
                  setSelectedProvince(e.target.value);
                  setSelectedDistrict(""); // Reset district when province changes
                }}
              >
                <option value="">All Provinces</option>
                {Object.keys(provinces).map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                District
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                disabled={!selectedProvince}
              >
                <option value="">All Districts</option>
                {selectedProvince &&
                  provinces[selectedProvince].map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                disabled={loading}
              >
                {loading ? "Searching..." : "Find Offices"}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Results List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Search Results ({offices.length} offices found)
                </h2>
              </div>

              <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                {offices.map((office) => (
                  <div
                    key={office.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer transition duration-200 ${
                      selectedOffice?.id === office.id
                        ? "bg-blue-50 border-l-4 border-blue-500"
                        : ""
                    }`}
                    onClick={() => setSelectedOffice(office)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">
                          {office.name}
                        </h3>
                        <p className="text-sm text-blue-600 mb-2">
                          {office.type}
                        </p>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          {office.address}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-1" />
                          {office.hours}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          getDirections(office);
                        }}
                        className="ml-4 p-2 text-blue-600 hover:bg-blue-100 rounded-full"
                      >
                        <Navigation className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Office Details Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Office Details
              </h3>

              {selectedOffice ? (
                <div>
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      {selectedOffice.name}
                    </h4>
                    <p className="text-sm text-blue-600 mb-3">
                      {selectedOffice.type}
                    </p>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 text-gray-400 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-900">
                          {selectedOffice.address}
                        </p>
                        <p className="text-xs text-gray-500">
                          {selectedOffice.district}, {selectedOffice.province}{" "}
                          Province
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <a
                        href={`tel:${selectedOffice.phone}`}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {selectedOffice.phone}
                      </a>
                    </div>

                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-2" />
                      <p className="text-sm text-gray-600">
                        {selectedOffice.hours}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="font-medium text-gray-900 mb-2">
                      Services Available
                    </h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {selectedOffice.services.map((service, index) => (
                        <li key={index} className="flex items-center">
                          <Building className="h-3 w-3 text-blue-500 mr-2" />
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => getDirections(selectedOffice)}
                    className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200 flex items-center justify-center"
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Get Directions
                  </button>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <Building className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <p>Select an office from the list to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="bg-gray-100 rounded h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Interactive Map</p>
              <p className="text-sm text-gray-400">
                Integrate with Google Maps API or similar
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficeLocator;
