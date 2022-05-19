import './style.css';

const scoreDiv = document.querySelector('.score-display');
const addGame = document.querySelector('#gameSubmit');
const Newname = document.getElementById('name');
const Newscore = document.getElementById('score');
const refresh = document.getElementById('refresh');
const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/428wzGIhFujNFWtUaXvD/scores/';

// get game scores
const renderScore = (gameUsers) => {
  const gamers = (gameUsers.result);
  gamers.forEach((gameUser) => {
    const span = document.createElement('span');
    span.innerHTML = `${gameUser.user}:${gameUser.score}`;
    scoreDiv.appendChild(span);
  });
};

async function getScores() {
  const res = await fetch(url);
  const data = await res.json();
  renderScore(data);
}
const loadOnce = () => {
  window.location.reload();
};

refresh.addEventListener('click', () => {
  getScores();
});
async function addScoreForm() {
  const res = fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: Newname.value,
      score: Newscore.value,
    }),
  });
  const data = await (await res).json();
  Newname.value = '';
  Newscore.value = '';
  loadOnce();
  return data;
}
// create new game
addGame.addEventListener('submit', (e) => {
  e.preventDefault();
  addScoreForm();
});
