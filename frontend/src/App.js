import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useSelector } from "react-redux";

import Navbar from "./components/layout/Navbar";
import Login from "./components/Login";

import SolarSiteList from "./components/sites/SolarSiteList";
import SolarSiteDetails from "./components/sites/SolarSiteDetails";

import MaintenanceTicketList from "./components/tickets/MaintenanceTicketList";

import StatCards from "./components/dashboard/StatCards";
import StatusDonut from "./components/dashboard/StatusDonut";
import RecentActivity from "./components/dashboard/RecentActivity";

import "./App.css";


// ======================================================
// DASHBOARD
// ======================================================

export const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return null;
  }

  const analytics = {
    dailyGeneration: 1250.5,
    gridConsumption: 840.25,
    systemEfficiency: 87.5,
    activePanels: 24,
    openTickets: 3,

    ticketData: [
      {
        label: "Open",
        value: 3,
        color: "#ef4444",
      },
      {
        label: "In Progress",
        value: 2,
        color: "#f59e0b",
      },
      {
        label: "Resolved",
        value: 8,
        color: "#22c55e",
      },
    ],
  };

  const recent = [
    {
      id: 1,
      timestamp: new Date().toISOString(),
      panel: {
        id: 1,
      },
      generationKwh: 1250.5,
      gridConsumptionKwh: 840.25,
    },
    {
      id: 2,
      timestamp: new Date().toISOString(),
      panel: {
        id: 2,
      },
      generationKwh: 980.25,
      gridConsumptionKwh: 650.5,
    },
    {
      id: 3,
      timestamp: new Date().toISOString(),
      panel: {
        id: 3,
      },
      generationKwh: 1100.75,
      gridConsumptionKwh: 720.35,
    },
  ];

  return (
    <div className="container">

      <div className="welcome-card">
        <h1>
          Welcome back, {user.username}!
        </h1>

        <p>
          Your role:{" "}
          <strong>
            {user.role
              ? user.role.replace(/_/g, " ")
              : "USER"}
          </strong>
        </p>
      </div>


      {user.role === "SYSTEM_ADMINISTRATOR" && (
        <>
          <StatCards stats={analytics} />

          <StatusDonut
            data={analytics.ticketData}
          />

          <RecentActivity
            metrics={recent}
          />
        </>
      )}


      {user.role !== "SYSTEM_ADMINISTRATOR" && (
        <div className="action-cards">

          <div className="action-card">
            <h3>Solar Sites</h3>

            <p>
              View and manage solar sites.
            </p>

            <a href="/sites">
              View All Sites
            </a>
          </div>


          <div className="action-card">
            <h3>Maintenance Tickets</h3>

            <p>
              View maintenance tickets.
            </p>

            <a href="/tickets">
              Go to Tickets
            </a>
          </div>

        </div>
      )}

    </div>
  );
};


// ======================================================
// PROTECTED ROUTE
// ======================================================

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector(
    (state) => state.auth
  );

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
};


// ======================================================
// APP
// ======================================================

const App = () => {
  return (
    <Router>

      <div className="glass-container App">

        <Navbar />

        <Routes>

          {/* LOGIN */}

          <Route
            path="/login"
            element={<Login />}
          />


          {/* DASHBOARD */}

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />


          {/* SITES */}

          <Route
            path="/sites"
            element={
              <ProtectedRoute>
                <SolarSiteList />
              </ProtectedRoute>
            }
          />


          {/* SITE DETAILS */}

          <Route
            path="/sites/:id"
            element={
              <ProtectedRoute>
                <SolarSiteDetails />
              </ProtectedRoute>
            }
          />


          {/* TICKETS */}

          <Route
            path="/tickets"
            element={
              <ProtectedRoute>
                <MaintenanceTicketList />
              </ProtectedRoute>
            }
          />


          {/* UNKNOWN ROUTE */}

          <Route
            path="*"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />

        </Routes>

      </div>

    </Router>
  );
};

export default App; 