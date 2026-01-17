import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./DoctorSignup.css";

export default function DoctorSignup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "http://localhost:8080/api/auth/register/doctor",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    if (res.ok) {
      setMessage("Registration successful. Please verify your email.");
      setTimeout(() => navigate("/login"), 2500);
    }
  };

  return (
    <>
      <Navbar />

      <div className="doctor-signup-page">
        <form className="doctor-signup-card" onSubmit={handleSubmit}>
          <div className="doctor-nav">
            <Link to="/">🏠 Home</Link>
            <span>← Back</span>
            <Link to="/login">Login</Link>
          </div>

          <h2>Doctor Registration</h2>
          <p className="subtitle">
            Register as a verified healthcare professional
          </p>

          <div className="doctor-grid">
            <input
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              required
            />

            <input
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              required
            />

            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />

            <input
              name="specialization"
              placeholder="Specialization"
              onChange={handleChange}
              required
            />

            <input
              name="licenseNumber"
              placeholder="Medical License Number"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="doctor-btn">
            Register & Verify Email
          </button>

          <p className="note">
            Email verification and admin approval are required before login.
          </p>

          {message && <p className="success-msg">{message}</p>}
        </form>
      </div>
    </>
  );
}