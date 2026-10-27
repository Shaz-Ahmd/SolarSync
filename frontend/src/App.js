import React, { useEffect } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Navbar from "./components/layout/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";

import SolarSiteList from "./components/sites/SolarSiteList";
import SolarSiteDetails from "./components/sites/SolarSiteDetails";

import MaintenanceTicketList from "./components/tickets/MaintenanceTicketList";

import StatCards from "./components/dashboard/StatCards";
import StatusDonut from "./components/dashboard/StatusDonut";
import RecentActivity from "./components/dashboard/RecentActivity";

import {
  fetchAnalytics,
  fetchRecentMetrics,
} from "./store/slices/metricSlice";

import {
  fetchTickets,
} from "./store/slices/ticketSlice";

import "./App.css";


export const Dashboard = () => {

  const dispatch = useDispatch();

  const { user } = useSelector(
    (state) => state.auth
  );

  const {
    analytics,
    recent,
    loading: metricLoading,
    error: metricError,
  } = useSelector(
    (state) => state.metrics || {}
  );

  const {
    loading: ticketLoading,
    error: ticketError,
  } = useSelector(
    (state) => state.tickets || {}
  );


  useEffect(() => {

    if (user?.role !== "SYSTEM_ADMINISTRATOR") {
      return;
    }

    dispatch(fetchAnalytics());
    dispatch(fetchRecentMetrics());
    dispatch(fetchTickets());

  }, [dispatch, user?.role]);


  if (!user) {
    return null;
  }


  const stats = {
    dailyGeneration:
      Number(
        analytics?.totalGeneration
      ) || 0,

    gridConsumption:
      Number(
        analytics?.totalConsumption
      ) || 0,

    systemEfficiency:
      (Number(
        analytics?.efficiencyRatio
      ) || 0) * 100,

    activePanels:
      Number(
        analytics?.totalActivePanels
      ) || 0,

    openTickets:
      Number(
        analytics?.openTickets
      ) || 0,
  };


  const ticketData = [
    {
      label: "Open",
      value:
        Number(
          analytics?.openTickets
        ) || 0,
      color: "#ef4444",
    },

    {
      label: "In Progress",
      value:
        Number(
          analytics?.inProgressTickets
        ) || 0,
      color: "#f59e0b",
    },

    {
      label: "Resolved",
      value:
        Number(
          analytics?.resolvedTickets
        ) || 0,
      color: "#22c55e",
    },
  ];


  const recentMetrics =
    Array.isArray(recent)
      ? recent
      : [];


  const dashboardLoading =
    metricLoading ||
    ticketLoading;


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
              ? user.role.replace(
                  /_/g,
                  " "
                )
              : "USER"}
          </strong>
        </p>

      </div>


      {user.role ===
        "SYSTEM_ADMINISTRATOR" && (
        <>

          <h2 className="section-title">
            System Overview
          </h2>


          {metricError && (
            <div className="error-message">
              {typeof metricError === "string"
                ? metricError
                : "Failed to load energy analytics."}
            </div>
          )}


          {ticketError && (
            <div className="error-message">
              {typeof ticketError === "string"
                ? ticketError
                : "Failed to load ticket data."}
            </div>
          )}


          <StatCards
            stats={stats}
          />


          <div className="dashboard-grid">

            <StatusDonut
              data={ticketData}
            />

            <RecentActivity
              metrics={recentMetrics}
            />

          </div>


          {dashboardLoading && (
            <div className="loading-state">
              Updating dashboard data...
            </div>
          )}

        </>
      )}


      {user.role !==
        "SYSTEM_ADMINISTRATOR" && (

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


const App = () => (

  <Router>

    <div className="glass-container App">

      <Navbar />

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sites"
          element={
            <ProtectedRoute>
              <SolarSiteList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sites/:id"
          element={
            <ProtectedRoute>
              <SolarSiteDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tickets"
          element={
            <ProtectedRoute>
              <MaintenanceTicketList />
            </ProtectedRoute>
          }
        />

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


export default App;