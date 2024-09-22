import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const delayInput = form.querySelector('[name="delay"]');
const stateRadios = form.querySelectorAll('[name="state"]');

form.addEventListener('submit', event => {
    event.preventDefault(); // Запобігає перезавантаженню сторінки

    // Отримуємо значення затримки з поля вводу
    const delay = Number(delayInput.value);

    // Отримуємо значення вибраної радіокнопки (fulfilled або rejected)
    const radioValue = Array.from(stateRadios).find(radio => radio.checked)?.value;

    // Перевіряємо, чи всі поля заповнені
    if (!delay || !radioValue) {
        iziToast.error({
            title: 'Error',
            message: 'Please provide both delay and state!',
            position: 'topRight',
        });
        return;
    }

    // Викликаємо функцію makePromise з відповідними значеннями
    makePromise(radioValue, delay)
        .then((delay) => {
            iziToast.success({
                title: 'Success',
                message: `✅ Fulfilled promise in ${delay}ms`,
                position: 'topRight',
            });
        })
        .catch((delay) => {
            iziToast.error({
                title: 'Error',
                message: `❌ Rejected promise in ${delay}ms`,
                position: 'topRight',
            });
        });
});

// Функція створення промісу з затримкою
function makePromise(state, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });
}
