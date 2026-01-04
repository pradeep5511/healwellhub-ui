import { useState } from "react";
import Navbar from "../components/Navbar";
import "./FindDoctor.css";

const MOCK_DOCTORS = [
  {
    id: 1,
    name: "Dr. Amit Sharma",
    specialization: "Cardiologist",
    city: "Delhi",
    experience: 15
  },
  {
    id: 2,
    name: "Dr. Neha Verma",
    specialization: "Dermatologist",
    city: "Bangalore",
    experience: 10
  },
  {
    id: 3,
    name: "Dr. Rahul Mehta",
    specialization: "Orthopedic",
    city: "Mumbai",
    experience: 12
  },
  {
    id: 4,
    name: "Dr. Pooja Iyer",
    specialization: "Pediatrician",
    city: "Chennai",
    experience: 8
  }
];

export default function FindDoctor() {
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [city, setCity] = useState("");

  const filteredDoctors = MOCK_DOCTORS.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase()) &&
    (specialization ? doc.specialization === specialization : true) &&
    (city ? doc.city === city : true)
  );

  return (
    <>
      <Navbar />

      <div className="find-doctor-page">
        <h2>Find Verified Doctors</h2>
        <p className="subtitle">
          Search and consult trusted healthcare professionals near you
        </p>

        {/* 🔍 Search Filters */}
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
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Orthopedic">Orthopedic</option>
            <option value="Pediatrician">Pediatrician</option>
          </select>

          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">All Cities</option>
            <option value="Delhi">Delhi</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Chennai">Chennai</option>
          </select>
        </div>

        {/* 👨‍⚕️ Doctor Cards */}
        <div className="doctor-grid">
          {filteredDoctors.length === 0 && (
            <p className="no-results">No doctors found</p>
          )}

          {filteredDoctors.map((doc) => (
            <div className="doctor-card" key={doc.id}>
              <div className="avatar">
                {doc.name.charAt(0)}
              </div>

              <h3>{doc.name}</h3>
              <p className="spec">{doc.specialization}</p>
              <p className="meta">
                {doc.city} • {doc.experience}+ yrs experience
              </p>

              <button className="consult-btn">
                Consult
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}