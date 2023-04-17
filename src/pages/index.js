import './index.css';
import Api from '../components/Api';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupConfirmation';
import UserInfo from '../components/UserInfo.js';
import { validationSettings, apiSettings } from '../utils/constants.js';
import { buttonPopupEditProfileOpen,
  formEditProfile,
  nameInput,
  jobInput,
  buttonPopupAddCardOpen,
  formAddCard,
  formEditAvatar,
  buttonPopupEditAvatarOpen
 } from '../utils/elements.js';

const formEditProfileValidation = new FormValidator(validationSettings, formEditProfile);
const formAddCardValidation = new FormValidator(validationSettings, formAddCard);
const formEditAvatarValidation = new FormValidator(validationSettings, formEditAvatar)

const api = new Api(apiSettings);
const userProfileInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar');

// настройка информации профиля
api.setProfileInfo()
.then((userObject) => {
  userProfileInfo.setUserInfo(userObject);
  userProfileInfo.setUserAvatar(userObject);
})
.catch(err => console.log(`Невозможо загрузить данные профиля. Ошибка: ${err})`));

// функция генерации карточки
function createCard(cardData) {
  const card = new Card(cardData, document.querySelector('.profile__title'), '#card-template', {
    openPhoto: popupPhotoView.open.bind(popupPhotoView), 
    deleteCardPopup: popupDeleteCard.open.bind(popupDeleteCard),
    putLike: (cardId) => { api.putLike(cardId)
      .then((res) => {
        card.setlikeCardPhoto(res);
      })
      .catch(err => console.log(`Ошибка: ${err})`));
    },
    deleteLike: (cardId) => { api.deleteLike(cardId)
      .then((res) => {
        card.deleteLikeCardPhoto(res);
      })
      .catch(err => console.log(`Ошибка: ${err})`));
    }
  });
  const cardElement = card.generateCard();

  return cardElement;
}

// попап удаления карточки
const popupDeleteCard = new PopupWithConfirmation('.popup_type_delete-card', (cardObject, cardObjectId) => {
  api.deleteCard(cardObjectId)
  .then(() => {
    cardObject.deleteCard();
  })
  .catch(err => console.log(`Невозможно удалить карточку. Ошибка: ${err})`));
});

const cardsList = new Section({
  renderer: (cardItem) => {    
    cardsList.addItem(createCard(cardItem));
  }
}, '.cards');

// заполнение страницы карточками с сервера
api.getInitialCards().then((result) => {
  cardsList.renderItems(result.reverse());
})
.catch(err => console.log(`Невозможно загрузить карточкию. Ошибка: ${err})`));

// добавление новой карточки
const popupAddCard = new PopupWithForm('.popup_type_add-card', (formValues) => {
  api.addCard(formValues).then((result) => {
    cardsList.addItem(createCard(result));
    popupAddCard.close();
  })
  .catch(err => console.log(`Невозможно добавить новую карточку. Ошибка: ${err})`))
  .finally(() => popupAddCard.setLoadingText(false));
})

const popupPhotoView = new PopupWithImage('.popup_type_photo');

// изменение инфо профиля
const popupEditProfileForm = new PopupWithForm('.popup_type_edit-profile', (formValues) => {
  api.editProfileInfo(formValues).then((res) => {
    userProfileInfo.setUserInfo(res);
    popupEditProfileForm.close();
  })
  .catch(err => console.log(`Невозможно обновить данные профиля. Ошибка: ${err})`))
  .finally(() => popupAddCard.setLoadingText(false));
})

const popupEditAvatar = new PopupWithForm('.popup_type_edit-avatar', (formValues) => {
  api.editProfileAvatar(formValues).then((res) => {
    userProfileInfo.setUserAvatar(res);
    popupEditAvatar.close();
  })
  .catch(err => console.log(`Невозможно обновить фото профиля. Ошибка: ${err})`))
  .finally(() => popupAddCard.setLoadingText(false));
});

// открытие попапа редактирования профиля
buttonPopupEditProfileOpen.addEventListener('click', () => {
  const profileEditFormInfo = userProfileInfo.getUserInfo();
  
  nameInput.value = profileEditFormInfo.name;
  jobInput.value = profileEditFormInfo.about;
  
  popupEditProfileForm.open();
  formEditProfileValidation.resetValidation();
});

// открытие попапа добавления карточки
buttonPopupAddCardOpen.addEventListener('click', function() {
  popupAddCard.open();
  formAddCardValidation.resetValidation();
});

//открытие попапа редактирования аватара
buttonPopupEditAvatarOpen.addEventListener('click', function() {
  popupEditAvatar.open();
  formEditAvatarValidation.resetValidation();
})

// валидация форм
formEditProfileValidation.enableValidation();
formAddCardValidation.enableValidation();
formEditAvatarValidation.enableValidation();



