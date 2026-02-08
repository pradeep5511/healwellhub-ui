import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Signup.css";
import BASE_URL from "../config/api";

export default function UserSignup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    place: "",
    state: "",
    country: ""
  });

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
        `${BASE_URL}/api/auth/register/user`,
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
        // backend returned empty body
      }

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Redirect to OTP screen
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

      <div className="signup-page">
        <form className="signup-card" onSubmit={handleSubmit}>
          <h2>User Registration</h2>

          <div className="signup-grid">
            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />

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
              name="dob"
              type="date"
              onChange={handleChange}
              required
            />

            <input
              name="place"
              placeholder="City / Place"
              onChange={handleChange}
              required
            />

            <input
              name="state"
              placeholder="State"
              onChange={handleChange}
              required
            />

            <input
              name="country"
              placeholder="Country"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

          {message && <p className="success-msg">{message}</p>}
        </form>
      </div>
    </>
  );
}