import React, { useState } from "react";

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
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <h3>Route Settings</h3>

      <label>Start Point</label>
      <input value={origin} onChange={(e) => setOrigin(e.target.value)} />

      <label>Reach Station Via:</label>
      <select
        value={firstLegMode}
        onChange={(e) => setFirstLegMode(e.target.value)}
        style={{ padding: "8px", borderRadius: "4px" }}
      >
        <option value="DRIVING">Driving 🚗</option>
        <option value="BICYCLING">Bicycling 🚲</option>
        <option value="WALKING">Walking 🚶</option>
      </select>

      <label>Transfer Hub (Station) 🚉</label>
      <input value={hub} onChange={(e) => setHub(e.target.value)} />

      <label>Final Destination</label>
      <input
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />

      <button
        onClick={handleSearch}
        disabled={loading}
        style={{ marginTop: "10px" }}
      >
        {loading ? "Searching..." : "Plan Multi-Ride"}
      </button>
    </div>
  );
};

export default MultiRidePlanner;
