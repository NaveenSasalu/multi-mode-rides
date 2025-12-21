import { useState } from "react";
import { decode } from "@googlemaps/polyline-codec";

export function useRoute() {
  const [paths, setPaths] = useState({ bike: [], transit: [] });
  const [loading, setLoading] = useState(false);

  const loadRoute = async (origin, destination) => {
    // --- ADD THIS POP-UP FOR DEBUGGING ---
    var travelMode = "Bike";
    //alert("🚀 Sending to Start:\n" + JSON.stringify(travelMode, null, 2));
    // alert("🚀 Sending to End point:\n" + JSON.stringify(destination, null, 2));

    setLoading(true);
    try {
      const res = await fetch("/api/geocode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ origin, destination, travelMode }),
      });

      alert(JSON.stringify(res, null, 2));
      // Check if the server actually sent a successful response
      if (!res.ok) {
        const errorText = await res.text(); // Read as text to see the HTML error
        throw new Error(`Server Error: ${res.status} - ${errorText}`);
      }

      const data = await res.json();

      // Convert decoded pairs [[lat, lng]] to objects [{lat, lng}]
      const bikeCoords = data.bikeLeg
        ? decode(data.bikeLeg.polyline.encodedPolyline).map(([lat, lng]) => ({
            lat,
            lng,
          }))
        : [];

      const transitCoords = data.transitLegs?.polyline?.encodedPolyline
        ? decode(data.transitLegs.polyline.encodedPolyline).map(
            ([lat, lng]) => ({ lat, lng })
          )
        : [];

      setPaths({ bike: bikeCoords, transit: transitCoords });
    } catch (err) {
      console.error("Failed to fetch route:", err);
    } finally {
      setLoading(false);
    }
  };

  return { paths, loadRoute, loading };
}
