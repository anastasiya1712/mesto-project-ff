// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

// @todo: Функция создания карточки
function addCardElement(name, link) {
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
  const placesList = document.querySelector(".places__list");
  const evtTarget = evt.target;
  evtTarget.parentElement.remove();
}

// @todo: Вывести карточки на страницу
const placesList = document.querySelector(".places__list");
initialCards.forEach((card) => {
  const newCard = addCardElement(card.name, card.link);
  placesList.append(newCard);
});
