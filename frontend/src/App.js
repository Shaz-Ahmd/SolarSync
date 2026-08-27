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

import "./App.css";


export const Dashboard = () => {
  const dispatch = useDispatch();

  const { user } = useSelector(
    (state) => state.auth
  );

  const {
    analytics,
    recent,
  } = useSelector(
    (state) => state.analytics
  );

  useEffect(() => {
    dispatch(fetchAnalytics());
    dispatch(fetchRecentMetrics());
  }, [dispatch]);

  if (!user) {
    return null;
  }

  return (
    <div className="container">

      <div className="welcome-card">

        <h1>
          Welcome back, {user?.username}!
        </h1>

        <p>
          Your role:{" "}
          <strong>
            {user?.role?.replace(/_/g, " ")}
          </strong>
        </p>

      </div>

      {user.role ===
        "SYSTEM_ADMINISTRATOR" &&
        analytics && (
          <>

            <StatCards
              stats={analytics}
            />

            <StatusDonut
              data={analytics.ticketData}
            />

            <RecentActivity
              metrics={recent}
            />

          </>
        )}

      {user.role !==
        "SYSTEM_ADMINISTRATOR" && (
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


const App = () => {
  return (
    <Router>

      <div className="glass-container App">

        <Navbar />

        <Routes>

          <Route
            path="/login"
            element={<Login />}
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
};

export default App;