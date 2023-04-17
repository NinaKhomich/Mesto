export default class Card {
  constructor(cardData, userId, templateElement, handleCardClicks) {
    this._cardData = cardData,
    this._name = this._cardData.name,
    this._link = this._cardData.link,
    this._userId = userId,
    this._templateElement = templateElement,
    this._handleCardOpenPhoto = handleCardClicks.openPhoto,
    this._handleCardOpenDelete = handleCardClicks.deleteCardPopup,
    this._handleCardPutLike = handleCardClicks.putLike,
    this._handleCardDeleteLike = handleCardClicks.deleteLike
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
    this._elementDeleteButton = this._element.querySelector('.card__delete');
    this._elementLikesNumber = this._element.querySelector('.card__likes-number');
    this._elementName = this._element.querySelector('.card__title');
    
    this._elementPhoto.src = this._link;
    this._elementPhoto.alt = this._name;
    this._elementName.textContent = this._name;
    this._elementLikesNumber.textContent = this._cardData.likes.length;
    if (this._cardData.likes.find(likes => likes._id === this._userId)) {
      this._elementLike.classList.add('card__like_active');
    };

    this._setEventListeners();
    this._removeBasket();

    return this._element;
  }

  _likeCardPhoto() {
    if(this._elementLike.classList.contains('card__like_active')) {
      this._elementLike.classList.remove('card__like_active');
      this._handleCardDeleteLike(this._cardData._id);
    } else {
      this._elementLike.classList.add('card__like_active');
      this._handleCardPutLike(this._cardData._id);
    }
  }
  
  setlikeCardPhoto(res) {
    this._elementLikesNumber.textContent = res.likes.length;
  }

  deleteLikeCardPhoto(res) {
    this._elementLikesNumber.textContent = res.likes.length;
  }
  
  _removeBasket() {
    if (this._userId !== this._cardData.owner._id) {
      this._elementDeleteButton.remove();
    }
  }

  deleteCard() {
    this._element.remove();
    this._elementPhoto = null;
    this._elementLike = null;
    this._element = null;
  }

  _setEventListeners() {
    this._elementLike.addEventListener('click', () => {
      this._likeCardPhoto();
    });
    
    this._elementDeleteButton.addEventListener('click', () => {
      this._handleCardOpenDelete(this, this._cardData._id);
    });

    this._elementPhoto.addEventListener('click', () => {
      this._handleCardOpenPhoto(this._name, this._link);
    });
  }
}