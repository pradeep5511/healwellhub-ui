import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import BASE_URL from "../config/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Defensive checks
      if (!data.token || !data.role) {
        throw new Error("Invalid login response from server");
      }

      // Store auth info
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("email", data.email || email);

      // Role-based redirect
      if (data.role === "ADMIN") {
        navigate("/admin", { replace: true });
      } else if (data.role === "DOCTOR") {
        navigate("/doctor/dashboard", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-nav">
          <Link to="/">🏠 Home</Link>
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <Link to="/signup">Sign Up</Link>
        </div>

        <h2>Login</h2>

        {error && <div className="login-error">{error}</div>}

        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button disabled={!email || !password}>Login</button>
        </form>

        <p className="login-footer">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}