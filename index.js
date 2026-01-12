const express = require("express");
const fetch = require("node-fetch");

const app = express();

/**
 * Health check
 */
app.get("/", (req, res) => {
  res.send("Backend running");
});

/**
 * Debug env (para verificar Railway + API Key)
 */
app.get("/debug/env", (req, res) => {
  res.json({
    hasRapidApiKey: !!process.env.RAPIDAPI_KEY
  });
});

/**
 * Jobs endpoint
 * Example:
 * /jobs?role=software+engineer&location=usa
 */
app.get("/jobs", async (req, res) => {
  try {
    const { role, location } = req.query;

    if (!role || !location) {
      return res.status(400).json({
        error: "Please provide both role and location parameters"
      });
    }

    const url =
      `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(
        role + " in " + location
      )}&page=1&num_pages=1`;

    const response = await fetch(url, {
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
      }
    });

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error("ERROR FETCHING JOBS:", error);
    res.status(500).json({
      error: "Error fetching jobs"
    });
  }
});

/**
 * START SERVER
 */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
