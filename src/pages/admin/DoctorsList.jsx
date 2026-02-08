import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import BASE_URL from "../../config/api";
import "./DoctorsList.css";

export default function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchDoctors = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/admin/doctors`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch doctors");
      }

      const data = await res.json();

      // handle both array and paginated responses
      if (Array.isArray(data)) {
        setDoctors(data);
      } else if (data.content) {
        setDoctors(data.content);
      } else {
        setDoctors([]);
      }
    } catch (err) {
      console.error(err);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const updateDoctorStatus = async (id, action) => {
    try {
      await fetch(`${BASE_URL}/api/admin/doctor/${id}/${action}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // refresh list after action
      fetchDoctors();
    } catch (err) {
      console.error("Action failed", err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="doctor-container">
        <h2>Doctor Approvals</h2>

        {loading ? (
          <p>Loading doctors...</p>
        ) : (
          <table className="doctor-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Specialization</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {doctors.length === 0 ? (
                <tr>
                  <td colSpan="5" className="no-data">
                    No doctor records found
                  </td>
                </tr>
              ) : (
                doctors.map((doc) => {
                  const status = doc.approvedByAdmin
                    ? "APPROVED"
                    : "PENDING";

                  return (
                    <tr key={doc.id}>
                      <td>
                        {doc.firstName} {doc.lastName}
                      </td>
                      <td>{doc.user.email}</td>
                      <td>{doc.specialization}</td>
                      <td>
                        <span
                          className={`status ${status.toLowerCase()}`}
                        >
                          {status}
                        </span>
                      </td>
                      <td>
                        {!doc.approvedByAdmin && (
                          <button
                            className="approve-btn"
                            onClick={() =>
                              updateDoctorStatus(doc.id, "approve")
                            }
                          >
                            Approve
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}