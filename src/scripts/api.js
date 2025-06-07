const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-39',
  headers: {
    authorization: '50ce8b33-cc90-4440-a0e8-b51e77a907b2',
    'Content-Type': 'application/json'
  }
}

function getResponseData(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
  headers: config.headers
})
  .then(getResponseData);
}

function getProfile() {
  return fetch(`${config.baseUrl}/users/me`, {
  headers: config.headers
})
  .then(getResponseData);
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
  .then(getResponseData);
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
  .then(getResponseData);
}

function delateCards(id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
  method: 'DELETE',
  headers: config.headers
})
 .then(getResponseData);
}

function likeCard(id, isLiked) {
 
  if(isLiked) {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: config.headers
    })
    .then(getResponseData);
    } else {
      return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        headers: config.headers
      })
      .then(getResponseData);
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
 .then(getResponseData);
}

function fetchAllData() {
  return Promise.all([getCards(), getProfile()])
    .then(([cards, profile]) => ({
      cards,
      profile
    }));
}

export { editAvatar, likeCard, delateCards, addNewCards, editProfilePatch, getProfile, getCards, fetchAllData}