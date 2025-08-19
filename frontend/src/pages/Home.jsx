import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = ({ user }) => {
  return (
    <div className="home">
      <div className="hero-section">
        <h1>Welcome to Our Full-Stack Application</h1>
        <p>Built with React, Django, and PostgreSQL</p>

        {user ? (
          <div className="user-welcome">
            <h2>Hello, {user.first_name || user.username}!</h2>
            <p>You are successfully logged in to your account.</p>
          </div>
        ) : (
          <div className="auth-prompt">
            <h2>Get Started Today</h2>
            <p>
              Join our community and explore all the features we have to offer.
            </p>
            <div className="auth-buttons">
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
              <Link to="/login" className="btn btn-secondary">
                Sign In
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>User Authentication</h3>
            <p>Secure login and registration system</p>
          </div>
          <div className="feature-card">
            <h3>Modern UI</h3>
            <p>Beautiful and responsive user interface</p>
          </div>
          <div className="feature-card">
            <h3>Full-Stack</h3>
            <p>Complete solution with backend API</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
