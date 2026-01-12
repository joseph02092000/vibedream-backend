const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Test endpoint to check if the backend is running
app.get("/", (req, res) => {
  res.send("Backend running");
});

// Jobs search endpoint
app.get("/api/jobs/search", async (req, res) => {
  try {
    const { role, location } = req.query;

    // Call JSearch API
    const response = await axios.get(
      "https://jsearch.p.rapidapi.com/search",
      {
        params: {
          query: `${role} in ${location}`, // ✅ Backticks correct
          page: 1,
          num_pages: 1
        },
        headers: {
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
          "X-RapidAPI-Host": process.env.RAPIDAPI_HOST
        }
      }
    );

    // Return the jobs list
    res.json(response.data.data);
  } catch (error) {
    console.error("Error fetching jobs:", error.message);
    res.status(500).json({ error: "Error fetching jobs" });
  }
});

// Port for Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
