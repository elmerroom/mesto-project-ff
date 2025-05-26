const formElement  = document.forms['edit-profile'];
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

export function resetsEditModal() {
  formElement.elements.name.value = profileName.textContent;
  formElement.elements.description.value = profileDescription.textContent;
};
