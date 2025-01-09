// @todo: Функция создания карточки
export function createCardElement(cardTemplate, name, link) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

    cardElement.querySelector(".card__image").src = link;
    cardElement.querySelector(".card__title").textContent = name;
    cardElement
        .querySelector(".card__delete-button")
        .addEventListener("click", removeCardElement);
    cardElement.querySelector(".card__like-button")
        .addEventListener("click", (evt) => {
            evt.target.classList.toggle("card__like-button_is-active");
        });
    return cardElement;
}

// @todo: Функция удаления карточки
function removeCardElement(evt) {
    const evtTarget = evt.target;
    const card = evtTarget.closest(".card");
    card.remove();
}