import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector(
    (state) => state.auth
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      login({
        username,
        password,
      })
    );
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-visual-section">
          <div className="login-visual-overlay"></div>
          <div className="login-branding">
            <div className="login-logo-badge">
              <span className="logo-icon">☀️</span> SolarSync
            </div>
            <h2>Smart Solar. <br />Simplified Management.</h2>
            <p>
              Monitor solar sites, panel performance, energy generation,
              and maintenance operations from one centralized platform.
            </p>
          </div>
        </div>

        <div className="login-form-section">
          <div className="login-card">
            <h1>SolarSync Login</h1>

            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <div className="error-msg">
                  {typeof error === "string"
                    ? error
                    : "Login failed. Please check your credentials."}
                </div>
              )}

              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="register-link">
              <span>Don't have an account? </span>

              <Link to="/register">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;