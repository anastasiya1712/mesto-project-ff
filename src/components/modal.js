//Функция для открытия модального окна
export function openModal(modal, imageUrl, imageText) {
  if (imageUrl !== undefined) {
    let imageElement = modal.querySelector('.popup__image');
    imageElement.src = imageUrl;
  }

  if(imageText !== undefined) {
    let imageTextElement = modal.querySelector(".popup__caption");
    imageTextElement.textContent = imageText;
  }

  modal.classList.add('popup_is-opened');
  const closeButton = modal.querySelector('.popup__close');
  closeButton.addEventListener('click', (evt) => {
    console.log(evt.target);
    closeModal(modal);
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeModal(modal);
    }
  });
}

//Функция для закрытия модального окна
export function closeModal() {
  const allPopups = document.getElementsByClassName('popup');
  console.log(allPopups);

  Array.from(allPopups).forEach((element) => {
    const isActive = element.classList.contains('popup_is-opened');
    if (isActive) {
      element.classList.remove('popup_is-opened');
    }
  });
}