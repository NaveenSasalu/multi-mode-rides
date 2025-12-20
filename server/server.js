// server/server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

app.post("/api/get-route", async (req, res) => {
  console.log("Request received:", req.body);
  const { origin, destination, travelMode } = req.body;
  try {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=${travelMode.toLowerCase()}&key=${GOOGLE_API_KEY}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch route from Google. Error 1" });
  }
});

app.listen(5000, () => console.log("Backend Proxy running on port 5000"));
