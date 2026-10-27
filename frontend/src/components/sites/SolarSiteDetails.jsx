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

import {
  ingestMockMetrics,
  clearMetricStatus,
} from "../../store/slices/metricSlice";

const SolarSiteDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedItem, loading } = useSelector(
    (state) => state.sites
  );

  const panelItems = useSelector(
    (state) => state.panels?.items
  );

  const panels = Array.isArray(panelItems)
    ? panelItems
    : [];

  const user = useSelector(
    (state) => state.auth?.user
  );

  const metricLoading = useSelector(
    (state) => state.metrics?.loading || false
  );

  const metricError = useSelector(
    (state) => state.metrics?.error
  );

  const metricSuccess = useSelector(
    (state) => state.metrics?.success || false
  );

  const [panelToEdit, setPanelToEdit] =
    useState(undefined);

  useEffect(() => {
    dispatch(fetchSiteById(id));
    dispatch(fetchPanelsBySite(id));
    dispatch(clearMetricStatus());
  }, [dispatch, id]);

  const site = selectedItem || {
    siteName: "Solar Site",
    locationCoordinates: "",
    ratedCapacityKw: 100,
    commissionDate: "",
    ingesting: false,
    currentGeneration: 0,
  };

  const isSolarOperator =
    user?.role === "SOLAR_OPERATOR" ||
    user?.role === "OPERATOR";

  const handleDelete = (panelId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this panel?"
      )
    ) {
      dispatch(deletePanel(panelId));
    }
  };

  const handleSimulateGeneration = async () => {
    if (panels.length === 0) {
      window.alert(
        "No panels are available for generation simulation."
      );
      return;
    }

    const metrics = panels.map((panel) => {
      const generationKwh = Number(
        (Math.random() * 40 + 10).toFixed(2)
      );

      const gridConsumptionKwh = Number(
        (Math.random() * 25 + 5).toFixed(2)
      );

      return {
        panelId: panel.id,
        generationKwh,
        gridConsumptionKwh,
      };
    });

    const batchData = {
      metrics,
    };

    try {
      await dispatch(
        ingestMockMetrics(batchData)
      ).unwrap();

      // Refresh panel usage and status
      await dispatch(fetchPanelsBySite(id));

      // Refresh site details
      await dispatch(fetchSiteById(id));
    } catch (error) {
      console.error(
        "Generation simulation failed:",
        error
      );
    }
  };

  if (loading) {
    return (
      <div className="container">
        Loading site details...
      </div>
    );
  }

  return (
    <div className="container">

      <h1>{site.siteName}</h1>

      <div className="site-info">
        <p>
          Coordinates: {site.locationCoordinates}
        </p>

        <p>
          Total Capacity: {site.ratedCapacityKw} KW
        </p>

        <p>
          Panels Count: {panels.length}
        </p>

        <p>
          Commissioned: {site.commissionDate}
        </p>
      </div>

      {isSolarOperator && (
        <>
          <button
            type="button"
            className="btn-primary"
            data-testid="simulate-generation"
            onClick={handleSimulateGeneration}
            disabled={metricLoading}
          >
            {metricLoading
              ? "Simulating..."
              : "⚡ Simulate Generation"}
          </button>

          {metricSuccess && !metricLoading && (
            <div className="success-message">
              Generation simulated successfully.
            </div>
          )}

          {metricError && (
            <div className="error-message">
              {typeof metricError === "string"
                ? metricError
                : metricError?.message ||
                  "Failed to simulate generation."}
            </div>
          )}
        </>
      )}

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
                <span
                  className={`badge badge-panel-${String(
                    panel.status || ""
                  )
                    .toLowerCase()
                    .replace(/_/g, "-")}`}
                >
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
                {(isSolarOperator ||
                  user?.role ===
                    "SYSTEM_ADMINISTRATOR") && (
                  <>
                    <button
                      type="button"
                      className="btn-edit"
                      onClick={() =>
                        setPanelToEdit(panel)
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="btn-delete"
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

      {panels.length === 0 && (
        <EmptyState
          message="No panels registered for this site."
        />
      )}

      {isSolarOperator && (
        <button
          type="button"
          className="btn-primary"
          onClick={() => setPanelToEdit(null)}
        >
          + Add Panel
        </button>
      )}

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