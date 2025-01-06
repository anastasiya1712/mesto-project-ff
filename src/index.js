import './pages/index.css';
import { initialCards } from './cards';
import { openModal, closeModal } from './components/modal';
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
const image = document.querySelector('.profile__image');// кнопка картинка
const editModal = document.querySelector('.popup_type_edit');//кн редактировать модальное окно
const newCardModal = document.querySelector('.popup_type_new-card');//кн новое модальное окно
const closeButtons= document.querySelectorAll('.popup__close');//кн закрыть модальное окно


//открытия модальных окон
editButton.addEventListener( 'click', () => openModal (editModal) );
addButton.addEventListener( 'click', () => openModal (newCardModal) ) ;
//image.addEventListener( 'click', () =>openModal(image) );//?

closeButtons.forEach(button => {
  button.addEventListener('click', closeModal);
})
