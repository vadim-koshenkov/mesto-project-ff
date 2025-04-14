import { cardTemplate } from "./index.js";

// функция создания карточки
function createCard(cardValue, deleteFunction, likeFunction, openFunction) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    cardTitle.textContent = cardValue.name;
    cardImage.src = cardValue.link;
    cardImage.alt = `Фотография места: ${cardValue.name}`;
    deleteButton.addEventListener('click', function() {
        deleteFunction(cardElement);
    });
    likeButton.addEventListener('click', likeFunction);
    cardImage.addEventListener('click', openFunction);
  
    return cardElement;
  };

  // функция удаления карточки, колбэк функции создания
function deleteCard(item) {
    item.remove();
  };
  
  // функция лайка, колбэк функции создания
function likeCard(evt) {
      evt.target.classList.toggle('card__like-button_is-active');
  }
  
export { createCard, deleteCard, likeCard }