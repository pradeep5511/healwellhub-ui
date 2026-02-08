import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import FindDoctor from "./pages/FindDoctor";

import SignupChoice from "./pages/SignupChoice";
import UserSignup from "./pages/UserSignup";
import DoctorSignup from "./pages/DoctorSignup";

import UserDashboard from "./pages/UserDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import Profile from "./pages/Profile";
import VerifyEmail from "./pages/VerifyEmail";

import AdminDashboard from "./pages/admin/AdminDashboard";
import UsersList from "./pages/admin/UsersList";
import DoctorsList from "./pages/admin/DoctorsList";

import ProtectedRoute from "./routes/ProtectedRoute";
import UploadReport from "./pages/UploadReport";

function App() {
  return (
    <Routes>
      {/* ===== Public Routes ===== */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/find-doctors" element={<FindDoctor />} />

      <Route path="/signup" element={<SignupChoice />} />
      <Route path="/signup/user" element={<UserSignup />} />
      <Route path="/signup/doctor" element={<DoctorSignup />} />
      <Route path="/verify-email" element={<VerifyEmail />} />

      {/* ===== Protected Routes ===== */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* ===== Admin Routes ===== */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute role="ADMIN">
            <UsersList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/doctors"
        element={
          <ProtectedRoute role="ADMIN">
            <DoctorsList />
          </ProtectedRoute>
        }
      />

      {/* ===== User Dashboard ===== */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute role="USER">
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      {/* ===== Doctor Dashboard ===== */}
      <Route
        path="/doctor/dashboard"
        element={
          <ProtectedRoute role="DOCTOR">
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;