import '../pages/index.css';
import { openPopup, closePopup, resetsEditModal } from './RecurringFunc';

const openModal = function(popup) {
  openPopup(popup);
  closeModal(popup);
};

function closeModal(item) {
  const button = item.querySelector('.popup__close');
  button.addEventListener('click', () => {
    closePopup(item);
    resetsEditModal();
  }, {once: true});
  document.addEventListener('keydown', handleEscape);
  item.addEventListener('click', closeModalOverlay)
}

function closeModalOverlay(item) {
  if (item.target === item.currentTarget) {
    closePopup(item.currentTarget)
    resetsEditModal();
    item.currentTarget.removeEventListener('click', closeModalOverlay)
  };
}

function handleEscape(item) {
  if (item.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup)
      resetsEditModal();
      document.removeEventListener('keydown', handleEscape)
    }
  }
}

export {openModal, resetsEditModal, closeModal};