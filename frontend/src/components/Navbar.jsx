import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaGlobe, FaChevronDown } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "../styles/Navbar.css";

const Navbar = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const languages = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "si", name: "Sinhala", nativeName: "සිංහල" },
    { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  ];

  const languageDropdownRef = useRef(null);

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language.code);
    setIsLanguageDropdownOpen(false);
    localStorage.setItem("selectedLanguage", language.name);
  };

  // Get current language name for display
  const getCurrentLanguageName = () => {
    const currentLang = languages.find((lang) => lang.code === i18n.language);
    return currentLang ? currentLang.name : "English";
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target)
      ) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            {t("nav.home")}
          </Link>
          <Link to="/about" className={isActive("/about")}>
            {t("nav.about")}
          </Link>
          <Link to="/services" className={isActive("/services")}>
            {t("nav.services")}
          </Link>
          {/* <Link to="/office-locator" className={isActive("/office-locator")}>
            {t("nav.officeLocator")}
          </Link> */}
          <Link to="/map" className={isActive("/map")}>
            {t("nav.officeLocator") || "Office Locator"}
          </Link>

          <Link
            to="/document-checklist"
            className={isActive("/document-checklist")}
          >
            {t("nav.documentChecklist")}
          </Link>
          <Link to="/contact" className={isActive("/contact")}>
            {t("nav.contact")}
          </Link>

          {/* Language Selector */}
          <div className="language-selector" ref={languageDropdownRef}>
            <div
              className="language-trigger"
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            >
              <FaGlobe className="globe-icon" />
              <span className="language-text">{getCurrentLanguageName()}</span>
              <FaChevronDown
                className={`dropdown-arrow ${
                  isLanguageDropdownOpen ? "open" : ""
                }`}
              />
            </div>

            {isLanguageDropdownOpen && (
              <div className="language-dropdown">
                {languages.map((language) => (
                  <div
                    key={language.code}
                    className={`language-option ${
                      i18n.language === language.code ? "selected" : ""
                    }`}
                    onClick={() => handleLanguageChange(language)}
                  >
                    <span className="language-native">
                      {language.nativeName}
                    </span>
                    <span className="language-english">{language.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* User Auth Section */}
          {user ? (
            <div className="nav-user">
              <button onClick={onLogout} className="nav-button logout">
                {t("nav.logout")}
              </button>
            </div>
          ) : (
            <div className="nav-auth">
              <Link to="/login" className="nav-button login">
                {t("nav.login")}
              </Link>
              <Link to="/register" className="nav-button register">
                {t("nav.signUp")}
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
              {t("nav.home")}
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className={isActive("/about")}
            >
              {t("nav.about")}
            </Link>
            <Link
              to="/services"
              onClick={() => setIsMenuOpen(false)}
              className={isActive("/services")}
            >
              {t("nav.services")}
            </Link>
            {/* <Link
              to="/office-locator"
              onClick={() => setIsMenuOpen(false)}
              className={isActive("/office-locator")}
            >
              {t("nav.officeLocator")}
            </Link> */}
            <Link
              to="/map"
              onClick={() => setIsMenuOpen(false)}
              className={isActive("/map")}
            >
              {t("nav.officeLocator") || "Office Locator"}
            </Link>

            <Link
              to="/document-checklist"
              onClick={() => setIsMenuOpen(false)}
              className={isActive("/document-checklist")}
            >
              {t("nav.documentChecklist")}
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className={isActive("/contact")}
            >
              {t("nav.contact")}
            </Link>

            <div className="mobile-auth">
              <div className="language-selector mobile">
                <div
                  className="language-trigger"
                  onClick={() =>
                    setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
                  }
                >
                  <FaGlobe className="globe-icon" />
                  <span className="language-text">
                    {getCurrentLanguageName()}
                  </span>
                  <FaChevronDown
                    className={`dropdown-arrow ${
                      isLanguageDropdownOpen ? "open" : ""
                    }`}
                  />
                </div>

                {isLanguageDropdownOpen && (
                  <div className="language-dropdown mobile">
                    {languages.map((language) => (
                      <div
                        key={language.code}
                        className={`language-option ${
                          i18n.language === language.code ? "selected" : ""
                        }`}
                        onClick={() => handleLanguageChange(language)}
                      >
                        <span className="language-native">
                          {language.nativeName}
                        </span>
                        <span className="language-english">
                          {language.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {user ? (
                <button
                  onClick={() => {
                    onLogout();
                    setIsMenuOpen(false);
                  }}
                  className="nav-button logout"
                >
                  {t("nav.logout")}
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="nav-button login"
                  >
                    {t("nav.login")}
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="nav-button register"
                  >
                    {t("nav.signUp")}
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
