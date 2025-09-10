// components/ContactSection.js
import React, { useState, useEffect } from "react";
import {
  GetContactSectionData,
  UpdateContactSectionData,
} from "../callServer/constant";

const ContactSection = ({ showNotification }) => {
  const [loading, setLoading] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    secTitleFirst: "",
    secTtileSecond: "",
    secSubHeading: "",
    rightSideTitle: "",
    rightSidePara: "",
    phoneNoFirst: { firstNumberCountryCode: "", firstNumber: "" },
    phoneNoSec: { firstNumberCountryCode: "", firstNumber: "" },
    email: "",
    officeTtile: "",
    headAddFirst: "",
    headAddSec: "",
    brachTitle: "",
    brAddFirst: "",
    brSecAdd: "",
    workinghrTitle: "",
    fromWeekName: "",
    toWeekName: "",
    fromHour: "",
    toHour: "",
    weekendFirst: "",
    weekendFirstTimeFrom: "",
    weekendFirstTimeTo: "",
    weekendSecond: "",
    weekendSecFromHour: "",
    weekendSecToHour: "",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await GetContactSectionData();
        // console.log("contact section data in poage", fetchedData);
        setContactInfo({
          secTitleFirst: fetchedData?.secTitleFirst || "",
          secTtileSecond: fetchedData?.secTtileSecond || "",
          secSubHeading: fetchedData?.secSubHeading || "",
          rightSideTitle: fetchedData?.rightSideTitle || "",
          rightSidePara: fetchedData?.rightSidePara || "",
          phoneNoFirst: {
            firstNumberCountryCode:
              fetchedData?.phoneNoFirst?.firstNumberCountryCode || "",
            firstNumber: fetchedData?.phoneNoFirst?.firstNumber || "",
          },
          phoneNoSec: {
            firstNumberCountryCode:
              fetchedData?.phoneNoSec?.firstNumberCountryCode || "",
            firstNumber: fetchedData?.phoneNoSec?.firstNumber || "",
          },
          email: fetchedData?.email || "",
          officeTtile: fetchedData?.officeTtile || "",
          headAddFirst: fetchedData?.headAddFirst || "",
          headAddSec: fetchedData?.headAddSec || "",
          brachTitle: fetchedData?.brachTitle || "",
          brAddFirst: fetchedData?.brAddFirst || "",
          brSecAdd: fetchedData?.brSecAdd || "",
          workinghrTitle: fetchedData?.workinghrTitle || "",
          fromWeekName: fetchedData?.fromWeekName || "",
          toWeekName: fetchedData?.toWeekName || "",
          fromHour: fetchedData?.fromHour || "",
          toHour: fetchedData?.toHour || "",
          weekendFirst: fetchedData?.weekendFirst || "",
          weekendFirstTimeFrom: fetchedData?.weekendFirstTimeFrom || "",
          weekendFirstTimeTo: fetchedData?.weekendFirstTimeTo || "",
          weekendSecond: fetchedData?.weekendSecond || "",
          weekendSecFromHour: fetchedData?.weekendSecFromHour || "",
          weekendSecToHour: fetchedData?.weekendSecToHour || "",
        });
      } catch (error) {
        console.error("error in fetching ocntact data", error);
      }
    };

    getData();
  }, []);

  const handleChange = (field, value) => {
    // Handle nested objects
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setContactInfo((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setContactInfo((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Submitting contactInfo:", contactInfo);
    try {
      //
      const updatedData = await UpdateContactSectionData(contactInfo);
      console.log("data log for update after", contactInfo);
      showNotification("Contact section updated successfully!", "success");
    } catch (error) {
      showNotification("Contact section updated successfully!", "error");
      console.error("updating error contact data", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Contact Section Content</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">First Title Part</label>
            <input
              type="text"
              className="form-input"
              value={contactInfo.secTitleFirst}
              onChange={(e) => handleChange("secTitleFirst", e.target.value)}
              placeholder="Enter first title part"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Second Title Part</label>
            <input
              type="text"
              className="form-input"
              value={contactInfo.secTtileSecond}
              onChange={(e) => handleChange("secTtileSecond", e.target.value)}
              placeholder="Enter second title part"
            />
          </div>
          <div className="form-group full-width">
            <label className="form-label">Subheading</label>
            <input
              type="text"
              className="form-input"
              value={contactInfo.secSubHeading}
              onChange={(e) => handleChange("secSubHeading", e.target.value)}
              placeholder="Enter subheading"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Right Side Title</label>
            <input
              type="text"
              className="form-input"
              value={contactInfo.rightSideTitle}
              onChange={(e) => handleChange("rightSideTitle", e.target.value)}
              placeholder="Enter right side title"
            />
          </div>
          <div className="form-group full-width">
            <label className="form-label">Right Side Description</label>
            <textarea
              className="form-textarea"
              value={contactInfo.rightSidePara}
              onChange={(e) => handleChange("rightSidePara", e.target.value)}
              placeholder="Enter right side description"
            ></textarea>
          </div>
        </div>

        <h3 style={{ margin: "25px 0 15px", color: "#2c3e50" }}>
          Phone Numbers
        </h3>

        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">First Phone Country Code</label>
            <input
              type="text"
              className="form-input"
              value={contactInfo.phoneNoFirst?.firstNumberCountryCode}
              onChange={(e) =>
                handleChange(
                  "phoneNoFirst.firstNumberCountryCode",
                  e.target.value
                )
              }
              placeholder="Enter country code"
            />
          </div>
          <div className="form-group">
            <label className="form-label">First Phone Number</label>
            <input
              type="text"
              className="form-input"
              value={contactInfo.phoneNoFirst?.firstNumber}
              onChange={(e) =>
                handleChange("phoneNoFirst.firstNumber", e.target.value)
              }
              placeholder="Enter phone number"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Second Phone Country Code</label>
            <input
              type="text"
              className="form-input"
              value={contactInfo.phoneNoSec?.firstNumberCountryCode}
              onChange={(e) =>
                handleChange(
                  "phoneNoSec.firstNumberCountryCode",
                  e.target.value
                )
              }
              placeholder="Enter country code"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Second Phone Number</label>
            <input
              type="text"
              className="form-input"
              value={contactInfo.phoneNoSec?.firstNumber}
              onChange={(e) =>
                handleChange("phoneNoSec.firstNumber", e.target.value)
              }
              placeholder="Enter phone number"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              value={contactInfo.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter email address"
            />
          </div>
        </div>

        <h3 style={{ margin: "25px 0 15px", color: "#2c3e50" }}>
          Address Information
        </h3>

        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Head Office Title</label>
            <input
              type="text"
              className="form-input"
              value={contactInfo.officeTtile}
              onChange={(e) => handleChange("officeTtile", e.target.value)}
              placeholder="Enter head office title"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Head Office Address Line 1</label>
            <input
              type="text"
              className="form-input"
              value={contactInfo.headAddFirst}
              onChange={(e) => handleChange("headAddFirst", e.target.value)}
              placeholder="Enter head office address"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Head Office Address Line 2</label>
            <input
              type="text"
              className="form-input"
              value={contactInfo.headAddSec}
              onChange={(e) => handleChange("headAddSec", e.target.value)}
              placeholder="Enter head office address line 2"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Branch Office Title</label>
            <input
              type="text"
              className="form-input"
              value={contactInfo.brachTitle}
              onChange={(e) => handleChange("brachTitle", e.target.value)}
              placeholder="Enter branch office title"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Branch Office Address Line 1</label>
            <input
              type="text"
              className="form-input"
              value={contactInfo.brAddFirst}
              onChange={(e) => handleChange("brAddFirst", e.target.value)}
              placeholder="Enter branch office address"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Branch Office Address Line 2</label>
            <input
              type="text"
              className="form-input"
              value={contactInfo.brSecAdd}
              onChange={(e) => handleChange("brSecAdd", e.target.value)}
              placeholder="Enter branch office address line 2"
            />
          </div>
        </div>

        <h3 style={{ margin: "25px 0 15px", color: "#2c3e50" }}>
          Working Hours
        </h3>

        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Working Hours Title</label>
            <input
              type="text"
              className="form-input"
              value={contactInfo.workinghrTitle}
              onChange={(e) => handleChange("workinghrTitle", e.target.value)}
              placeholder="Enter working hours title"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Weekday From</label>
            <input
              type="text"
              className="form-input"
              value={contactInfo.fromWeekName}
              onChange={(e) => handleChange("fromWeekName", e.target.value)}
              placeholder="Enter start weekday"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Weekday To</label>
            <input
              type="text"
              className="form-input"
              value={contactInfo.toWeekName}
              onChange={(e) => handleChange("toWeekName", e.target.value)}
              placeholder="Enter end weekday"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Work Hours From</label>
            <input
              type="text"
              className="form-input"
              value={contactInfo.fromHour}
              onChange={(e) => handleChange("fromHour", e.target.value)}
              placeholder="Enter start time"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Work Hours To</label>
            <input
              type="text"
              className="form-input"
              value={contactInfo.toHour}
              onChange={(e) => handleChange("toHour", e.target.value)}
              placeholder="Enter end time"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Weekend Day 1</label>
            <input
              type="text"
              className="form-input"
              value={contactInfo.weekendFirst}
              onChange={(e) => handleChange("weekendFirst", e.target.value)}
              placeholder="Enter weekend day 1"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Weekend Hours 1 From</label>
            <input
              type="text"
              className="form-input"
              value={contactInfo.weekendFirstTimeFrom}
              onChange={(e) =>
                handleChange("weekendFirstTimeFrom", e.target.value)
              }
              placeholder="Enter weekend start time"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Weekend Hours 1 To</label>
            <input
              type="text"
              className="form-input"
              value={contactInfo.weekendFirstTimeTo}
              onChange={(e) =>
                handleChange("weekendFirstTimeTo", e.target.value)
              }
              placeholder="Enter weekend end time"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Weekend Day 2</label>
            <input
              type="text"
              className="form-input"
              value={contactInfo.weekendSecond}
              onChange={(e) => handleChange("weekendSecond", e.target.value)}
              placeholder="Enter weekend day 2"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Weekend Hours 2 From</label>
            <input
              type="text"
              className="form-input"
              value={contactInfo.weekendSecFromHour}
              onChange={(e) =>
                handleChange("weekendSecFromHour", e.target.value)
              }
              placeholder="Enter weekend 2 start time"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Weekend Hours 2 To</label>
            <input
              type="text"
              className="form-input"
              value={contactInfo.weekendSecToHour}
              onChange={(e) => handleChange("weekendSecToHour", e.target.value)}
              placeholder="Enter weekend 2 end time"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          Update Contact Section
        </button>
      </form>
    </div>
  );
};

export default ContactSection;
