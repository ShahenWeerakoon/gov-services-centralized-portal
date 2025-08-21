import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "nav-link active" : "nav-link";
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          TALK<span className="logo-gov">GOV</span>.
        </Link>

        {/* Desktop Nav */}
        <div className="nav-menu">
          <Link to="/" className={isActive("/")}>
            Home
          </Link>
          <Link to="/about" className={isActive("/about")}>
            About
          </Link>
          <Link to="/services" className={isActive("/services")}>
            Services
          </Link>
          <Link to="/office-locator" className={isActive("/office-locator")}>
            Office Locator
          </Link>
          <Link
            to="/document-checklist"
            className={isActive("/document-checklist")}
          >
            Document Checklist
          </Link>
          <Link to="/contact" className={isActive("/contact")}>
            Contact
          </Link>

          {/* Language Selector */}
          <div className="language-selector">
            <span className="globe-icon">🌐</span>
            <span>English</span>
            <span className="dropdown-arrow">▼</span>
          </div>

          {/* User Auth Section */}
          {user ? (
            <div className="nav-user">
              <button onClick={onLogout} className="nav-button logout">
                Log out
              </button>
            </div>
          ) : (
            <div className="nav-auth">
              <button className="nav-button login">Log in</button>
              <Link to="/register" className="nav-button register">
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="mobile-menu-button">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="nav-button mobile-toggle"
            >
              {isMenuOpen ? (
                <span className="menu-icon">✕</span>
              ) : (
                <span className="menu-icon">☰</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-nav">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={isActive("/")}
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className={isActive("/about")}
            >
              About
            </Link>
            <Link
              to="/services"
              onClick={() => setIsMenuOpen(false)}
              className={isActive("/services")}
            >
              Services
            </Link>
            <Link
              to="/office-locator"
              onClick={() => setIsMenuOpen(false)}
              className={isActive("/office-locator")}
            >
              Office Locator
            </Link>
            <Link
              to="/document-checklist"
              onClick={() => setIsMenuOpen(false)}
              className={isActive("/document-checklist")}
            >
              Document Checklist
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className={isActive("/contact")}
            >
              Contact
            </Link>

            <div className="mobile-auth">
              <div className="language-selector mobile">
                <span className="globe-icon">🌐</span>
                <span>English</span>
                <span className="dropdown-arrow">▼</span>
              </div>

              {user ? (
                <button
                  onClick={() => {
                    onLogout();
                    setIsMenuOpen(false);
                  }}
                  className="nav-button logout"
                >
                  Log out
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="nav-button login"
                  >
                    Log in
                  </button>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="nav-button register"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
