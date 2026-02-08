import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import BASE_URL from "../../config/api";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    doctors: 0,
    pendingDoctors: 0,
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/admin/stats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Failed to load stats", err);
      }
    };

    fetchStats();
  }, [token]);

  return (
    <>
      <Navbar />

      <div className="admin-container">
        <h2>Admin Dashboard</h2>

        <div className="admin-cards">
          <div className="admin-card">
            <h3>{stats.users}</h3>
            <p>Total Users</p>
            <Link to="/admin/users">View Users</Link>
          </div>

          <div className="admin-card">
            <h3>{stats.doctors}</h3>
            <p>Total Doctors</p>
            <Link to="/admin/doctors">View Doctors</Link>
          </div>

          <div className="admin-card pending">
            <h3>{stats.pendingDoctors}</h3>
            <p>Pending Approvals</p>
            <Link to="/admin/doctors">Review</Link>
          </div>
        </div>
      </div>
    </>
  );
}