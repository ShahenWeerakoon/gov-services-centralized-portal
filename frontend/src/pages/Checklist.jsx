import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";

const Checklist = ({ user }) => {
  const [checklist, setChecklist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchChecklist();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchChecklist = async () => {
    try {
      const response = await axios.get("/checklist/"); // Backend endpoint to get user's checklist
      setChecklist(response.data);
    } catch (error) {
      console.error("Error fetching checklist:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (serviceId) => {
    try {
      await axios.delete(`/checklist/remove/${serviceId}/`);
      setChecklist(checklist.filter((item) => item.id !== serviceId));
    } catch (error) {
      console.error("Error removing service:", error);
    }
  };

  if (!user) {
    return <p>Please log in to view your checklist.</p>;
  }

  if (loading) {
    return <p>Loading checklist...</p>;
  }

  if (checklist.length === 0) {
    return <p>Your checklist is empty.</p>;
  }

  return (
    <div className="checklist-container">
      <h2>Your Checklist</h2>
      <ul>
        {checklist.map((service) => (
          <li key={service.id} className="checklist-item">
            <span>{service.name}</span>
            <button
              className="btn btn-remove"
              onClick={() => handleRemove(service.id)}
            >
              <FaTrashAlt />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Checklist;
