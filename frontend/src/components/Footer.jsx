import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>TalkGov</h3>
            <p>{t("footer.description")}</p>
            <div className="social-icons">
              <a href="#" className="social-icon">
                <FaFacebook />
              </a>
              <a href="#" className="social-icon">
                <FaTwitter />
              </a>
              <a href="#" className="social-icon">
                <FaInstagram />
              </a>
              <a href="#" className="social-icon">
                <FaYoutube />
              </a>
            </div>
          </div>
          <div className="footer-links">
            <h4>{t("footer.quickLinks")}</h4>
            <ul>
              <li>
                <Link to="/about">{t("nav.about")}</Link>
              </li>
              <li>
                <Link to="/services">{t("nav.services")}</Link>
              </li>
              <li>
                <Link to="/contact">{t("nav.contact")}</Link>
              </li>
              <li>
                <a href="#">{t("footer.feedback")}</a>
              </li>
            </ul>
          </div>
          <div className="footer-legal">
            <h4>{t("footer.legal")}</h4>
            <ul>
              <li>
                <a href="#">{t("footer.privacyPolicy")}</a>
              </li>
              <li>
                <a href="#">{t("footer.termsOfService")}</a>
              </li>
              <li>
                <a href="#">{t("footer.accessibility")}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
