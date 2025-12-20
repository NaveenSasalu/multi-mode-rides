import React, { useState } from "react";

export const SearchPanel = ({ onSearch, loading }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (origin && destination) {
      onSearch(origin, destination);
    }
  };

  return (
    <div style={panelStyle}>
      <h3>India Multi-Mode Route</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Origin (e.g. Indiranagar, Bengaluru)"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Destination (e.g. Manyata Tech Park)"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? "Finding Best Route..." : "Get Route"}
        </button>
      </form>
      <div style={{ marginTop: "10px", fontSize: "12px" }}>
        <span style={{ color: "#FF8C00" }}>●</span> Two-Wheeler
        <span style={{ color: "#1E90FF", marginLeft: "10px" }}>●</span> Public
        Transit
      </div>
    </div>
  );
};

const panelStyle = {
  padding: "20px",
  background: "#fff",
  boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
  borderRadius: "8px",
  marginBottom: "20px",
};
const inputStyle = {
  display: "block",
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  border: "1px solid #ccc",
  borderRadius: "4px",
};
const buttonStyle = {
  width: "100%",
  padding: "10px",
  background: "#4285F4",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};
