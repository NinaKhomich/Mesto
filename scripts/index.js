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

let profileElement = document.querySelector('.profile');
let popupBtnsClose = document.querySelectorAll('.popup__close-btn');

let popupEditProfileOpen = profileElement.querySelector('.profile__edit-button');
let popupEditProfile = document.querySelector('.popup_type_edit-profile');
let formEditProfile = popupEditProfile.querySelector('.popup__form');
let nameInput = formEditProfile.querySelector('.popup__field_edit_name');
let jobInput = formEditProfile.querySelector('.popup__field_edit_job');
let profileTitle = profileElement.querySelector('.profile__title');
let profileSubtitle = profileElement.querySelector('.profile__subtitle');

let popupAddCardOpen = profileElement.querySelector('.profile__add-button');
let popupAddCard = document.querySelector('.popup_type_add-card');
let formAddCard = popupAddCard.querySelector('.popup__form');
let cardTitleInput = formAddCard.querySelector('.popup__field_add_title');
let cardPhotoInput = formAddCard.querySelector('.popup__field_add_link');

function addCard(titleValue, photoLink) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = titleValue;
  cardElement.querySelector('.card__photo').src = photoLink;

  const cards = document.querySelector('.cards');
  cards.append(cardElement);
}

initialCards.forEach((item) => {
  addCard(item.name, item.link);
});

function handleFormAddCardSubmit (evt) {
  evt.preventDefault();
  addCard(cardTitleInput.value, cardPhotoInput.value);
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

popupBtnsClose.forEach((item) => {
  item.addEventListener('click', () => {
    item.closest('.popup').classList.remove('popup_opened');
  });
});

popupEditProfileOpen.addEventListener('click', openPopupEditProfile);
formEditProfile.addEventListener('submit', handleFormEditProfileSubmit);
popupAddCardOpen.addEventListener('click', openAddCardPopup);
formAddCard.addEventListener('submit', handleFormAddCardSubmit);

