export default class Card {
    constructor(data, user, selector, {
      handleDelete,
      handleClick,
      handleLike
    }) {
      this._name = data.name;
      this._link = data.link;
      this._like = data.likes;
      this._card = data.card;
      this._cardId = data._id;
      this._id = data.owner._id;
      this.id = user;
      this._templateCard = selector;
      this._handleLike = handleLike;
      this._handleDelete = handleDelete;
      this._handleClick = handleClick;
    }
  
    _createElement() {
      const elementsClone = document.querySelector(this._templateCard).content.querySelector('.element').cloneNode(true);
      return elementsClone;
    }
  
    generate() {
      this._element = this._createElement();
      this._element.querySelector('.element__image').src = this._link;
      this._element.querySelector('.element__image').alt = this._name;
      this._element.querySelector('.element__name').textContent = this._name;
      this._deleteButton = this._element.querySelector('.element__delete-button');
      this._likeCount = this._element.querySelector('.element__likes-value');
      this._likeCount.textContent = this._like.length;
      this._likeButton = this._element.querySelector('.element__like');
      this._imageButton = this._element.querySelector('.element__image');
      this._isLiked();
      this._setDeleteButton();
      this._setEventListeners();
      return this._element;
    }
  
    _isLiked() {
      this._like.forEach(element => {
        if (this.id == element._id) {
          this._likeButton.classList.add('element__like_active');
        }
      });
    }
  
    _deleteCard(){
      this._element.remove();
    }
  
    _handleAddLike(data) {
      this._likes = data.likes;
      this._likeButton.classList.toggle('element__like_active');
      this._likeCount.textContent = this._likes.length;
    }
  
    _handleRemoveLike(data) {
      this._likes = data.likes;
      this._likeButton.classList.remove('element__like_active');
      this._likeCount.textContent = this._likes.length;
    }

    _setDeleteButton() {
      if (this.id !== this._id) {
        this._deleteButton.classList.add('element__delete-button_disabled');
      }
    }
  
    _checkActiveClass() {
      return this._likeButton.classList.contains('element__like_active');
    }
  
    _setEventListeners() {
      this._likeButton.addEventListener('click', () => this._handleLike(this._cardId, this.id));
      this._deleteButton.addEventListener('click', () => this._handleDelete(this._cardId));
      this._imageButton.addEventListener('click', () => this._handleClick(this._link, this._name));
    }
  }