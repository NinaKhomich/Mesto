import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';
import { initialCards, validationSettings } from './constants.js';
import { buttonPopupEditProfileOpen,
  formEditProfile,
  nameInput,
  jobInput,
  buttonPopupAddCardOpen,
  formAddCard } from './utils.js';

const formEditProfileValidation = new FormValidator(validationSettings, formEditProfile);
const formAddCardValidation = new FormValidator(validationSettings, formAddCard);

function renderCard(cardData) {
  const card = new Card(cardData, '#card-template', popupPhotoView.open.bind(popupPhotoView));
  const cardElement = card.generateCard();

  return cardElement;
}

const cardsList = new Section({ 
  items: initialCards,
  renderer: (item) => {    
    cardsList.addItem(renderCard(item));
  }
}, '.cards');

const popupAddCard = new PopupWithForm('.popup_type_add-card', (formValues) => {
  const userCardPhoto = {
    name: formValues.title,
    link: formValues.link 
  }

  cardsList.addItem(renderCard(userCardPhoto));
})

const popupPhotoView = new PopupWithImage('.popup_type_photo');

buttonPopupAddCardOpen.addEventListener('click', function() {
  popupAddCard.open();
  formAddCardValidation.resetValidation();
});

const userProfileInfo = new UserInfo('.profile__title', '.profile__subtitle');

const popupEditProfileForm = new PopupWithForm('.popup_type_edit-profile', (formValues) => {
  userProfileInfo.setUserInfo({
    name: formValues.name,
    job: formValues.job
  });
})

buttonPopupEditProfileOpen.addEventListener('click', () => {
  popupEditProfileForm.open();

  const profileEditFormInfo = userProfileInfo.getUserInfo();
  nameInput.value = profileEditFormInfo.name;
  jobInput.value = profileEditFormInfo.job;

  formEditProfileValidation.resetValidation();
});

cardsList.renderItems();
formEditProfileValidation.enableValidation();
formAddCardValidation.enableValidation();