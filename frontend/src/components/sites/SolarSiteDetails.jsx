import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import EmptyState from "../common/EmptyState";
import SolarPanelForm from "./SolarPanelForm";

import {
  fetchSiteById,
} from "../../store/slices/siteSlice";

import {
  fetchPanelsBySite,
  deletePanel,
} from "../../store/slices/panelSlice";

const SolarSiteDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  // ==========================================
  // SITE STATE
  // ==========================================

  const {
    selectedItem,
    loading,
  } = useSelector(
    (state) => state.sites
  );

  // ==========================================
  // PANEL STATE
  // ==========================================
  // Supports both:
  // state.panels.panels
  // state.panels.items
  // ==========================================

  const panels = useSelector(
    (state) =>
      state.panels?.panels ??
      state.panels?.items ??
      []
  );

  // ==========================================
  // AUTH STATE
  // ==========================================

  const {
    user,
  } = useSelector(
    (state) => state.auth
  );

  // ==========================================
  // LOCAL STATE
  // ==========================================

  const [panelToEdit, setPanelToEdit] =
    useState(undefined);

  // ==========================================
  // FETCH SITE AND PANELS
  // ==========================================

  useEffect(() => {
    dispatch(fetchSiteById(id));
    dispatch(fetchPanelsBySite(id));
  }, [dispatch, id]);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="container">
        Loading site details...
      </div>
    );
  }

  // ==========================================
  // SITE
  // ==========================================
  // Keep fallback so the component can still
  // render when selectedItem is not available.
  // ==========================================

  const site = selectedItem || {
    siteName: "Solar Site",
    locationCoordinates: "",
    ratedCapacityKw: 0,
    commissionDate: "",
    ingesting: false,
    currentGeneration: 0,
  };

  // ==========================================
  // ROLE
  // ==========================================

  const isSolarOperator =
    user?.role === "SOLAR_OPERATOR";

  // ==========================================
  // DELETE PANEL
  // ==========================================

  const handleDelete = (panelId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this panel?"
      )
    ) {
      dispatch(deletePanel(panelId));
    }
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="container">

      {/* ====================================== */}
      {/* SITE HEADER */}
      {/* ====================================== */}

      <h1>
        {site.siteName}
      </h1>

      {/* ====================================== */}
      {/* SITE INFORMATION */}
      {/* ====================================== */}

      <div className="site-info">

        <p>
          Coordinates:{" "}
          {site.locationCoordinates}
        </p>

        <p>
          Total Capacity:{" "}
          {site.ratedCapacityKw} KW
        </p>

        <p>
          Panels Count:{" "}
          {panels.length}
        </p>

        <p>
          Commissioned:{" "}
          {site.commissionDate}
        </p>

      </div>

      {/* ====================================== */}
      {/* SIMULATE GENERATION */}
      {/* ====================================== */}

      {isSolarOperator && (
        <button
          type="button"
          className="btn-primary"
          onClick={() => {
            console.log(
              "Simulate Generation clicked"
            );
          }}
        >
          ⚡ Simulate Generation
        </button>
      )}

      {/* ====================================== */}
      {/* PANELS TABLE */}
      {/* ====================================== */}

      <table>

        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Model</th>
            <th>Status</th>
            <th>Usage (Sims)</th>
            <th>Installation</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {panels.map((panel) => (

            <tr key={panel.id}>

              {/* SERIAL NUMBER */}

              <td>
                {panel.serialNumber}
              </td>

              {/* MODEL */}

              <td>
                {panel.modelType}
              </td>

              {/* STATUS */}

              <td>
                <span className="badge">
                  {panel.status}
                </span>
              </td>

              {/* USAGE */}

              <td>

                <div className="mini-bar">

                  <div
                    style={{
                      width: `${Math.min(
                        ((panel.usageCount || 0) / 5) *
                          100,
                        100
                      )}%`,
                    }}
                  />

                </div>

              </td>

              {/* INSTALLATION */}

              <td>
                {panel.installationDate}
              </td>

              {/* ACTIONS */}

              <td>

                {isSolarOperator && (
                  <>

                    {/* EDIT */}

                    <button
                      type="button"
                      onClick={() =>
                        setPanelToEdit(panel)
                      }
                    >
                      Edit
                    </button>

                    {/* DELETE */}

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(panel.id)
                      }
                    >
                      Delete
                    </button>

                  </>
                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {/* ====================================== */}
      {/* EMPTY STATE */}
      {/* ====================================== */}

      {panels.length === 0 && (
        <EmptyState
          message="No panels registered for this site."
        />
      )}

      {/* ====================================== */}
      {/* ADD PANEL */}
      {/* ====================================== */}

      {isSolarOperator && (
        <button
          type="button"
          className="btn-primary"
          onClick={() =>
            setPanelToEdit(null)
          }
        >
          + Add Panel
        </button>
      )}

      {/* ====================================== */}
      {/* PANEL FORM */}
      {/* ====================================== */}

      {panelToEdit !== undefined && (
        <SolarPanelForm
          panelToEdit={panelToEdit}
          siteId={id}
          onClose={() =>
            setPanelToEdit(undefined)
          }
        />
      )}

    </div>
  );
};

export default SolarSiteDetails;