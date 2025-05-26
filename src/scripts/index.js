import '../pages/index.css';
import {createCard} from '../scripts/card.js';
import { initialCards } from "./cards.js";
import { openModal, handleСloseModal, closePopup} from './modal.js';
import { resetsEditModal } from './RecurringFunc';


const placesList = document.querySelector('.places__list');

const popupEdit = document.querySelector('.popup_type_edit');

const popupNewCard = document.querySelector('.popup_type_new-card');

const addButton = document.querySelector('.profile__add-button');

const editButton = document.querySelector('.profile__edit-button');

const formElement  = document.forms['edit-profile'];

const placeForm = document.forms['new-place'];

const nameInput = formElement.elements.name;

const jobInput = formElement.elements.description;

const placeInput = placeForm.elements['place-name'];

const urlPlaceInput = placeForm.elements.link;

const profileName = document.querySelector('.profile__title');

const profileDescription = document.querySelector('.profile__description');

const popupTypeImage = document.querySelector('.popup_type_image');

const popupImg = popupTypeImage.querySelector('.popup__image');

const popupCaption = popupTypeImage.querySelector('.popup__caption');

function renderCard(card) {
  placesList.append(card);
};

function addCard(card) {
  placesList.prepend(card);
};

function handleDeleteCard(item) {
  item.remove();
};

function likeCard(item) {
  item.classList.toggle('card__like-button_is-active');
};

formElement.addEventListener('submit', handleProfileFormSubmit);

placeForm.addEventListener('submit', handlePlaceFormSubmit);

addButton.addEventListener('click', () => {
  openModal(popupNewCard);
});

editButton.addEventListener('click', () => {
  resetsEditModal();
  openModal(popupEdit);
});

function openImageModal(name, link) {
  popupImg.src = link;
  popupImg.alt = name;
  popupCaption.textContent = name;
  openModal(popupTypeImage);
};

initialCards.forEach((item) => {
  renderCard(createCard(item, handleDeleteCard, openImageModal, likeCard));
});

function handleProfileFormSubmit(item) {
    item.preventDefault(); 
    profileName.textContent = nameInput.value ;
    profileDescription.textContent = jobInput.value;
    const popup = item.target.closest('.popup');
    closePopup(popup);
    handleСloseModal(popup);
}

function handlePlaceFormSubmit(item) {
    item.preventDefault(); 
    const placeName = placeInput.value;
    const placeLink = urlPlaceInput.value;
    const imgObg = {
      name: placeName, 
      link: placeLink
    };
    addCard(createCard(imgObg, handleDeleteCard, openImageModal, likeCard));
    placeForm.reset();
    const popup = item.target.closest('.popup');
    closePopup(popup);
    handleСloseModal(popup);
}
