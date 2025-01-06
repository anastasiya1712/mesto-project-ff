//Функция для открытия модального окна
export function openModal(modal) { 
    modal.classList.add('popup_is-opened');
    console.log(modal);
    const closeButton = modal.querySelector('.popup__close');
    closeButton.addEventListener('click', closeModal);
  }

  //Функция для закрытия модального окна
export function closeModal (event) {
    const modal = event.target.closest('.popup');
    modal.classList.remove('popup_is-opened');

  }