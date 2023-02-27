const showInputError = (formElement, inputElement, errorMessage, validationSettings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
  inputElement.classList.add(validationSettings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSettings.errorClass);
};

const hideInputError = (formElement, inputElement, validationSettings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
  inputElement.classList.remove(validationSettings.inputErrorClass);
  errorElement.classList.remove(validationSettings.errorClass);
  errorElement.textContent = '';
};

const resetValidation = (formElement, validationSettings) => {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));

  toggleButtonState(inputList, formElement, validationSettings);
  toggleButtonSubmitState(inputList, formElement, validationSettings);
    inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationSettings);
  });
}

const toggleInputErrorState = (formElement, inputElement, validationSettings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationSettings);
  } else {
    hideInputError(formElement, inputElement, validationSettings);
  }
};

const setEventListeners = (formElement, validationSettings) => {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      toggleInputErrorState(formElement, inputElement, validationSettings);
      toggleButtonState(inputList, formElement, validationSettings);
      toggleButtonSubmitState(inputList, formElement, validationSettings);
    });
  });
};

const enableValidation = (validationSettings) => {
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, validationSettings);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, formElement, validationSettings) => {
  const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);

  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationSettings.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(validationSettings.inactiveButtonClass);
  };
};

const toggleButtonSubmitState = (inputList, formElement, validationSettings) => {
  const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);

  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.removeAttribute('disabled');
  };
}

enableValidation(validationSettings); 

