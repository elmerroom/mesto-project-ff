import '../pages/index.css';
import { addCard, createCard, handleDeleteCard} from './cardsCreate';

const formElement  = document.forms['edit-profile'];
const placeForm = document.forms['new-place'];
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;
const placeInput = placeForm.elements['place-name'];
const urlPlaceInput = placeForm.elements.link;

const openModal = function(popupName) {
  popupName.classList.add('popup_is-opened');
  closeModal(popupName)
};

function closeModal(item) {
  const button = item.querySelector('.popup__close');
  button.addEventListener('click', () => {
    item.classList.remove('popup_is-opened');
    resetsEditModal();
    if (item.classList.contains('popup_type_new-card')) {
      placeForm.reset();
    };
  });
  document.addEventListener('keydown', closeModalEscape);
  item.addEventListener('click', (item) => {
    if (item.target === item.currentTarget) {
    item.currentTarget.classList.remove('popup_is-opened');
    resetsEditModal();
    if (item.target.classList.contains('popup_type_new-card')) {
      placeForm.reset();
    };
  };
  })
}

function openImageModal(name, link) {
  const popupTypeImage = document.querySelector('.popup_type_image');
  const popupImg = popupTypeImage.querySelector('.popup__image');
  const popupCaption = popupTypeImage.querySelector('.popup__caption');
  
  popupImg.src = link;
  popupImg.alt = name;
  popupCaption.textContent = name;
  
  openModal(popupTypeImage);
}

function resetsEditModal() {
  formElement.elements.name.value = profileName.textContent;
  formElement.elements.description.value = profileDescription.textContent;
};

function likeCard(item) {
  item.classList.toggle('card__like-button_is-active');
}

function closeModalEscape(item) {
  if (item.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      openedPopup.classList.remove('popup_is-opened');
      resetsEditModal();
      if (openedPopup.classList.contains('popup_type_new-card')) {
        placeForm.reset();
      }
    }
  }
}

function handleFormSubmit(item) {
    item.preventDefault(); 
    profileName.textContent = nameInput.value 
    profileDescription.textContent = jobInput.value
    const popup = item.target.closest('.popup');
    popup.classList.remove('popup_is-opened');
    closeModal(popup)
}

function handlePlaceSubmit(item) {
    item.preventDefault(); 
    const placeName = placeInput.value;
    const placeLink = urlPlaceInput.value;
    const imgObg = {
      name: placeName, 
      link: placeLink
    };
    addCard(createCard(imgObg, handleDeleteCard, openImageModal, likeCard))
    placeForm.reset()
    const popup = item.target.closest('.popup');
    popup.classList.remove('popup_is-opened');
    closeModal(popup)
}

export {openModal, openImageModal, resetsEditModal, likeCard, handleFormSubmit, handlePlaceSubmit};