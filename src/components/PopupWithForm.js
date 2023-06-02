import Popup from "./Popup.js";
import { settings } from "../utils/constants.js";

// Создайте класс PopupWithForm, который наследуется от Popup
export default class PopupWithForm extends Popup {
  // Класс PopupWithForm принимает в конструктор селектор попапа и колбэк сабмита формы. В этом колбэке содержится метод класса Api.
  constructor(selector, submitForm) {
    super(selector);

    // переопределяем область видимости submitForm
    this._submitForm = submitForm;

    // говорим, что эта форма - это форма из попапа (родительского класса)
    this._form = this._popup.querySelector(settings.formSelector);

    // находим все инпуты из формы, которую нашли выше
    this._inputList = this._form.querySelectorAll(settings.inputSelector);

    // находим кнопку submit
    this.submitButton = this._form.querySelector(
      settings.submitButtonSelector
    );

    // находим изначальный текст кнопки submit
    this.submitButtonDefaultText = this.submitButton.textContent;
  }

  // Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  _submit = (evt) => {
    this.submitButton.textContent = "Сохранение...";
    evt.preventDefault();
    this._submitForm(this._getInputValues());
  };
  // Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
  setEventListeners() {
    //  берем слушатели из Popup
    super.setEventListeners();
    // Добавляем обработчик сабмита формы
    this._form.addEventListener("submit", this._submit);
  }

  // Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
  close() {
    super.close();
    this._form.reset();
   
    this._form.removeEventListener("submit", this._submit);
  }
  // Для каждого попапа создавайте свой экземпляр класса PopupWithForm - TO DO
}
