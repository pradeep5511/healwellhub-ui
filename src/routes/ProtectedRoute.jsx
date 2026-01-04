import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // Not logged in → login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Role-based protection (optional but future-proof)
  if (role && userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}
