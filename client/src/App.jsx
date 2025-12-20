import React, { useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import MultiRidePlanner from "./components/MultiRidePlanner";
import DirectionsRendererComponent from "./components/DirectionsRendererComponent";
import RouteDetails from "./components/RouteDetails"; // <--- NEW IMPORT

function App() {
  const [routeData, setRouteData] = useState(null);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
        {/* LEFT SIDEBAR: Search Input */}
        <div
          style={{
            width: "300px",
            padding: "10px",
            boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
            zIndex: 10,
          }}
        >
          <MultiRidePlanner onRouteFound={(data) => setRouteData(data)} />
        </div>

        {/* CENTER: The Map */}
        <div style={{ flex: 1, position: "relative" }}>
          <Map
            defaultCenter={{ lat: 13.33, lng: 77.11 }}
            defaultZoom={9}
            gestureHandling={"greedy"}
            disableDefaultUI={false}
          >
            {routeData?.driveData && (
              <DirectionsRendererComponent
                data={routeData.driveData}
                color="#1a73e8"
              />
            )}
            {routeData?.transitData && (
              <DirectionsRendererComponent
                data={routeData.transitData}
                color="#ea4335"
              />
            )}
          </Map>
        </div>

        {/* RIGHT SIDEBAR: Text Directions */}
        {routeData && (
          <div style={{ width: "350px", zIndex: 10 }}>
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
