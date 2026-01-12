const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Test simple para ver si el backend corre
app.get("/", (req, res) => {
  res.send("Backend running");
});

// Endpoint de búsqueda de jobs
app.get("/api/jobs/search", async (req, res) => {
  try {
    const { role, location } = req.query;

    // Llamada a JSearch API
    const response = await axios.get("https://jsearch.p.rapidapi.com/search", {
      params: {
        query: ${role} in ${location},
        page: 1,
        num_pages: 1
      },
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": process.env.RAPIDAPI_HOST
      }
    });

    res.json(response.data.data); // Devuelve jobs reales
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching jobs" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});
