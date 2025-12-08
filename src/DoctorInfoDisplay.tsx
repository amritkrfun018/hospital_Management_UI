import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { DoctorDisplayDTO, PageResponse } from "./types";
import "./doctor.css";

export default function DoctorsInfoDisplay() {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [data, setData] = useState<PageResponse<DoctorDisplayDTO> | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDoctors = async (pageNum: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://health-care-management-gateway-service.onrender.com/public/doctor/getAll?page=${pageNum}&size=5`,
        {
          method: "GET",
          credentials: "include",  // 🔥 cookie automatically included
        }
      );

      if (res.status === 401) {
        console.log("Unauthorized — redirecting to login");
        navigate("/login", { replace: true });
        return;
      }

      const json: PageResponse<DoctorDisplayDTO> = await res.json();
      setData(json);

    } catch (err) {
      console.error("Doctor fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // HERE is where fetchDoctors should be called
  useEffect(() => {
    fetchDoctors(page);
  }, [page]);  // Fetch again only when page changes

  if (loading) return <p>Loading...</p>;
  if (!data) return null;

  return (
    <div className="app-container">
      <h1 className="title">Available Doctors</h1>

      {data.content.map((doc) => (
        <div key={doc.doctorId} className="doctor-card">
          <div className="doctor-name">{doc.fullName}</div>

          <div className="doctor-field">Specialty: {doc.medicalSpecialty}</div>
          <div className="doctor-field">Hospital: {doc.hospital}</div>
          <div className="doctor-field">Branch: {doc.branch}</div>
          <div className="doctor-field">Experience: {doc.experience}</div>

          <div className="doctor-field">
            Working Days: {doc.workingDays.join(", ")}
          </div>

          <div style={{ marginTop: "8px" }}>
            {doc.availableOnline ? (
              <span className="tag tag-online">Online/Offline</span>
            ) : (
              <span className="tag tag-offline">Offline</span>
            )}
          </div>

          <div className="token-status">
            Token: {doc.tokenAvailable ? doc.tokenNo ?? "Available" : "Not Available"}
          </div>

          <div className="doctor-field">Status: {doc.bookingStatus ?? "N/A"}</div>
        </div>
      ))}

      <div className="pagination-buttons">
        <button disabled={data.first} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>
        <button disabled={data.last} onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>

      <p className="page-indicator">
        Page {data.number + 1} of {data.totalPages}
      </p>
    </div>
  );
}
