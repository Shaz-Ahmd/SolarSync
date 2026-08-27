import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { fetchSites } from '../../store/slices/siteSlice';
import { reportTicket } from "../../store/ticketSlice";

const MaintenanceTicketForm = ({
  onClose,
}) => {
  const dispatch = useDispatch();

  const { sites } = useSelector(
    (state) => state.sites
  );

  const [technicians, setTechnicians] =
    useState([]);

  const [panels, setPanels] = useState([]);

  const [formData, setFormData] =
    useState({
      siteId: "",
      panelId: "",
      issueDescription: "",
      priority: "MEDIUM",
      technicianId: "",
    });

  useEffect(() => {
    dispatch(fetchSites());

    axios
      .get("/api/users/technicians")
      .then((response) => {
        setTechnicians(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch]);

  const handleSiteChange = async (e) => {
    const siteId = e.target.value;

    setFormData({
      ...formData,
      siteId,
      panelId: "",
    });

    if (!siteId) {
      setPanels([]);
      return;
    }

    try {
      const response = await axios.get(
        `/api/panels/site/${siteId}`
      );

      const filteredPanels =
        response.data.filter(
          (panel) =>
            panel.status ===
              "MAINTENANCE_REQUIRED" ||
            panel.status === "FAULTY"
        );

      setPanels(filteredPanels);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(
      reportTicket(formData)
    ).unwrap();

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">

        <h2>Report Maintenance Issue</h2>

        <form onSubmit={handleSubmit}>

          {/* SITE */}

          <select
            name="siteId"
            value={formData.siteId}
            onChange={handleSiteChange}
            required
          >
            <option value="">
              Select Site
            </option>

            {sites.map((site) => (
              <option
                key={site.id}
                value={site.id}
              >
                {site.siteName}
              </option>
            ))}
          </select>

          {/* PANEL */}

          <select
            name="panelId"
            value={formData.panelId}
            onChange={handleChange}
            required
            disabled={!formData.siteId}
          >
            <option value="">
              Select Panel
            </option>

            {panels.map((panel) => (
              <option
                key={panel.id}
                value={panel.id}
              >
                Panel #{panel.id} (
                {panel.serialNumber})
              </option>
            ))}
          </select>

          {/* DESCRIPTION */}

          <textarea
            name="issueDescription"
            rows="3"
            placeholder="Describe the fault in detail..."
            value={formData.issueDescription}
            onChange={handleChange}
            required
          />

          {/* PRIORITY */}

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="LOW">
              LOW
            </option>

            <option value="MEDIUM">
              MEDIUM
            </option>

            <option value="HIGH">
              HIGH
            </option>

            <option value="CRITICAL">
              CRITICAL
            </option>
          </select>

          {/* TECHNICIAN */}

          <select
            name="technicianId"
            value={formData.technicianId}
            onChange={handleChange}
            required
          >
            <option value="">
              Select Technician
            </option>

            {technicians.map((tech) => (
              <option
                key={tech.id}
                value={tech.id}
              >
                {tech.username}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="btn-primary"
          >
            Submit Ticket
          </button>

          <button
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>

        </form>

      </div>
    </div>
  );
};

export default MaintenanceTicketForm;