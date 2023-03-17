class FormValidator {
  constructor(validationSettings, formElement) {
    this._formSelector = validationSettings.formSelector,
    this._inactiveButtonClass = validationSettings.inactiveButtonClass,
    this._inputErrorClass = validationSettings.inputErrorClass,
    this._errorClass = validationSettings.errorClass,
    this._formElement = formElement,
    this._inputList = Array.from(this._formElement.querySelectorAll(validationSettings.inputSelector));
    this._buttonElement = this._formElement.querySelector(validationSettings.submitButtonSelector);
  }
  
  _showInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.classList.add(this._errorClass);
    this._errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = '';
  }

  resetValidation() {
    this._toggleButtonSubmitState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _toggleInputErrorState() {
    this._inputList.forEach((inputElement) => {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement);
      } else {
        this._hideInputError(inputElement);
      }
    });
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleInputErrorState();
        this._toggleButtonSubmitState();
      })
    }
  )}

  enableValidation() {
    this._setEventListeners();
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _disabledButtonSubmit() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  }

  _enableButtonSubmit() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  }

  _toggleButtonSubmitState() {
    if (this._hasInvalidInput()) {
      this._disabledButtonSubmit();
    } else {
      this._enableButtonSubmit();
    };
  }
}

export { FormValidator };