import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./DoctorSignup.css";
import BASE_URL from "../config/api";

export default function DoctorSignup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch(
        `${BASE_URL}/api/auth/register/doctor`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      let data = {};
      try {
        data = await res.json();
      } catch {
        // ignore empty response
      }

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Redirect to OTP screen (same as user signup)
      navigate(`/verify-email?email=${form.email}`);

    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
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

          <button type="submit" className="doctor-btn" disabled={loading}>
            {loading ? "Registering..." : "Register & Verify Email"}
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