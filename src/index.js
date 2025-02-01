import './pages/index.css';
import { openModal, closeModal } from './components/modal';
import { createCardElement, removeCardElement, likeHandler } from './components/card';
import { enableValidation, clearValidation } from './components/validation';
import { getCurrentUserInfo, editCurrentUserInfo, editCurrentUserAvatar, getInitialCards, 
  createCard, deleteCard, setLikeToCard, deleteLikeFromCard} from './components/api';

const cardTemplate = document.querySelector("#card-template").content;
const profileInfoElement = document.querySelector(".profile__info");
const profileTitleElement = profileInfoElement.querySelector(".profile__title");
const profileDescriptionElement = profileInfoElement.querySelector(".profile__description");
const profileImageElement = document.querySelector('.profile__image');
const editProfileBtn = document.querySelector('.profile__edit-button');
const addCardBtn = document.querySelector('.profile__add-button');
const editProfileModal = document.querySelector('.popup_type_edit');
const editProfileAvatarElement = document.querySelector(".profile__image-wrapper");
const addCardModal = document.querySelector('.popup_type_new-card');
const cardModal = document.querySelector(".popup_type_image");
const deleteCardModal = document.querySelector(".popup_type_delete-card");
const avatarEditModal = document.querySelector(".popup_type_edit-avatar");
const cardModalImage = cardModal.querySelector(".popup__image");
const cardModalCaption = cardModal.querySelector(".popup__caption");
const closeBtns = document.querySelectorAll('.popup__close');
const deleteCardButton = deleteCardModal.querySelector(".popup__button");
const cardList = document.querySelector(".places__list");
const editProfileForm = document.forms["edit-profile"];
const editAvatarForm = document.forms["edit-avatar"];
const avatarUrlInput = editAvatarForm.querySelector(".popup__input_type_url");
const nameInput = editProfileForm.querySelector(".popup__input_type_name");
const jobInput = editProfileForm.querySelector(".popup__input_type_description");
const addCardForm = document.forms["new-place"];
const cardNameInput = addCardForm.querySelector(".popup__input_type_card-name");
const cardUrlInput = addCardForm.querySelector(".popup__input_type_url");
const popups = document.querySelectorAll('.popup');

let currentUserId;
const userPromise = getCurrentUserInfo();
const cardsPromise = getInitialCards();
Promise.all([userPromise, cardsPromise])
  .then(([userResponse, cardsResponse]) => {
    // user
    currentUserId = userResponse._id;
    profileTitleElement.textContent = userResponse.name;
    profileDescriptionElement.textContent = userResponse.about;
    profileImageElement.style.backgroundImage = `url(${userResponse.avatar})`;

    // cards
    cardsResponse.forEach((card) => {
      const cardInfo = {
        _id: card._id,
        name: card.name,
        link: card.link,
        likes: card.likes,
        owner: {
          _id: card.owner._id
        }
      };
      const newCard = createCardElement(
        cardTemplate, 
        cardInfo, 
        openImagePopup, 
        openDeleteCardPopup,
        removeCardElement, 
        deleteCard,
        likeHandler, 
        setLikeToCard,
        deleteLikeFromCard,
        currentUserId);
      cardList.append(newCard);
    });
  })
  .catch((err) => {
    console.log(err);
  });

editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);
editAvatarForm.addEventListener("submit", handleEditAvatarFormSubmit); 

editProfileAvatarElement.addEventListener("click", () => {
  clearValidation(editAvatarForm, { inputErrorClass: 'popup__input_type_error', errorClass: 'popup__error_visible' })
  openModal(avatarEditModal);
});

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
  clearValidation(editProfileForm, { inputErrorClass: 'popup__input_type_error', errorClass: 'popup__error_visible' })
  openModal(editProfileModal)
});
addCardBtn.addEventListener('click', () => {
  clearValidation(addCardForm, { inputErrorClass: 'popup__input_type_error', errorClass: 'popup__error_visible' })
  openModal(addCardModal)}
);

closeBtns.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.popup');
    closeModal(modal);
  });
});

deleteCardButton.addEventListener('click', (evt) => {
  const modal = evt.target.closest(".popup");
  closeModal(modal);
});

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

function openDeleteCardPopup() {
  openModal(deleteCardModal);
  return deleteCardModal;
}

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

  createCard({
    name: cardNameInput.value,
    link: cardUrlInput.value
  })
    .then((newCardInfo) => {
      const newCard = createCardElement(
        cardTemplate, 
        newCardInfo, 
        openImagePopup, 
        openDeleteCardPopup,
        removeCardElement, 
        deleteCard,
        likeHandler,
        setLikeToCard,
        deleteLikeFromCard,
        currentUserId);
      cardList.prepend(newCard);
    })
    .catch((err) => {
      console.log(err);
    });

  closeModal(addCardModal);
  cardNameInput.value = "";
  cardUrlInput.value = "";
}

function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();

  const submitButtonElement = evt.target.querySelector(".popup__button");
  if (submitButtonElement.classList.contains("popup__button_disabled")) {
    return;
  }

  const url = avatarUrlInput.value;
  editCurrentUserAvatar(url)
    .then((res) => {
      if(res.ok) {
        profileImageElement.style.backgroundImage = `url(${url})`;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  
  closeModal(avatarEditModal);
}