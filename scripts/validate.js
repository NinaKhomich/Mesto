const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
  inputElement.classList.add('popup__field_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__field-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
  inputElement.classList.remove('popup__field_type_error');
  errorElement.classList.remove('popup__field-error_active');
  errorElement.textContent = '';
};

const hideStartErrorMessage = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__field'));
  
  toggleButtonState(inputList, formElement);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
}

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__field'));
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, formElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, formElement) => {
  const buttonElement = formElement.querySelector('.popup__save-btn');

  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__save-btn_inactive');
    buttonElement.setAttribute('disabled', 'true');
  } else {
    buttonElement.classList.remove('popup__save-btn_inactive');
    buttonElement.removeAttribute('disabled');
  };
};

enableValidation(); 

