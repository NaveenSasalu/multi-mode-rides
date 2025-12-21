import React, { useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import MultiRidePlanner from "./components/MultiRidePlanner";
import DirectionsRendererComponent from "./components/DirectionsRendererComponent";
import RouteDetails from "./components/RouteDetails";

function App() {
  const [routeData, setRouteData] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div
        style={{
          position: "relative",
          height: "100vh",
          width: "100vw",
          fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        }}
      >
        {/* FLOAT SEARCH PANEL */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            width: "340px",
            zIndex: 10,
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "16px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            padding: "20px",
            backdropFilter: "blur(8px)",
          }}
        >
          <h2
            style={{
              margin: "0 0 15px 0",
              fontSize: "1.4rem",
              color: "#1a73e8",
            }}
          >
            📍 Wayfinder
          </h2>
          <MultiRidePlanner onRouteFound={(data) => setRouteData(data)} />
        </div>

        {/* MAP COMPONENT */}
        <div style={{ height: "100%", width: "100%" }}>
          <Map
            defaultCenter={{ lat: 13.33, lng: 77.11 }}
            defaultZoom={9}
            disableDefaultUI={true} // Cleaner look
            clickableIcons={false}
          >
            {userLocation && (
              <Marker
                position={userLocation}
                icon={{
                  path: google.maps.SymbolPath.CIRCLE,
                  fillColor: "#4285F4",
                  fillOpacity: 1,
                  strokeColor: "white",
                  strokeWeight: 2,
                  scale: 7,
                }}
              />
            )}

            {routeData?.driveData && (
              <DirectionsRendererComponent
                data={routeData.driveData}
                color="#4285F4"
              />
            )}
            {routeData?.transitData && (
              <DirectionsRendererComponent
                data={routeData.transitData}
                color="#DB4437"
              />
            )}
          </Map>
        </div>

        {/* RIGHT SIDEBAR FOR DETAILS */}
        {routeData && (
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              bottom: "20px",
              width: "360px",
              zIndex: 10,
              background: "#fff",
              borderRadius: "16px",
              boxShadow: "-4px 0 15px rgba(0,0,0,0.05)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <RouteDetails
              driveData={routeData.driveData}
              transitData={routeData.transitData}
            />
          </div>
        )}
      </div>
    </APIProvider>
  );
}

export default App;
