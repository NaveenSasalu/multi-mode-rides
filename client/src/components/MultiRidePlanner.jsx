import React, { useState } from "react";

// src/components/MultiRidePlanner.jsx
const inputStyle = {
  width: "100%",
  padding: "12px",
  margin: "8px 0",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "14px",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#1a73e8",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "10px",
  transition: "background 0.3s",
};

const MultiRidePlanner = ({ onRouteFound }) => {
  const [origin, setOrigin] = useState("Tiptur");
  const [hub, setHub] = useState("Tumakuru");
  const [destination, setDestination] = useState("Bengaluru");
  const [firstLegMode, setFirstLegMode] = useState("DRIVING"); // Default
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      // 🚗 LEG 1: User Selected Mode (Drive/Walk/Bike) to the Hub
      const res1 = await fetch("/api/get-route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin,
          destination: hub,
          travelMode: firstLegMode, // Dynamic mode
        }),
      });
      const driveData = await res1.json();

      // 🚉 LEG 2: Always TRANSIT from Hub to Destination
      const res2 = await fetch("/api/get-route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin: hub,
          destination,
          travelMode: "TRANSIT",
        }),
      });
      const transitData = await res2.json();

      onRouteFound({ driveData, transitData });
    } catch (error) {
      console.error("Fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label style={{ fontSize: "12px", fontWeight: "600", color: "#666" }}>
        STARTING POINT
      </label>
      <input
        style={inputStyle}
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
        placeholder="Enter city or address"
      />

      <label
        style={{
          fontSize: "12px",
          fontWeight: "600",
          color: "#666",
          marginTop: "10px",
        }}
      >
        REACH HUB VIA
      </label>
      <select
        style={inputStyle}
        value={firstLegMode}
        onChange={(e) => setFirstLegMode(e.target.value)}
      >
        <option value="DRIVING">🚗 Driving</option>
        <option value="BIKE">🚲 Bicycling</option>
        <option value="WALKING">🚶 Walking</option>
      </select>

      <label
        style={{
          fontSize: "12px",
          fontWeight: "600",
          color: "#666",
          marginTop: "10px",
        }}
      >
        🚉 TRANSFER HUB
      </label>
      <input
        style={inputStyle}
        value={hub}
        onChange={(e) => setHub(e.target.value)}
        placeholder="Station name"
      />

      <label
        style={{
          fontSize: "12px",
          fontWeight: "600",
          color: "#666",
          marginTop: "10px",
        }}
      >
        DESTINATION
      </label>
      <input
        style={inputStyle}
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        placeholder="Final stop"
      />

      <button style={buttonStyle} onClick={handleSearch} disabled={loading}>
        {loading ? "Searching Routes..." : "Get Directions"}
      </button>
    </div>
  );
};

export default MultiRidePlanner;
