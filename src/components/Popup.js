// Создайте класс Popup, который отвечает за открытие и закрытие попапа.
export default class Popup {
  // Принимает в конструктор единственный параметр — селектор попапа.
  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelector(selector);
  }
  // Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
  open() {
    this._popup.classList.add("popup_opened");
  }
  close() {
    this._popup.classList.remove("popup_opened");
  }

  // Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
  _handleEscClose = (event) => {
    if (event.key === "Escape") {
      //   const openedPopup = document.querySelector(".popup_opened");
      this.close();
    }
  };

 _removeEventListeners = (evt) => {
    if (evt.target.classList.contains("popup__close")) {
      this.close();
      document.removeEventListener("keydown", this._handleEscClose);
      this._popup.removeEventListener("mousedown", this._removeEventListeners);
    }
    if (evt.target === this._popup) {
      this.close();
      document.removeEventListener("keydown", this._handleEscClose);
      this._popup.removeEventListener("mousedown", this._removeEventListeners);

    }
  };

  setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose);
    this._popup.addEventListener("mousedown", this._removeEventListeners);
  }
}
