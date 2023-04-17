const profileElement = document.querySelector('.profile');
const buttonPopupEditProfileOpen = profileElement.querySelector('.profile__edit-button');
const formEditProfile = document.forms.editForm;
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.about;
const buttonPopupAddCardOpen = profileElement.querySelector('.profile__add-button');
const formAddCard = document.forms.addCard;
const formEditAvatar = document.forms.editAvatar;
const buttonPopupEditAvatarOpen = document.querySelector('.profile__avatar-box');

export { profileElement,
  buttonPopupEditProfileOpen,
  formEditProfile,
  nameInput,
  jobInput,
  buttonPopupAddCardOpen,
  formAddCard,
  formEditAvatar,
  buttonPopupEditAvatarOpen
 };