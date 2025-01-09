import './pages/index.css';
import { initialCards } from './cards';
import { openModal, closeModal } from './components/modal';
import { addLocale } from 'core-js';
import { createCardElement } from './components/card';
// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

// @todo: Вывести карточки на страницу
const placesList = document.querySelector(".places__list");
initialCards.forEach((card) => {
  const newCard = createCardElement(cardTemplate, card.name, card.link);
  placesList.append(newCard);
});

const editButton = document.querySelector('.profile__edit-button');//кнопка редактировать
const addButton = document.querySelector('.profile__add-button');//кнопка +
const editModal = document.querySelector('.popup_type_edit');//кн редактировать модальное окно
const newCardModal = document.querySelector('.popup_type_new-card');//кн новое модальное окно
const closeButtons = document.querySelectorAll('.popup__close');//кн закрыть модальное окно
const imageModal = document.querySelector('.popup_type_image');

//открытия модальных окон
editButton.addEventListener('click', () => openModal(editModal, undefined, undefined));
addButton.addEventListener('click', () => openModal(newCardModal, undefined, undefined));

const imageElements = Array.from(document.getElementsByClassName('card__image'));
imageElements.forEach((element) => {
  const card = element.closest(".card");
  const cardTitleText = card.querySelector(".card__title").textContent;
  element.addEventListener('click', () => openModal(imageModal, element.src, cardTitleText));
});

closeButtons.forEach(button => {
  button.addEventListener('click', closeModal);
});
