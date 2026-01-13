app.get("/jobs", async (req, res) => {
  try {
    const { role, location } = req.query;

    const response = await fetch(
      "https://www.arbeitnow.com/api/job-board-api"
    );

    const data = await response.json();

    let jobs = data.data;

    // Optional filtering
    if (role) {
      jobs = jobs.filter(job =>
        job.title.toLowerCase().includes(role.toLowerCase())
      );
    }

    if (location) {
      jobs = jobs.filter(job =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    res.json({
      total: jobs.length,
      jobs
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});
 */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
