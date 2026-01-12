const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.get("/api/jobs/search", async (req, res) => {
  try {
    const { role, location } = req.query;

    const response = await axios.get(
      "https://jsearch.p.rapidapi.com/search",
      {
        params: {
          query: ${role} in ${location},
          page: 1,
          num_pages: 1
        },
        headers: {
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
        }
      }
    );

    res.json(response.data.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching jobs" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});
