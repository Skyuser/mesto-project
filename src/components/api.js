const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-22',
    headers: {
      authorization: '0084e260-948c-41b3-ba88-e14a4fb1558a',
      'Content-Type': 'application/json'
    }
  }

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

  function getInitialCards() {
    return checker(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
  }
  
  function getMyInformation() {
    return checker(`${config.baseUrl}/users/me`, {
      headers: config.headers
    })
  }

  function updateMyInformation(username, userabout) {
    return checker(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: username,
        about: userabout
      })
    })
  }

  function postNewCard(name, link) {
    return checker(`${config.baseUrl}/cards`, {
       method: 'POST',
       headers: config.headers,
       body: JSON.stringify({
        name: name,
        link: link
       }) 
    })
  }

  function deleteCard(cardId) {
    return checker(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    })
  }

  function putLikeCard(cardId) {
    return checker(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers
    })
  }
  
  function deleteLikeCard(cardId) {
    return checker(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    })
  }

  function updateAvatar(avatar) {
    return checker(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
  }

  export { getInitialCards, getMyInformation, updateMyInformation, postNewCard, deleteCard, putLikeCard, deleteLikeCard, updateAvatar, printError }