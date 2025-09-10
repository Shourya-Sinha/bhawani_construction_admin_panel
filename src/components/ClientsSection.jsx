// components/ClientsSection.js
import React, { useState, useEffect } from "react";
import {
  GetClientSectionData,
  UpdateClientSectionData,
  UpdateClientSectionDataImage,
} from "../callServer/constant";
import { useRef } from "react";

const ClientsSection = ({ showNotification }) => {
  const fileInputRefs = useRef({});
    const handleOpenFilePicker = (clientKey) => {
  if (fileInputRefs.current[clientKey]) {
    fileInputRefs.current[clientKey].click();
  }
};
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [sectionTitles, setSectionTitles] = useState({
    secTtileFirst: "",
    secTtileSecond: "",
    subHeadings: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectData = await GetClientSectionData();
        // console.log("client data fetched in clkient seciton page", projectData);
        setSectionTitles({
          secTtileFirst: projectData.secTtileFirst || "",
          secTtileSecond: projectData.secTtileSecond || "",
          subHeadings: projectData.subHeadings || "",
        });

        setClients({
          clientDataFirst: {
            id: projectData.clientDataFirst?.id || "",
            title: projectData.clientDataFirst?.title || "",
            desc: projectData.clientDataFirst?.desc || "",
            firstLogo: projectData.clientDataFirst?.firstLogo?.url
              ? { fileId: "", url: projectData.clientDataFirst.firstLogo.url }
              : { fileId: "", url: "" },
          },
          clientDataSec: {
            id: projectData.clientDataSec?.id || "",
            title: projectData.clientDataSec?.title || "",
            desc: projectData.clientDataSec?.desc || "",
            firstLogo: projectData.clientDataSec?.firstLogo?.url
              ? { fileId: "", url: projectData.clientDataSec.firstLogo.url }
              : { fileId: "", url: "" },
          },
          clientDataThird: {
            id: projectData.clientDataThird?.id || "",
            title: projectData.clientDataThird?.title || "",
            desc: projectData.clientDataThird?.desc || "",
            firstLogo: projectData.clientDataThird?.firstLogo?.url
              ? { fileId: "", url: projectData.clientDataThird.firstLogo.url }
              : { fileId: "", url: "" },
          },
          clientDataFourth: {
            id: projectData.clientDataFourth?.id || "",
            title: projectData.clientDataFourth?.title || "",
            desc: projectData.clientDataFourth?.desc || "",
            firstLogo: projectData.clientDataFourth?.firstLogo?.url
              ? { fileId: "", url: projectData.clientDataFourth.firstLogo.url }
              : { fileId: "", url: "" },
          },
          clientDataFifth: {
            id: projectData.clientDataFifth?.id || "",
            title: projectData.clientDataFifth?.title || "",
            desc: projectData.clientDataFifth?.desc || "",
            firstLogo: projectData.clientDataFifth?.firstLogo?.url
              ? { fileId: "", url: projectData.clientDataFifth.firstLogo.url }
              : { fileId: "", url: "" },
          },
        });
      } catch (error) {
        console.error("error while fetching client data", error);
      }
    };
    setSectionTitles({
      secTtileFirst: "Our",
      secTtileSecond: "Clients",
      subHeadings: "Companies who trust our expertise and services",
    });

    setClients({
      clientDataFirst: {
        id: "clientDataFirst",
        title: "Kean Corporation",
        desc: "BHAWANI CON. delivered our factory expansion project on time and within budget. Their attention to detail was impressive.",
        firstLogo: {
          fileId: "",
          url: "https://ik.imagekit.io/p66ljstle/Construction%20Assets/KEAN-removebg-preview.png?updatedAt=1746793773995",
        },
      },
      clientDataSec: {
        id: "clientDataSec",
        title: "Shine Industries",
        desc: "We have worked with BHAWANI CON. on multiple projects. Their team consistently delivers quality work and innovative solutions.",
        firstLogo: {
          fileId: "",
          url: "https://ik.imagekit.io/p66ljstle/Construction%20Assets/SHINE-removebg-preview.png?updatedAt=1746793772876",
        },
      },
      // Add more clients as needed
    });
    fetchData();
  }, []);

  const handleSectionTitleChange = (field, value) => {
    setSectionTitles((prev) => ({ ...prev, [field]: value }));
  };

  const handleClientChange = (clientId, field, value) => {
    setClients((prev) => ({
      ...prev,
      [clientId]: {
        ...prev[clientId],
        [field]: value,
      },
    }));
  };

    const handleLogoChange = async (client, file) => {
      try {
        console.log("project data", client, "file", file);
        const formData = new FormData();
        formData.append("subsectionId", client.id);
        formData.append("file", file);
        for (let pair of formData.entries()) {
          console.log(pair[0], pair[1]);
        }
  
        const updatedData = await UpdateClientSectionDataImage(
          formData,
          client.id
        );
        showNotification("Image Uploaded Successfully", "success");
      } catch (error) {
        showNotification("Something Error! Try again Later", "error");
        console.log("erorr in uplkoading image", error);
      }
      console.log(`Image changed for ${client.id}, field: ${file}`);
    };

  const handleSubmit = async (client) => {
    // e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        updateData: {
          title: client.title,
          desc: client.desc,
          firstLogo: client.firstLogo, // only if you want to update logo
        },
        file: null, // or the uploaded file if you have one
      };
      console.log(
        "updated data send in page before",
        payload,
        "its id is:-",
        client.id
      );
      const updatedData = await UpdateClientSectionData(payload, client.id);
      // const updatedData = await UpdateClientSectionData(payload, client.id);
      console.log(
        "updated data send in page after",
        updatedData,
        "its id is:-",
        client.id
      );
      showNotification("Clients section updated successfully!");
    } catch (error) {
      console.log("error in client seciton page", error);
      showNotification("Failed to update client", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Clients Section Content</h2>
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
            value={sectionTitles.secTtileSecond}
            onChange={(e) =>
              handleSectionTitleChange("secTtileSecond", e.target.value)
            }
            placeholder="Enter second title part"
          />
        </div>
        <div className="form-group full-width">
          <label className="form-label">Subheading</label>
          <input
            type="text"
            className="form-input"
            value={sectionTitles.subHeadings}
            onChange={(e) =>
              handleSectionTitleChange("subHeadings", e.target.value)
            }
            placeholder="Enter subheading"
          />
        </div>
      </div>

      <h3 style={{ margin: "25px 0 15px", color: "#2c3e50" }}>Client Items</h3>

      {Object.keys(clients).map((clientKey) => {
        const client = clients[clientKey];
        return (
          <div key={client.id} className="service-item">
            <h4 className="service-title">{client.title}</h4>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Client Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={client.title}
                  onChange={(e) =>
                    handleClientChange(clientKey, "title", e.target.value)
                  }
                  placeholder="Enter client name"
                />
              </div>
              <div className="form-group full-width">
                <label className="form-label">Testimonial</label>
                <textarea
                  className="form-textarea"
                  value={client.desc}
                  onChange={(e) =>
                    handleClientChange(clientKey, "desc", e.target.value)
                  }
                  placeholder="Enter client testimonial"
                ></textarea>
              </div>
              <div className="form-group full-width">
                <label className="form-label">Client Logo</label>
                <div className="image-upload" onClick={() => handleOpenFilePicker(clientKey)}>
                  <div className="upload-icon">🏢</div>
                  <p>Click to upload or drag and drop</p>
                  <p className="text-sm">PNG, JPG up to 5MB</p>
                  <input
                    type="file"
                    ref={(el) => (fileInputRefs.current[clientKey] = el)}
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setSelectedFile(file); // store selected file in state
                        handleLogoChange(client, file); // call upload function
                      }
                    }}
                  />
                  {client.firstLogo?.url && (
                    <img
                      src={client.firstLogo.url}
                      alt="Client logo preview"
                      className="image-preview"
                      style={{
                        display: "block",
                        maxWidth: "150px",
                        backgroundColor: "#f5f5f5",
                        padding: "10px",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleSubmit(client)}
              disabled={loading}
            >
              Update Clients Section
            </button>
          </div>
        );
      })}
      {/* </form> */}
    </div>
  );
};

export default ClientsSection;
