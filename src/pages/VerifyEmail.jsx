import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./VerifyEmail.css";
import BASE_URL from "../config/api";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [timer, setTimer] = useState(60);
  const isOtpComplete = otp.join("").length === 6;

  const inputs = useRef([]);
  const maskEmail = (email) => {
    if (!email) return "";
    const [name, domain] = email.split("@");
    if (name.length <= 2) return name + "***@" + domain;
    return name.substring(0, 2) + "****@" + domain;
  };
  const [shake, setShake] = useState(false);


  /* ---------------- Timer Logic ---------------- */
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  /* ---------------- OTP Change ---------------- */
  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }

    // Auto submit when all digits filled
    if (newOtp.join("").length === 6) {
      verifyOtp(newOtp.join(""));
    }
  };

  /* ---------------- Verify OTP ---------------- */
  const verifyOtp = async (code) => {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: code }),
      });

      if (!res.ok) {
        setShake(true);
        setTimeout(() => setShake(false), 500);
        throw new Error("Invalid or expired OTP");
      }

      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);

    } catch (err) {
      setMessage(err.message);
    }
  };

  /* ---------------- Resend OTP ---------------- */
  const handleResend = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/auth/resend-otp?email=${email}`,
        { method: "POST" }
      );

      if (!res.ok) throw new Error("Failed to resend OTP");

      setTimer(60);
      setMessage("New OTP sent to your email.");
      setOtp(["", "", "", "", "", ""]);
      inputs.current[0].focus();
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <>
      <Navbar />

      <div className="verify-page">
        <div className={`verify-card ${success ? "success" : ""}`}>
          <h2>Email Verification</h2>
          <p className="subtitle">Enter the 6-digit code sent to</p>
          <p className="email"><strong>{maskEmail(email)}</strong></p>

          <div className={`otp-boxes ${shake ? "shake" : ""}`}>
            {otp.map((digit, i) => (
              <input
                key={i}
                type="text"
                maxLength="1"
                value={digit}
                ref={(el) => (inputs.current[i] = el)}
                onChange={(e) => handleChange(e.target.value, i)}
              />
            ))}
          </div>

          {!success && (
            <button
              className="verify-btn"
              disabled={!isOtpComplete}
              onClick={() => verifyOtp(otp.join(""))}
            >
              Verify OTP
            </button>
          )}

          {message && <p className="message">{message}</p>}

          {!success && (
            <p className="resend">
              {timer > 0 ? (
                <>Resend available in {timer}s</>
              ) : (
                <span onClick={handleResend}>Resend OTP</span>
              )}
            </p>
          )}

          {success && (
            <div className="success-check">
              ✓
            </div>
          )}
        </div>
      </div>
    </>
  );
}