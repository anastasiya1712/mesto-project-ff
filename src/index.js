import './pages/index.css';
import createCardElement from './components/card.js';
import initialCards from './cards.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

// @todo: Вывести карточки на страницу
const placesList = document.querySelector(".places__list");
initialCards.forEach((card) => {
  const newCard = createCardElement(card.name, card.link);
  placesList.append(newCard);
});


// const editButton = document.querySelector('.profile__edit-button');//кнопка редактировать
// const addButton = document.querySelector('.profile__add-button');//кнопка +
// const image = document.querySelector('.profile__image');// кнопка картинка
// const editModal = document.querySelector('.popup_type_edit');//кн редактировать модальное окно
// const newModal = document.querySelector('.popup_type_new-card');//кн новое модальное окно
// const closeModals = document.querySelector('.popup__close');//кн закрыть модальное окно

// //Функция для открытия модального окна
// function openModal(modal) { 
//   modal.style.display = 'block';
// }

//Функция для закрытия модального окна
//function closeModal()