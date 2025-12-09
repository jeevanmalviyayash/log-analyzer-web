import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../css/RequestTracker.css";

export default function TicketForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { ticketId } = useParams();

  const apiUrl = import.meta.env.VITE_API_HOST_URL;
  const token = localStorage.getItem("token");
  const userRole  =sessionStorage.getItem("userRole");

  // Prefill data from navigation state (create/update)
  const prefill = location.state;
  const initialDescription =
    (prefill && (prefill.description || prefill.errorMessage)) || "";

  // Form state (selected values kept separate from search text)
  const [form, setForm] = useState({
    title: prefill?.title || "",
    errorMessage: initialDescription || "",
    comments: prefill?.comments || "",
    priority: (prefill?.priority || "MEDIUM").toUpperCase(),
    status: (prefill?.status || "OPEN").toUpperCase(),
    assignedTo: prefill?.assignedTo || "",
    reviewer: prefill?.reviewer || "",
  });

  // Dropdown source data
  const [developers, setDevelopers] = useState([]);
  const [reviewers, setReviewers] = useState([]);

  // Search text (not the selected value)
  const [searchDev, setSearchDev] = useState("");
  const [searchRev, setSearchRev] = useState("");

  // Dropdown visibility
  const [showDevDropdown, setShowDevDropdown] = useState(false);
  const [showRevDropdown, setShowRevDropdown] = useState(false);

  // Submit state
  const [submitting, setSubmitting] = useState(false);

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const fetchUsers = useCallback(async () => {
    try {
      const devRes = await fetch(`${apiUrl}/tickets/user/DEVELOPER`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const revRes = await fetch(`${apiUrl}/tickets/user/REVIEWER`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const devData = devRes.ok ? await devRes.json() : [];
      const revData = revRes.ok ? await revRes.json() : [];

      const safeDevNames = Array.isArray(devData)
        ? devData.map((u) => u?.userEmail).filter(Boolean)
        : [];
      const safeRevNames = Array.isArray(revData)
        ? revData.map((u) => u?.userEmail).filter(Boolean)
        : [];

      setReviewers(safeRevNames);
      // If devs can also be reviewers, merge; else use only devs.
      setDevelopers([...safeDevNames, ...safeRevNames]);
    } catch (err) {
      console.error("Failed to fetch users", err);
      setReviewers([]);
      setDevelopers([]);
    }
  }, [apiUrl, token]);




const current = form.status ?? "";

const next =
  current === ""
    ? "OPEN"
    : current === "OPEN"
    ? "IN_PROGRESS"
    : current === "IN_PROGRESS"
    ? "IN_REVIEW"
    : current === "IN_REVIEW"
    ? (userRole === "REVIEWER" ? "REVIEWED" : "IN_REVIEW") // only reviewers can advance
    : current === "REVIEWED"
    ? "RESOLVED"
    : current === "RESOLVED"
    ? "CLOSED"
    : current === "CLOSED"
    ? "REOPENED"
    : current === "REOPENED"
    ? "IN_PROGRESS"
    : ""; // no next





  useEffect(() => {

console.log("Starte are ,",prefill)

    fetchUsers();
  }, [fetchUsers]);

  const effectiveId = ticketId || prefill?.ticketId || null;
  const isUpdate = Boolean(effectiveId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.assignedTo || !form.reviewer) {
      alert("Please select both Assign To and Reviewer.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...form,
        assignedTo: form.assignedTo || null,
        reviewer: form.reviewer || null,
        priority: String(form.priority || "").toUpperCase(),
        status: String(form.status || "").toUpperCase(),
        userId: sessionStorage.getItem("userId"),
        createdBy: sessionStorage.getItem("userEmail"),
        errorId:prefill.errorId
      };

      let res;
      if (isUpdate) {
        res = await fetch(`${apiUrl}/tickets/${effectiveId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
        fetchUsers(); // refresh lists after update
      } else {
        res = await fetch(`${apiUrl}/tickets`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) throw new Error("Failed to save ticket");
      const saved = await res.json();
      navigate(`/tickets/${saved.ticketId}`);
    } catch (err) {
      console.error(err);
      alert("Error saving ticket");
    } finally {
      setSubmitting(false);
    }
  };

  // Filtering — show all when search text is empty
  const filteredDevelopers = searchDev
    ? developers.filter((name) =>
        name.toLowerCase().includes(searchDev.toLowerCase())
      )
    : developers;

  const filteredReviewers = searchRev
    ? reviewers.filter((name) =>
        name.toLowerCase().includes(searchRev.toLowerCase())
      )
    : reviewers;

  return (
    <div className="form-page">
      <h1 className="title">{isUpdate ? "Update Ticket" : "Create Ticket"}</h1>

      <form className="form two-column" onSubmit={handleSubmit}>
        {/* Left column */}
        <div className="form-left">
          <div className="field">
            <label className="label">Title</label>
            <input
              className="input"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label className="label">Description</label>
            <textarea
              className="textarea"
              rows={6}
              value={form.errorMessage}
              onChange={(e) => update("errorMessage", e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label className="label">Comments</label>
            <textarea
              className="textarea"
              rows={4}
              value={form.comments}
              onChange={(e) => update("comments", e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label className="label">Priority</label>
            <select
              className="input"
              value={form.priority}
              onChange={(e) => update("priority", e.target.value)}
              required
            >
              <option value="">-- Select Priority --</option>
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
              <option value="CRITICAL">CRITICAL</option>
            </select>
          </div>

          <div className="field">
            <label className="label">Status</label>
            <select
              className="input"
              value={current}
              onChange={(e) => update("status", e.target.value)}
              required
            >
             {/* current status as disabled so user sees where they are */}
  <option value={current} disabled>
    {current || "-- Select Status --"}
  </option>
  


  {/* only next status is selectable */}
  {next && <option value={next}>{next}</option>}




  
            </select>
          </div>
        </div>

        {/* Right column */}
        <div className="form-right">
          
          {/* Assign To */}
          <div className="field dropdown-container">
          <label className="label">Assign To</label>
            <input
              className="input"
              type="text"
              placeholder="Search developer..."
              value={searchDev || form.assignedTo}
              onFocus={() => {
                setShowDevDropdown(true);
              }}
              onChange={(e) => {
                setSearchDev(e.target.value);
                setShowDevDropdown(true);
              }}
              onBlur={() => {
                // allow click to register before closing
                setTimeout(() => setShowDevDropdown(false), 150);
              }}
              required
            />
            {showDevDropdown && (
              <ul className="dropdown-list">
                {filteredDevelopers.map((name) => (
                  <li
                    key={name}
                    onMouseDown={(e) => e.preventDefault()} // prevent input blur
                    onClick={() => {
                      update("assignedTo", name);
                      setSearchDev(""); // clear search text, input shows selected
                      setShowDevDropdown(false);
                    }}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Reviewer */}
          <div className="field dropdown-container">
            <label className="label">Reviewer</label>
            <input
              className="input"
              type="text"
              placeholder="Search reviewer..."
              value={searchRev || form.reviewer}
              onFocus={() => {
                setShowRevDropdown(true);
              }}
              onChange={(e) => {
                setSearchRev(e.target.value);
                setShowRevDropdown(true);
              }}
              onBlur={() => {
                setTimeout(() => setShowRevDropdown(false), 150);
              }}
              required
            />
            {showRevDropdown && (
              <ul className="dropdown-list">
                {filteredReviewers.map((name) => (
                  <li
                    key={name}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      update("reviewer", name);
                      setSearchRev("");
                      setShowRevDropdown(false);
                    }}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="actions full-width">
          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting
              ? isUpdate
                ? "Updating..."
                : "Creating..."
              : isUpdate
              ? "Update Ticket"
              : "Create Ticket"}
          </button>
        </div>
      </form>
    </div>
  );
}
