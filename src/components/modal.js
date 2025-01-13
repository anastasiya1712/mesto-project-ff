//Функция для открытия модального окна
export function openModal(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', escapeHandler);
}

//Функция для закрытия модального окна
export function closeModal(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', escapeHandler);
}

function escapeHandler(evt) {
  if (evt.key === 'Escape') {
    closeModal(popupElement);
  }
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  const formElement = evt.target;

  const nameInputValue = formElement.querySelector('.popup__input_type_name').value;
  const jobInputValue = formElement.querySelector('.popup__input_type_description').value;

  document.querySelector('.profile__title').textContent = nameInputValue;
  document.querySelector('.profile__description').textContent = jobInputValue;

  closeModal();
}

function handleFormNewPlaceSubmit(evt, createCardElement) {
  evt.preventDefault();
  const placesList = document.querySelector(".places__list");
  const cardTemplate = document.querySelector("#card-template").content;

  const formElement = evt.target;

  const cardNameValue = formElement.querySelector('.popup__input_type_card-name').value;
  const cardUrlValue = formElement.querySelector('.popup__input_type_url').value;

  const newCard = createCardElement(cardTemplate, cardNameValue, cardUrlValue);
  placesList.prepend(newCard);
  const imageModal = document.querySelector('.popup_type_image');
  const card = newCard.closest(".card");
  const cardTitleText = card.querySelector(".card__title").textContent;
  const cardUrl = card.querySelector('.card__image').src;

  card.querySelector('.card__image').addEventListener('click', () => openModal(imageModal, cardUrl, cardTitleText));

  formElement.querySelector('.popup__input_type_card-name').value = "";
  formElement.querySelector('.popup__input_type_url').value = "";

  closeModal();
}

function closeModalByClickOverlay(evt) {
  const popupElements = document.querySelectorAll(".popup");
  popupElements.forEach((popup) => {
    if (evt.target === popup) {
      popup.classList.remove("popup_is-opened");
    }
  });
  evt.target.removeEventListener("click", closeModalByClickOverlay);
}
