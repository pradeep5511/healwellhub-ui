import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./Profile.css";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "" });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const loadProfile = async () => {
    const res = await fetch("http://localhost:8080/api/users/me", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setProfile(data);
    setForm({
      firstName: data.firstName || "",
      lastName: data.lastName || ""
    });
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const saveProfile = async () => {
    const res = await fetch("http://localhost:8080/api/users/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    setProfile(data);
    setEditMode(false);
    setMessage("Profile updated successfully");
    setTimeout(() => setMessage(""), 3000);
  };

  const uploadImage = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(
      "http://localhost:8080/api/users/profile-image",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      }
    );

    if (res.ok) {
      setMessage("Profile image updated");
      loadProfile();
      setTimeout(() => setMessage(""), 3000);
    }
  };

  if (!profile) {
    return (
      <>
        <Navbar />
        <div className="profile-page">Loading...</div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="profile-page">
        <div className="profile-card-modern">

          {/* Avatar */}
          <div className="avatar-wrapper">
            <img
              src={
                profile.profileImage
                  ? `http://localhost:8080/uploads/profile-images/${profile.profileImage}`
                  : "/default-avatar.png"
              }
              alt="Profile"
            />

            <label className="avatar-upload">
              <input
                type="file"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
              />
              📷
            </label>
          </div>

          <button className="btn-upload" onClick={uploadImage}>
            Update Photo
          </button>

          {/* Name & Role */}
          <h2 className="profile-name">
            {profile.firstName} {profile.lastName}
          </h2>

          <span className="role-pill">{profile.role}</span>

          {message && <div className="success-msg">{message}</div>}

          {/* Info */}
          <div className="profile-info-grid">
            <div>
              <label>Email</label>
              <p>{profile.email}</p>
            </div>

            <div>
              <label>First Name</label>
              {editMode ? (
                <input
                  value={form.firstName}
                  onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                />
              ) : (
                <p>{profile.firstName || "-"}</p>
              )}
            </div>

            <div>
              <label>Last Name</label>
              {editMode ? (
                <input
                  value={form.lastName}
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                />
              ) : (
                <p>{profile.lastName || "-"}</p>
              )}
            </div>

            <div>
              <label>Status</label>
              <p className={profile.active ? "active" : "inactive"}>
                {profile.active ? "Active" : "Inactive"}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="profile-actions-modern">
            {editMode ? (
              <>
                <button className="btn-primary" onClick={saveProfile}>
                  Save Changes
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="btn-primary"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
