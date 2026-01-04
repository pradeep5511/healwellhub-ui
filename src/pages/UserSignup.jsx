import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Signup.css";

export default function UserSignup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "http://localhost:8080/api/auth/register/user",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      }
    );

    if (res.ok) {
      setMessage("Registration successful. Please verify your email.");
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  return (
    <>
      <Navbar />
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>User Registration</h2>

        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

        <input name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} required />

        <input name="dob" type="date" onChange={handleChange} required />

        <input name="place" placeholder="City / Place" onChange={handleChange} required />
        <input name="state" placeholder="State" onChange={handleChange} required />
        <input name="country" placeholder="Country" onChange={handleChange} required />

        <button type="submit">Register</button>

        {message && <p className="success">{message}</p>}
      </form>
    </>
  );
}
