

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.body;
const delay = 1000;
let timerId = null;


startBtn.addEventListener('click', regularyChangeBg);
stopBtn.addEventListener('click', stopChangeBg);
stopBtn.disabled = true;


function regularyChangeBg() {
    timerId = setInterval(changeBgC, delay);
    startBtn.disabled = true;
    stopBtn.disabled = false;
};

function stopChangeBg() {
    clearInterval(timerId);
    stopBtn.disabled = true;
    startBtn.disabled = false;
};

function changeBgC() {
    body.style.background = getRandomHexColor();
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};