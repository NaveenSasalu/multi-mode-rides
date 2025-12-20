// server/server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// Inside your server.js POST route
app.post("/api/get-route", async (req, res) => {
  const { origin, destination, travelMode } = req.body;

  try {
    // Ensure travelMode is lowercase (google expects 'driving', 'walking', etc.)
    const mode = travelMode.toLowerCase();

    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=${mode}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Google API Error:", error.message);
    res.status(500).json({ error: "Failed to fetch route" });
  }
});

app.listen(5000, () => console.log("Backend Proxy running on port 5000"));
