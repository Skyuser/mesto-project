import "../pages/index.css";

import { enableValidation } from "../components/validate.js";
import Card from "../components/card.js";
import { openPopup, closePopup } from "../components/modal.js";
import { printError } from "../components/utils.js";

import Api from "../components/api.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";

// Объявления
let userId;
const popupsAll = document.querySelectorAll(".popup");
const templateCard = "#card";
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector("#popup_edit");
const popupEditSaveButton = popupEdit.querySelector(".popup__submit");
const popupAdd = document.querySelector("#popup_add");
const popupAddSaveButton = popupAdd.querySelector(".popup__submit");
const popupEditClose = popupEdit.querySelector(".popup__close");
const popupAddClose = popupAdd.querySelector(".popup__close");
const nameProfile = document.querySelector(".profile__name");
const jobProfile = document.querySelector(".profile__job");
const nameEdit = popupEdit.querySelector("#name");
const descriptionEdit = popupEdit.querySelector("#description");
const avatar = document.querySelector(".profile__avatar");
const avatarBase = document.querySelector(".profile__avatar-base");
const popupAvatar = document.querySelector("#popup_avatar");
const popupAvatarSaveButton = popupAvatar.querySelector(".popup__submit");
const popupAvatarForm = popupAvatar.querySelector("#popup-avatarform");
const avatarInput = popupAvatar.querySelector(".popup__input");
// Замена параметров страницы профиля из формы редактирования
const formEdit = popupEdit.querySelector("#popup-editform");
// Добавление карточек
const popupAddLinkName = popupAdd.querySelector("#linkname");
const popupAddUrl = popupAdd.querySelector("#url-img");
const formAdd = popupAdd.querySelector("#popup-addform");
//Превью изображения
const popupPhoto = document.querySelector("#popup-photo");
const popupPhotoUrl = popupPhoto.querySelector(".popup__image");
const popupPhotoText = popupPhoto.querySelector(".popup__text");
const popupPhotoCloseButton = popupPhoto.querySelector(".popup__close");
const username = ".profile__name";
const description = ".profile__job";
const ava = ".profile__avatar";
const elementsGroup = ".elements__group";
let sectionAdd;

const settings = {
  formSelector: ".popup__input-form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_invalid",
  errorClass: "popup__input-error_active",
};

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
// popupCard.setEventListeners();

const userInfo = new UserInfo(username, description, ava);

// Общее закрытие попапов по оверлею или по крестику/Escape
// popupsAll.forEach((popup) => {
//   popup.addEventListener("mousedown", (evt) => {
//     if (evt.target.classList.contains("popup__close")) {
//       closePopup(popup);
//     }
//     if (evt.target === popup) {
//       closePopup(evt.target);
//     }
//   });
// });

// buttonAdd.addEventListener("click", function () {
//   openPopup(popupAdd);
// });
avatarBase.addEventListener('click', function () {
  popupAvatarEdit.open();
  popupAvatarEdit.setEventListeners();
});

// Сбор параметров профиля со страницы
buttonEdit.addEventListener("click", function () {
  nameEdit.value = nameProfile.textContent;
  descriptionEdit.value = jobProfile.textContent;

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
  api.updateMyInformation(inputs).then((result) => {
    userInfo.setUserInfo(result.name, result.about, result.avatar, result._id);
    popupProfileEdit.close();
  });
});

// Экземпляр PopupWithForm для добавления карточки - код изменится в зависимости от Section
const popupFormAddCard = new PopupWithForm("#popup_add", (inputs) => {
  api.postNewCard(inputs).then((result) => {
    userInfo.setUserInfo(result);
    section.addItem(result, result.owner._id);
    popupFormAddCard.close();
  });
});

// Экземпляр PopupWithForm для обновления аватара
const popupAvatarEdit = new PopupWithForm("#popup_avatar", (inputs) => {
  api.updateAvatar(inputs).then((result) => {
    userInfo.setUserInfo(result.name, result.about, result.avatar, result._id);
    popupAvatarEdit.close();
  });
});

// Экземпляр PopupWithForm для "Вы уверены?"
const popupConfirmation = new PopupWithForm(".popup__remove-card", () => {
  renderRemoving(true, buttonConfidence);
  api.deleteCard(cardId).then(() => {
    deleteCard.remove();
    popupConfirmation.close();
  });
});

enableValidation(settings);

export {
  api,
  settings,
  popupsAll,
  templateCard,
  buttonEdit,
  buttonAdd,
  popupEdit,
  popupEditSaveButton,
  popupAdd,
  popupAddSaveButton,
  popupEditClose,
  popupAddClose,
  nameProfile,
  jobProfile,
  nameEdit,
  descriptionEdit,
  formEdit,
  popupAddLinkName,
  popupAddUrl,
  formAdd,
  popupPhoto,
  popupPhotoUrl,
  popupPhotoText,
  popupAvatar,
  popupPhotoCloseButton,
  avatarInput,
  popupAvatarSaveButton,
  userId,
  avatar,
  userInfo,
};
