import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import BASE_URL from "../../config/api";

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

      const data = await res.json();
      setDoctors(data);
    } catch (err) {
      console.error("Failed to load doctors", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const updateDoctorStatus = async (id, action) => {
    try {
      await fetch(`${BASE_URL}/api/admin/doctors/${id}/${action}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Refresh list
      fetchDoctors();
    } catch (err) {
      console.error("Action failed", err);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "40px" }}>
        <h2>Doctor Approvals</h2>

        {loading ? (
          <p>Loading doctors...</p>
        ) : doctors.length === 0 ? (
          <p>No doctors found.</p>
        ) : (
          <table border="1" cellPadding="10" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Specialization</th>
                <th>License</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doc) => (
                <tr key={doc.id}>
                  <td>
                    {doc.firstName} {doc.lastName}
                  </td>
                  <td>{doc.email}</td>
                  <td>{doc.specialization}</td>
                  <td>{doc.licenseNumber}</td>
                  <td>{doc.status}</td>
                  <td>
                    {doc.status === "PENDING" && (
                      <>
                        <button
                          onClick={() =>
                            updateDoctorStatus(doc.id, "approve")
                          }
                          style={{ marginRight: "10px" }}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            updateDoctorStatus(doc.id, "reject")
                          }
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}