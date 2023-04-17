const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_inactive',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field-error_active'
};

const apiSettings = {
  link: 'https://mesto.nomoreparties.co/v1/cohort-64/',
  headers: {
      authorization: 'c9146080-f9f9-4b4d-9d86-9700a4649e19',
      'Content-Type': 'application/json'
    }
}

export { validationSettings, apiSettings };