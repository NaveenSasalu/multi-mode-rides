import React, { useState } from "react";

const MultiRidePlanner = ({ onRouteFound }) => {
  const [origin, setOrigin] = useState("Tiptur");
  const [hub, setHub] = useState("Tumakuru"); // The Park & Ride station
  const [destination, setDestination] = useState("Bengaluru");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      // 🚗 LEG 1: Driving to the Hub
      const res1 = await fetch("/api/get-route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin,
          destination: hub,
          travelMode: "DRIVING",
        }),
      });
      const driveData = await res1.json();

      // 🚉 LEG 2: Transit from Hub to Destination
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

      // Send both results back to App.jsx to be rendered
      onRouteFound({ driveData, transitData });
    } catch (error) {
      console.error("Multi-mode fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="planner-sidebar">
      <input
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
        placeholder="Home"
      />
      <input
        value={hub}
        onChange={(e) => setHub(e.target.value)}
        placeholder="Park & Ride Station"
      />
      <input
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        placeholder="Work"
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Calculating..." : "Plan Multi-Mode Trip"}
      </button>
    </div>
  );
};

export default MultiRidePlanner;
