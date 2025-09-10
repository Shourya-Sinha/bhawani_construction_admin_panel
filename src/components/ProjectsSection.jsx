// components/ProjectsSection.js
import React, { useState, useEffect } from "react";
import {
  GetProjectSectionData,
  UpdateProjectSectionData,
  UpdateProjectSectionDataImage,
} from "../callServer/constant";
import { useRef } from "react";

const ProjectsSection = ({ showNotification }) => {
  const fileInputRefs = useRef({});
  const handleOpenFilePicker = (projectKey) => {
  if (fileInputRefs.current[projectKey]) {
    fileInputRefs.current[projectKey].click();
  }
};
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState({});
  const [sectionTitles, setSectionTitles] = useState({
    secTtileFirst: "",
    secTitleSec: "",
    secSubHeding: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectData = await GetProjectSectionData();
        // console.log("project section data log in page", projectData);
        setSectionTitles({
          secTtileFirst: projectData.secTtileFirst || "",
          secTitleSec: projectData.secTitleSec || "",
          secSubHeding: projectData.secSubHeding || "",
        });
        setProjects({
          secDataFirst: {
            id: projectData.secDataFirst?.id || "",
            title: projectData.secDataFirst?.title || "",
            category: projectData.secDataFirst?.category || "",
            desc: projectData.secDataFirst?.desc || "",
            dataImage: projectData.secDataFirst?.dataImage || {
              imageId: "",
              url: "",
            },
          },
          secDataSecond: {
            id: projectData.secDataSecond?.id || "",
            title: projectData.secDataSecond?.title || "",
            category: projectData.secDataSecond?.category || "",
            desc: projectData.secDataSecond?.desc || "",
            dataImage: projectData.secDataSecond?.dataImage || {
              imageId: "",
              url: "",
            },
          },
          secDataThird: {
            id: projectData.secDataThird?.id || "",
            title: projectData.secDataThird?.title || "",
            category: projectData.secDataThird?.category || "",
            desc: projectData.secDataThird?.desc || "",
            dataImage: projectData.secDataThird?.dataImage || {
              imageId: "",
              url: "",
            },
          },
          secDataForth: {
            id: projectData.secDataForth?.id || "",
            title: projectData.secDataForth?.title || "",
            category: projectData.secDataForth?.category || "",
            desc: projectData.secDataForth?.desc || "",
            dataImage: projectData.secDataForth?.dataImage || {
              imageId: "",
              url: "",
            },
          },
          secDataFifth: {
            id: projectData.secDataFifth?.id || "",
            title: projectData.secDataFifth?.title || "",
            category: projectData.secDataFifth?.category || "",
            desc: projectData.secDataFifth?.desc || "",
            dataImage: projectData.secDataFifth?.dataImage || {
              imageId: "",
              url: "",
            },
          },
          secDataSixth: {
            id: projectData.secDataSixth?.id || "",
            title: projectData.secDataSixth?.title || "",
            category: projectData.secDataSixth?.category || "",
            desc: projectData.secDataSixth?.desc || "",
            dataImage: projectData.secDataSixth?.dataImage || {
              imageId: "",
              url: "",
            },
          },
        });
      } catch (error) {
        console.error("error while fetchiung", error);
      }
    };

    fetchData();
  }, []);

  const handleSectionTitleChange = (field, value) => {
    setSectionTitles((prev) => ({ ...prev, [field]: value }));
  };

  const handleProjectChange = (projectId, field, value) => {
    setProjects((prev) => ({
      ...prev,
      [projectId]: {
        ...prev[projectId],
        [field]: value,
      },
    }));
  };

  const handleImageChange = async (project, file) => {
    try {
      console.log("project data", project, "file", file);
      const formData = new FormData();
      formData.append("subsectionId", project.id);
      formData.append("file", file);
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const updatedData = await UpdateProjectSectionDataImage(
        formData,
        project.id
      );
      showNotification("Image Uploaded Successfully", "success");
    } catch (error) {
      showNotification("Something Error! Try again Later", "error");
      console.log("erorr in uplkoading image", error);
    }
    console.log(`Image changed for ${project.id}, field: ${file}`);
  };

  const handleSubmit = async (project) => {
    // e.preventDefault();
    setLoading(true);
    try {
      // console.log("button clicked project data and id", project);
      const payload = {
        ...project,
        dataImage:
          typeof project.dataImage === "string"
            ? { imageId: "", url: project.dataImage }
            : project.dataImage,
      };
      const updatedData = await UpdateProjectSectionData(payload, project.id);
      showNotification("Projects section updated successfully!");
    } catch (error) {
      console.log("error in project seciton page", error);
      showNotification("Failed to update Service", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Projects Section Content</h2>
      {/* <form onSubmit={handleSubmit}> */}
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">First Title Part</label>
          <input
            type="text"
            className="form-input"
            value={sectionTitles.secTtileFirst}
            onChange={(e) =>
              handleSectionTitleChange("secTtileFirst", e.target.value)
            }
            placeholder="Enter first title part"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Second Title Part</label>
          <input
            type="text"
            className="form-input"
            value={sectionTitles.secTitleSec}
            onChange={(e) =>
              handleSectionTitleChange("secTitleSec", e.target.value)
            }
            placeholder="Enter second title part"
          />
        </div>
        <div className="form-group full-width">
          <label className="form-label">Subheading</label>
          <input
            type="text"
            className="form-input"
            value={sectionTitles.secSubHeding}
            onChange={(e) =>
              handleSectionTitleChange("secSubHeding", e.target.value)
            }
            placeholder="Enter subheading"
          />
        </div>
      </div>

      <h3 style={{ margin: "25px 0 15px", color: "#2c3e50" }}>Project Items</h3>

      {Object.keys(projects).map((projectKey) => {
        const project = projects[projectKey];
        return (
          <div key={project.id} className="service-item">
            <h4 className="service-title">{project.title}</h4>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Project Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={project.title}
                  onChange={(e) =>
                    handleProjectChange(projectKey, "title", e.target.value)
                  }
                  placeholder="Enter project title"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <input
                  type="text"
                  className="form-input"
                  value={project.category}
                  onChange={(e) =>
                    handleProjectChange(projectKey, "category", e.target.value)
                  }
                  placeholder="Enter category"
                />
              </div>
              <div className="form-group full-width">
                <label className="form-label">Description</label>
                <textarea
                  className="form-textarea"
                  value={project.desc}
                  onChange={(e) =>
                    handleProjectChange(projectKey, "desc", e.target.value)
                  }
                  placeholder="Enter project description"
                ></textarea>
              </div>
              <div className="form-group full-width">
                <label className="form-label">Project Image</label>
                <div
                  className="image-upload"
                  onClick={() => handleOpenFilePicker(projectKey)}
                >
                  <div className="upload-icon">🖼️</div>
                  <p>Click to upload or drag and drop</p>
                  <p className="text-sm">PNG, JPG up to 10MB</p>
                  <input
                    ref={(el) => (fileInputRefs.current[projectKey] = el)}
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setSelectedFile(file); // store selected file in state
                        handleImageChange(project, file); // call upload function
                      }
                    }}
                  />
                  {project.dataImage?.url && (
                    <img
                      src={project.dataImage.url}
                      alt="Project preview"
                      className="image-preview"
                      style={{ display: "block", maxWidth: "200px" }}
                    />
                  )}
                </div>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleSubmit(project)}
              disabled={loading}
            >
              Update Projects Section
            </button>
          </div>
        );
      })}

      {/* </form> */}
    </div>
  );
};

export default ProjectsSection;
