import { settings, nameProfile, nameEdit, jobProfile, descriptionEdit, popupEdit, popupAdd, popupPhoto, popupPhotoUrl, popupPhotoText, templateCard, elementsGroup, popupAddUrl, popupAddLinkName, popupAddSaveButton } from '../pages/index.js';
import { openPopup, closePopup } from '../components/modal.js'

function submitFormEdit(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameEdit.value;
    jobProfile.textContent = descriptionEdit.value;
    closePopup(popupEdit);
}

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

function loadFormAdd (evt){
    evt.preventDefault();
    elementsGroup.prepend(loadInitials(popupAddUrl.value, popupAddLinkName.value));
    evt.target.reset();
    disableButton(settings, popupAddSaveButton)
    closePopup(popupAdd);
}

function disableButton(settings, popupAddSaveButton) {
    popupAddSaveButton.disabled = true;
    popupAddSaveButton.classList.add(settings.inactiveButtonClass);
  }

function showPhoto(link, name) {
    popupPhotoUrl.src = link;
    popupPhotoUrl.alt = name;
    popupPhotoText.textContent = name;
    openPopup(popupPhoto);
}

export { submitFormEdit, loadInitials, loadFormAdd, showPhoto }