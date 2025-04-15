import '../pages/index.css';
import { openPopup, closePopup, addCloseButtonListener, giveSmoothness } from './modal.js';
import { initialCards } from './cards.js';
import { createCard, deleteCard, likeCard } from './card.js';

// теймплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// получения массивов попапов и закрытия кнопок попапов
const popupsArray = document.querySelectorAll('.popup');
const closeButtonsArray = document.querySelectorAll('.popup__close');

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

// добавление слушателей клика на все кнопки закрытия попапов
closeButtonsArray.forEach(addCloseButtonListener);

// добавление слушателя клика на закрытие попапа по клику на оверлей
document.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('popup_is-opened') && !evt.target.classList.contains('popup__content')) {
        closePopup(evt.target.closest('.popup'));
    }
});

// функция задания значений форме
function setProfileFormValue(name, desc) {
    profileFormName.value = name.textContent;
    profileFormDesc.value = desc.textContent;
}

// функция редактирования профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = profileFormName.value;
    profileDesc.textContent = profileFormDesc.value;
    closePopup(profileEditPopup);
}

  // функция открытия попапа с карточкой
  function openCard(evt) {
    cardPopupImage.src = evt.target.src;
    cardPopupImage.alt = evt.target.alt;
    cardPopupTitle.textContent = evt.target.alt.slice(18);
    openPopup(cardOpenPopup);
  }

// функция создания новой карточки
function createNewCard(evt) {
    evt.preventDefault();
    const newCard = {
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
    setProfileFormValue(profileName, profileDesc);
});

cardAddButton.addEventListener('click', function() {
    openPopup(cardAddPopup);
});

// слушатель клика для отправки формы редактирования профиля
profileForm.addEventListener('submit', handleProfileFormSubmit);

// слушатель клика для отправки формы добавления карточки
cardAddForm.addEventListener('submit', createNewCard);

// добавление плавности открытия/закрытия попапам
popupsArray.forEach(giveSmoothness);

export { cardTemplate }