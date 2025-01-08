//Функция для открытия модального окна
export function openModal(modal) {
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

  allPopups.forEach((element) => {
    const isActive = element.classList.contains('popup_is-opened');
    if (isActive) {
      modal.classList.remove('popup_is-opened');
    }
  });
}