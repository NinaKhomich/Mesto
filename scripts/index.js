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

function openPopup(popup) {
  popup.classList.add('popup_opened');
  handleClickClosePopup(popup);
  document.addEventListener('keydown', handleEscClosePopup);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClosePopup);
}

function handleEscClosePopup(evt) {
    if (evt.key === 'Escape') {
      const popupOpened = document.querySelector('.popup_opened');
      closePopup(popupOpened);
    }
}

function handleClickClosePopup(popup) {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened') || 
        evt.target.classList.contains('popup__close-btn')) {
      closePopup(popup);
    }
  });
}

function addCard(cardData) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardPhoto = cardElement.querySelector('.card__photo');
  const cardLike = cardElement.querySelector('.card__like');
  const cardDelete = cardElement.querySelector('.card__delete');
  const cardTitle = cardElement.querySelector('.card__title');
  
  cardTitle.textContent = cardData.name;
  cardPhoto.src = cardData.link;
  cardPhoto.alt = cardData.name;

  function likeCardPhoto() {
    cardLike.classList.toggle('card__like_active');
  }

  function deleteCard() {
    cardElement.remove();
  }

  function openPopupPhotoView() {
    openPopup(popupPhotoView);
    popupPhoto.src = cardData.link;
    popupPhoto.alt = cardData.name;
    popupPhotoTitle.textContent = cardData.name;
  }
  
  cardLike.addEventListener('click', likeCardPhoto);
  cardDelete.addEventListener('click', deleteCard);
  cardPhoto.addEventListener('click', openPopupPhotoView);

  return cardElement;
}

function renderCard(cardData) {
  cards.prepend(addCard(cardData));
}

function handleFormAddCardSubmit (evt) {
  evt.preventDefault();
  const newCardPhoto = {
    name: cardTitleInput.value,
    link: cardPhotoInput.value
  };
  renderCard(newCardPhoto);
  closePopup(popupAddCard);
}

function openPopupEditProfile() {
  openPopup(popupEditProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  hideStartErrorMessage(formEditProfile, validationClasses);
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
  hideStartErrorMessage(formAddCard, validationClasses);
}

initialCards.forEach((card) => {
  renderCard(card);
});

buttonPopupEditProfileOpen.addEventListener('click', openPopupEditProfile);
formEditProfile.addEventListener('submit', handleFormEditProfileSubmit);
buttonPopupAddCardOpen.addEventListener('click', openAddCardPopup);
formAddCard.addEventListener('submit', handleFormAddCardSubmit);