import { checker } from "../components/utils.js"
export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl,
    this._headers = options.headers
    }

  _getInitialCards() {
    return checker(`${this._baseUrl}/cards`, {
        headers: this._headers
      })
    }
    
  _getMyInformation() {
    return checker(`${this._baseUrl}/users/me`, {
        headers: this._headers
      })
    }
  
  updateMyInformation(data) {
    return checker(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: data.username,
          about: data.userabout
        })
      })
    }
  
  postNewCard(data) {
    return checker(`${this._baseUrl}/cards`, {
         method: 'POST',
         headers: this._headers,
         body: JSON.stringify({
          name: data.name,
          link: data.link
         }) 
      })
    }
  
  deleteCard(cardId) {
    return checker(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
    }
  
  putLikeCard(cardId) {
    return checker(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: this._headers
      })
    }
    
  deleteLikeCard(cardId) {
    return checker(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
    }
  
  updateAvatar(data) {
    return checker(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.avatar
        })
      })
    }
  }