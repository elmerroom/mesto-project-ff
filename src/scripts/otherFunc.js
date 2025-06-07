const formElement  = document.forms['edit-profile'];
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function resetEditModal() {
  formElement.elements.name.value = profileName.textContent;
  formElement.elements.description.value = profileDescription.textContent;
};

function saveSubmit(isSave, popupButtonText) {
  if (isSave) {
    popupButtonText.textContent = 'Сохранение...'
  } else {
    popupButtonText.textContent = 'Сохранить'
  }
}

export { resetEditModal, saveSubmit}