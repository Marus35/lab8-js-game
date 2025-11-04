const MAX_WINS = 3;
const MIN = 0, MAX = 9;
const userLabel = document.getElementById('user-label');
const userScore = document.getElementById('user-score');
const cpuScore = document.getElementById('cpu-score');
const userNum = document.getElementById('user-num');
const cpuNum = document.getElementById('cpu-num');
const btnGen = document.getElementById('btn-gen');
const btnReset = document.getElementById('btn-reset');
const log = document.getElementById('log');
const toast = document.getElementById('toast');
let state = { user: 'User', u: 0, c: 0, over: false };
function askName() {
  let name;
  const maxLen = 20;
  do {
    name = prompt("Введіть ім'я (1–20 символів):", state.user);
    if (name === null) break;
    name = name.trim();
  } while (name.length < 1 || name.length > maxLen);
  state.user = name || 'User';
  userLabel.textContent = state.user;
}
function rnd(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
function announce(msg, type = '') {
  toast.textContent = msg;
  toast.className = 'toast ' + type;
}
function updateScores() { userScore.textContent = state.u; cpuScore.textContent = state.c; }
function roundOnce() {
  if (state.over) return;
  const a = rnd(MIN, MAX), b = rnd(MIN, MAX);
  userNum.textContent = a;
  cpuNum.textContent = b;
  if (a > b) {
    state.u++;
    announce(`${state.user} виграв(-ла) раунд!`, 'win-user');
  } else if (b > a) {
    state.c++;
    announce('Комп’ютер виграв раунд!', 'win-cpu');
  } else {
    announce('Нічия!');
  }
  updateScores();
  checkGameOver();
}
function checkGameOver() {
  if (state.u >= MAX_WINS || state.c >= MAX_WINS) {
    state.over = true;
    btnGen.disabled = true;
    btnReset.hidden = false;
    const winner = state.u > state.c ? state.user : 'Комп’ютер';
    const colorClass = state.u > state.c ? 'win-user' : 'win-cpu';
    announce(`Гру закінчено! Переможець: ${winner}`, colorClass);
  }
}
function reset() {
  state.u = 0;
  state.c = 0;
  state.over = false;
  userNum.textContent = cpuNum.textContent = '–';
  updateScores();
  announce('Гра перезапущена.');
  log.textContent = '';
  btnGen.disabled = false;
  btnReset.hidden = true;
}
btnGen.addEventListener('click', roundOnce);
btnReset.addEventListener('click', reset);
userLabel.addEventListener('dblclick', askName);
document.addEventListener('keydown', e => {
  if ((e.code === 'Space' || e.code === 'Enter') && !state.over) {
    e.preventDefault();
    roundOnce();
  }
});
window.addEventListener('DOMContentLoaded', () => {
  askName();
  announce('Натисніть Generate, щоб почати гру.');
});