let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__field_edit_name');
let jobInput = formElement.querySelector('.popup__field_edit_job');
let popupClose = popup.querySelector('.popup__close-btn');
let profileElement = document.querySelector('.profile');
let popupOpen = profileElement.querySelector('.profile__edit-button');
let profileTitle = profileElement.querySelector('.profile__title');
let profileSubtitle = profileElement.querySelector('.profile__subtitle');

function closePopup() {
  popup.classList.remove('popup_opened');
}

function openPopup() {
  popup.classList.add('popup_opened');
  document.querySelector('.popup__container').classList.add('popup__container_shown');
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
