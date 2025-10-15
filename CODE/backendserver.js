const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.OPENWEATHER_API_KEY;

// endpoint to fetch weather data for a city
app.get("/api/weather", async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: "Missing query parameter q" });
  }
  try {
    // current weather
    const currentResp = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(q)}&units=metric&appid=${API_KEY}`
    );
    // forecast (5 day / 3h)
    const forecastResp = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(q)}&units=metric&appid=${API_KEY}`
    );
    res.json({
      current: currentResp.data,
      forecast: forecastResp.data,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch weather" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
