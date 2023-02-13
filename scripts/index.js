const profileElement = document.querySelector('.profile');
const popupCloseBtns = document.querySelectorAll('.popup__close-btn');
const buttonPopupEditProfileOpen = profileElement.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const nameInput = formEditProfile.querySelector('.popup__field_edit_name');
const jobInput = formEditProfile.querySelector('.popup__field_edit_job');
const profileTitle = profileElement.querySelector('.profile__title');
const profileSubtitle = profileElement.querySelector('.profile__subtitle');
const popupAddCardOpen = profileElement.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add-card');
const formAddCard = popupAddCard.querySelector('.popup__form');
const cardTitleInput = formAddCard.querySelector('.popup__field_add_title');
const cardPhotoInput = formAddCard.querySelector('.popup__field_add_link');
const cards = document.querySelector('.cards');
const popupPhotoView = document.querySelector('.popup_type_photo');
const popupPhoto = popupPhotoView.querySelector('.popup__photo');
const popupPhotoTitle = popupPhotoView.querySelector('.popup__img-title');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
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
  formAddCard.reset();
}

function openPopupEditProfile() {
  openPopup(popupEditProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

function handleFormEditProfileSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function openAddCardPopup() {
  openPopup(popupAddCard);
}

initialCards.forEach((card) => {
  renderCard(card);
});

popupCloseBtns.forEach((button) => {
  button.addEventListener('click', () => {
    closePopup(button.closest('.popup'));
  });
});

buttonPopupEditProfileOpen.addEventListener('click', openPopupEditProfile);
formEditProfile.addEventListener('submit', handleFormEditProfileSubmit);
popupAddCardOpen.addEventListener('click', openAddCardPopup);
formAddCard.addEventListener('submit', handleFormAddCardSubmit);