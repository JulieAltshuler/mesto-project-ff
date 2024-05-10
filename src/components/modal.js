export function openPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupOnEsc);
}

export function closePopup(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupOnEsc);
}

function closePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'));
  }
}

function closePopupOnOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

export function setCloseModalByClickListeners(popupList) {
  popupList.forEach((popupElement) => {
    // находим кнопку закрытия попапа
    const closeButton = popupElement.querySelector('.popup__close');

    // вешаем обработчик закрытия на кнопку
    closeButton.addEventListener('click', function () {
      closePopup(popupElement);
    });

    // вешаем обработчик закрытия на оверлей
    popupElement.addEventListener('click', function (evt) {
      closePopupOnOverlay(evt);
    });
  });
}
