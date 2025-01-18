export function createCardElement(cardTemplate, cardInfo, openImagePopup, removeCardElement, likeHandler) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImageElement = cardElement.querySelector(".card__image");

    cardElement.querySelector(".card__title").textContent = cardInfo.name;
    cardImageElement.src = cardInfo.link;
    cardImageElement.alt = cardInfo.name;

    cardImageElement.addEventListener("click", openImagePopup);
    cardElement.querySelector(".card__delete-button").addEventListener("click", removeCardElement);
    cardElement.querySelector(".card__like-button").addEventListener("click", likeHandler);

    return cardElement;
}

export function removeCardElement(evt) {
    const evtTarget = evt.target;
    const card = evtTarget.closest(".card");
    card.remove();
}

export function likeHandler(evt) {
    evt.target.classList.toggle("card__like-button_is-active");
}
