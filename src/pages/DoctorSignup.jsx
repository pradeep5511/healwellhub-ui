import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

export default function DoctorSignup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    specialization: "",
    licenseNumber: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const isFormValid = Object.values(form).every(v => v.trim() !== "");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/register/doctor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setSuccess(data.message);

      setTimeout(() => {
        navigate("/login");
      }, 2500);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card wide">

        <div className="form-nav">
          <Link to="/">🏠 Home</Link>
          <Link to="/signup">⬅ Back</Link>
          <Link to="/login">Login</Link>
        </div>

        <h2>Doctor Registration</h2>
        <p className="subtitle">
          Register as a verified healthcare professional
        </p>

        {success && <div className="success-banner">{success}</div>}
        {error && <div className="error-banner">{error}</div>}

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
            />
            <input
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <input
              name="specialization"
              placeholder="Specialization"
              value={form.specialization}
              onChange={handleChange}
            />
            <input
              name="licenseNumber"
              placeholder="Medical License Number"
              value={form.licenseNumber}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="primary-btn strong"
            disabled={!isFormValid || loading}
          >
            {loading ? "Registering..." : "Register & Verify Email"}
          </button>

          <p className="form-note">
            Email verification and admin approval are required before login.
          </p>
        </form>
      </div>
    </div>
  );
}
