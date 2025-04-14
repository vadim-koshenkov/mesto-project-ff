import '../pages/index.css';
import { openPopup, closePopup, giveSmoothness, openCard } from './modal.js';
import { initialCards } from './cards.js';
import { createCard, deleteCard, likeCard } from './card.js';

// теймплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// контейнер, куда будут складываться карточки
const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');

// элементы профиля 
const profileName = container.querySelector('.profile__title');
const profileDesc = container.querySelector('.profile__description');

// элементы попапа редактирования профиля
const profileEditButton = container.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');

// элементы формы редактирования профиля
const profileForm = document.forms.profile;
const profileFormName = profileForm.elements.name;
const profileFormDesc = profileForm.elements.description;

// элементы попапа добавления карточек
const cardAddButton = container.querySelector('.profile__add-button');
const cardAddPopup = document.querySelector('.popup_type_new-card');

// элементы формы добавления карточек
const cardAddForm = document.forms.places;
const cardAddFormName = cardAddForm.elements.name;
const cardAddFormLink = cardAddForm.elements.link;

// элементы попапа открытия карточки
const cardOpenPopup = document.querySelector('.popup_type_image');
const cardPopupImage = cardOpenPopup.querySelector('.popup__image');
const cardPopupTitle = cardOpenPopup.querySelector('.popup__caption');

// функция добавления карточки на страницу
const addCard = function(item) {
    cardsContainer.append(createCard(item, deleteCard, likeCard, openCard));
};

// выведение исходных карточек на страницу
initialCards.forEach(addCard);

// функция задания значений форме
function setFormValue(name, desc) {
    profileFormName.value = name.textContent;
    profileFormDesc.value = desc.textContent;
}

// функция редактирования профиля
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = profileFormName.value;
    profileDesc.textContent = profileFormDesc.value;
    closePopup(profileEditPopup);
}

// функция создания новой карточки
function newCardHandler(evt) {
    evt.preventDefault();
    let newCard = {
        name: cardAddFormName.value,
        link: cardAddFormLink.value
    };
    cardsContainer.prepend(createCard(newCard, deleteCard, likeCard, openCard));
    closePopup(cardAddPopup);
    cardAddFormName.value = '';
    cardAddFormLink.value = '';
}

// Слушатели кликов для открытия попапов
profileEditButton.addEventListener('click', function() {
    openPopup(profileEditPopup);
    setFormValue(profileName, profileDesc);
});

cardAddButton.addEventListener('click', function() {
    openPopup(cardAddPopup);
});

// слушатель клика для отправки формы редактирования профиля
profileForm.addEventListener('submit', handleFormSubmit);

// слушатель клика для отправки формы добавления карточки
cardAddForm.addEventListener('submit', newCardHandler);

// добавление плавности открытия/закрытия попапам
document.querySelectorAll('.popup').forEach(giveSmoothness);

export { cardTemplate, cardOpenPopup, cardPopupImage, cardPopupTitle }