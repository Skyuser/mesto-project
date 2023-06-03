import "../pages/index.css";

import Card from "../components/card.js";
import { printError } from "../components/utils.js";

import Api from "../components/api.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";
import {    
  templateCard,
  buttonEdit,
  buttonAdd,
  nameEdit,
  descriptionEdit,
  avatarBase,
  popupAvatarForm,
  formEdit,
  formAdd,
  username,
  description,
  ava,
  elementsGroup,
  settings
} from '../utils/constants.js'
let sectionAdd;

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/plus-cohort-22",
  headers: {
    authorization: "0084e260-948c-41b3-ba88-e14a4fb1558a",
    "Content-Type": "application/json",
  },
});

const popupCard = new PopupWithImage(
  "#popup-photo",
  "./image/karachaevsk.jpg",
  "test"
);

const userInfo = new UserInfo(username, description, ava);

buttonAdd.addEventListener("click", function () {
  cardValidator.disableButton();
  popupFormAddCard.open();
  popupFormAddCard.setEventListeners();
});

avatarBase.addEventListener("click", function () {
  popupAvatarEdit.open();
  popupAvatarEdit.setEventListeners();
});

// Сбор параметров профиля со страницы
buttonEdit.addEventListener("click", function () {
  const infoObject = userInfo.getUserInfo();
  nameEdit.value = infoObject.name;
  descriptionEdit.value = infoObject.about;
  popupProfileEdit.open();
  popupProfileEdit.setEventListeners();
});

Promise.all([api._getMyInformation(), api._getInitialCards()])
  .then(([user, cards]) => {
    userInfo.setUserInfo(user.name, user.about, user.avatar, user._id);
    sectionAdd = new Section(
      {
        items: cards,
        renderer: (data) => {
          const newCardAdd = createItem(data);
          sectionAdd.addItem(newCardAdd);
        },
      },
      elementsGroup
    );
    sectionAdd.renderItems(cards.reverse());
  })
  .catch(printError);

function createItem(data) {
  const cardAdd = new Card(data, userInfo._userId, templateCard, {
    handleClick: () => {
      popupCard.open(data["link"], data["name"]);
      // PopupWithImage.open(data); /* новый класс открытия картинки*/
    },
    handleLike: (cardId) => {
      if (!cardAdd._checkActiveClass()) {
        api
          .putLikeCard(cardId)
          .then((data) => cardAdd._handleAddLike(data))
          .catch(printError);
      } else {
        api
          .deleteLikeCard(cardId)
          .then((data) => cardAdd._handleRemoveLike(data))
          .catch(printError);
      }
    },
    handleDelete: (cardId) => {
      api
        .deleteCard(cardId)
        .then(() => cardAdd._deleteCard())
        .catch(printError);
    },
  });
  const cardItem = cardAdd.generate();
  return cardItem;
}

// Экземпляр PopupWithForm для редактирования профиля
const popupProfileEdit = new PopupWithForm("#popup_edit", (inputs) => {
  api
    .updateMyInformation(inputs)
    .then((result) => {
      userInfo.setUserInfo(
        result.name,
        result.about,
        result.avatar,
        result._id
      );
      popupProfileEdit.close();
    })
    .catch(printError)
    .finally(function () {
      popupProfileEdit.submitButton.textContent =
        popupProfileEdit.submitButtonDefaultText;
    });
});

// Экземпляр PopupWithForm для добавления карточки
const popupFormAddCard = new PopupWithForm("#popup_add", (inputs) => {
  api
    .postNewCard(inputs)
    .then((result) => {
      sectionAdd.addItem(createItem(result));
      popupFormAddCard.close();
    })
    .catch(printError)
    .finally(function () {
      popupFormAddCard.submitButton.textContent =
        popupFormAddCard.submitButtonDefaultText;
    });
});

// Экземпляр PopupWithForm для обновления аватара
const popupAvatarEdit = new PopupWithForm("#popup_avatar", (inputs) => {
  api
    .updateAvatar(inputs)
    .then((result) => {
      userInfo.setUserInfo(
        result.name,
        result.about,
        result.avatar,
        result._id
      );
      popupAvatarEdit.close();
    })
    .catch(printError)
    .finally(function () {
      popupAvatarEdit.submitButton.textContent =
        popupAvatarEdit.submitButtonDefaultText;
    });
});

const avatarValidator = new FormValidator(settings, popupAvatarForm);
const addValidator = new FormValidator(settings, formEdit);
const cardValidator = new FormValidator(settings, formAdd);

avatarValidator.enableValidation(settings);
addValidator.enableValidation(settings);
cardValidator.enableValidation(settings);