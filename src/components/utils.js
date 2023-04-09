import { settings, nameProfile, nameEdit, jobProfile, descriptionEdit, popupEdit, popupAdd, popupAvatar, elementsGroup, popupAddUrl, popupAddLinkName, popupAddSaveButton, avatarInput, popupAvatarSaveButton, userId, avatar } from '../pages/index.js';
import { closePopup, renderLoading } from '../components/modal.js'
import { updateMyInformation, postNewCard, updateAvatar, printError} from '../components/api.js'
import { loadInitials } from './card.js';

function handleSubmit(request, evt) {
    evt.preventDefault();
    const submitButton = evt.submitter;
    const buttonText = submitButton.textContent;
    const loadingText = "Сохранение..."
    renderLoading(submitButton, true, buttonText, loadingText);
    request()
      .then(() => {
        evt.target.reset();
      })
      .catch(printError)
      .finally(() => {
        renderLoading(submitButton, false, buttonText, loadingText);
      });
  }

function submitFormEdit(evt) {
    function requestForm() {
    return updateMyInformation(nameEdit.value, descriptionEdit.value)
        .then((res) => {
            nameProfile.textContent = res.name
            jobProfile.textContent = res.about
            closePopup(popupEdit);
        })
    }
    handleSubmit(requestForm, evt);
}

function handleAvatarUpdate(evt) {
    function requestForm() {
      return updateAvatar(avatarInput.value)
        .then((res) => {
          avatar.src = res.avatar;
          evt.target.reset();
          disableButton(settings, popupAvatarSaveButton);
          closePopup(popupAvatar);
        })
    }
    handleSubmit(requestForm, evt);
  }

function loadFormAdd (evt){
    function requestForm() {
    return postNewCard(popupAddLinkName.value, popupAddUrl.value)
        .then((card) => {
            elementsGroup.prepend(loadInitials(card, userId));
            disableButton(settings, popupAddSaveButton);
            closePopup(popupAdd); 
        })
    }
    handleSubmit(requestForm, evt); 
}

function disableButton(settings, disabledSaveButton) {
    disabledSaveButton.disabled = true;
    disabledSaveButton.classList.add(settings.inactiveButtonClass);
  }

export { submitFormEdit, loadFormAdd, handleAvatarUpdate }