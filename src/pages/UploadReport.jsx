import { useState } from "react";
import Navbar from "../components/Navbar";
import BASE_URL from "../config/api";

export default function UploadReport() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${BASE_URL}/api/reports/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const text = await res.text();

      if (!res.ok) throw new Error(text);

      setMessage("Report uploaded successfully");
      setFile(null);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "40px" }}>
        <h2>Upload Medical Report</h2>

        <form onSubmit={handleUpload}>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <br /><br />
          <button type="submit">Upload</button>
        </form>

        {message && <p>{message}</p>}
      </div>
    </>
  );
}