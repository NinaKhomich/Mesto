import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector);
    this._handleConfirm = handleConfirm;
    this._buttonConfirm = this._popup.querySelector('.popup__save-btn');
  }

  open(cardObject, cardObjectId) {
    super.open();
    this._card = cardObject;
    this._cardId = cardObjectId;
  }
  
  _confirmCardDelete = (evt) => {
    evt.preventDefault();
    this._handleConfirm(this._card, this._cardId);
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonConfirm.addEventListener('click', this._confirmCardDelete);
  }
}