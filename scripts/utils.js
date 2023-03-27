const profileElement = document.querySelector('.profile');
const buttonPopupEditProfileOpen = profileElement.querySelector('.profile__edit-button');
const formEditProfile = document.forms.editForm;
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.job;
const buttonPopupAddCardOpen = profileElement.querySelector('.profile__add-button');
const formAddCard = document.forms.addCard;

export { profileElement,
  buttonPopupEditProfileOpen,
  formEditProfile,
  nameInput,
  jobInput,
  buttonPopupAddCardOpen,
  formAddCard };