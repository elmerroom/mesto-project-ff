// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
function createCard(cardNumber, openImg, delateCard, likeCard, likesArray, isAuthor, cardId, authorId, 
  // updateCallback
) {
  const card = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const like = card.querySelector('.card__like-button');
  const likeCounter = card.querySelector('.card__like-reducer');
  const delateButton = card.querySelector('.card__delete-button')
  const toggleLike = likesArray.some(item => item._id === authorId)

  if (toggleLike) {
    like.classList.add('card__like-button_is-active');
  }

  likeCounter.textContent = likesArray.length;
  cardTitle.textContent = cardNumber.name;
  cardImage.src = cardNumber.link;
  cardImage.alt = `Пейзах местности ${cardNumber.name}`;

  if (isAuthor) {
     delateButton.addEventListener('click', () => {
    delateCard(cardId)
    .then(() => card.remove())
    .catch(err => console.error('Ошибка:', err));
  });
  } else {
   delateButton.remove();
  }

  cardImage.addEventListener('click', () => {
    openImg(cardNumber.name, cardNumber.link);
  });
  
  like.addEventListener('click', () => {
    const isLiked = like.classList.contains('card__like-button_is-active')
    likeCard(cardId, isLiked)
    .then(updatedCard => {
      like.classList.toggle('card__like-button_is-active');
      likeCounter.textContent = updatedCard.likes.length;
    })
    .catch(err => console.error('Ошибка:', err));
  });
  
  return card;
};

export {createCard}