import "../pages/index.css";
import {
  openPopup,
  closePopup,
  addCloseButtonListener,
  giveSmoothness,
} from "./modal.js";
import { createCard, deleteCard, likeCard } from "./card.js";
import { clearValidation, enableValidation } from "./validation.js";
import {
  getProfileInittialsAPI,
  getInittialCardsAPI,
  changeProfileSettingsAPI,
  postNewCardAPI,
  changeProfileAvatarAPI,
} from "./api.js";

// теймплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// получения массивов попапов и закрытия кнопок попапов
const popupsArray = document.querySelectorAll(".popup");
const closeButtonsArray = document.querySelectorAll(".popup__close");

// контейнер, куда будут складываться карточки
const container = document.querySelector(".content");
const cardsContainer = container.querySelector(".places__list");

// элементы профиля
const profileName = container.querySelector(".profile__title");
const profileDesc = container.querySelector(".profile__description");
const profileImage = container.querySelector(".profile__image");

// элементы попапа редактирования профиля
const profileEditButton = container.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector(".popup_type_edit");

// элементы попапа редактирования фотографии профиля
const profilePhotoEditPopup = document.querySelector(".popup_type_edit-avatar");

// элементы формы редактирования фотографии профиля
const profilePhotoForm = document.forms.avatar;
const profilePhotoFormLink = profilePhotoForm.elements.link;

// элементы формы редактирования профиля
const profileForm = document.forms.profile;
const profileFormName = profileForm.elements.name;
const profileFormDesc = profileForm.elements.description;

// элементы попапа добавления карточек
const cardAddButton = container.querySelector(".profile__add-button");
const cardAddPopup = document.querySelector(".popup_type_new-card");

// элементы формы добавления карточек
const cardAddForm = document.forms.places;
const cardAddFormName = cardAddForm.elements.name;
const cardAddFormLink = cardAddForm.elements.link;

// элементы попапа открытия карточки
const cardOpenPopup = document.querySelector(".popup_type_image");
const cardPopupImage = cardOpenPopup.querySelector(".popup__image");
const cardPopupTitle = cardOpenPopup.querySelector(".popup__caption");

// объект элементов валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button-disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input_error-active",
};

// устанавливаем значения профиля и выводим все серверные карточки на страницу
Promise.all([getProfileInittialsAPI(), getInittialCardsAPI()])
  .then(([res1, res2]) => {
    const data = {
      profileInfo: res1,
      inittialCards: res2,
    };
    return data;
  })
  .then((data) => {
    // обновляем данные профиля
    setProfileSettings(data);
    // выводим карточки на страницу
    data.inittialCards.forEach(function (cardValue) {
      cardsContainer.append(
        createCard(cardValue, deleteCard, likeCard, openCard, data.profileInfo)
      );
    });
  });

// функция задания исходных значений профиля
function setProfileSettings(data) {
  profileName.textContent = data.profileInfo.name;
  profileDesc.textContent = data.profileInfo.about;
  profileImage.setAttribute(
    "style",
    `background-image: url(${data.profileInfo.avatar})`
  );
}

// добавление слушателей клика на все кнопки закрытия попапов
closeButtonsArray.forEach(addCloseButtonListener);

// добавление слушателя клика на закрытие попапа по клику на оверлей
document.addEventListener("click", function (evt) {
  if (
    evt.target.classList.contains("popup_is-opened") &&
    !evt.target.classList.contains("popup__content")
  ) {
    closePopup(evt.target.closest(".popup"));
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
  changeProfileSettingsAPI(profileFormName.value, profileFormDesc.value).then(
    (profileInfo) => {
      profileName.textContent = profileInfo.name;
      profileDesc.textContent = profileInfo.about;
    }
  );
  closePopup(profileEditPopup);
}

// функция редактирования фотографии профиля
function handleProfilePhotoFormSubmit(evt) {
  evt.preventDefault();
  changeProfileAvatarAPI(profilePhotoFormLink.value).then((profileInfo) => {
    profileImage.setAttribute(
      "style",
      `backgroung-image: url("${profileInfo.avatar}")`
    );
  });
  closePopup(profilePhotoEditPopup);
  resetFormValue(profilePhotoFormLink);
}

// функция открытия попапа с карточкой
function openCard(evt) {
  cardPopupImage.src = evt.target.src;
  cardPopupImage.alt = evt.target.alt;
  cardPopupTitle.textContent = evt.target.alt.slice(18);
  openPopup(cardOpenPopup);
}

// функция сброса значения формы
function resetFormValue(formElement) {
  formElement.value = "";
}

// функция создания новой карточки
function createNewCard(evt) {
  evt.preventDefault();
  const newCardValue = {
    name: cardAddFormName.value,
    link: cardAddFormLink.value,
  };
  postNewCardAPI(newCardValue.name, newCardValue.link).then((newCardValue) => {
    cardsContainer.prepend(
      createCard(newCardValue, deleteCard, likeCard, openCard)
    );
    closePopup(cardAddPopup);
    resetAddFormValues();
    resetFormValue(cardAddFormName);
    resetFormValue(cardAddFormLink);
    clearValidation(cardAddForm, validationConfig);
  });
}

// слушатель клика для открытия попапа редактирования профиля
profileEditButton.addEventListener("click", function () {
  openPopup(profileEditPopup);
  setProfileFormValue(profileName, profileDesc);
  clearValidation(profileForm, validationConfig);
});

// слушатель клика для открытия попапа редактирования фотографии профиля
profileImage.addEventListener("click", function () {
  openPopup(profilePhotoEditPopup);
  clearValidation(profilePhotoForm, validationConfig);
});

// слушатель клика для открытия попапа добавления карточки
cardAddButton.addEventListener("click", function () {
  openPopup(cardAddPopup);
  clearValidation(cardAddForm, validationConfig);
});

// слушатель клика для отправки формы редактирования профиля
profileForm.addEventListener("submit", handleProfileFormSubmit);

// слушатель клика для отправки формы добавления карточки
cardAddForm.addEventListener("submit", createNewCard);

// слушатель клика для отправки формы редактирования фотографии профиля
profilePhotoForm.addEventListener("submit", handleProfilePhotoFormSubmit);

// добавление плавности открытия/закрытия попапам
popupsArray.forEach(giveSmoothness);

//  валидация всех форм страницы
enableValidation(validationConfig);

export { cardTemplate };
