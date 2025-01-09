import './pages/index.css';
import { initialCards } from './cards';
import { openModal, closeModal } from './components/modal';
import { addLocale } from 'core-js';
// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

// @todo: Функция создания карточки
function createCardElement(name, link) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__title").textContent = name;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", removeCardElement);
  cardElement.querySelector(".card__like-button")
    .addEventListener("click", (evt) => {
      if (evt.target.classList.contains("card__like-button")) {
        evt.target.classList.toggle("card__like-button_is-active");
      }
    });
  return cardElement;
}
// @todo: Функция удаления карточки
function removeCardElement(evt) {
  const evtTarget = evt.target;
  const card = evtTarget.closest(".card");
  card.remove();
}

// @todo: Вывести карточки на страницу
const placesList = document.querySelector(".places__list");
initialCards.forEach((card) => {
  const newCard = createCardElement(card.name, card.link);
  placesList.append(newCard);
});


const editButton = document.querySelector('.profile__edit-button');//кнопка редактировать
const addButton = document.querySelector('.profile__add-button');//кнопка +
const editModal = document.querySelector('.popup_type_edit');//кн редактировать модальное окно
const newCardModal = document.querySelector('.popup_type_new-card');//кн новое модальное окно
const closeButtons = document.querySelectorAll('.popup__close');//кн закрыть модальное окно
const imageModal = document.querySelector('.popup_type_image');

//открытия модальных окон
editButton.addEventListener('click', () => openModal(editModal));
addButton.addEventListener('click', () => openModal(newCardModal));

const imageElements = Array.from(document.getElementsByClassName('card__image'));
imageElements.forEach((element) => {
  element.addEventListener('click', () => openModal(imageModal));
});


closeButtons.forEach(button => {
  button.addEventListener('click', closeModal);
});
