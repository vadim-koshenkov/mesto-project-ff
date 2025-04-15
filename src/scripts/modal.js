// функция открытия попапа
function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    // document.addEventListener('keydown', function(evt) {
    //     if (evt.key === 'Escape') {
    //         closePopup(popup);
    //     }
    // });
    document.addEventListener('keydown', closePopupByEsc);
}

// функция закрытия попапа
function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupByEsc);
}

// функция добавления слушателя на кнопку закрытия попапа
function addCloseButtonListener(closeButton) {
    closeButton.addEventListener('click', function() {
        closePopup(closeButton.closest('.popup'));
    });
}

// функция добавления слушателя на кнопку Esc
function closePopupByEsc(evt) {
    if (evt.key === 'Escape') {
        closePopup(popup);
    }
} 

// функция добавления класса плавности
function giveSmoothness(popup) {
    popup.classList.add('popup_is-animated');
}

export { openPopup, closePopup, addCloseButtonListener, giveSmoothness }