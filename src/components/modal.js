export function openPopup(popup) { // функция открытия попапа
    animatedPopup(popup);
    setTimeout(function() {
        popup.classList.add('popup_is-opened'); // Добавляем класс для открытия попапа с небольшой задержкой
    }, 0.1);
    document.addEventListener('keydown', closePopupOnEsc);
}

function animatedPopup(popup) { // функция открытия попапа
    popup.classList.add('popup_is-animated');
}

export function closePopup() {
    const popups = document.querySelectorAll('.popup_is-opened');
    popups.forEach(function(popup) {
        popup.classList.remove('popup_is-opened');
        const form = popup.querySelector('form');
        if (form) {
            form.reset();
        }
    });
    
    document.removeEventListener('keydown', closePopupOnEsc);
    
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