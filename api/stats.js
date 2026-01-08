export default async function handler(req, res) {
  const user = req.query.user;

  if (!user) {
    return res.status(400).send("Missing ?user=");
  }

  try {
    const fetchUrl = "https://www.6b6t.org/en/stats/" + encodeURIComponent(user);

    const response = await fetch(fetchUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const html = await response.text();

    // For now, return the raw HTML so we can confirm Vercel works
    return res.status(200).send(html);

  } catch (err) {
    return res.status(500).send("Error: " + err.message);
  }
}
