import './pages/index.css';
import { initialCards } from './cards';
import { openModal, closeModal, overlayClickHandler } from './components/modal';
import { createCardElement, removeCardElement, likeHandler } from './components/card';

const cardTemplate = document.querySelector("#card-template").content;
const editProfileBtn = document.querySelector('.profile__edit-button');
const addCardBtn = document.querySelector('.profile__add-button');
const editProfileModal = document.querySelector('.popup_type_edit');
const addCardModal = document.querySelector('.popup_type_new-card');
const cardModal = document.querySelector('.popup_type_image');
const closeBtns = document.querySelectorAll('.popup__close');
const cardList = document.querySelector('.places__list');

initialCards.forEach((card) => {
  const cardInfo = {
    name: card.name,
    link: card.link
  };
  const newCard = createCardElement(cardTemplate, cardInfo, openModal, cardModal, removeCardElement, likeHandler);
  cardList.append(newCard);
});

editProfileBtn.addEventListener('click', () => openModal(editProfileModal));
addCardBtn.addEventListener('click', () => openModal(addCardModal));

closeBtns.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.popup');
    closeModal(modal);
  });
});
