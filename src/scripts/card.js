// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

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

export {createCard}