import './style.css';

const scoreDiv = document.querySelector('.score-display');
const addGame = document.querySelector('#gameSubmit');
const Newname = document.getElementById('name');
const Newscore = document.getElementById('score');
const refresh = document.getElementById('refresh');
const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Cvjvaty8v75lgFTlmVzh/scores/';

// get game scores
const renderScore = (gameUsers) => {
  const gamers = (gameUsers.result);
  let list = '';
  gamers.forEach((gameUser) => {
    list += `<span>${gameUser.user} : ${gameUser.score}</span>`;
    scoreDiv.innerHTML = list;
  });
};

const getScores = async () => {
  const res = await fetch(url);
  const data = await res.json();
  renderScore(data);
};

refresh.addEventListener('click', () => {
  getScores();
});
const addScoreForm = async () => {
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
  return data;
};
// create new game
addGame.addEventListener('submit', (e) => {
  e.preventDefault();
  addScoreForm();
});
