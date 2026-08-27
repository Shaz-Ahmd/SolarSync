import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createSite } from '../../store/slices/siteSlice';

const SolarSiteForm = ({ onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    siteName: "",
    locationCoordinates: "",
    ratedCapacityKw: "",
    commissionDate: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const coordinateRegex =
      /^-?\d+(\.\d+)?\s*-?\d+(\.\d+)?$/;

    if (
      !coordinateRegex.test(
        formData.locationCoordinates
      )
    ) {
      setError(
        'Invalid coordinates. Please use "Lat, Lng" format (e.g. 34.05, -118.24).'
      );

      return;
    }

    dispatch(createSite(formData));

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">

        <h2>Register New Solar Site</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="siteName"
            placeholder="e.g. Desert Oasis Alpha"
            value={formData.siteName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="locationCoordinates"
            placeholder="e.g. 34.05, -118.24"
            value={formData.locationCoordinates}
            onChange={handleChange}
            required
          />

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <input
            type="number"
            name="ratedCapacityKw"
            placeholder="e.g. 500.0"
            value={formData.ratedCapacityKw}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="commissionDate"
            value={formData.commissionDate}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="btn-primary"
          >
            Commission Site
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

export default SolarSiteForm;