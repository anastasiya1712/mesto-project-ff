import './pages/index.css';

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
