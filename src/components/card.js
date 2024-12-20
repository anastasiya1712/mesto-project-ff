// @todo: Функция создания карточки
export default function createCardElement(name, link) {
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