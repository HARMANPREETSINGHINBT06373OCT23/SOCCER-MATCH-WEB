const API_KEY = "my-secret-api-key";
const API_URL = "http://localhost:3000/football_matches";

// Populate year dropdown (2000–2025)
const yearSelect = document.getElementById("yearSelect");
for (let y = 2000; y <= 2025; y++) {
  const opt = document.createElement("option");
  opt.value = y;
  opt.text = y;
  yearSelect.appendChild(opt);
}

function loadMatches() {
  const year = document.getElementById("yearSelect").value;
  const team = document.getElementById("teamSelect").value;

  fetch(`${API_URL}?year=${year}&team=${team}&page=1`, {
    headers: {
      'x-api-key': API_KEY
    }
  })
    .then(res => res.json())
    .then(data => {
      const matchDiv = document.getElementById("matchesList");
      matchDiv.innerHTML = "";
      if (data.data && data.data.length > 0) {
        data.data.forEach(match => {
          const p = document.createElement("p");
          p.innerText = `${match.team1} ${match.team1goals} - ${match.team2goals} ${match.team2}`;
          matchDiv.appendChild(p);
        });
      } else {
        matchDiv.innerHTML = "<p>No matches found.</p>";
      }
    })
    .catch(err => {
      document.getElementById("matchesList").innerHTML = "<p>Error loading matches.</p>";
      console.error(err);
    });
}

function submitLogin(e) {
  e.preventDefault();
  document.getElementById("loginMessage").innerText = "Thanks for submitting!";
}
