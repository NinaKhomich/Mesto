import { Card } from './Card.js';
import { initialCards, validationSettings } from './constants.js';
import { FormValidator } from './FormValidator.js';

const profileElement = document.querySelector('.profile');
const buttonPopupEditProfileOpen = profileElement.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = document.forms.editForm;
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.job;
const profileTitle = profileElement.querySelector('.profile__title');
const profileSubtitle = profileElement.querySelector('.profile__subtitle');
const buttonPopupAddCardOpen = profileElement.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add-card');
const formAddCard = document.forms.addCard;
const cardTitleInput = formAddCard.elements.title;
const cardPhotoInput = formAddCard.elements.link;
const cards = document.querySelector('.cards');
const popupPhotoView = document.querySelector('.popup_type_photo');
const popupPhoto = popupPhotoView.querySelector('.popup__photo');
const popupPhotoTitle = popupPhotoView.querySelector('.popup__img-title');

const formEditProfileValidation = new FormValidator(validationSettings, formEditProfile);
const formAddCardValidation = new FormValidator(validationSettings, formAddCard);

function renderCard(cardData, templateElement) {
  const card = new Card(cardData, templateElement);
  const cardElement = card.generateCard();

  cards.prepend(cardElement);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', handleClickClosePopup);
  document.addEventListener('keydown', handleEscClosePopup);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', handleClickClosePopup);
  document.removeEventListener('keydown', handleEscClosePopup);
}

function handleEscClosePopup(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

function handleClickClosePopup(evt) {
  if (evt.target.classList.contains('popup_opened') || 
      evt.target.classList.contains('popup__close-btn')) {
    closePopup(evt.currentTarget);
  }
}

function handleFormAddCardSubmit (evt) {
  evt.preventDefault();
  const newCardPhoto = {
    name: cardTitleInput.value,
    link: cardPhotoInput.value
  };
  renderCard(newCardPhoto, '#card-template');
  closePopup(popupAddCard);
}


function openPopupEditProfile() {
  openPopup(popupEditProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  formEditProfileValidation.resetValidation();
}

function handleFormEditProfileSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function openAddCardPopup() {
  formAddCard.reset();
  openPopup(popupAddCard);
  formAddCardValidation.resetValidation();
}

initialCards.forEach((card) => {
  renderCard(card, '#card-template')
});


buttonPopupEditProfileOpen.addEventListener('click', openPopupEditProfile);
formEditProfile.addEventListener('submit', handleFormEditProfileSubmit);
buttonPopupAddCardOpen.addEventListener('click', openAddCardPopup);
formAddCard.addEventListener('submit', handleFormAddCardSubmit);

formEditProfileValidation.enableValidation();
formAddCardValidation.enableValidation();

export { openPopup, cards, popupPhotoView, popupPhotoTitle, popupPhoto };