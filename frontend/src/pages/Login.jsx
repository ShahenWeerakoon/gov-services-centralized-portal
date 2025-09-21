import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaBuilding,
  FaUsers,
  FaClipboardCheck,
  FaRobot,
} from "react-icons/fa";
import "../styles/Auth.css";

const Login = ({ onLogin }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username or email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/login/",
        formData,
        { withCredentials: true }
      );

      const user = response.data.user || response.data;
      const token = response.data.token || null;

      onLogin(user, token);
    } catch (error) {
      if (error.response && error.response.data) {
        const normalizedErrors = Object.fromEntries(
          Object.entries(error.response.data).map(([key, value]) => [
            key,
            Array.isArray(value) ? value[0] : value,
          ])
        );
        setErrors(normalizedErrors);
      } else {
        setErrors({
          general: "Invalid credentials. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Placeholder for Google OAuth integration
    console.log("Google login clicked");
  };

  return (
    <div className="auth-page">
      {/* Left Panel - Promotional Section */}
      <div className="auth-left-panel">
        <div className="promotional-content">
          <div className="illustration-container">
            <div className="main-illustration">
              <div className="student-figure">
                <div className="student-head"></div>
                <div className="student-body"></div>
                <div className="student-arm"></div>
              </div>
              <div className="desk">
                <div className="papers">
                  <div className="paper paper-1"></div>
                  <div className="paper paper-2"></div>
                  <div className="paper paper-3"></div>
                </div>
              </div>
              <div className="backpack"></div>
              <div className="plant"></div>
            </div>

            {/* Floating Academic Elements */}
            <div className="floating-elements">
              <div className="math-symbol">f(x)</div>
              <div className="math-symbol">√x</div>
              <div className="math-symbol">π</div>
              <div className="math-symbol">x²</div>
              <div className="math-symbol">(x,y)</div>
              <div className="math-symbol">(a,b)</div>
              <div className="math-symbol">x-y</div>
              <div className="math-symbol">a⁴</div>
              <div className="icon-element clock">🕐</div>
              <div className="icon-element clock">🕑</div>
              <div className="icon-element gear">⚙️</div>
              <div className="shape triangle"></div>
              <div className="shape cube"></div>
            </div>
          </div>

          <div className="promotional-text">
            <h1>TalkGov</h1>
            <p>
              Your gateway to Sri Lankan government services. Simple, fast, and
              accessible.
            </p>
          </div>

          <div className="pagination-dots">
            <div className="dot active"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="auth-right-panel">
        <div className="auth-form-container">
          <div className="form-section">
            <h2>{t("auth.welcomeBack")}</h2>
            <p className="form-subtitle">{t("auth.signInSubtitle")}</p>

            <form onSubmit={handleSubmit}>
              {errors.general && (
                <div className="error-message">{errors.general}</div>
              )}

              <div className="form-group">
                <label htmlFor="username">
                  <FaUser className="input-icon" />
                  {t("auth.username")}
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder={t("auth.username")}
                  className={errors.username ? "error-input" : ""}
                  required
                />
                {errors.username && (
                  <span className="error">{errors.username}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  <FaLock className="input-icon" />
                  {t("auth.password")}
                </label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={t("auth.password")}
                    className={errors.password ? "error-input" : ""}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className="forgot-password">
                  <Link to="/forgot-password">{t("auth.forgotPassword")}</Link>
                </div>
                {errors.password && (
                  <span className="error">{errors.password}</span>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? "Signing in..." : t("nav.login")}
              </button>
            </form>

            <div className="divider">
              <span>{t("auth.or")}</span>
            </div>

            <button
              type="button"
              className="btn btn-google"
              onClick={handleGoogleLogin}
            >
              <FaGoogle className="google-icon" />
              {t("auth.signInWithGoogle")}
            </button>

            <div className="auth-switch">
              <p>
                {t("auth.dontHaveAccount")}{" "}
                <Link to="/register">{t("auth.signUpHere")}</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
