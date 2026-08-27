import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  createPanel,
  updatePanel,
} from "../../store/panelSlice";

const SolarPanelForm = ({
  panelToEdit,
  siteId,
  onClose,
}) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    serialNumber: "",
    modelType: "",
    installationDate: "",
  });

  const editMode = !!panelToEdit;

  useEffect(() => {
    if (panelToEdit) {
      setFormData({
        serialNumber:
          panelToEdit.serialNumber || "",

        modelType:
          panelToEdit.modelType || "",

        installationDate:
          panelToEdit.installationDate || "",
      });
    }
  }, [panelToEdit]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (panelToEdit) {
      dispatch(
        updatePanel({
          id: panelToEdit.id,
          panelData: formData,
        })
      );
    } else {
      dispatch(
        createPanel({
          ...formData,
          siteId,
        })
      );
    }

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">

        <h2>
          {editMode
            ? "Edit Solar Panel"
            : "Add New Solar Panel"}
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="serialNumber"
            placeholder="e.g. SN-12345"
            value={formData.serialNumber}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="modelType"
            placeholder="e.g. Monocrystalline 400W"
            value={formData.modelType}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="installationDate"
            value={formData.installationDate}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="btn-primary"
          >
            {editMode
              ? "Update Panel"
              : "Register Panel"}
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

export default SolarPanelForm;