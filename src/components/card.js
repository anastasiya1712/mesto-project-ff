export function createCardElement(
    cardTemplate, 
    cardInfo, 
    openImagePopup, 
    removeCardElement, 
    removeCardApi,
    likeHandler, 
    currentUserId) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImageElement = cardElement.querySelector(".card__image");

    cardElement.querySelector(".card__title").textContent = cardInfo.name;
    cardImageElement.src = cardInfo.link;
    cardImageElement.alt = cardInfo.name;
    cardElement.querySelector(".card__like-count").textContent = cardInfo.likes.length;
    cardImageElement.addEventListener("click", openImagePopup);
    cardElement.querySelector(".card__like-button").addEventListener("click", likeHandler);

    if(currentUserId === cardInfo.owner._id) {
        cardElement.querySelector(".card__delete-button").addEventListener("click", (evt) => {
            removeCardApi(cardInfo._id)
                .then((res) => {
                    if(res.ok) {
                        removeCardElement(evt);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    }
    else {
        cardElement.querySelector(".card__delete-button").classList.add('card__delete-button-hidden');
    }

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
