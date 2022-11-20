import Notiflix from "notiflix";


const form = document.querySelector(".form");
const { amount, delay, step } = form.elements;


form.addEventListener("submit", onFormSubmit);


function onFormSubmit(e) {
  e.preventDefault();

  let delayValue = +delay.value;
  const amountValue = +amount.value;
  const stepValue = +step.value;

  for (let i = 1; i <= amountValue; i++) {
    createPromise(i, delayValue)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delayValue += stepValue;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {

    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
          // Fulfill
          resolve({ position, delay });
      } else {
          // Reject
          reject({ position, delay });
        }
    }, delay);
  });
}