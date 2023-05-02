export default class Popup {
  constructor(selector) {
      this._selector = selector;
      this._popup = document.querySelector(selector);
  }

  open() {
    this._popup.classList.add("popup_opened");
  }
  close() {
    this._popup.classList.remove("popup_opened");
  }

  _handleEscClose() {
    if (evt.key === "Escape") {
      //   const openedPopup = document.querySelector(".popup_opened");
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup__close")) {
        this.close();
      }
      if (evt.target === this._popup) {
        this.close();
      }
    });
  }
}
