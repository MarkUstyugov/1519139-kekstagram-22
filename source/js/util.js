const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

// Перемешивание массива
const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
}

const failGetDataFromServer = (error) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = error.message || error;

  document.body.append(alertContainer);
};

const debounce = (func, wait) => {
  let timeout;

  return  (...args) =>  {
    const doLater = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(doLater, wait);
  };
};

export { isEscEvent, failGetDataFromServer, shuffle, debounce };
