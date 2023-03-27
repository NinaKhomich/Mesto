export default class Card {
  constructor(cardData, templateElement, handleCardClick) {
    this._name = cardData.name,
    this._link = cardData.link,
    this._templateElement = templateElement,
    this._handleCardClick = handleCardClick
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
    this._element = null;
  }

  _setEventListeners() {
    this._elementLike.addEventListener('click', () => {
      this._likeCardPhoto();
    });
      
    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._deleteCard();
    });

    this._elementPhoto.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}