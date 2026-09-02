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

  const { user } = useSelector(
    (state) => state.auth
  );

  if (!user) {
    return null;
  }


  // ======================================================
  // ADMIN DASHBOARD DATA
  // ======================================================

  const analytics = {

    dailyGeneration: 1250.50,

    gridConsumption: 840.25,

    systemEfficiency: 87.5,

    activePanels: 24,

    openTickets: 3,

    ticketData: [
      {
        label: "Open",
        value: 3,
        color: "#d9574c",
      },

      {
        label: "In Progress",
        value: 2,
        color: "#e5a52f",
      },

      {
        label: "Resolved",
        value: 8,
        color: "#6fc266",
      },
    ],
  };


  // ======================================================
  // RECENT ACTIVITY DATA
  // ======================================================

  const recent = [
    {
      id: 1,

      timestamp: new Date().toISOString(),

      panel: {
        id: 1,
      },

      generationKwh: 1250.50,

      gridConsumptionKwh: 840.25,
    },

    {
      id: 2,

      timestamp: new Date().toISOString(),

      panel: {
        id: 2,
      },

      generationKwh: 980.25,

      gridConsumptionKwh: 650.50,
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
          WELCOME SECTION
          ================================================== */}

      <section className="dashboard-header">

        <div>

          <p className="dashboard-eyebrow">
            SOLARSYNC CONTROL CENTER
          </p>


          <h1>
            Welcome back, {user.username}!
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


          {/* ==================================================
              SYSTEM OVERVIEW
              ================================================== */}

          <section className="dashboard-section">

            <div className="section-heading">

              <div>

                <h2>
                  System Overview
                </h2>

                <p>
                  Current solar network performance
                </p>

              </div>

            </div>


            <StatCards
              stats={analytics}
            />

          </section>



          {/* ==================================================
              BOTTOM DASHBOARD
              ================================================== */}

          <section className="dashboard-grid">


            {/* ==================================================
                MAINTENANCE DISTRIBUTION
                ================================================== */}

            <div className="dashboard-panel">

              <div className="panel-header">

                <div>

                  <h2>
                    Maintenance Distribution
                  </h2>

                  <p>
                    Current ticket distribution
                  </p>

                </div>

              </div>


              <StatusDonut
                data={analytics.ticketData}
              />

            </div>



            {/* ==================================================
                RECENT ACTIVITY
                ================================================== */}

            <div className="dashboard-panel activity-panel">

              <div className="panel-header">

                <div>

                  <h2>
                    Recent Activity
                  </h2>

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

            </div>


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


          {/* ==================================================
              LOGIN
              ================================================== */}

          <Route
            path="/login"
            element={<Login />}
          />



          {/* ==================================================
              ADMIN / USER DASHBOARD
              ================================================== */}

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />



          {/* ==================================================
              SOLAR SITES
              ================================================== */}

          <Route
            path="/sites"
            element={
              <ProtectedRoute>
                <SolarSiteList />
              </ProtectedRoute>
            }
          />



          {/* ==================================================
              SITE DETAILS
              ================================================== */}

          <Route
            path="/sites/:id"
            element={
              <ProtectedRoute>
                <SolarSiteDetails />
              </ProtectedRoute>
            }
          />



          {/* ==================================================
              MAINTENANCE TICKETS
              ================================================== */}

          <Route
            path="/tickets"
            element={
              <ProtectedRoute>
                <MaintenanceTicketList />
              </ProtectedRoute>
            }
          />



          {/* ==================================================
              UNKNOWN ROUTE
              ================================================== */}

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