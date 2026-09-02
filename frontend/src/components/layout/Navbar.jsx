import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  return (
    <header className="navbar">

      {/* Logo */}
      <div className="navbar-logo">
        SolarSync
      </div>

      {/* Navigation */}
      <nav className="navbar-nav">

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `navbar-link ${isActive ? "active" : ""}`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/sites"
          className={({ isActive }) =>
            `navbar-link ${isActive ? "active" : ""}`
          }
        >
          Sites
        </NavLink>

        <NavLink
          to="/tickets"
          className={({ isActive }) =>
            `navbar-link ${isActive ? "active" : ""}`
          }
        >
          Tickets
        </NavLink>

      </nav>

      {/* Right side */}
      <div className="navbar-right">

        <span className="welcome-text">
          Welcome back {user?.username || ""}
        </span>

        <button
          type="button"
          className="logout-btn"
          onClick={onLogout}
        >
          Logout
        </button>

      </div>

    </header>
  );
};

export default Navbar;