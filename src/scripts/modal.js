import { cardOpenPopup, cardPopupImage, cardPopupTitle } from "./index.js";

// функция открытия попапа
function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    const closeButton = popup.querySelector('.popup__close');
    closeButton.addEventListener('click', function() {
        closePopup(popup);
    });
    document.addEventListener('keydown', function(evt) {
        if (evt.key === 'Escape') {
            closePopup(popup);
        }
    });
    document.addEventListener('click', function(evt) {
        if (evt.target.classList.contains('popup_is-opened') && !evt.target.classList.contains('popup__content')) {
            closePopup(popup);
        }
    });
}

// функция закрытия попапа
function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
}

// функция добавления класса плавности
function giveSmoothness(popup) {
    popup.classList.add('popup_is-animated');
}

  // функция открытия попапа с карточкой
  function openCard(evt) {
    cardPopupImage.src = evt.target.src;
    cardPopupImage.alt = evt.target.alt;
    cardPopupTitle.textContent = evt.target.alt.slice(18);
    openPopup(cardOpenPopup);
  }

export { openPopup, closePopup, giveSmoothness, openCard }