const SERVER_GET_DATA = 'https://22.javascript.pages.academy/kekstagram/data';
const SERVER_POST_DATA = 'https://22.javascript.pages.academy/kekstagram';

const getData = ((onSuccess, onFail) => {
  fetch(SERVER_GET_DATA)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      onFail();
    });
});

const sendData = ((onSuccess, onFail, body) => {
  fetch(SERVER_POST_DATA,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
});

export { getData, sendData };
