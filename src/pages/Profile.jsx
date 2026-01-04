import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./Profile.css";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/users/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(async (res) => {
        if (!res.ok) {
          const msg = await res.text();
          throw new Error(msg || "Failed to load profile");
        }
        return res.json();
      })
      .then(setProfile)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <>
        <Navbar />
        <div style={{ padding: "40px", color: "red" }}>{error}</div>
      </>
    );
  }

  if (!profile) {
    return (
      <>
        <Navbar />
        <div style={{ padding: "40px" }}>Loading profile...</div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="profile-page">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {profile.email.charAt(0).toUpperCase()}
            </div>
            <div className="profile-title">My Profile</div>
          </div>

          <div className="profile-info">
            <div className="profile-item">
              <span>Email</span>
              {profile.email}
            </div>

            <div className="profile-item">
              <span>Role</span>
              <span className="profile-badge">{profile.role}</span>
            </div>

            <div className="profile-item">
              <span>First Name</span>
              {profile.firstName || "-"}
            </div>

            <div className="profile-item">
              <span>Last Name</span>
              {profile.lastName || "-"}
            </div>

            <div className="profile-item">
              <span>Active</span>
              {profile.active ? "Yes" : "No"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}