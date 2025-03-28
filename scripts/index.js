// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(nameValue, linkValue, deleteFunction) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    cardTitle.textContent = nameValue;
    cardImage.src = linkValue;
    cardImage.alt = `Фотография места: ${nameValue}`;
    deleteButton.addEventListener('click', function() {
        deleteFunction(cardElement)
    });
    return cardElement;
}

// @todo: Функция удаления карточки

function deleteCard(item) {
    item.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function(item) {
    cardsContainer.append(createCard(item.name, item.link, deleteCard));
});