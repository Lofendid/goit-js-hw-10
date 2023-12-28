import iziToast from "izitoast";

const iconError = new URL('/img/icons/error-icon.svg', import.meta.url).href;
const iconSuccess = new URL('/img/icons/ok-icon.svg', import.meta.url).href;

const radioBtns = document.querySelectorAll('fieldset [name="state"]');
const submitBtn = document.querySelector('[type="submit"]');
const form = document.querySelector('.form');
const delayInput = document.querySelector('[name="delay"]');

const mistakeAlert = () => {
    iziToast.show(
        {
            backgroundColor: 'rgba(239, 64, 64, 1)',
            title: 'Error',
            theme: 'dark',
            message: `Rejected promise in ${delayInput.value} ms`,
            position: 'topRight',
            timeout: 5000,
            iconUrl: iconError,
        }
    );
};

const successAlert = () => {
    iziToast.show(
        {
            backgroundColor: 'rgba(89, 161, 13, 1)',
            title: 'OK',
            theme: 'dark',
            message: `Fulfilled promise in ${delayInput.value} ms`,
            position: 'topRight',
            timeout: 5000,
            iconUrl: iconSuccess,
        }
    );
};

const onSubmit = (e) => {
    e.preventDefault();

    const delay = Number(delayInput.value);
    submitBtn.disabled = true;
    
    setTimeout(() => {
        new Promise((resolve, reject) => {
            const selectedBtn = Array.from(radioBtns).find(btn => btn.checked);
            if (selectedBtn.value === 'fulfilled') {
                resolve();
            }
            else if (selectedBtn.value === 'rejected') {
                reject()
            }
        })
            .then(() => successAlert())
            .catch(() => mistakeAlert())
            .finally(() => {
                form.reset()
                submitBtn.disabled = false;
                delayInput.disabled = false;
                radioBtns.forEach(btn => btn.disabled = false);
            })
    }, delay);

    delayInput.disabled = true;
    radioBtns.forEach(btn => btn.disabled = true);
};

form.addEventListener('submit', onSubmit);