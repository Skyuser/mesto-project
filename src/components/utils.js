function checkResponse(res) {   
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  
function checker(url, data) {
    return fetch(url, data)
        .then(checkResponse)
  }

function printError(err) {
    console.log(`Ошибка: ${err}`);
  }

export { checker, printError }