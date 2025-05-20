// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardNumber, delateItem) {
  const card = cardTemplate.querySelector('.places__item').cloneNode(true);
  card.querySelector('.card__title').textContent = cardNumber.name;
  card.querySelector('.card__image').src = cardNumber.link;
  card.querySelector('.card__image').alt = `Пейзах местности ${cardNumber.name}`;
  card.querySelector('.card__delete-button').addEventListener('click', () => {
    delateItem(card);
  });
  
  return card
};

// @todo: Функция удаления карточки

function handleDeleteCard(item) {
  item.remove();
};

// @todo: Вывести карточки на страницу
function renderCard(card) {
  placesList.append(card)
};

initialCards.forEach((item) => {
  renderCard(createCard(item, handleDeleteCard))
})