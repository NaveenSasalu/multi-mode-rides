import React, { useEffect, useState } from "react";
import { Map, useMap } from "@vis.gl/react-google-maps";

// Custom Polyline helper since @vis.gl doesn't export one
const CustomPolyline = ({ path, color }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !path.length) return;

    const polyline = new google.maps.Polyline({
      path: path,
      geodesic: true,
      strokeColor: color,
      strokeOpacity: 1.0,
      strokeWeight: 5,
    });

    polyline.setMap(map);

    // Cleanup when component unmounts or path changes
    return () => polyline.setMap(null);
  }, [map, path, color]);

  return null;
};

export const MainMap = ({ paths }) => {
  return (
    <Map
      style={{ width: "100%", height: "100%" }}
      defaultCenter={{ lat: 12.9716, lng: 77.5946 }} // Bengaluru
      defaultZoom={12}
      mapId="DEMO_MAP_ID" // Required for some advanced features
    >
      {/* Draw the Bike segment in Orange */}
      <CustomPolyline path={paths.bike} color="#FF8C00" />

      {/* Draw the Transit segment in Blue */}
      <CustomPolyline path={paths.transit} color="#1E90FF" />
    </Map>
  );
};
