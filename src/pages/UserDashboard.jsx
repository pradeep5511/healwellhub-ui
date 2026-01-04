import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function UserDashboard() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/users/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(setProfile);
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div style={{ padding: "40px" }}>
        <h2>Welcome, {profile.firstName}</h2>
        <p>Email: {profile.email}</p>
        <p>Role: USER</p>
      </div>
    </>
  );
}