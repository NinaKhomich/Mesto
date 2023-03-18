import { popupPhotoView, popupPhotoTitle, popupPhoto } from './utils.js';

class Card {
  constructor(cardData, templateElement, openPopupPhoto) {
    this._name = cardData.name,
    this._link = cardData.link,
    this._templateElement = templateElement,
    this._openPopupPhoto = openPopupPhoto
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
    this._elementPhoto = this._element.querySelector('.card__photo');
    this._elementLike = this._element.querySelector('.card__like');
    this._setEventListeners();
    
    this._elementPhoto.src = this._link;
    this._elementPhoto.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    
    return this._element;
  }
  
  _likeCardPhoto() {
    this._elementLike.classList.toggle('card__like_active');
  }

  _deleteCard() {
    this._element.remove();
    this._element = null; // если верно поняла слово зануллить
  }

  _openPopupPhotoView() {
    this._openPopupPhoto(popupPhotoView);
    popupPhoto.src = this._link;
    popupPhoto.alt = this._name;
    popupPhotoTitle.textContent = this._name;
  }

  _setEventListeners() {
    this._elementLike.addEventListener('click', () => {
      this._likeCardPhoto();
    });
      
    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._deleteCard();
    });

    this._elementPhoto.addEventListener('click', () => {
      this._openPopupPhotoView();
    });
  }
}

export { Card };