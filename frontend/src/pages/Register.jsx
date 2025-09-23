import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaEnvelope,
  FaLock,
  FaBuilding,
} from "react-icons/fa";
import "../styles/Auth.css";

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password_confirm: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "", color: "" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    const colors = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#10b981"];

    return {
      strength: strength,
      label: labels[strength - 1] || "",
      color: colors[strength - 1] || "#ef4444",
    };
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Name validation
    if (!formData.first_name.trim()) {
      newErrors.first_name = "First name is required";
    }
    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last name is required";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Confirm password validation
    if (!formData.password_confirm) {
      newErrors.password_confirm = "Please confirm your password";
    } else if (formData.password !== formData.password_confirm) {
      newErrors.password_confirm = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/register/",
        formData,
        { withCredentials: true }
      );

      // Adjust according to backend response structure
      const user = response.data.user || response.data;
      const token = response.data.token || null;

      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (error.response && error.response.data) {
        // Normalize DRF error arrays to strings
        const normalizedErrors = Object.fromEntries(
          Object.entries(error.response.data).map(([key, value]) => [
            key,
            Array.isArray(value) ? value[0] : value,
          ])
        );
        setErrors(normalizedErrors);
      } else {
        setErrors({
          general: "An unexpected error occurred. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
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
              Join thousands of citizens accessing government services
              seamlessly.
            </p>
          </div>

          <div className="pagination-dots">
            <div className="dot"></div>
            <div className="dot active"></div>
            <div className="dot"></div>
          </div>
        </div>
      </div>

      {/* Right Panel - Register Form */}
      <div className="auth-right-panel">
        <div className="auth-form-container">
          <div className="form-section">
            <h2>{t("auth.createAccount")}</h2>
            <p className="form-subtitle">{t("auth.joinSubtitle")}</p>
            {success ? (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h3>Account Created Successfully!</h3>
                <p>Welcome to TalkGov! Redirecting you to login...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {errors.general && (
                  <div className="error-message">{errors.general}</div>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="first_name">
                      <FaUser className="input-icon" />
                      First Name
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      className={errors.first_name ? "error-input" : ""}
                    />
                    {errors.first_name && (
                      <span className="error">{errors.first_name}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="last_name">
                      <FaUser className="input-icon" />
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      className={errors.last_name ? "error-input" : ""}
                    />
                    {errors.last_name && (
                      <span className="error">{errors.last_name}</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="username">
                    <FaUser className="input-icon" />
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Choose a unique username"
                    className={errors.username ? "error-input" : ""}
                    required
                  />
                  {errors.username && (
                    <span className="error">{errors.username}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <FaEnvelope className="input-icon" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className={errors.email ? "error-input" : ""}
                    required
                  />
                  {errors.email && (
                    <span className="error">{errors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="password">
                    <FaLock className="input-icon" />
                    Password
                  </label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a strong password"
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
                  {formData.password && (
                    <div className="password-strength">
                      <div className="strength-bar">
                        <div
                          className="strength-fill"
                          style={{
                            width: `${
                              (getPasswordStrength(formData.password).strength /
                                5) *
                              100
                            }%`,
                            backgroundColor: getPasswordStrength(
                              formData.password
                            ).color,
                          }}
                        ></div>
                      </div>
                      <span
                        className="strength-label"
                        style={{
                          color: getPasswordStrength(formData.password).color,
                        }}
                      >
                        {getPasswordStrength(formData.password).label}
                      </span>
                    </div>
                  )}
                  {errors.password && (
                    <span className="error">{errors.password}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="password_confirm">
                    <FaLock className="input-icon" />
                    Confirm Password
                  </label>
                  <div className="password-input-wrapper">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="password_confirm"
                      name="password_confirm"
                      value={formData.password_confirm}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className={errors.password_confirm ? "error-input" : ""}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password_confirm && (
                    <span className="error">{errors.password_confirm}</span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                >
                  {loading ? "Creating Account..." : t("nav.signUp")}
                </button>
              </form>
            )}

            <div className="auth-switch">
              <p>
                {t("auth.alreadyHaveAccount")}{" "}
                <Link to="/login">{t("auth.signInHere")}</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
