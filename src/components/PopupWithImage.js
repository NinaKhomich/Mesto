import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPhoto = this._popup.querySelector('.popup__photo');
    this._popupPhotoTitle = this._popup.querySelector('.popup__img-title');
  }

  open(photoName, photoLink) {
    this._popupPhoto.src = photoLink;
    this._popupPhoto.alt = photoName;
    this._popupPhotoTitle.textContent = photoName;
    super.open();
  }
}