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
          TALKGOV
        </Link>

        {/* Desktop Nav */}
        <div className="nav-menu">
          <Link to="/" className={isActive("/")}>
            Home
          </Link>
          <Link to="/about" className={isActive("/about")}>
            About
          </Link>
          <Link to="/contact" className={isActive("/contact")}>
            Contact
          </Link>

          {/* Language Button */}
          <button className="nav-button language">🌐 English</button>

          {/* User Auth Section */}
          {user ? (
            <div className="nav-user">
              <span className="nav-welcome">Welcome, {user.username}!</span>
              <button onClick={onLogout} className="nav-button logout">
                Logout
              </button>
            </div>
          ) : (
            <div className="nav-auth">
              <Link to="/login" className="nav-button">
                Login
              </Link>
              <Link to="/register" className="nav-button register">
                Register
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
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className={isActive("/contact")}
            >
              Contact
            </Link>

            <div className="mobile-auth">
              <button className="nav-button language">🌐 English</button>

              {user ? (
                <>
                  <span className="nav-welcome mobile">
                    Welcome, {user.username}!
                  </span>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMenuOpen(false);
                    }}
                    className="nav-button logout"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="nav-button"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="nav-button register"
                  >
                    Register
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
