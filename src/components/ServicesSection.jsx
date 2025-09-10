// components/ServicesSection.js
import React, { useState, useEffect } from "react";
import {
  GetServiceSectionData,
  UpdateServiceSectionData,
} from "../callServer/constant";

const ServicesSection = ({ showNotification }) => {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionSubtitle, setSectionSubtitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await GetServiceSectionData();
        // console.log("servioce data ion page", fetchedData);
        setSectionTitle(fetchedData.sectionTitle || "");
        setSectionSubtitle(fetchedData.sectionSubtitle || "");
        setServices(fetchedData.services || []);
      } catch (error) {
        console.error("error in fetching", error);
      }
    };

    fetchData();
  }, []);

  const handleServiceChange = (id, field, value) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === id ? { ...service, [field]: value } : service
      )
    );
  };

  const handleSubmit = async (service) => {
    // e.preventDefault();
    setLoading(true);
    try {
      // console.log("log data before update", service, "its id",service.id);
      const data = await UpdateServiceSectionData(service, service.id);
      showNotification(`Service ${service.id} updated successfully!`);
    } catch (error) {
      console.error(error);
      showNotification(`Failed to update Service ${service.id}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Services Section Content</h2>
      {/* <form onSubmit={handleSubmit}> */}
      <div className="form-group">
        <label className="form-label">Section Title</label>
        <input
          type="text"
          className="form-input"
          value={sectionTitle}
          onChange={(e) => setSectionTitle(e.target.value)}
          placeholder="Enter section title"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Section Subtitle</label>
        <input
          type="text"
          className="form-input"
          value={sectionSubtitle}
          onChange={(e) => setSectionSubtitle(e.target.value)}
          placeholder="Enter section subtitle"
        />
      </div>

      <h3 style={{ margin: "25px 0 15px", color: "#2c3e50" }}>Services</h3>

      {services.map((service) => (
        <div key={service.id} className="service-item">
          <h4 className="service-title">Service {service.id}</h4>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Service Title</label>
              <input
                type="text"
                className="form-input"
                value={service.title}
                onChange={(e) =>
                  handleServiceChange(service.id, "title", e.target.value)
                }
                placeholder="Enter service title"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Icon</label>
              <select
                className="form-select"
                value={service.icon}
                onChange={(e) =>
                  handleServiceChange(service.id, "icon", e.target.value)
                }
              >
                <option>Factory</option>
                <option>Building</option>
                <option>Flame</option>
                <option>House</option>
                <option>Shovel</option>
                <option>Sun</option>
              </select>
            </div>
            <div className="form-group full-width">
              <label className="form-label">Description</label>
              <textarea
                className="form-textarea"
                value={service.description}
                onChange={(e) =>
                  handleServiceChange(service.id, "description", e.target.value)
                }
                placeholder="Enter service description"
              ></textarea>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            style={{ marginTop: "20px" }}
            disabled={loading}
            onClick={() => handleSubmit(service)}
          >
            Update This Services
          </button>
        </div>
      ))}
      {/* </form> */}
    </div>
  );
};

export default ServicesSection;
