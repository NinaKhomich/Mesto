const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const profileElement = document.querySelector('.profile');
const popupCloseBtns = document.querySelectorAll('.popup__close-btn');
const popupEditProfileOpen = profileElement.querySelector('.profile__edit-button');
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

function addCard(titleValue, photoLink) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardPhoto = cardElement.querySelector('.card__photo');
  const cardLike = cardElement.querySelector('.card__like');
  const cardDelete = cardElement.querySelector('.card__delete');
  const cardTitle = cardElement.querySelector('.card__title');
  
  cardTitle.textContent = titleValue;
  cardPhoto.src = photoLink;
  cardPhoto.alt = titleValue;

  cardLike.addEventListener('click', () => {
    cardLike.classList.toggle('card__like_active');
  });

  cardDelete.addEventListener('click', () => {
    cardElement.remove();
  });

  cardPhoto.addEventListener('click', () => {
    popupPhotoView.classList.add('popup_opened');
    popupPhoto.src = photoLink;
    popupPhoto.alt = titleValue;
    popupPhotoTitle.textContent = titleValue;
  });

  return cardElement;
}

initialCards.forEach((card) => {
  cards.append(addCard(card.name, card.link));
});

function handleFormAddCardSubmit (evt) {
  evt.preventDefault();
  cards.prepend(addCard(cardTitleInput.value, cardPhotoInput.value));
  popupAddCard.classList.remove('popup_opened');
  formAddCard.reset();
}

function openPopupEditProfile() {
  popupEditProfile.classList.add('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

function handleFormEditProfileSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  popupEditProfile.classList.remove('popup_opened');
}

function openAddCardPopup() {
  popupAddCard.classList.add('popup_opened');
}

function checkAddCardPopup() {
  if ((cardTitleInput.value.length === 0) && cardPhotoInput.value.length === 0) {
    console.log('........');
    document.querySelector('.popup__save-btn').disabled = false;
  }
}

checkAddCardPopup();

popupCloseBtns.forEach((button) => {
  button.addEventListener('click', () => {
    button.closest('.popup').classList.remove('popup_opened');
  });
});

popupEditProfileOpen.addEventListener('click', openPopupEditProfile);
formEditProfile.addEventListener('submit', handleFormEditProfileSubmit);
popupAddCardOpen.addEventListener('click', openAddCardPopup);
formAddCard.addEventListener('submit', handleFormAddCardSubmit);