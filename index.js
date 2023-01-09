let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.edit-title');
let jobInput = formElement.querySelector('.edit-subtitle');
let popupClose = formElement.querySelector('.popup__close-btn');
let profileElement = document.querySelector('.profile');
let popupOpen = profileElement.querySelector('.profile__edit-button');
let profileTitle = profileElement.querySelector('.profile__title');
let profileSubtitle = profileElement.querySelector('.profile__subtitle');

function closePopup() {
  popup.classList.remove('popup_opened');
}

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;  
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup();
}

popupOpen.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);
