import Navbar from "../components/Navbar";

export default function DoctorDashboard() {
  return (
    <>
      <Navbar />
      <div style={{ padding: "40px" }}>
        <h2>Doctor Dashboard</h2>
        <p>Status: Pending Admin Approval</p>
        <p>
          You will be able to consult patients once approved by the admin.
        </p>
      </div>
    </>
  );
}