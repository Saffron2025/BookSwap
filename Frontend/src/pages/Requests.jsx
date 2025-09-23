import { useEffect, useState } from "react";
import api from "../services/api";
import "../Styles/Requests.css";

function Requests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    api.get("/requests").then((res) => setRequests(res.data));
  }, []);

  return (
    <div className="requests-container">
      <h2 className="requests-title">📩 My Requests</h2>

      {requests.length === 0 ? (
        <p className="no-requests">You haven't made any requests yet.</p>
      ) : (
        <div className="requests-grid">
          {requests.map((r) => (
            <div className="request-card" key={r._id}>
              <h3 className="request-book">{r.book?.title || "Unknown Book"}</h3>
              <p className="request-author">
                {r.book?.author ? `by ${r.book.author}` : ""}
              </p>
              <p className="request-condition">
                {r.book?.condition ? `Condition: ${r.book.condition}` : ""}
              </p>
              <p className="request-status">
                Status:{" "}
                <span
                  className={`status-badge ${
                    r.status === "accepted"
                      ? "accepted"
                      : r.status === "declined"
                      ? "declined"
                      : "pending"
                  }`}
                >
                  {r.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Requests;
