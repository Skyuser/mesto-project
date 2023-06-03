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

const settings = {
  formSelector: ".popup__input-form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_invalid",
  errorClass: "popup__input-error_active",
};

export {
    userId,
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
    avatar,
    avatarBase,
    popupAvatar,
    popupAvatarSaveButton,
    popupAvatarForm,
    avatarInput,
    formEdit,
    popupAddLinkName,
    popupAddUrl,
    formAdd,
    popupPhoto,
    popupPhotoUrl,
    popupPhotoText,
    popupPhotoCloseButton,
    username,
    description,
    ava,
    elementsGroup,
    settings
}