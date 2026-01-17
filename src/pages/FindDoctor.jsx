import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./FindDoctor.css";

export default function FindDoctor() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/doctors", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Failed to load doctors");
        }
        return res.json();
      })
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredDoctors = doctors.filter((d) => {
    const name =
      d.name ||
      `${d.firstName || ""} ${d.lastName || ""}`.trim();

    const matchesName = name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesSpec = specialization
      ? (d.specialization || "").toLowerCase() ===
        specialization.toLowerCase()
      : true;

    const matchesCity = city
      ? (d.city || "").toLowerCase() === city.toLowerCase()
      : true;

    return matchesName && matchesSpec && matchesCity;
  });

  return (
    <>
      <Navbar />

      <div className="find-doctor-page">
        <h2>Find Verified Doctors</h2>
        <p className="subtitle">
          Search and consult trusted healthcare professionals near you
        </p>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search doctor by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          >
            <option value="">All Specializations</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Dermatology">Dermatology</option>
            <option value="Orthopedic">Orthopedic</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="General">General</option>
          </select>

          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">All Cities</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Chennai">Chennai</option>
          </select>
        </div>

        {/* States */}
        {loading && <p>Loading doctors...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Doctor Grid */}
        <div className="doctor-grid">
          {!loading && filteredDoctors.length === 0 && (
            <div className="no-results">No doctors found</div>
          )}

          {filteredDoctors.map((doc) => {
            const displayName =
              doc.name ||
              `${doc.firstName || ""} ${doc.lastName || ""}`.trim();

            return (
              <div className="doctor-card" key={doc.id}>
                <div className="avatar">
                  {doc.profileImage ? (
                    <img
                      src={`http://localhost:8080/uploads/profile-images/${doc.profileImage}`}
                      alt="Doctor"
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    (displayName || "D").charAt(0)
                  )}
                </div>

                <h3>{displayName || "Doctor"}</h3>

                <div className="spec">
                  {doc.specialization || "General"}
                </div>

                <div className="meta">
                  {doc.city || "India"} ·{" "}
                  {doc.experience || 0}+ yrs experience
                </div>

                <button className="consult-btn">
                  Consult
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}