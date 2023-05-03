import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector, src, alt) {
    super(selector);
    this._src = src;
    this._alt = alt;
    this._popupPhotoUrl = this._popup.querySelector(".popup__image");
    this._popupPhotoText = this._popup.querySelector(".popup__text");
  }
  open() {
    super.open();
    this._popupPhotoUrl.src = this._src;
    this._popupPhotoUrl.alt = this._alt;
    this._popupPhotoText.textContent = this._alt;
  }
}
