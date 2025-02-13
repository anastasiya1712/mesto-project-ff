import './pages/index.css';
import { openModal, closeModal } from './components/modal';
import { createCardElement, removeCardElement, likeHandler } from './components/card';
import { enableValidation, clearValidation } from './components/validation';
import { getCurrentUserInfo, editCurrentUserInfo, editCurrentUserAvatar, getInitialCards, createCard, deleteCard, setLikeToCard, deleteLikeFromCard } from './components/api';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

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
      const newCard = createCardElement(
        currentUserId,
        cardTemplate,
        card,
        openImagePopup,
        deleteCardCallback,
        likeCallback);
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
  clearValidation(editAvatarForm, validationConfig);
  editAvatarForm.reset();
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
  clearValidation(editProfileForm, validationConfig)
  openModal(editProfileModal)
});
addCardBtn.addEventListener('click', () => {
  clearValidation(addCardForm, validationConfig)
  addCardForm.reset();
  openModal(addCardModal)
});

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

enableValidation(validationConfig);

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
  renderLoading(submitButtonElement, true);
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
    })
    .finally(() => {
      renderLoading(submitButtonElement, false);
    });

  closeModal(editProfileModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const submitButtonElement = evt.target.querySelector(".popup__button");
  renderLoading(submitButtonElement, true);
  createCard({
    name: cardNameInput.value,
    link: cardUrlInput.value
  })
    .then((newCardInfo) => {
      const newCard = createCardElement(
        currentUserId,
        cardTemplate,
        newCardInfo,
        openImagePopup,
        deleteCardCallback,
        likeCallback);
      cardList.prepend(newCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(submitButtonElement, false);
    });

  closeModal(addCardModal);
  cardNameInput.value = "";
  cardUrlInput.value = "";
}

function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();

  const submitButtonElement = evt.target.querySelector(".popup__button");
  renderLoading(submitButtonElement, true);
  const url = avatarUrlInput.value;
  editCurrentUserAvatar(url)
    .then((user) => {
      profileImageElement.style.backgroundImage = `url(${user.avatar})`;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(submitButtonElement, false);
    });

  closeModal(avatarEditModal);
}

function renderLoading(button, isLoading) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  }
  else {
    button.textContent = "Сохранить";
  }
}

const likeCallback = (cardId, cardElement, evt) => {
  const likeMethod = cardElement.querySelector(".card__like-button").classList.contains("card__like-button_is-active")
    ? deleteLikeFromCard
    : setLikeToCard;

  likeMethod(cardId)
    .then((card) => {
      cardElement.querySelector(".card__like-count").textContent = card.likes.length;
      likeHandler(evt);
    })
    .catch(err => console.log(err));
}

const deleteCardCallback = (cardId, evt) => {
  const popup = openDeleteCardPopup();
  popup.querySelector(".popup__button").onclick = () => {
    deleteCard(cardId)
      .then(() => {
        removeCardElement(evt);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
