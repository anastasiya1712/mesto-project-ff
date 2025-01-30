export function openModal(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', escapeClickHandler);
}

export function closeModal(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  const inputElements = Array.from(popupElement.querySelectorAll(".popup__input"));
  inputElements.forEach(inputElement => {
    inputElement.value = "";
  });
  document.removeEventListener('keydown', escapeClickHandler);
}

function escapeClickHandler(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}
