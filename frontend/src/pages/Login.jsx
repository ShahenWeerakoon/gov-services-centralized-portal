import React, { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
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
import Toast from "../components/Toast";
import "../styles/Auth.css";

const Login = ({ onLogin }) => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Clear specific field error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }

    // Clear general error when user starts typing
    if (errors.general) {
      setErrors({ ...errors, general: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = t("auth.usernameRequired");
    }

    if (!formData.password) {
      newErrors.password = t("auth.passwordRequired");
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
        {
          withCredentials: true,
          timeout: 10000, // 10 second timeout
        }
      );

      const user = response.data.user || response.data;
      const token = response.data.token || null;

      onLogin(user, token);

      // Show success toast
      setToastMessage(t("auth.loginSuccess"));
      setShowToast(true);

      // Redirect to return URL if provided, otherwise go to home
      const returnUrl = searchParams.get("return");
      if (returnUrl) {
        navigate(decodeURIComponent(returnUrl));
      } else {
        navigate("/");
      }
    } catch (error) {
      // Handle different types of errors
      if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const data = error.response.data;

        if (status === 401) {
          // Unauthorized - wrong credentials
          setErrors({
            general: t("auth.invalidCredentials"),
          });
        } else if (status === 400) {
          // Bad request - validation errors
          if (data && typeof data === "object") {
            // Check if it's a validation error with "Invalid credentials"
            if (
              data.non_field_errors &&
              data.non_field_errors.includes("Invalid credentials")
            ) {
              setErrors({
                general: t("auth.invalidCredentials"),
              });
            } else {
              const normalizedErrors = Object.fromEntries(
                Object.entries(data).map(([key, value]) => [
                  key,
                  Array.isArray(value) ? value[0] : value,
                ])
              );
              setErrors(normalizedErrors);
            }
          } else {
            setErrors({
              general: t("auth.loginError"),
            });
          }
        } else if (status >= 500) {
          // Server error
          setErrors({
            general: t("auth.loginError"),
          });
        } else {
          // Other client errors
          setErrors({
            general: t("auth.loginError"),
          });
        }
      } else if (error.request) {
        // Network error - server not responding
        if (error.code === "ECONNABORTED") {
          setErrors({
            general:
              "Connection timeout. Please check your internet connection and try again.",
          });
        } else {
          setErrors({
            general: t("auth.loginError"),
          });
        }
      } else {
        // Other errors
        setErrors({
          general: t("auth.loginError"),
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

      {/* Success Toast */}
      {showToast && (
        <Toast
          message={toastMessage}
          type="success"
          duration={3000}
          position="top-right"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default Login;
