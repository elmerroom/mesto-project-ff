import '../pages/index.css';
import {createCard} from './card.js';
import { openPopup, closePopup} from './modal.js';
import { enableValidation, clearValidation} from './validation.js';
import { editProfilePatch, addNewCards, delateCards, likeCard, editAvatar, fetchAllData} from './api.js';


const placesList = document.querySelector('.places__list');

const popupEdit = document.querySelector('.popup_type_edit');

const popupNewCard = document.querySelector('.popup_type_new-card');

const popupAvatar = document.querySelector('.popup_type_avatar')

const addButton = document.querySelector('.profile__add-button');

const editButton = document.querySelector('.profile__edit-button');

const profileEditForm  = document.forms['edit-profile'];

const placeForm = document.forms['new-place'];

const avatarForm = document.forms['edit-avatar'];

const urlAvatarForm = avatarForm.elements['link-avatar']

const nameInput = profileEditForm.elements.name;

const jobInput = profileEditForm.elements.description;

const placeInput = placeForm.elements['place-name'];

const urlPlaceInput = placeForm.elements.link;

const profileName = document.querySelector('.profile__title');

const profileDescription = document.querySelector('.profile__description');

const popupTypeImage = document.querySelector('.popup_type_image');

const popupImg = popupTypeImage.querySelector('.popup__image');

const popupCaption = popupTypeImage.querySelector('.popup__caption');

const profileImage = document.querySelector('.profile__image');

const validationConfig = {
  formSelector: '.popup__form',         
  inputSelector: '.popup__input',       
  submitButtonSelector: '.popup__button', 
  inactiveButtonClass: 'button_inactive', 
  inputErrorClass: 'popup__input_type_error',    
  errorClass: 'popup__input-error_active'
}

enableValidation(validationConfig); 

function renderCard(card) {
  placesList.append(card);
};

profileEditForm.addEventListener('submit', handleProfileFormSubmit);

placeForm.addEventListener('submit', handlePlaceFormSubmit);

avatarForm.addEventListener('submit', handleAvatarFormSubmit)

addButton.addEventListener('click', () => {
  placeForm.reset()
  clearValidation(placeForm, validationConfig);
  openPopup(popupNewCard);
});

profileImage.addEventListener('click', () => {
  avatarForm.reset()
  clearValidation(avatarForm, validationConfig);
  openPopup(popupAvatar);
})

editButton.addEventListener('click', () => {
  resetProfileValue(nameInput, jobInput);
  clearValidation(profileEditForm, validationConfig);
  openPopup(popupEdit);
});

function resetProfileValue(firstProfileFormElement, secondProfileFormElement) {
  firstProfileFormElement.value = profileName.textContent;
  secondProfileFormElement.value = profileDescription.textContent
}

function saveSubmit(isSave, popupButtonText) {
  if (isSave) {
    popupButtonText.textContent = 'Сохранение...'
  } else {
    popupButtonText.textContent = 'Сохранить'
  }
}

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
    .then((res) => {
      profileName.textContent = res.name;
      profileDescription.textContent = res.about;
      closePopup(popup); 
    })
    .catch((err) => {
        console.error(`Ошибка: ${err}`)
      }) 
    .finally(() => {
      saveSubmit(false, popupButtonText)
    }); 
}

function handlePlaceFormSubmit(item) {
    item.preventDefault(); 
    const popup = item.target.closest('.popup');
    const popupButtonText = popup.querySelector('.popup__button');
    saveSubmit(true, popupButtonText)
    addNewCards(placeInput.value, urlPlaceInput.value)
      .then((card) => {
        const newCard = createCard(
          card,
          openImageModal,
          delateCards,
          likeCard,
          card.likes,
          true,  
          card._id,
          card.owner._id  
        )
        placesList.prepend(newCard);
        placeForm.reset();
        closePopup(popup);
      })
      .catch(err => console.error(`Ошибка: ${err}`))
      .finally(() => saveSubmit(false, popupButtonText));
  }

function handleAvatarFormSubmit(item) {
  item.preventDefault(); 
  const popup = item.target.closest('.popup');
  const popupButtonText = popup.querySelector('.popup__button');
  saveSubmit(true, popupButtonText)
  editAvatar(urlAvatarForm.value)
  .then((res) => {
    profileImage.style.backgroundImage = `url(${res.avatar})`;
    avatarForm.reset();
    closePopup(popup);
  })
  .catch((err) => {
    console.error(`Ошибка: ${err}`)
  }) 
  .finally(() => {
    saveSubmit(false, popupButtonText)
  });
}

function updateAllData() {
  fetchAllData()
    .then(({cards, profile}) => {
      placesList.textContent = '';
      
      cards.forEach((card) => {
        const avtorLike = card.owner._id === profile._id;
        renderCard(createCard(
          card,
          openImageModal,
          delateCards,
          likeCard,
          card.likes,
          avtorLike,
          card._id,
          profile._id));
      });
      
      profileName.textContent = profile.name;
      profileDescription.textContent = profile.about;
      profileImage.style.backgroundImage = `url(${profile.avatar})`;
    })
    .catch(err => console.error(`Ошибка: ${err}`));
}

updateAllData();

 