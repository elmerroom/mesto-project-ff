import '../pages/index.css';
import { Update } from './index';

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-39',
  headers: {
    authorization: '50ce8b33-cc90-4440-a0e8-b51e77a907b2',
    'Content-Type': 'application/json'
  }
}

function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
  headers: config.headers
})
  .then(res => {
    if (res.ok) {
        return res.json();
      }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((result) => {
    return result
  })
  .catch((err) => {
    console.error('Ошибка:', err); 
    return Promise.reject(err)
  });
}

function getProfile() {
  return fetch(`${config.baseUrl}/users/me`, {
  headers: config.headers
})
  .then(res => {
    if (res.ok) {
        return res.json();
      }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((result) => {
    return result
  })
  .catch((err) => {
    console.error('Ошибка:', err); 
    return Promise.reject(err)
  });
}

function editProfilePatch(nameProfile, aboutProfile) {
  return fetch(`${config.baseUrl}/users/me`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    name: nameProfile,
    about: aboutProfile
  })
})
  .then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
      return res.json();
    })
  .catch((err) => {
  console.error('Ошибка:', err); 
  return Promise.reject(err)
  });
}

function addNewCards(placeName, placeLink) {
  return fetch(`${config.baseUrl}/cards`, {
  method: 'POST',
  headers: config.headers,
  body: JSON.stringify({
    name: placeName,
    link: placeLink,
  })
})
  .then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
      return res.json();
    })
  .catch((err) => {
  console.error('Ошибка:', err); 
  return Promise.reject(err)
  });
}

function delateCards(id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
  method: 'DELETE',
  headers: config.headers
})
  .then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
      return res.json();
    })
  .catch((err) => {
  console.error('Ошибка:', err); 
  return Promise.reject(err)
  })
  .then(Update);
}

function likeCard(like, id) {
  const card = like.closest('.card');
  const likeReducer = card.querySelector('.card__like-reducer');
  const activeLike = like.classList.contains('card__like-button_is-active');

  if(activeLike) {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: config.headers
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Ошибка при обновлении лайка');
      }
      return res.json();
    })
    .then(updatedCard => {
      like.classList.toggle('card__like-button_is-active');
      likeReducer.textContent = updatedCard.likes.length;
    })
    .catch(err => {
      console.error('Ошибка:', err);
      return Promise.reject(err)
    })
  } else {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: config.headers
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Ошибка при обновлении лайка');
      }
      return res.json();
    })
    .then(updatedCard => {
      like.classList.toggle('card__like-button_is-active');
      likeReducer.textContent = updatedCard.likes.length;
    })
    .catch(err => {
      console.error('Ошибка:', err);
      return Promise.reject(err)
    })
  }
}

function editAvatar(url) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
      avatar: url
    })
})
 .then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
      return res.json();
    })
  .catch((err) => {
  console.error('Ошибка:', err); 
  return Promise.reject(err)
  });
}

export { editAvatar, likeCard, delateCards, addNewCards, editProfilePatch, getProfile, getCards}