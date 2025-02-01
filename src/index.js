import './pages/index.css';
import { openModal, closeModal } from './components/modal';
import { createCardElement, removeCardElement, likeHandler } from './components/card';
import { enableValidation, clearValidation } from './components/validation';
import { getCurrentUserInfo, editCurrentUserInfo, getInitialCards } from './components/api';

const cardTemplate = document.querySelector("#card-template").content;
const profileInfoElement = document.querySelector(".profile__info");
const profileTitleElement = profileInfoElement.querySelector(".profile__title");
const profileDescriptionElement = profileInfoElement.querySelector(".profile__description");
const profileImageElement = document.querySelector('.profile__image');
const editProfileBtn = document.querySelector('.profile__edit-button');
const addCardBtn = document.querySelector('.profile__add-button');
const editProfileModal = document.querySelector('.popup_type_edit');
const addCardModal = document.querySelector('.popup_type_new-card');
const cardModal = document.querySelector(".popup_type_image");
const cardModalImage = cardModal.querySelector(".popup__image");
const cardModalCaption = cardModal.querySelector(".popup__caption");
const closeBtns = document.querySelectorAll('.popup__close');
const cardList = document.querySelector(".places__list");
const editProfileForm = document.forms["edit-profile"];
const nameInput = editProfileForm.querySelector(".popup__input_type_name");
const jobInput = editProfileForm.querySelector(".popup__input_type_description");
const addCardForm = document.forms["new-place"];
const cardNameInput = addCardForm.querySelector(".popup__input_type_card-name");
const cardUrlInput = addCardForm.querySelector(".popup__input_type_url");
const popups = document.querySelectorAll('.popup');

getCurrentUserInfo()
  .then((user) => {
    profileTitleElement.textContent = user.name;
    profileDescriptionElement.textContent = user.about;
    profileImageElement.style.backgroundImage = `url(${user.avatar})`;
  })
  .catch((err) => {
    console.log(err);
  });

getInitialCards()
  .then((initialCards) => {
    initialCards.forEach((card) => {
      const cardInfo = {
        name: card.name,
        link: card.link
      };
      const newCard = createCardElement(cardTemplate, cardInfo, openImagePopup, removeCardElement, likeHandler);
      cardList.append(newCard);
    });
  })
  .catch((err) => {
    console.log(err);
  });

editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);
  
popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
})

editProfileBtn.addEventListener('click', () => {
  nameInput.value = profileTitleElement.textContent;
  jobInput.value = profileDescriptionElement.textContent;
  openModal(editProfileModal)
});
addCardBtn.addEventListener('click', () => openModal(addCardModal));

closeBtns.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.popup');
    closeModal(modal);
  });
});

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

function openImagePopup(evt) {
  const cardElement = evt.target;
  const cardTitleTextTrimmed = cardElement.closest(".card").querySelector(".card__title").textContent.trim();

  cardModalImage.src = cardElement.src;
  cardModalImage.alt = cardTitleTextTrimmed;
  cardModalCaption.textContent = cardTitleTextTrimmed;
  openModal(cardModal);
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();

  const submitButtonElement = evt.target.querySelector(".popup__button");
  if (submitButtonElement.classList.contains("popup__button_disabled")) {
    return;
  }

  editCurrentUserInfo({
    name: nameInput.value,
    about: jobInput.value
  })
    .then((updatedUserInfo) => {
      profileTitleElement.textContent = updatedUserInfo.name;
      profileDescriptionElement.textContent = updatedUserInfo.about;
      profileImageElement.style.backgroundImage = `url(${user.avatar})`;
    })
    .catch((err) => {
      console.log(err);
    });

  closeModal(editProfileModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const submitButtonElement = evt.target.querySelector(".popup__button");
  if (submitButtonElement.classList.contains("popup__button_disabled")) {
    return;
  }

  const cardInfo = {
    name: cardNameInput.value,
    link: cardUrlInput.value
  };
  const newCard = createCardElement(cardTemplate, cardInfo, openImagePopup, removeCardElement, likeHandler);
  cardList.prepend(newCard);

  closeModal(addCardModal);
  cardNameInput.value = "";
  cardUrlInput.value = "";
}
