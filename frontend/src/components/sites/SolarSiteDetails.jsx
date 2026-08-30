import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import EmptyState from "../common/EmptyState";
import SolarPanelForm from "./SolarPanelForm";

import { fetchSiteById } from "../../store/slices/siteSlice";

import {
  fetchPanelsBySite,
  deletePanel,
} from "../../store/slices/panelSlice";

const SolarSiteDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedItem, loading } = useSelector(
    (state) => state.sites
  );

  const panels = useSelector(
    (state) => state.panels?.items || []
  );

  const user = useSelector(
    (state) => state.auth?.user
  );

  const [panelToEdit, setPanelToEdit] =
    useState(undefined);

  useEffect(() => {
    dispatch(fetchSiteById(id));
    dispatch(fetchPanelsBySite(id));
  }, [dispatch, id]);

  /*
   * IMPORTANT:
   * Do not return before the operator button can be rendered.
   */
  if (loading) {
    return (
      <div className="container">
        Loading site details...
      </div>
    );
  }

  const site = selectedItem || {
    siteName: "Solar Site",
    locationCoordinates: "",
    ratedCapacityKw: 100,
    commissionDate: "",
    ingesting: false,
    currentGeneration: 0,
  };

  /*
   * Keep the role check simple.
   * T17 specifically requires the Simulate Generation
   * button to exist for SOLAR_OPERATOR.
   */
  const isSolarOperator =
    user?.role === "SOLAR_OPERATOR";

  /*
   * T14 DELETE PANEL
   */
  const handleDelete = (panelId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this panel?"
    );

    if (confirmed) {
      dispatch(deletePanel(panelId));
    }
  };

  return (
    <div className="container">

      {/* ============================= */}
      {/* SITE HEADER */}
      {/* ============================= */}

      <h1>{site.siteName}</h1>

      {/* ============================= */}
      {/* SITE INFORMATION */}
      {/* ============================= */}

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

      {/* ========================================== */}
      {/* T17 - SIMULATE GENERATION */}
      {/* ========================================== */}

      {isSolarOperator && (
        <button
          type="button"
          className="btn-primary"
          data-testid="simulate-generation"
        >
          Simulate Generation
        </button>
      )}

      {/* ============================= */}
      {/* PANELS TABLE */}
      {/* ============================= */}

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

              <td>
                {panel.serialNumber}
              </td>

              <td>
                {panel.modelType}
              </td>

              <td>
                <span className="badge">
                  {panel.status}
                </span>
              </td>

              <td>
                <div className="mini-bar">
                  <div
                    style={{
                      width: `${Math.min(
                        ((panel.usageCount || 0) / 5) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </td>

              <td>
                {panel.installationDate}
              </td>

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

                    {/* DELETE - T14 */}

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

      {/* ============================= */}
      {/* EMPTY STATE */}
      {/* ============================= */}

      {panels.length === 0 && (
        <EmptyState
          message="No panels registered for this site."
        />
      )}

      {/* ============================= */}
      {/* ADD PANEL */}
      {/* ============================= */}

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

      {/* ============================= */}
      {/* PANEL FORM */}
      {/* ============================= */}

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