const axios = require("axios");

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const ROUTES_ENDPOINT =
  "https://routes.googleapis.com/directions/v2:computeRoutes";

// Enhanced headers for Routes v2
const getHeaders = (fields) => ({
  "Content-Type": "application/json",
  "X-Goog-Api-Key": API_KEY,
  "X-Goog-FieldMask":
    fields ||
    "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline,routes.legs",
});

async function getMultimodalIndiaRoute(origin, destination) {
  try {
    // 1. Fetch Transit Backbone
    const transitRequest = {
      origin: { address: origin },
      destination: { address: destination },
      travelMode: "TRANSIT",
      regionCode: "IN", // Fixes the USA-only issue
      languageCode: "en-IN",
    };

    const transitRes = await axios.post(ROUTES_ENDPOINT, transitRequest, {
      headers: getHeaders(
        "routes.duration,routes.polyline,routes.legs.steps.transitDetails,routes.legs.steps.startLocation"
      ),
    });

    const mainRoute = transitRes.data.routes[0];
    const firstStopCoords = mainRoute.legs[0].steps.find(
      (s) => s.transitDetails
    )?.transitDetails.stopDetails.departureStop.location.latLng;

    // 2. Fetch "First Mile" Two-Wheeler (Motorcycle) Route
    let bikeLeg = null;
    if (firstStopCoords) {
      const bikeRequest = {
        origin: { address: origin },
        destination: { location: { latLng: firstStopCoords } },
        travelMode: "TWO_WHEELER",
        regionCode: "IN",
        extraComputations: ["FLYOVER_INFO_ON_POLYLINE"], // India-specific flyover data
      };

      const bikeRes = await axios.post(ROUTES_ENDPOINT, bikeRequest, {
        headers: getHeaders(
          "routes.duration,routes.polyline,routes.polylineDetails.flyoverInfo"
        ),
      });
      bikeLeg = bikeRes.data.routes[0];
    }

    return { bikeLeg, transitLegs: mainRoute.legs[0] };
  } catch (error) {
    console.error("Route Error:", error.response?.data || error.message);
    throw error;
  }
}
