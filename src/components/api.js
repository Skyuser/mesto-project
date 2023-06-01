export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl,
    this._headers = options.headers
    }

  _checkResponse(res) {   
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    
  _checker(url, data) {
      return fetch(url, data)
          .then(this._checkResponse)
    }

  _getInitialCards() {
    return this._checker(`${this._baseUrl}/cards`, {
        headers: this._headers
      })
    }
    
  _getMyInformation() {
    return this._checker(`${this._baseUrl}/users/me`, {
        headers: this._headers
      })
    }
  
  updateMyInformation(data) {
    return this._checker(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.description,
        })
      })
    }
  
  postNewCard(data) {
    return this._checker(`${this._baseUrl}/cards`, {
         method: 'POST',
         headers: this._headers,
         body: JSON.stringify({
          name: data.linkname,
          link: data['url-img'],
         }) 
      })
    }
  
  deleteCard(cardId) {
    return this._checker(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
    }
  
  putLikeCard(cardId) {
    return this._checker(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: this._headers
      })
    }
    
  deleteLikeCard(cardId) {
    return this._checker(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
    }
  
  updateAvatar(data) {
    return this._checker(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.avatar
        })
      })
    }
}
  