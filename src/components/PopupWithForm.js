import Popup from "./Popup";
import { settings } from "../pages";

export default class PopupWithForm extends Popup {
  constructor(selector, submitForm) {
    super(selector);
    this._submitForm = submitForm;
  }
  _getInputValues() {
    const inputList = Array.from(document.querySelectorAll(".popup__input"));
  }
  setEventListeners() {}

  close() {
    evt.target.reset();
  }
}

export default class PopupWithForm extends Popup {
  constructor(selector, submitForm) {
    super(selector);

    this._submitForm = submitForm;

    this._form = this._popup.querySelector(settings.formSelector);
    this._inputList = this._form.querySelectorAll(settings.inputSelector);
    this._submitButton = this._form.querySelector(settings.submitButtonSelector);
    this._submitButtonNormalText = this._submitButton.textContent; // text of normal state
  }

  renderLoading(isLoading, loadingText = "Сохранение...") {
    this._submitButton.textContent = isLoading ? loadingText : this._submitButtonNormalText;
  }

  _getInputValues(values) {
    this._inputList.forEach(input => {
      input.value = values[input.name];
    });
  }

   setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._submitForm );
  }

    close() {
    super.close();
    this._form.reset();
  }

}