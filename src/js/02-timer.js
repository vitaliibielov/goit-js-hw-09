// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';




const startBtn = document.querySelector('[data-start]');
const datePicker = document.querySelector('#datetime-picker');

const daysT = document.querySelector('[data-days]');
const hoursT = document.querySelector('[data-hours]');
const minutesT = document.querySelector('[data-minutes]');
const secondsT = document.querySelector('[data-seconds]');

startBtn.disabled = true;
let chosenDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        chosenDate = selectedDates[0].getTime();
        if (chosenDate <= Date.now()) {
            Notiflix.Notify.failure('Please choose a date in the future');
            return;        
        };
        startBtn.disabled = false;
        startBtn.addEventListener('click', start)
    },
};

flatpickr(datePicker, options);

function start() {

    let intervalId = null;

    startBtn.removeEventListener('click', start);
    startBtn.disabled = true;

    intervalId = setInterval(() => {
        const diff = chosenDate - Date.now();

        if (diff <= 0) {
            clearInterval(intervalId);
            return;
        };
        const convertedDate = convertMs(diff);
        updateTimer(convertedDate);

    }, 1000)

}


function updateTimer({ days, hours, minutes, seconds }) {
    daysT.textContent = days;
    hoursT.textContent = hours;
    minutesT.textContent = minutes;
    secondsT.textContent = seconds;
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}
