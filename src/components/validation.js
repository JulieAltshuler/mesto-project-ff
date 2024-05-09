function disableButton(buttonElement, validationConfig) {
  buttonElement.disabled = true;
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
}

function showInputError(
  formElement,
  inputElement,
  errorMessage,
  validationConfig
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.errorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.inputErrorClass);
}

function hideInputError(formElement, inputElement, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.errorClass);
  errorElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.textContent = '';
}

function hasInvalidInput(inputList) {
  //принимает массив полей формы и возвращает true, если в нём хотя бы одно поле не валидно
  return inputList.some((inputElement) => {
    // проходим по этому массиву методом some
    return !inputElement.validity.valid; // Если поле не валидно, колбэк вернёт true обход массива прекратится и вся функция вернёт true
  });
}

function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, validationConfig);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
}

function checkInputValidity(formElement, inputElement, validationConfig) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
}

function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
}

export function enableValidation(validationConfig) {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );

  formList.forEach((formElement) => {
    formElement.addEventListener(
      'submit',
      setEventListeners(formElement, validationConfig)
    );
  });
}

export function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );

  inputList.forEach((inputElement) => {
    if (hasInvalidInput(inputList)) {
      hideInputError(formElement, inputElement, validationConfig);
    }
  });

  const submitButton = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  if (submitButton) {
    disableButton(submitButton, validationConfig);
  }
}
