export function createCardElement(cardTemplate, cardInfo, openModal, modalElement, removeCardElement, likeHandler) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImageElement = cardElement.querySelector(".card__image");
    const cardDescriptionElement = cardElement.querySelector(".card__description");

    cardImageElement.src = cardInfo.link;
    cardImageElement.addEventListener("click", () => {
        modalElement.querySelector(".popup__image").src = cardImageElement.src;
        modalElement.querySelector(".popup__caption").textContent = cardDescriptionElement.textContent;
        openModal(modalElement);
    });
    cardElement.querySelector(".card__title").textContent = cardInfo.name;
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
