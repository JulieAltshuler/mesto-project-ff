import { formCard } from './index.js';

export function openPopup(popup) { // функция открытия попапа
    animatedPopup(popup);
    setTimeout(function() {
        popup.classList.add('popup_is-opened'); // Добавляем класс для открытия попапа с небольшой задержкой
    }, 0.1);
    document.addEventListener('keydown', closePopupOnEsc);
}

export function openPopupCardImage(cardData) { // функция открытия попапа
    const popupCardImage = document.querySelector('.popup__type_image');
    
    const popupImageLink = popupCardImage.querySelector('.popup__image');
    const popupImageText = popupCardImage.querySelector('.popup__caption');
    
    popupImageLink.src = cardData.link;
    popupImageText.textContent = cardData.name;
    popupImageText.alt = cardData.name;
    
    openPopup(popupCardImage);
}

export function animatedPopup(popup) { // функция открытия попапа
    popup.classList.add('popup_is-animated');
}

export function closePopup() {
    const popups = document.querySelectorAll('.popup_is-opened');
    popups.forEach(function(popup) {
        popup.classList.remove('popup_is-opened');
    });
    document.removeEventListener('keydown', closePopupOnEsc);
    formCard.reset();
}

export function closePopupOnEsc(evt) {
    if (evt.key === 'Escape') {
        closePopup();
    }
}

export function closePopupOnOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(); 
    }
}