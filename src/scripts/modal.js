function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscape);
  popup.removeEventListener('mousedown', closeModalOverlay);
  popup.querySelector('.popup__close').removeEventListener('click', handleCloseModal);
}

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscape);
  popup.addEventListener('mousedown', closeModalOverlay);
  popup.querySelector('.popup__close').addEventListener('click', handleCloseModal)
}

function handleCloseModal(item) {
  const buttonClose = item.target.classList.contains('popup__close')
  if (buttonClose) {
    const popup = item.target.closest('.popup');
    closePopup(popup)
  }
}

function closeModalOverlay(item) {
  if (item.target === item.currentTarget) {
    closePopup(item.currentTarget);
  };
}

function handleEscape(item) {
  if (item.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  };
};

export {openPopup, closePopup};