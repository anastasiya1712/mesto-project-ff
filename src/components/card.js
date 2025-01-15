export function createCardElement(cardTemplate, cardInfo, openModal, modalElement, removeCardElement, likeHandler) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");

    cardImage.src = cardInfo.link;
    cardImage.addEventListener("click", () => {
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
