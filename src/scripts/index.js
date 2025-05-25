import '../pages/index.css';
import {renderCard, createCard, handleDeleteCard, addCard} from '../scripts/cardsCreate.js';
import { initialCards } from "./cards";
import { openModal, openImageModal, likeCard, handleFormSubmit, handlePlaceSubmit} from './modal.js';



const popups = document.querySelectorAll('.popup')

const popupEdit = document.querySelector('.popup_type_edit');

const popupNewCard = document.querySelector('.popup_type_new-card');

const addButton = document.querySelector('.profile__add-button');

const editButton = document.querySelector('.profile__edit-button');

const formElement  = document.forms['edit-profile']

const placeForm = document.forms['new-place']



formElement.addEventListener('submit', handleFormSubmit)

placeForm.addEventListener('submit', handlePlaceSubmit)

addButton.addEventListener('click', () => {
  openModal(popupNewCard)
});

editButton.addEventListener('click', () => {
  openModal(popupEdit)
})

initialCards.forEach((item) => {
  renderCard(createCard(item, handleDeleteCard, openImageModal, likeCard))
})
