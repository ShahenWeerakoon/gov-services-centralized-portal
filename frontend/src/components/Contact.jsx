import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Contact.css";

const Contact = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await axios.get("/pages/contact-info/");
        setContactInfo(response.data);
      } catch (error) {
        console.error("Error fetching contact info:", error);
      }
    };

    fetchContactInfo();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
    // Clear success message when user starts typing
    if (success) {
      setSuccess("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccess("");

    try {
      const response = await axios.post("/pages/contact/", formData);
      setSuccess(response.data.message);
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        setErrors({ general: "An error occurred. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-content">
        <h1>Contact Us</h1>

        <div className="contact-layout">
          <div className="contact-info">
            <h2>Get In Touch</h2>
            <p>
              We'd love to hear from you. Send us a message and we'll respond as
              soon as possible.
            </p>

            {contactInfo && (
              <div className="contact-details">
                <div className="contact-item">
                  <h3>Email</h3>
                  <p>{contactInfo.email}</p>
                </div>
                <div className="contact-item">
                  <h3>Phone</h3>
                  <p>{contactInfo.phone}</p>
                </div>
                <div className="contact-item">
                  <h3>Address</h3>
                  <p>{contactInfo.address}</p>
                </div>
              </div>
            )}
          </div>

          <div className="contact-form">
            <h2>Send Message</h2>

            {success && <div className="success-message">{success}</div>}
            {errors.general && (
              <div className="error-message">{errors.general}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && <span className="error">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
                {errors.message && (
                  <span className="error">{errors.message}</span>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
