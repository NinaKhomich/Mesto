const showInputError = (formElement, inputElement, errorMessage) => {
  // показать ошибку поля ввода(форма, поле ввода, текст ошибки)
  // через ид поля ввода в форме находим его текст ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__field_type_error');
  // добавляем классы полю ввода и элементу ошибки при котором ошибка видна
  // текст ошибки = inputElement.validationMessage (выдаст стандартный 
  // текст ошибки конкретного поля ввода, настроенный его атрибутами)
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__field-error_active');
};

const hideInputError = (formElement, inputElement) => {
  // функция обратная появлению ошибки, убираем классы, ошибка уходит, сообщение = ''
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__field_type_error');
  errorElement.classList.remove('popup__field-error_active');
  errorElement.textContent = '';
};

const hideStartErrorMessage = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__field'));
  toggleButtonState(inputList, formElement);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
}

const isValid = (formElement, inputElement) => {
  // проверяем валидность формы, если поле ввода не валидно показываем ошибку, иначе - убираем.
  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__field'));
  // Находим все поля внутри формы, сделаем из них массив методом Array.from
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement);
      toggleButtonState(inputList, formElement);
    });
  });
};

const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

const hasInvalidInput = (inputList) => {
  // функция isValid валидирует только один input. Но нужно проверить
  // все поля, чтобы настроить статус кнопки. создадим функцию 
  //hasInvalidInput. Она принимает массив полей формы и возвращает 
  //true, если в нём хотя бы одно поле не валидно, и false, если все валидны.
  // проходим по этому массиву методом some

  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, formElement) => {
  const buttonElement = formElement.querySelector('.popup__save-btn');
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__save-btn_inactive');
    buttonElement.setAttribute('disabled', 'true');
  } else {
    buttonElement.classList.remove('popup__save-btn_inactive');
    buttonElement.removeAttribute('disabled');
  };
};

// Вызовем функцию
enableValidation(); 

