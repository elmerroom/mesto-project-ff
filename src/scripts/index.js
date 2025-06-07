import '../pages/index.css';
import {createCard} from './card.js';
import { openPopup, closePopup} from './modal.js';
import { resetEditModal, saveSubmit } from './otherFunc.js';
import { enableValidation, validationConfig, clearValidation} from './validation.js';
import { getCards, getProfile, editProfilePatch, addNewCards, delateCards, likeCard, editAvatar} from './api.js';


const placesList = document.querySelector('.places__list');

const popupEdit = document.querySelector('.popup_type_edit');

const popupNewCard = document.querySelector('.popup_type_new-card');

const popupAvatar = document.querySelector('.popup_type_avatar')

const addButton = document.querySelector('.profile__add-button');

const editButton = document.querySelector('.profile__edit-button');

const formElement  = document.forms['edit-profile'];

const placeForm = document.forms['new-place'];

const avatarForm = document.forms['edit-avatar'];

const urlAvatarForm = avatarForm.elements['link-avatar']

const nameInput = formElement.elements.name;

const jobInput = formElement.elements.description;

const placeInput = placeForm.elements['place-name'];

const urlPlaceInput = placeForm.elements.link;

const profileName = document.querySelector('.profile__title');

const profileDescription = document.querySelector('.profile__description');

const popupTypeImage = document.querySelector('.popup_type_image');

const popupImg = popupTypeImage.querySelector('.popup__image');

const popupCaption = popupTypeImage.querySelector('.popup__caption');

const profileImage = document.querySelector('.profile__image')

enableValidation(validationConfig); 

function renderCard(card) {
  placesList.append(card);
};

formElement.addEventListener('submit', handleProfileFormSubmit);

placeForm.addEventListener('submit', handlePlaceFormSubmit);

avatarForm.addEventListener('submit', handleAvatarFormSubmit)

addButton.addEventListener('click', () => {
  openPopup(popupNewCard);
  const form = popupNewCard.querySelector('.popup__form');
});

profileImage.addEventListener('click', () => {
  openPopup(popupAvatar);
})

editButton.addEventListener('click', () => {
  resetEditModal();
  const form = popupEdit.querySelector('.popup__form');
  clearValidation(form, validationConfig);
  openPopup(popupEdit);
});

function openImageModal(name, link) {
  popupImg.src = link;
  popupImg.alt = name;
  popupCaption.textContent = name;
  openPopup(popupTypeImage);
};

function handleProfileFormSubmit(item) {
    item.preventDefault(); 
    const popup = item.target.closest('.popup');
    const popupButtonText = popup.querySelector('.popup__button');
    saveSubmit(true, popupButtonText)
    editProfilePatch(nameInput.value, jobInput.value)
    .then(Update)
    .finally(() => {
      saveSubmit(false, popupButtonText)
      closePopup(popup); 
    }); 
}

function handlePlaceFormSubmit(item) {
    item.preventDefault(); 
    const popup = item.target.closest('.popup');
    const popupButtonText = popup.querySelector('.popup__button');
    const form = item.target.closest('.popup__form')
    saveSubmit(true, popupButtonText)
    addNewCards(placeInput.value, urlPlaceInput.value)
      .then(Update)
      .finally(() => {
        saveSubmit(false, popupButtonText);
        closePopup(popup);
      })
      .then(() => {
        clearValidation(form, validationConfig)
        placeForm.reset();
      });
  }

function handleAvatarFormSubmit(item) {
  item.preventDefault(); 
  const popup = item.target.closest('.popup');
  const popupButtonText = popup.querySelector('.popup__button');
  const form = item.target.closest('.popup__form')
  
  saveSubmit(true, popupButtonText)
  editAvatar(urlAvatarForm.value)
  .then(Update)
    .finally(() => {
      saveSubmit(false, popupButtonText)
      closePopup(popup);
    })
    .then(() => {
      avatarForm.reset();
      clearValidation(form, validationConfig);
    });
}

export function Update() {
  Promise.all([getCards(), getProfile()])
  .then(([cards, profile]) => {

    placesList.innerHTML = ''

    cards.forEach((card) => {
      const avtorLike = card.owner._id === profile._id
      renderCard(createCard(card, openImageModal, delateCards, likeCard, card.likes, avtorLike, card._id, profile._id))
    })
        
     profileName.textContent = profile.name
     profileDescription.textContent = profile.about
     profileImage.setAttribute('style', `background-image: url(${profile.avatar})`)

  })
   .catch((err) => {
    console.log(`Ошибка: ${err}`)
  }) 
}

Update()
 