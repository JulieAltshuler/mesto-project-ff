

function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_invalid');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active')
    
}

function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_invalid');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
}

function hasInvalidInput(inputList) { //принимает массив полей формы и возвращает true, если в нём хотя бы одно поле не валидно
    return inputList.some((inputElement) => { // проходим по этому массиву методом some
        return !inputElement.validity.valid // Если поле не валидно, колбэк вернёт true обход массива прекратится и вся функция вернёт true
    })
}

function toggleButtonState (inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add('popup__button_disabled');     
    }
    else {
        buttonElement.disabled = false;
        buttonElement.classList.remove('popup__button_disabled');
    }
}

function checkInputValidity(formElement, inputElement) {

    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("")
    }

    if(!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
}
function setEventListeners(formElement) { // добавляем слушатели всем инпутам формы
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement); // Вызовем toggleButtonState и передадим ей массив полей и кнопку
        });
    });
}

export function enableValidation() {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function(evt) {
            evt.preventDefault();
        })
        setEventListeners(formElement);
    })
}

export function clearValidation(formElement, validationConfig) {
    const errorElement = formElement.querySelectorAll(validationConfig.inputErrorClass);
    errorElement.forEach((element) => {
        element.classList.remove(validationConfig.inputErrorClass);
    });

    const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);
    if (submitButton) {
        submitButton.classList.add(validationConfig.inactiveButtonClass);
        submitButton.disabled = true;
    }
};
