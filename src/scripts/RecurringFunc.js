const formElement  = document.forms['edit-profile'];
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
}

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
}

function resetsEditModal() {
  formElement.elements.name.value = profileName.textContent;
  formElement.elements.description.value = profileDescription.textContent;
};

export {closePopup, openPopup, resetsEditModal}