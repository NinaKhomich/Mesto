export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._removeEventListeners();
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
        this.close();
    }
  }

  _handleClickClose = (evt) => {
      if (evt.target.classList.contains('popup_opened') || 
        evt.target.classList.contains('popup__close-btn')) {
        this.close();
        }
      }
  
  _removeEventListeners() {
    this._popup.removeEventListener('mousedown', this._handleClickClose);
    document.removeEventListener('keydown', this._handleEscClose);
  }
  
  setEventListeners() {
    this._popup.addEventListener('mousedown', this._handleClickClose);
    document.addEventListener('keydown', this._handleEscClose);
  }
}