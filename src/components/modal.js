function closeEscape(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened')
      closePopup(openedPopup)
    }
  }
  
  function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeEscape)
  }
  function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeEscape);
  }
  
  function renderLoading(target, isLoading, buttonText, loadingText) {
    if (isLoading) {
      target.textContent = loadingText;
    } else {
      target.textContent = buttonText;
    }
  }

 export { openPopup, closePopup, renderLoading }