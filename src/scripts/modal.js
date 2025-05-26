import '../pages/index.css';

const openModal = function(popup) {
  openPopup(popup);
  handleСloseModal(popup);
};

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscape);
}

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscape);
}

function handleСloseModal(item) {
  const button = item.querySelector('.popup__close');
  button.addEventListener('click', () => {
    closePopup(item);
  }, {once: true});
  
  item.addEventListener('mousedown', closeModalOverlay)
}

function closeModalOverlay(item) {
  if (item.target === item.currentTarget) {
    closePopup(item.currentTarget);
    item.currentTarget.removeEventListener('mousedown', closeModalOverlay)
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

export {openModal, handleСloseModal, closePopup};