// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
function createCard(cardNumber, openImg, delateItem, likeButtons, likeReducer, authorLike, cardId, authorId) {
  const card = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const like = card.querySelector('.card__like-button');
  const reducer = card.querySelector('.card__like-reducer');
  const delateButton = card.querySelector('.card__delete-button')
  const toggleLike = likeReducer.some(item => item._id === authorId)

  if (toggleLike) {
    like.classList.add('card__like-button_is-active');
  }

  reducer.textContent = likeReducer.length;
  cardTitle.textContent = cardNumber.name;
  cardImage.src = cardNumber.link;
  cardImage.alt = `Пейзах местности ${cardNumber.name}`;

  if (authorLike) {
     card.querySelector('.card__delete-button').addEventListener('click', () => {
    delateItem(cardId);
  });
  } else {
   delateButton.remove();
  }

  cardImage.addEventListener('click', () => {
    openImg(cardNumber.name, cardNumber.link);
  });
  
  like.addEventListener('click', () => {
    likeButtons(like, cardId)
  })
  
  return card
};

export {createCard}