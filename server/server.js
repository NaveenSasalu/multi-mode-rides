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
app.post("/api/geocode", async (req, res) => {
  const { lat, lng } = req.body;
  const key = process.env.GOOGLE_MAPS_API_KEY;

  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to geocode location" });
  }
});

app.listen(5000, () => console.log("Backend Proxy running on port 5000"));
