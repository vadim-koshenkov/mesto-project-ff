// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(nameValue, linkValue, deleteFunction) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    cardElement.querySelector('.card__title').textContent = nameValue;
    cardElement.querySelector('.card__image').src = linkValue;
    cardElement.querySelector('.card__image').alt = `Фотография места: ${nameValue}`;
    card = cardElement;
    deleteButton.addEventListener('click', function() {
        deleteFunction(cardElement)
    });
    return card;
}

// @todo: Функция удаления карточки

function deleteCard(item) {
    item.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function(item) {
    createCard(item.name, item.link, deleteCard);
    cardsContainer.append(card);
});