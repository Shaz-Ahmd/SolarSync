import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  NavLink,
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
    <main className="dashboard-page">

      {/* ==================================================
          ADMIN HEADER
          ================================================== */}

      <section className="dashboard-header">

        <div>
          <p className="dashboard-eyebrow">
            SOLARSYNC CONTROL CENTER
          </p>

          <h1>
            Welcome back, {user.username}
          </h1>

          <p className="dashboard-subtitle">
            Monitor your solar infrastructure,
            generation and maintenance activity.
          </p>
        </div>

        <div className="dashboard-role">
          {user.role
            ? user.role.replace(/_/g, " ")
            : "USER"}
        </div>

      </section>


      {/* ==================================================
          ADMIN DASHBOARD
          ================================================== */}

      {user.role === "SYSTEM_ADMINISTRATOR" && (
        <>

          {/* STATISTICS */}

          <section className="dashboard-section">

            <div className="section-heading">
              <div>
                <h2>System Overview</h2>
                <p>
                  Current solar network performance
                </p>
              </div>
            </div>

            <StatCards stats={analytics} />

          </section>


          {/* ANALYTICS */}

          <section className="dashboard-grid">

            <div className="dashboard-panel dashboard-chart-panel">

              <div className="panel-header">

                <div>
                  <h2>Energy Performance</h2>
                  <p>
                    Daily generation and grid consumption
                  </p>
                </div>

                <select
                  className="chart-select"
                  defaultValue="today"
                >
                  <option value="today">
                    Today
                  </option>

                  <option value="week">
                    This Week
                  </option>

                  <option value="month">
                    This Month
                  </option>
                </select>

              </div>

              <div className="energy-chart">

                <div className="chart-y-axis">
                  <span>1500</span>
                  <span>1000</span>
                  <span>500</span>
                  <span>0</span>
                </div>

                <div className="chart-area">

                  <div className="chart-grid-line" />
                  <div className="chart-grid-line" />
                  <div className="chart-grid-line" />
                  <div className="chart-grid-line" />

                  <svg
                    viewBox="0 0 800 300"
                    preserveAspectRatio="none"
                    className="energy-svg"
                  >

                    {/* Generation line */}

                    <polyline
                      points="
                        0,220
                        100,180
                        200,195
                        300,125
                        400,150
                        500,80
                        600,105
                        700,45
                        800,70
                      "
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Grid consumption line */}

                    <polyline
                      points="
                        0,255
                        100,230
                        200,245
                        300,205
                        400,220
                        500,175
                        600,190
                        700,145
                        800,160
                      "
                      fill="none"
                      stroke="#94a3b8"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Generation points */}

                    <circle cx="0" cy="220" r="5" />
                    <circle cx="100" cy="180" r="5" />
                    <circle cx="200" cy="195" r="5" />
                    <circle cx="300" cy="125" r="5" />
                    <circle cx="400" cy="150" r="5" />
                    <circle cx="500" cy="80" r="5" />
                    <circle cx="600" cy="105" r="5" />
                    <circle cx="700" cy="45" r="5" />
                    <circle cx="800" cy="70" r="5" />

                  </svg>

                  <div className="chart-x-axis">
                    <span>06 AM</span>
                    <span>09 AM</span>
                    <span>12 PM</span>
                    <span>03 PM</span>
                    <span>06 PM</span>
                  </div>

                </div>

              </div>


              <div className="chart-legend">

                <div>
                  <span className="legend-dot generation-dot" />
                  Solar Generation
                </div>

                <div>
                  <span className="legend-dot consumption-dot" />
                  Grid Consumption
                </div>

              </div>

            </div>


            {/* TICKET STATUS */}

            <div className="dashboard-panel">

              <div className="panel-header">

                <div>
                  <h2>Maintenance Tickets</h2>
                  <p>
                    Current ticket distribution
                  </p>
                </div>

              </div>

              <StatusDonut
                data={analytics.ticketData}
              />

            </div>

          </section>


          {/* RECENT ACTIVITY */}

          <section className="dashboard-panel activity-panel">

            <div className="panel-header">

              <div>
                <h2>Recent Activity</h2>

                <p>
                  Latest solar system readings
                </p>
              </div>

              <NavLink
                to="/sites"
                className="panel-link"
              >
                View Sites →
              </NavLink>

            </div>

            <RecentActivity
              metrics={recent}
            />

          </section>

        </>
      )}


      {/* ==================================================
          NON ADMIN DASHBOARD
          ================================================== */}

      {user.role !== "SYSTEM_ADMINISTRATOR" && (

        <section className="action-cards">

          <div className="action-card">

            <div className="action-card-icon">
              ☀
            </div>

            <h3>
              Solar Sites
            </h3>

            <p>
              View and manage your solar
              installation sites.
            </p>

            <NavLink to="/sites">
              View Solar Sites →
            </NavLink>

          </div>


          <div className="action-card">

            <div className="action-card-icon">
              🔧
            </div>

            <h3>
              Maintenance Tickets
            </h3>

            <p>
              View existing maintenance tickets
              and report new issues.
            </p>

            <NavLink to="/tickets">
              Open Tickets →
            </NavLink>

          </div>

        </section>

      )}

    </main>
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