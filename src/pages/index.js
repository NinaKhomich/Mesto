import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards, validationSettings } from '../utils/constants.js';
import { buttonPopupEditProfileOpen,
  formEditProfile,
  nameInput,
  jobInput,
  buttonPopupAddCardOpen,
  formAddCard } from '../utils/elements.js';

const formEditProfileValidation = new FormValidator(validationSettings, formEditProfile);
const formAddCardValidation = new FormValidator(validationSettings, formAddCard);

function createCard(cardData) {
  const card = new Card(cardData, '#card-template', popupPhotoView.open.bind(popupPhotoView));
  const cardElement = card.generateCard();

  return cardElement;
}

const cardsList = new Section({ 
  items: initialCards,
  renderer: (item) => {    
    cardsList.addItem(createCard(item));
  }
}, '.cards');

const popupAddCard = new PopupWithForm('.popup_type_add-card', (formValues) => {
  cardsList.addItem(createCard({
    name: formValues.title,
    link: formValues.link 
  }));
})

const popupPhotoView = new PopupWithImage('.popup_type_photo');
const userProfileInfo = new UserInfo('.profile__title', '.profile__subtitle');

const popupEditProfileForm = new PopupWithForm('.popup_type_edit-profile', (formValues) => {
  userProfileInfo.setUserInfo(formValues);
})

buttonPopupEditProfileOpen.addEventListener('click', () => {
  const profileEditFormInfo = userProfileInfo.getUserInfo();
  
  nameInput.value = profileEditFormInfo.name;
  jobInput.value = profileEditFormInfo.job;
  
  popupEditProfileForm.open();
  formEditProfileValidation.resetValidation();
});

buttonPopupAddCardOpen.addEventListener('click', function() {
  popupAddCard.open();
  formAddCardValidation.resetValidation();
});

cardsList.renderItems();
formEditProfileValidation.enableValidation();
formAddCardValidation.enableValidation();