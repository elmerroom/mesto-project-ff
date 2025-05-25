// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardNumber, delateItem, openImg, likeButtons) {
  const card = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const like = card.querySelector('.card__like-button')
  cardTitle.textContent = cardNumber.name;
  cardImage.src = cardNumber.link;
  cardImage.alt = `Пейзах местности ${cardNumber.name}`;
  card.querySelector('.card__delete-button').addEventListener('click', () => {
    delateItem(card);
  });

  cardImage.addEventListener('click', () => {
    openImg(cardNumber.name, cardNumber.link);
  });
  
  like.addEventListener('click', () => {
    likeButtons(like)
  })
  
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

// @todo: Добавление карточки на страницу
function addCard(card) {
  placesList.prepend(card)
}

export {renderCard, createCard, handleDeleteCard, addCard}