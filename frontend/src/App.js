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

  const { user } = useSelector(
    (state) => state.auth
  );

  if (!user) {
    return null;
  }


  // ----------------------------------------------------
  // ADMIN DASHBOARD DATA
  // ----------------------------------------------------

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


  // ----------------------------------------------------
  // RECENT ACTIVITY
  // ----------------------------------------------------

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
    <div className="container dashboard-page">


      {/* ================================================= */}
      {/* WELCOME */}
      {/* ================================================= */}

      <div className="welcome-card">

        <div>

          <p className="dashboard-label">
            SOLARSYNC DASHBOARD
          </p>

          <h1>
            Welcome back, {user.username}!
          </h1>

          <p className="dashboard-role">

            Your role:

            <strong>
              {" "}
              {user.role
                ? user.role.replace(
                    /_/g,
                    " "
                  )
                : "USER"}
            </strong>

          </p>

        </div>

      </div>


      {/* ================================================= */}
      {/* ADMIN DASHBOARD */}
      {/* ================================================= */}

      {user.role === "SYSTEM_ADMINISTRATOR" && (
        <>

          {/* STATISTICS */}

          <section className="dashboard-section">

            <StatCards
              stats={analytics}
            />

          </section>


          {/* TICKET STATUS */}

          <section className="dashboard-section">

            <StatusDonut
              data={analytics.ticketData}
            />

          </section>


          {/* RECENT ACTIVITY */}

          <section className="dashboard-section">

            <RecentActivity
              metrics={recent}
            />

          </section>

        </>
      )}


      {/* ================================================= */}
      {/* OPERATOR / OTHER USERS */}
      {/* ================================================= */}

      {user.role !== "SYSTEM_ADMINISTRATOR" && (

        <div className="action-cards">


          {/* SOLAR SITES */}

          <div className="action-card">

            <div className="action-card-icon">
              ☀️
            </div>

            <h3>
              Solar Sites
            </h3>

            <p>
              View and manage solar
              sites and their panels.
            </p>

            <a href="/sites">
              View All Sites →
            </a>

          </div>


          {/* MAINTENANCE */}

          <div className="action-card">

            <div className="action-card-icon">
              🔧
            </div>

            <h3>
              Maintenance Tickets
            </h3>

            <p>
              View and manage
              maintenance tickets.
            </p>

            <a href="/tickets">
              Go to Tickets →
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

const ProtectedRoute = ({
  children,
}) => {

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


        {/* NAVBAR */}

        <Navbar />


        {/* ROUTES */}

        <Routes>


          {/* LOGIN */}

          <Route
            path="/login"
            element={
              <Login />
            }
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


          {/* SOLAR SITES */}

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


          {/* MAINTENANCE TICKETS */}

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