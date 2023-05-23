import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupPhotoUrl = this._popup.querySelector(".popup__image");
    this._popupPhotoText = this._popup.querySelector(".popup__text");
  }
  open(src, alt) {
    super.open();
    this._popupPhotoUrl.src = src;
    this._popupPhotoUrl.alt = alt;
    this._popupPhotoText.textContent = alt;
    this.setEventListeners();
  }
}
