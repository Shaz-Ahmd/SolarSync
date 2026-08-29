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

  // ------------------------------------------------------
  // TEMPORARY FRONTEND DATA
  // Backend integration will be added later.
  // ------------------------------------------------------

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
      message: "Solar Site Alpha generated 1250 kWh today",
      date: "Today",
    },
    {
      id: 2,
      message: "Maintenance ticket created",
      date: "Today",
    },
    {
      id: 3,
      message: "Solar Panel inspection completed",
      date: "Yesterday",
    },
  ];

  // ------------------------------------------------------
  // No logged-in user
  // ------------------------------------------------------

  if (!user) {
    return null;
  }

  return (
    <div className="container">

      {/* Welcome Section */}
      <div className="welcome-card">

        <h1>
          Welcome back, {user.username}!
        </h1>

        <p>
          Your role:{" "}
          <strong>
            {user.role?.replace(/_/g, " ")}
          </strong>
        </p>

      </div>


      {/* ==================================================
          ADMIN DASHBOARD
          ================================================== */}

      {user.role === "SYSTEM_ADMINISTRATOR" && (
        <>

          {/* Statistics */}
          <StatCards
            stats={analytics}
          />


          {/* Ticket Status */}
          <StatusDonut
            data={analytics.ticketData}
          />


          {/* Recent Activity */}
          <RecentActivity
            metrics={recent}
          />

        </>
      )}


      {/* ==================================================
          OPERATOR / OTHER USER DASHBOARD
          ================================================== */}

      {user.role !== "SYSTEM_ADMINISTRATOR" && (
        <div className="action-cards">

          <div className="action-card">

            <h3>
              Solar Sites
            </h3>

            <p>
              View and manage solar sites.
            </p>

            <a href="/sites">
              View All Sites
            </a>

          </div>


          <div className="action-card">

            <h3>
              Maintenance Tickets
            </h3>

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

        {/* Navigation */}
        <Navbar />


        <Routes>

          {/* ================= LOGIN ================= */}

          <Route
            path="/login"
            element={<Login />}
          />


          {/* ================= DASHBOARD ================= */}

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />


          {/* ================= SOLAR SITES ================= */}

          <Route
            path="/sites"
            element={
              <ProtectedRoute>
                <SolarSiteList />
              </ProtectedRoute>
            }
          />


          {/* ================= SITE DETAILS ================= */}

          <Route
            path="/sites/:id"
            element={
              <ProtectedRoute>
                <SolarSiteDetails />
              </ProtectedRoute>
            }
          />


          {/* ================= TICKETS ================= */}

          <Route
            path="/tickets"
            element={
              <ProtectedRoute>
                <MaintenanceTicketList />
              </ProtectedRoute>
            }
          />


          {/* ================= UNKNOWN ROUTE ================= */}

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