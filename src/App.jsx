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
import ProtectedRoute from "./routes/ProtectedRoute";
import Profile from "./pages/Profile";

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
      <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />


      {/* ===== Protected Routes ===== */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute role="USER">
            <UserDashboard />
          </ProtectedRoute>
        }
      />

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