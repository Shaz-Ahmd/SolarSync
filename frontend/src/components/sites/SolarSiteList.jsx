import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CapacityBar from "../common/CapacityBar";
import EmptyState from "../common/EmptyState";
import SolarSiteForm from "./SolarSiteForm";

const SolarSiteList = () => {
  const { user } = useSelector((state) => state.auth);

  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Temporary frontend data.
  // Backend/API integration will be added later.
  const sites = [
    {
      id: 1,
      siteName: "Solar Site Alpha",
      locationCoordinates: "12.9716, 77.5946",
      currentGeneration: 75,
      ratedCapacityKw: 100,
      commissionDate: "2025-01-15",
      panels: [
        { id: 1, name: "Panel A" },
        { id: 2, name: "Panel B" },
      ],
    },
    {
      id: 2,
      siteName: "Solar Site Beta",
      locationCoordinates: "13.0827, 80.2707",
      currentGeneration: 60,
      ratedCapacityKw: 80,
      commissionDate: "2025-03-10",
      panels: [
        { id: 3, name: "Panel C" },
      ],
    },
  ];

  const filteredItems = sites.filter((site) =>
    site.siteName
      .toLowerCase()
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
          placeholder="Search solar sites by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredItems.length === 0 ? (
        <EmptyState message="No solar sites found." />
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
                    current={site.currentGeneration}
                    total={site.ratedCapacityKw}
                  />
                </td>

                <td>
                  {site.commissionDate}
                </td>

                <td>
                  {site.panels?.length || 0}
                </td>

                <td>
                  <Link to={`/sites/${site.id}`}>
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