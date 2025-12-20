import React from "react";

const RouteDetails = ({ driveData, transitData }) => {
  if (!driveData || !transitData) return null;

  // Extract total summary from both legs
  const driveLeg = driveData.routes[0].legs[0];
  const transitLeg = transitData.routes[0].legs[0];

  return (
    <div
      className="directions-panel"
      style={{
        padding: "15px",
        background: "#fff",
        height: "100%",
        overflowY: "auto",
        borderLeft: "1px solid #ddd",
      }}
    >
      <h2>Trip Summary</h2>

      {/* 🚗 DRIVING LEG */}
      <div style={{ marginBottom: "20px", borderBottom: "2px solid #1a73e8" }}>
        <h3 style={{ color: "#1a73e8" }}>🚗 Drive Leg</h3>
        <p>
          <strong>Distance:</strong> {driveLeg.distance.text}
        </p>
        <p>
          <strong>Time:</strong> {driveLeg.duration.text}
        </p>
        <div style={{ fontSize: "0.85rem", color: "#555" }}>
          {driveLeg.steps.map((step, idx) => (
            <div key={idx} style={{ marginBottom: "8px" }}>
              <span
                dangerouslySetInnerHTML={{ __html: step.html_instructions }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 🚉 TRANSIT LEG */}
      <div style={{ marginBottom: "20px", borderBottom: "2px solid #ea4335" }}>
        <h3 style={{ color: "#ea4335" }}>🚉 Transit Leg</h3>
        <p>
          <strong>Distance:</strong> {transitLeg.distance.text}
        </p>
        <p>
          <strong>Time:</strong> {transitLeg.duration.text}
        </p>
        <div style={{ fontSize: "0.85rem", color: "#555" }}>
          {transitLeg.steps.map((step, idx) => (
            <div key={idx} style={{ marginBottom: "8px" }}>
              <span
                dangerouslySetInnerHTML={{ __html: step.html_instructions }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RouteDetails;
