const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-12',
  headers: {
    authorization: 'a8a159a3-88c8-4bc7-b74d-6e20b396c387',
    'Content-Type': 'application/json'
  }
}


function handleResponse(res) {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(res.status)
    }
}

export function getUserInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers,
      })
        .then(handleResponse)
}

export function getCards() {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers
      })
        .then(handleResponse)
}

export function changeUserInfo(data) {
  return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
    })
})
  .then(handleResponse)
}

export function postNewCard(data) {
  return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
    })
})
  .then(handleResponse)
}

export function deleteCardId(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,  
  })
  .then(handleResponse)
}

export function postCardLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers,  
  })
  .then(handleResponse)
}

export function deleteCardLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,  
  })
  .then(handleResponse)
}

export function changeUserAvatar(data) {
  return fetch(`${config.baseUrl}/users/me/avatar `, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: data.avatar,
      })
  })
  .then(handleResponse)
}