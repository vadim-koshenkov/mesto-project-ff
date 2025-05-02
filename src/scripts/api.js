import { checkResponse } from "./utils/utils.js";
 
// базовые настройки обращения к серверу
const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-37",
  headers: {
    authorization: "446cb656-53f7-4156-b587-52a91e97c857",
    "Content-Type": "application/json",
  },
};

// универсальная функция запроса с проверкой ответа
function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

// запрос к серверу на получение данных профиля
export const getProfileInittialsAPI = () => {
  return request(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers
  })
};

// запрос к серверу на получение исходных карточек
export const getInittialCardsAPI = () => {
  return request(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers
  })
};

// запрос к серверу на изменение данных профиля
export const changeProfileSettingsAPI = (nameValue, aboutValue) => {
  return request(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: nameValue,
      about: aboutValue,
    })
  })
};

// запрос к серверу на публикацию новой карточки
export const postNewCardAPI = (nameValue, linkValue) => {
  return request(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: nameValue,
      link: linkValue,
    })
  })
};

// запрос к серверу на удаление карточки
export const removeCardAPI = (cardID) => {
  return request(`${config.baseUrl}/cards/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  })
};

// запрос к серверу на постановку лайка карточке
export const addLikeAPI = (cardID) => {
  return request(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: "PUT",
    headers: config.headers,
  })
};

// запрос к серверу на снятие лайка с карточки
export const removeLikeAPI = (cardID) => {
  return request(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  })
};

// запрос к серверу на обновление аватара пользователя
export const changeProfileAvatarAPI = (avatarLink) => {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink
    })
  })
};
