import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span className="logo-icon">➕</span>
        HealWellHub
      </Link>

      <div className="nav-links">
        <Link to="/about">About</Link>
        <Link to="/find-doctors">Find Doctors</Link>

        {token && <Link to="/profile">Profile</Link>}

        {!token && <Link to="/login">Login</Link>}

        {token && (
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}