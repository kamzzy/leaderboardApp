import './style.css';

const scoreDiv = document.querySelector('.score-display');
const addGame = document.querySelector('#gameSubmit');
const Newname = document.getElementById('name');
const Newscore = document.getElementById('score');
const refresh = document.getElementById('refresh');
let output = '';
const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/cMgNveqYlglpFSSpFfwr/scores/';

// get game scores
const renderScore = (gameUsers) => {
  const gamers = (gameUsers.result);
  gamers.forEach((gameUser) => {
    output += `
     <span>${gameUser.user}:${gameUser.score}</span>  `;
  });
  scoreDiv.innerHTML = output;
};
refresh.addEventListener('click', () => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => renderScore(data));
});

// create new game
addGame.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: Newname.value,
      score: Newscore.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => (data));
});