import { openPopup, popupPhotoView, popupPhotoTitle, popupPhoto } from './index.js';

class Card {
  constructor(cardData, templateElement) {
    this._name = cardData.name,
    this._link = cardData.link,
    this._templateElement = templateElement
  }
  
  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateElement)
    .content
    .querySelector('.card')
    .cloneNode(true);
    
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__photo').src = this._link;
    this._element.querySelector('.card__photo').alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;

    return this._element;
  }

  _likeCardPhoto() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }

  _deleteCard() {
    this._element.remove();
  }

  _openPopupPhotoView() {
    openPopup(popupPhotoView);
    popupPhoto.src = this._link;
    popupPhoto.alt = this._name;
    popupPhotoTitle.textContent = this._name;
  }

  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._likeCardPhoto();
    });
      
    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._deleteCard();
    });

    this._element.querySelector('.card__photo').addEventListener('click', () => {
      this._openPopupPhotoView();
    });
  }
}

export { Card };