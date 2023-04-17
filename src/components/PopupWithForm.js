import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__field');
    this._submitButton = this._form.querySelector('.popup__save-btn');
  }

  _getInputValues() {
    const formValues = {};

    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });
    
    return formValues;
  }

  setLoadingText(isLoading) {
    if(isLoading) {
      this._submitButton.textContent = 'Сохранение...';
    }
  }

  _submitForm = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
    this.setLoadingText(true);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit',  this._submitForm);
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._form.removeEventListener('submit', this._submitForm);
  }

  close() {
    super.close();
    this._form.reset();
  }
}