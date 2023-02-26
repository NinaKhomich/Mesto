const validationClasses = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_inactive',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field-error_active'
};

const showInputError = (formElement, inputElement, errorMessage, classesObject) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
  inputElement.classList.add(classesObject.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(classesObject.errorClass);
};

const hideInputError = (formElement, inputElement, classesObject) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
  inputElement.classList.remove(classesObject.inputErrorClass);
  errorElement.classList.remove(classesObject.errorClass);
  errorElement.textContent = '';
};

const hideStartErrorMessage = (formElement, classesObject) => {
  const inputList = Array.from(formElement.querySelectorAll(classesObject.inputSelector));

  toggleButtonState(inputList, formElement, classesObject);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, classesObject);
  });
}

const isValid = (formElement, inputElement, classesObject) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, classesObject);
  } else {
    hideInputError(formElement, inputElement, classesObject);
  }
};

const setEventListeners = (formElement, classesObject) => {
  const inputList = Array.from(formElement.querySelectorAll(classesObject.inputSelector));

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, classesObject);
      toggleButtonState(inputList, formElement, classesObject);
    });
  });
};

const enableValidation = (classesObject) => {
  const formList = Array.from(document.querySelectorAll(classesObject.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, classesObject);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, formElement, classesObject) => {
  const buttonElement = formElement.querySelector(classesObject.submitButtonSelector);

  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(classesObject.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'true');
  } else {
    buttonElement.classList.remove(classesObject.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  };
};

enableValidation(validationClasses); 

