// @todo: Функция создания карточки
export function createCardElement(cardTemplate, name, link, openModal, removeCardElement, likeHandler) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");

    cardImage.src = link;
    cardImage.addEventListener("click", openModal);
    cardElement.querySelector(".card__title").textContent = name;
    cardElement.querySelector(".card__delete-button").addEventListener("click", removeCardElement);
    cardElement.querySelector(".card__like-button").addEventListener("click", likeHandler);

    return cardElement;
}

// @todo: Функция удаления карточки
export function removeCardElement(evt) {
    const evtTarget = evt.target;
    const card = evtTarget.closest(".card");
    card.remove();
}

export function likeHandler(evt) {
    evt.target.classList.toggle("card__like-button_is-active");
}
