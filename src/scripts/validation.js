//  функция отображения ошибки поля инпут
function showInputError (formElement, inputElement, errorMessage, validationSettings) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationSettings.inputErrorClass);
    errorElement.classList.add(validationSettings.errorClass);
    errorElement.textContent = errorMessage;
}

// функция скрытия ошибки поля инпут
function hideInputError (formElement, inputElement, validationSettings) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationSettings.inputErrorClass);
    errorElement.classList.remove(validationSettings.errorClass);
    errorElement.textContent = '';
}

// функция проверки на невалидный инпут внутри формы
function hasInvalidInput (inputList) {
    return inputList.some(function (inputElement) {
        return !inputElement.validity.valid;
    });
}

// функции включения и выключения кнопки
function enableButton (buttonElement, validationSettings) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationSettings.inactiveButtonClass);
}

function disableButton (buttonElement, validationSettings) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationSettings.inactiveButtonClass);
}

// функция переключения кнопки от валидности
function toggleButtonState (inputList, buttonElement, validationSettings) {
    if (hasInvalidInput(inputList)) {
        disableButton(buttonElement, validationSettings);
    }
    else {
        enableButton(buttonElement, validationSettings);
    }
}

// функция проверки валидности отдельного инпута
function isValid (formElement, inputElement, validationSettings) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    }
    else {
        inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationSettings);
    }
    else {
        hideInputError(formElement, inputElement, validationSettings);
    }
}

// функция добавления слушателей клика всем инпутам формы
function setEventListeners (formElement, validationSettings) {
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
    inputList.forEach(function (inputElement) {
        inputElement.addEventListener('input', function () {
            isValid(formElement, inputElement, validationSettings);
            toggleButtonState(inputList, buttonElement, validationSettings);
        });
    });
}

// функция включения валидации всех форм на странице
function enableValidation (validationSettings) {
    const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
    formList.forEach(function(formElement) {
        setEventListeners(formElement, validationSettings);
    });
}

// функция очистки валидации формы
function clearValidation (formElement, validationSettings) {
    const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    disableButton(buttonElement, validationSettings);
    inputList.forEach(function(inputElement) {
        hideInputError(formElement, inputElement, validationSettings);
    });
}

export { clearValidation, enableValidation }