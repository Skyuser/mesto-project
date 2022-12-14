// Объявления
const templateCard = document.querySelector('#card').content;
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button')
const popupEdit = document.querySelector('#popup_edit');
const popupEditSaveButton = popupEdit.querySelector('.popup__submit')
const popupAdd = document.querySelector('#popup_add');
const popupAddSaveButton = popupAdd.querySelector('.popup__submit')
const popupEditClose = popupEdit.querySelector('.popup__close');
const popupAddClose = popupAdd.querySelector('.popup__close');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const nameEdit = popupEdit.querySelector('#name');
const descriptionEdit = popupEdit.querySelector('#description');
// Замена параметров страницы профиля из формы редактирования
const formEdit = popupEdit.querySelector('#popup-editform')
// Загрузка базовых карточек
const elementsGroup = document.querySelector('.elements__group')
// Добавление карточек
const popupAddLinkName = popupAdd.querySelector('#linkname');
const popupAddUrl = popupAdd.querySelector('#url-img');
const formAdd = popupAdd.querySelector('#popup-addform')
//Превью изображения
const popupPhoto = document.querySelector('#popup-photo');
const popupPhotoUrl = popupPhoto.querySelector('.popup__image');
const popupPhotoText = popupPhoto.querySelector('.popup__text');
const popupPhotoCloseButton = popupPhoto.querySelector('.popup__close')

// Открытие/закрытие попапов
function openPopup (popup) {
    popup.classList.add('popup_opened');
}

function closePopup (popup) {
    popup.classList.remove('popup_opened');
}

popupEditClose.addEventListener('click', function() {
    closePopup(popupEdit);
})

buttonAdd.addEventListener('click', function() {
    openPopup(popupAdd);
})

popupAddClose.addEventListener('click', function() {
    closePopup(popupAdd);
})

// Сбор параметров профиля со страницы
buttonEdit.addEventListener('click', function() {
    nameEdit.value = nameProfile.textContent;
    descriptionEdit.value = jobProfile.textContent;
    openPopup(popupEdit);
})

function submitFormEdit(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameEdit.value;
    jobProfile.textContent = descriptionEdit.value;
    closePopup(popupEdit);
}

formEdit.addEventListener('submit', submitFormEdit);

function loadInitials (link, name) {
    const cardElement = templateCard.querySelector('.element').cloneNode(true);
    const templateName = cardElement.querySelector('.element__name');
    const templateImage = cardElement.querySelector('.element__image');
    const templateLike = cardElement.querySelector('.element__like').addEventListener('click', function(evt){
        evt.target.classList.toggle('element__like_active')
    });
    const templateDelete = cardElement.querySelector('.element__delete-button').addEventListener('click',function(evt){
        evt.target.closest('.element').remove()
    });

    templateImage.addEventListener('click',function(evt) {
        showPhoto(link, name)
    });

    templateImage.src = link;
    templateImage.alt = name;
    templateName.textContent = name;

    return cardElement;
}

initialCards.forEach(item => {
    elementsGroup.append(loadInitials(item.link, item.name));
});

function loadFormAdd (evt){
    evt.preventDefault();
    elementsGroup.prepend(loadInitials(popupAddUrl.value, popupAddLinkName.value));
    evt.target.reset();
    closePopup(popupAdd);
}

//Сохранение карточек
formAdd.addEventListener('submit', loadFormAdd);

function showPhoto(link, name) {
    popupPhotoUrl.src = link;
    popupPhotoUrl.alt = name;
    popupPhotoText.textContent = name;
    openPopup(popupPhoto);
}

popupPhotoCloseButton.addEventListener('click', function(){
    closePopup(popupPhoto);
});