import './pages/index.css';
import { initialCards } from './cards';
import { openModal, closeModal } from './components/modal';
import { createCardElement, removeCardElement, likeHandler} from './components/card';
// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

// @todo: Вывести карточки на страницу
const placesList = document.querySelector(".places__list");
initialCards.forEach((card) => {
  const newCard = createCardElement(cardTemplate, card.name, card.link, openModal, removeCardElement, likeHandler);
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

closeButtons.forEach(button => {
  button.addEventListener('click', closeModal);
});
