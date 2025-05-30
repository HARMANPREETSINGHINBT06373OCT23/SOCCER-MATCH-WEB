const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const MY_API_KEY = "my-secret-api-key";

app.use(cors());
app.use(express.static('public')); // to serve frontend files
const matchesData = require('./matches.json');

// API Key check
app.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== MY_API_KEY) {
    return res.status(401).json({ error: "Unauthorized: Invalid API Key" });
  }
  next();
});

// Match fetch endpoint
app.get('/football_matches', (req, res) => {
  const year = parseInt(req.query.year);
  const team = req.query.team;
  const page = parseInt(req.query.page) || 1;
  const perPage = 10;

  if (!year || !team) {
    return res.status(400).json({ error: "Missing year or team" });
  }

  const filtered = matchesData.filter(match =>
    match.year === year && (match.team1 === team || match.team2 === team)
  );

  const total = filtered.length;
  const totalPages = Math.ceil(total / perPage);
  const start = (page - 1) * perPage;
  const paged = filtered.slice(start, start + perPage);

  res.json({ page, per_page: perPage, total, total_pages: totalPages, data: paged });
});

app.listen(port, () => {
  console.log(`Mock API running at http://localhost:${port}`);
});
