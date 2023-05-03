import { api, popupPhoto, popupPhotoUrl, popupPhotoText, templateCard } from '../pages/index.js';
import { openPopup } from '../components/modal.js'
import { printError } from '../components/utils.js'


function loadInitials (card, user) {
    const cardElement = templateCard.querySelector('.element').cloneNode(true);
    const templateName = cardElement.querySelector('.element__name');
    const templateImage = cardElement.querySelector('.element__image');
    const templateLike = cardElement.querySelector('.element__like')
    const templateDelete = cardElement.querySelector('.element__delete-button')
    const likesValue = cardElement.querySelector('.element__likes-value')

    likesValue.textContent = card.likes.length;

    templateImage.addEventListener('click',function(evt) {
        showPhoto(card, user)
    });

    card.likes.forEach((like) => {
        if(like._id === user) {
            templateLike.classList.add('element__like_active')
        }
    })

    if(user !== card.owner._id) {
        templateDelete.classList.add('element__delete-button_disabled')
    }

    templateDelete.addEventListener('click', function(){
        api.deleteCard(card._id)
            .then((res) => {
                cardElement.remove(res);
            })
            .catch(printError)
    })

    templateLike.addEventListener('click', function (evt) {
        if(!evt.target.classList.contains('element__like_active')){
            api.putLikeCard(card._id)
            .then((res) => {
                evt.target.classList.toggle('element__like_active')
                likesValue.textContent = res.likes.length;
            })
            .catch(printError)
        } else {
            api.deleteLikeCard(card._id)
            .then((res) => {
                evt.target.classList.remove('element__like_active')
                likesValue.textContent = res.likes.length;
            })
            .catch(printError)
        }
    })

    templateImage.src = card.link;
    templateImage.alt = card.name;
    templateName.textContent = card.name;

    return cardElement;
}

function showPhoto(card) {
    popupPhotoUrl.src = card.link;
    popupPhotoUrl.alt = card.name;
    popupPhotoText.textContent = card.name;
    openPopup(popupPhoto);
}

export { loadInitials, showPhoto }