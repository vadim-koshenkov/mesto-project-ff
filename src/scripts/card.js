import { cardTemplate, openDeletePopup } from "./index.js";
import { removeCardAPI, addLikeAPI, removeLikeAPI } from "./api.js";

// функция создания карточки
function createCard(
  cardValue,
  likeFunction,
  openFunction,
  profileInfo
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likeCounter = cardElement.querySelector(".card__like-counter");
  cardTitle.textContent = cardValue.name;
  cardImage.src = cardValue.link;
  cardImage.alt = `Фотография места: ${cardValue.name}`;
  if (
    cardValue.likes.some(function (like) {
      return like._id == profileInfo._id;
    })
  ) {
    likeButton.classList.add("card__like-button_is-active");
  }
  setLikesNumber(cardValue, likeCounter);
  if (profileInfo) {
    if (cardValue.owner._id !== profileInfo._id) {
      deleteButton.remove();
    }
  }
  deleteButton.addEventListener("click", function() {
    openDeletePopup(cardValue);
  });
  likeButton.addEventListener("click", function (evt) {
    likeFunction(evt, cardValue, likeCounter);
  });
  cardImage.addEventListener("click", openFunction);
  cardElement.setAttribute("data-card-id", `${cardValue._id}`);

  return cardElement;
}

// функция удаления карточки
function deleteCard(cardElement, cardID) {
  return removeCardAPI(cardID)
  .then(() => {
    cardElement.remove();
  })
}

// функция установки количества лайков карточке
function setLikesNumber(cardValue, likeCounterElement) {
  likeCounterElement.textContent = cardValue.likes.length;
}

// функция лайка, колбэк функции создания
function likeCard(evt, cardValue, likeCounterElement) {
  if (!evt.target.classList.contains("card__like-button_is-active")) {
    addLikeAPI(cardValue._id).then((cardValue) => {
      evt.target.classList.add("card__like-button_is-active");
      setLikesNumber(cardValue, likeCounterElement);
    })
    .catch((err) => {
      console.log(err);
    });
  } 
  else {
    removeLikeAPI(cardValue._id).then((cardValue) => {
      evt.target.classList.remove("card__like-button_is-active");
      setLikesNumber(cardValue, likeCounterElement);
    })
    .catch((err) => {
      console.log(err);
    });
  }
}

export { createCard, deleteCard, likeCard };
