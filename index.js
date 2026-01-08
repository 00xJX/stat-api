import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/api/stats", async (req, res) => {
  const user = req.query.user;

  if (!user) {
    return res.status(400).send("Missing ?user=");
  }

  try {
    const fetchUrl = "https://www.6b6t.org/en/stats/" + encodeURIComponent(user);

    const response = await fetch(fetchUrl, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    const html = await response.text();
    res.send(html);

  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

// Render requires listening on process.env.PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("API running on port " + PORT));
