import { Link } from "react-router-dom";
import "./SignupChoice.css";

export default function SignupChoice() {
  return (
    <div className="choice-page">
      <div className="choice-card-wrapper">
        <h2>Join HealWellHub</h2>
        <p className="choice-subtitle">
          Choose how you’d like to get started
        </p>

        <div className="choice-grid">
          <Link to="/signup/user" className="choice-card user">
            <div className="choice-icon">👤</div>
            <h3>User</h3>
            <p>
              Upload reports, consult doctors, and receive personalized
              medical guidance.
            </p>
          </Link>

          <Link to="/signup/doctor" className="choice-card doctor">
            <div className="choice-icon">🩺</div>
            <h3>Doctor</h3>
            <p>
              Register as a healthcare professional and connect with patients.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}