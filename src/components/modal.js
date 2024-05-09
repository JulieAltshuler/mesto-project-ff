export function openPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupOnEsc);
}

export function closePopup(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupOnEsc);
}

export function closePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'));
  }
}

export function closePopupOnOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    const popupElement = document.querySelector('.popup_is-opened');
    closePopup(popupElement);
  }
}
