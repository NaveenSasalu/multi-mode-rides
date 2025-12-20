import { useMap } from "@vis.gl/react-google-maps";
import { useEffect } from "react";
import { decode } from "@googlemaps/polyline-codec";

const DirectionsRendererComponent = ({ data, color }) => {
  const map = useMap();

  useEffect(() => {
    // 1. Safety check: make sure map and data exist
    if (!map || !data || !data.routes || data.routes.length === 0) return;

    // 2. Extract the encoded string
    const encodedPath = data.routes[0].overview_polyline.points;

    // 3. Decode string into [lat, lng] pairs
    const decodedPath = decode(encodedPath).map(([lat, lng]) => ({
      lat,
      lng,
    }));

    // 4. Create the visual Polyline
    const polyline = new google.maps.Polyline({
      path: decodedPath,
      geodesic: true,
      strokeColor: color,
      strokeOpacity: 0.8,
      strokeWeight: 6,
    });

    // 5. Add to map
    polyline.setMap(map);

    // 6. Automatically zoom the map to see the route
    const bounds = new google.maps.LatLngBounds();
    decodedPath.forEach((point) => bounds.extend(point));
    map.fitBounds(bounds);

    // 7. Cleanup: remove line when component unmounts or data changes
    return () => {
      polyline.setMap(null);
    };
  }, [map, data, color]);

  return null;
};

export default DirectionsRendererComponent;
