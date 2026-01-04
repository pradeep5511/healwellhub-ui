import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./Home.css";

export default function Home() {
  return (
    <>
      <Navbar />

      <section className="hero">
        <div className="hero-content-wrapper">
          <div className="hero-card">
            <h1>Your Health. One Smart Hub.</h1>

            <p>
              Upload medical reports, understand insights, consult nearby
              verified doctors, and get relevant medicine guidance — all in
              one secure platform.
            </p>

            <div className="cta">
              <button className="primary-btn">
                Upload Report
              </button>

              <Link to="/find-doctors" className="secondary-btn">
                Find Doctors
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}