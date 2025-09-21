import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import "./App.css";
import "./i18n";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ServiceDetail from "./pages/ServiceDetail";
import Services from "./pages/Services";
import MapPage from "./pages/MapPage";

// Set up axios base URL
axios.defaults.baseURL = "http://localhost:8000/api";

// Component to conditionally render footer
const ConditionalFooter = () => {
  const location = useLocation();
  const noFooterPages = ["/login", "/register"];

  if (noFooterPages.includes(location.pathname)) {
    return null;
  }

  return <Footer />;
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
      // Verify token is still valid
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("/auth/profile/");
      setUser(response.data);
    } catch (error) {
      console.error("Token invalid");
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (userData, token) => {
    setUser(userData);
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Token ${token}`;
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    axios.post("/auth/logout/").catch(console.error);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Navbar user={user} onLogout={handleLogout} />
        {/* <main className="main-content">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route
              path="/login"
              element={
                !user ? <Login onLogin={handleLogin} /> : <Navigate to="/" />
              }
            />
            <Route
              path="/register"
              element={
                !user ? (
                  <Register onRegister={handleLogin} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services/:serviceId" element={<ServiceDetail />} />
          </Routes>
        </main> */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route
              path="/login"
              element={
                !user ? <Login onLogin={handleLogin} /> : <Navigate to="/" />
              }
            />
            <Route
              path="/register"
              element={
                !user ? (
                  <Register onRegister={handleLogin} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            {/* <Route path="/services/:serviceId" element={<ServiceDetail />} /> */}

            <Route
              path="/services/:serviceId"
              element={<ServiceDetail user={user} />}
            />
            <Route path="/map" element={<MapPage />} />
          </Routes>
        </main>
        <ConditionalFooter />
      </div>
    </Router>
  );
}

export default App;
