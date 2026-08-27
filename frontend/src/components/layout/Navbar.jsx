import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout, reset } from '../../store/slices/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        SolarSync
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/sites">Sites</Link>
        <Link to="/tickets">Tickets</Link>
      </div>

      <div className="navbar-user">
        <span>
          Welcome back {user.username}
        </span>

        <button
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