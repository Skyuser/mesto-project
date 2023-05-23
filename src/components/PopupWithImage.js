import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupPhotoUrl = this._popup.querySelector(".popup__image");
    this._popupPhotoText = this._popup.querySelector(".popup__text");
  }
  open(data) {
    super.open();
    this._popupPhotoUrl.src = data.link;
    this._popupPhotoUrl.alt = data.name;
    this._popupPhotoText.textContent = data.name;
  }
}
