import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import BASE_URL from "../../config/api";
import "./UsersList.css";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await res.json();

      // handle both array and paginated responses
      if (Array.isArray(data)) {
        setUsers(data);
      } else if (data.content) {
        setUsers(data.content);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error(err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateUserStatus = async (id, action) => {
    try {
      await fetch(`${BASE_URL}/api/admin/users/${id}/${action}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchUsers();
    } catch (err) {
      console.error("Action failed", err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="user-container">
        <h2>User Management</h2>

        {loading ? (
          <p>Loading users...</p>
        ) : (
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="no-data">
                    No user records found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      {user.firstName || ""} {user.lastName || ""}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <span
                        className={`status ${
                          user.enabled ? "approved" : "pending"
                        }`}
                      >
                        {user.enabled ? "ACTIVE" : "INACTIVE"}
                      </span>
                    </td>
                    <td>
                      {user.enabled ? (
                        <button
                          className="reject-btn"
                          onClick={() =>
                            updateUserStatus(user.id, "deactivate")
                          }
                        >
                          Deactivate
                        </button>
                      ) : (
                        <button
                          className="approve-btn"
                          onClick={() =>
                            updateUserStatus(user.id, "activate")
                          }
                        >
                          Activate
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}