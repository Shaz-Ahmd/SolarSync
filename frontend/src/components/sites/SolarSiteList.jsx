import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CapacityBar from "../common/CapacityBar";
import EmptyState from "../common/EmptyState";
import SolarSiteForm from "./SolarSiteForm";

import {
  fetchSites,
  setSearchQuery,
} from "../../store/siteSlice";

const SolarSiteList = () => {
  const dispatch = useDispatch();

  const { sites, loading, searchQuery } =
    useSelector((state) => state.sites);

  const { user } = useSelector(
    (state) => state.auth
  );

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchSites());
  }, [dispatch]);

  const filteredItems = sites.filter((site) =>
    site.siteName
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">

      <div className="page-header">
        <h1>Solar Sites</h1>

        {user?.role === "SYSTEM_ADMINISTRATOR" && (
          <button
            className="btn-primary"
            onClick={() => setShowForm(true)}
          >
            + Add Site
          </button>
        )}
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder=" Search solar sites by name..."
          value={searchQuery}
          onChange={(e) =>
            dispatch(
              setSearchQuery(e.target.value)
            )
          }
        />
      </div>

      {loading ? (
        <div className="loading-state">
          Loading sites...
        </div>
      ) : filteredItems.length === 0 ? (
        <EmptyState
          message="No solar sites found."
        />
      ) : (
        <table>
          <thead>
            <tr>
              <th>Site Identity</th>
              <th>Coordinates</th>
              <th>Capacity Usage</th>
              <th>Commissioned</th>
              <th>Panel Assets</th>
              <th>Management</th>
            </tr>
          </thead>

          <tbody>
            {filteredItems.map((site) => (
              <tr key={site.id}>

                <td>{site.siteName}</td>

                <td>
                  {site.locationCoordinates}
                </td>

                <td>
                  <CapacityBar
                    current={
                      site.currentGeneration || 0
                    }
                    total={
                      site.ratedCapacityKw
                    }
                  />
                </td>

                <td>
                  {site.commissionDate}
                </td>

                <td>
                  {site.panels?.length || 0}
                </td>

                <td>
                  <Link
                    to={`/sites/${site.id}`}
                  >
                    View Details
                  </Link>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <SolarSiteForm
          onClose={() => setShowForm(false)}
        />
      )}

    </div>
  );
};

export default SolarSiteList;