import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";

const iconError = new URL('/img/icons/error-icon.svg', import.meta.url).href; 

const timerBtn = document.querySelector('[data-start]');
timerBtn.disabled = true;

const startBtn = 'Start';
const stopBtn = 'Stop';

const calendar = document.querySelector('#datetime-picker');
const daysRender = document.querySelector('[data-days]');
const hoursRender = document.querySelector('[data-hours]');
const minutesRender = document.querySelector('[data-minutes]');
const secondsRender = document.querySelector('[data-seconds]');

let userSelectedDate;
let timerInt;

const mistakeAlert = () => {
    iziToast.show(
        {
            backgroundColor: 'rgba(239, 64, 64, 1)',
            title: 'Error',
            theme: 'dark',
            message: 'Please choose a date in the future',
            position: 'topRight',
            timeout: 5000,
            iconUrl: iconError,
        }
    );
};
const formatConvert = (value) => {
    return value.toString().padStart(2, '0')
}

const convertMs = (ms) => {
// Ms per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const dateCheck = () => {
    
    if (userSelectedDate <= Date.now()) {

        mistakeAlert();
        timerBtn.disabled = true;
        timerBtn.textContent = startBtn;
        return false;
    }
    else {
        timerBtn.disabled = false;
        return true
    }
};


flatpickr(calendar, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onChange(selectedDates) {
        userSelectedDate = selectedDates[0];
        dateCheck();
    },
});

const startTimer = () => {
    if (userSelectedDate) {
        calendar.disabled = true;
        timerInt = setInterval(() => {
            const time = userSelectedDate - Date.now();
            timerBtn.textContent = stopBtn;
            if (time <= 0) {
                stopTimer();
            }
            else {
                const convertedToDate = convertMs(time);
                daysRender.textContent = formatConvert(convertedToDate.days);
                hoursRender.textContent = formatConvert(convertedToDate.hours);
                minutesRender.textContent = formatConvert(convertedToDate.minutes);
                secondsRender.textContent = formatConvert(convertedToDate.seconds);
            };
        }, 0);
    }
    else {
        mistakeAlert();
        return;
    };
};

const stopTimer = () => {
    calendar.disabled = false;
    clearInterval(timerInt);
    timerBtn.textContent = startBtn;
    timerBtn.disabled = true;
    daysRender.textContent = formatConvert(0);
    hoursRender.textContent = formatConvert(0);
    minutesRender.textContent = formatConvert(0);
    secondsRender.textContent = formatConvert(0);
 };

const onClick = (e) => {
    if (timerBtn.textContent === stopBtn) {
        stopTimer();
    }
    else if (timerBtn.textContent === startBtn && dateCheck() === true) {
        startTimer();
    }
    else return mistakeAlert;
    
}

timerBtn.addEventListener('click', onClick);
