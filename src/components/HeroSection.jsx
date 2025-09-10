// components/HeroSection.js
import React, { useState, useEffect } from "react";
import {
  GetHeroSectionData,
  UpdateHeroSectionData,
} from "../callServer/constant";

const HeroSection = ({ showNotification }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    mainTitle: "",
    heroDescription: "",
    heroYear: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updateHeroData = await UpdateHeroSectionData({
        ...formData,
        heroYear: Number(formData.heroYear),
      });
      console.log("updated data in page", updateHeroData);
      showNotification("Hero section updated successfully!");
    } catch (error) {
      showNotification("Something went wrong when updating!");
    }
    setLoading(false);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      // console.log("starting fetching in frontend in page");
      try {
        const data = await GetHeroSectionData();
        setFormData({
          mainTitle: data.mainTitle || "",
          heroDescription: data.heroDescription || "",
          heroYear: data.heroYear || "",
        });
      } catch (error) {
        console.error("Failed to fetch hero section:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="form-container">
      <h2 className="form-title">Hero Section Content</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Main Title</label>
            <input
              type="text"
              className="form-input"
              name="mainTitle"
              value={formData.mainTitle}
              onChange={handleChange}
              placeholder="Enter main title"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Year Established</label>
            <input
              type="number"
              className="form-input"
              name="heroYear"
              value={formData.heroYear}
              onChange={handleChange}
              placeholder="Enter year"
            />
          </div>
          <div className="form-group full-width">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              name="heroDescription"
              value={formData.heroDescription}
              onChange={handleChange}
              placeholder="Enter description"
            ></textarea>
          </div>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          Update Hero Section
        </button>
      </form>
    </div>
  );
};

export default HeroSection;
