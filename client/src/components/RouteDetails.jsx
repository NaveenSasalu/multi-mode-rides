import React from "react";

const RouteDetails = ({ driveData, transitData }) => {
  if (!driveData || !transitData) return null;

  // Extract total summary from both legs
  const driveLeg = driveData.routes[0].legs[0];
  const transitLeg = transitData.routes[0].legs[0];

  // Inside RouteDetails.jsx
  const getIcon = (mode) => {
    if (mode.includes("DRIVING")) return "🚗";
    if (mode.includes("WALKING")) return "🚶";
    if (mode.includes("BICYCLING")) return "🚲";
    return "🏁";
  };

  // Use it in your header
  <h3 style={{ color: "#1a73e8" }}>
    {getIcon(driveData.routes[0].legs[0].steps[0].travel_mode)} First Leg
  </h3>;

  // Inside RouteDetails.jsx
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "20px", background: "#1a73e8", color: "#fff" }}>
        <h3 style={{ margin: 0 }}>Trip Itinerary</h3>
        <p style={{ margin: "5px 0 0 0", opacity: 0.8, fontSize: "14px" }}>
          Total Duration:{" "}
          {Math.floor(
            (driveLeg.duration.value + transitLeg.duration.value) / 60
          )}{" "}
          mins
        </p>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
        <div
          style={{
            position: "relative",
            borderLeft: "2px dashed #ddd",
            marginLeft: "10px",
            paddingLeft: "20px",
          }}
        >
          {/* DRIVE CARD */}
          <div style={{ marginBottom: "30px" }}>
            <div
              style={{
                position: "absolute",
                left: "-11px",
                background: "#4285F4",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
              }}
            ></div>
            <h4 style={{ margin: "0 0 10px 0", color: "#4285F4" }}>
              🚗 First Leg: {driveLeg.duration.text}
            </h4>
            {driveLeg.steps.map((s, i) => (
              <p
                key={i}
                style={{ fontSize: "13px", color: "#444" }}
                dangerouslySetInnerHTML={{ __html: s.html_instructions }}
              />
            ))}
          </div>

          {/* TRANSIT CARD */}
          <div>
            <div
              style={{
                position: "absolute",
                left: "-11px",
                background: "#DB4437",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
              }}
            ></div>
            <h4 style={{ margin: "0 0 10px 0", color: "#DB4437" }}>
              🚉 Transit Leg: {transitLeg.duration.text}
            </h4>
            {transitLeg.steps.map((s, i) => (
              <p
                key={i}
                style={{ fontSize: "13px", color: "#444" }}
                dangerouslySetInnerHTML={{ __html: s.html_instructions }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteDetails;
