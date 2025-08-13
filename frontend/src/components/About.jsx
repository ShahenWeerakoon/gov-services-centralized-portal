import React, { useState, useEffect } from "react";
import axios from "axios";
import "./About.css";

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get("/pages/about/");
        setAboutData(response.data);
      } catch (error) {
        setError("Failed to load about information");
        console.error("Error fetching about data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="about-container">
      <div className="about-content">
        <h1>{aboutData?.title || "About Us"}</h1>

        <section className="about-intro">
          <p className="lead">{aboutData?.content}</p>
        </section>

        <section className="mission-section">
          <h2>Our Mission</h2>
          <p>{aboutData?.mission}</p>
        </section>

        <section className="team-section">
          <h2>Our Team</h2>
          <div className="team-grid">
            {aboutData?.team?.map((member, index) => (
              <div key={index} className="team-member">
                <p>{member}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="tech-stack">
          <h2>Technology Stack</h2>
          <div className="tech-grid">
            <div className="tech-item">
              <h3>Frontend</h3>
              <ul>
                <li>React.js</li>
                <li>React Router</li>
                <li>Axios</li>
                <li>CSS3</li>
              </ul>
            </div>
            <div className="tech-item">
              <h3>Backend</h3>
              <ul>
                <li>Django</li>
                <li>Django REST Framework</li>
                <li>Token Authentication</li>
                <li>CORS Headers</li>
              </ul>
            </div>
            <div className="tech-item">
              <h3>Database</h3>
              <ul>
                <li>PostgreSQL</li>
                <li>Django ORM</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
