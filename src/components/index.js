import '../pages/index.css';
import {
    openPopup,
    closePopup,
    closePopupOnOverlay,
    openPopupCardImage
} from './modal.js';

import {
    deleteCard,
    likeCard,
    handleFormSubmit,
    addNewCard,
    createCard
} from './cards.js';


const arkhyz = new URL('../images/arkhyz.jpg', import.meta.url);
const chelyabinsk = new URL('../images/chelyabinsk.jpg', import.meta.url);
const ivanovo = new URL('../images/ivanovo.jpg', import.meta.url);
const kamchatka = new URL('../images/kamchatka.jpg', import.meta.url);
const kholmogorsky = new URL('../images/kholmogorsky.jpg', import.meta.url);
const baikal = new URL('../images/baikal.jpg', import.meta.url);

const initialCards = [
  { name: 'Архыз', link: arkhyz },
  { name: 'Челябинская область', link: chelyabinsk},
  { name: 'Иваново', link: ivanovo },
  { name: 'Камчатка', link: kamchatka },
  { name: 'Холмогорский район', link: kholmogorsky },
  { name: 'Байкал', link: baikal}
];

export const cardsList = document.querySelector('.places__list'); // определяем контейнер, куда добавим карточки
const cardButton = document.querySelector('.profile__add-button');
const userProfileButton = document.querySelector('.profile__edit-button');
export const popupAddCard = document.querySelector('.popup__type_new-card');
export const popupUserProfile = document.querySelector('.popup__type_edit');
const popupCloseButton = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');
const formProfile = document.forms['edit-profile'];
export const nameInput = formProfile.querySelector('.popup__input_type_name');
export const jobInput = formProfile.querySelector('.popup__input_type_description');
export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');
export const formCard = document.forms['new-place'];
export const placeInput = formCard.querySelector('.popup__input_type_card-name');
export const linkInput = formCard.querySelector('.popup__input_type_url');

cardButton.addEventListener('click', function() {
    openPopup(popupAddCard) 
});

userProfileButton.addEventListener('click', function() {
    
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    
    openPopup(popupUserProfile);
});

popupCloseButton.forEach(function(button) {
    button.addEventListener('click', function() {
        closePopup();
    });
});

popups.forEach(function(popup) {
    popup.addEventListener('click', closePopupOnOverlay);
})

formProfile.addEventListener('submit', handleFormSubmit); 

formCard.addEventListener('submit', addNewCard); 

initialCards.forEach(function (cardData) { // перебираем с помощью цикла для каждой карточки массива
    const card = createCard(cardData, deleteCard, likeCard, openPopupCardImage); // создаем карточку функцией createCard, используя данные этой карточки и функцию удаления. добавляем ее в переменную
    cardsList.append(card); // добавляем карточку в контейнер cardsList, отображается на стратнице
})