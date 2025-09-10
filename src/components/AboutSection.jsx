// components/AboutSection.js
import React, { useState, useEffect } from "react";
import {
  GetAboutSectionData,
  UpdateAboutSectionData,
} from "../callServer/constant";

const AboutSection = ({ showNotification }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    sectionTitle: "",
    sectionSubTitle: "",
    subtitleYear: "",
    sectionStoryTitle: "",
    storyParagraphFirst: "",
    storyParagraphSec: "",
    experienceYear: "",
    completedProject: "",
    professionalTeam: "",
    industryAward: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetAboutSectionData();
        setFormData({
          sectionTitle: data.sectionTitle || "",
          sectionSubTitle: data.sectionSubTitle || "",
          subtitleYear: data.subtitleYear || "",
          sectionStoryTitle: data.sectionStoryTitle || "",
          storyParagraphFirst: data.storyParagraphFirst || "",
          storyParagraphSec: data.storyParagraphSec || "",
          experienceYear: data.experienceYear || "",
          completedProject: data.completedProject || "",
          professionalTeam: data.professionalTeam || "",
          industryAward: data.industryAward || "",
        });
      } catch (error) {
        console.error("Failed to fetch about section:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updateAboutData = await UpdateAboutSectionData({
        ...formData,
        subtitleYear: Number(formData.subtitleYear),
        experienceYear: Number(formData.experienceYear),
        completedProject: Number(formData.completedProject),
        professionalTeam: Number(formData.professionalTeam),
        industryAward: Number(formData.industryAward),
      });
      // console.log("updated data in page", updateAboutData);
      showNotification("About section updated successfully!");
    } catch (error) {
      console.log("error about page", error);
      showNotification("Something went wrong when updating!");
    }
    setLoading(false);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">About Us Section Content</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Section Title</label>
            <input
              type="text"
              className="form-input"
              name="sectionTitle"
              value={formData.sectionTitle}
              onChange={handleChange}
              placeholder="Enter section title"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Section Subtitle</label>
            <input
              type="text"
              className="form-input"
              name="sectionSubTitle"
              value={formData.sectionSubTitle}
              onChange={handleChange}
              placeholder="Enter section subtitle"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Subtitle Year</label>
            <input
              type="number"
              className="form-input"
              name="subtitleYear"
              value={formData.subtitleYear}
              onChange={handleChange}
              placeholder="Enter year"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Story Title</label>
            <input
              type="text"
              className="form-input"
              name="sectionStoryTitle"
              value={formData.sectionStoryTitle}
              onChange={handleChange}
              placeholder="Enter story title"
            />
          </div>
          <div className="form-group full-width">
            <label className="form-label">First Story Paragraph</label>
            <textarea
              className="form-textarea"
              name="storyParagraphFirst"
              value={formData.storyParagraphFirst}
              onChange={handleChange}
              placeholder="Enter first paragraph"
            ></textarea>
          </div>
          <div className="form-group full-width">
            <label className="form-label">Second Story Paragraph</label>
            <textarea
              className="form-textarea"
              name="storyParagraphSec"
              value={formData.storyParagraphSec}
              onChange={handleChange}
              placeholder="Enter second paragraph"
            ></textarea>
          </div>
          <div className="form-group">
            <label className="form-label">Years of Experience</label>
            <input
              type="number"
              className="form-input"
              name="experienceYear"
              value={formData.experienceYear}
              onChange={handleChange}
              placeholder="Enter years"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Completed Projects</label>
            <input
              type="number"
              className="form-input"
              name="completedProject"
              value={formData.completedProject}
              onChange={handleChange}
              placeholder="Enter number"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Professional Team Members</label>
            <input
              type="number"
              className="form-input"
              name="professionalTeam"
              value={formData.professionalTeam}
              onChange={handleChange}
              placeholder="Enter number"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Industry Awards</label>
            <input
              type="number"
              className="form-input"
              name="industryAward"
              value={formData.industryAward}
              onChange={handleChange}
              placeholder="Enter number"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          Update About Section
        </button>
      </form>
    </div>
  );
};

export default AboutSection;
