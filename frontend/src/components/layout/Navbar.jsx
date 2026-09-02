import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout, reset } from "../../store/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  return (
    <nav className="navbar">

      {/* =================================================
          BRAND
         ================================================= */}

      <div className="navbar-brand">
        SolarSync
      </div>


      {/* =================================================
          NAVIGATION
         ================================================= */}

      <div className="navbar-links">

        <Link
          to="/"
          className={isActive("/") ? "active" : ""}
        >
          Home
        </Link>

        <Link
          to="/sites"
          className={isActive("/sites") ? "active" : ""}
        >
          Sites
        </Link>

        <Link
          to="/tickets"
          className={isActive("/tickets") ? "active" : ""}
        >
          Tickets
        </Link>

      </div>


      {/* =================================================
          USER
         ================================================= */}

      <div className="navbar-user">

        <span>
          Welcome back {user.username}
        </span>

        <button
          type="button"
          className="btn-logout"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
};

export default Navbar;