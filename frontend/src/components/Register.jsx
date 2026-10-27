import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("SOLAR_OPERATOR");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await authService.register({
        username,
        email,
        password,
        role,
      });

      setSuccess(
        "Registration successful. Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "Registration failed.";

      setError(
        typeof message === "string"
          ? message
          : "Registration failed."
      );
    } finally {
      setLoading(false);
    }
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
            <h1>SolarSync Register</h1>

            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
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
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />
              </div>

              <div>
                <select
                  id="role"
                  name="role"
                  value={role}
                  onChange={(e) =>
                    setRole(e.target.value)
                  }
                  required
                >
                  <option value="SOLAR_OPERATOR">
                    Solar Operator
                  </option>

                  <option value="MAINTENANCE_TECHNICIAN">
                    Maintenance Technician
                  </option>
                </select>
              </div>

              {error && (
                <div className="error-msg">
                  {error}
                </div>
              )}

              {success && (
                <div className="success-msg">
                  {success}
                </div>
              )}

              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
              >
                {loading
                  ? "Registering..."
                  : "Register"}
              </button>
            </form>

            <div className="register-link">
              <span>Already have an account? </span>

              <Link to="/login">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;