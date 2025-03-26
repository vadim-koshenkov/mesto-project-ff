// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(nameValue, linkValue) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    cardElement.querySelector('.card__title').textContent = nameValue;
    cardElement.querySelector('.card__image').src = linkValue;
    cardsContainer.append(cardElement);
    deleteButton.addEventListener('click', deleteCard);
}

// @todo: Функция удаления карточки

function deleteCard(evt) {
    evt.target.closest('.card').remove();
}

// @todo: Вывести карточки на страницу

for (let i = 0; i < initialCards.length; i++) {
    createCard(initialCards[i].name, initialCards[i].link);
}