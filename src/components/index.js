import '../pages/index.css';
import {
    openPopup,
    closePopup,
    closePopupOnOverlay
} from './modal.js';

import {
    deleteCard,
    togglelikeCard,
    createCard
} from './cards.js';

import {
    enableValidation,
    clearValidation
} from './validation.js';

import {
    getCards,
    getUserInfo,
    changeUserInfo,
    postNewCard,
    changeUserAvatar
} from './api.js';


const cardsList = document.querySelector('.places__list'); // определяем контейнер, куда добавим карточки
const cardButton = document.querySelector('.profile__add-button');
const userProfileButton = document.querySelector('.profile__edit-button');
const popupAddCard = document.querySelector('.popup__type_new-card');
const popupUserProfile = document.querySelector('.popup__type_edit');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');
const formProfile = document.forms['edit-profile'];
const nameInput = formProfile.querySelector('.popup__input_type_name');
const jobInput = formProfile.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formCard = document.forms['new-place'];
const placeInput = formCard.querySelector('.popup__input_type_card-name');
const linkInput = formCard.querySelector('.popup__input_type_url');
const popupCardImage = document.querySelector('.popup__type_image');
const popupImageLink = popupCardImage.querySelector('.popup__image');
const popupImageText = popupCardImage.querySelector('.popup__caption');

const avatarPopup = document.querySelector('.popup__type_avatar');
const avatarEditForm = document.forms['avatar-edit'];
const avatarInput = avatarEditForm.querySelector('.popup__input_type_avatar');
const avatarPopupOpenButton = document.querySelector('.profile__image-button');
const avatarUserProfile = document.querySelector('.profile__image');


const validationConfigMesto = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input-error_active',
    errorClass: 'popup__input_invalid'
};

function isLoading(formElement, isLoading) {
    const submitButton = formElement.querySelector('.popup__button');
    if (isLoading) {
        submitButton.textContent = 'Сохранение...';
        submitButton.disabled = true;
    } else {
        submitButton.textContent = 'Сохранить';
        submitButton.disabled = false;
    }
}

function openPopupCardImage(cardData) { // функция открытия попапа
    popupImageLink.src = cardData.link;
    popupImageText.textContent = cardData.name;
    popupImageText.alt = cardData.name;
    openPopup(popupCardImage);
}

function handleFormSubmit(evt, userData) {
    evt.preventDefault();

    isLoading(formProfile, true);

    changeUserInfo(userData)
        .then(data => {
            nameInput.value = data.name;
            jobInput.value = data.about;
            profileTitle.textContent = data.name;
            profileDescription.textContent = data.about;
            clearValidation(formProfile, validationConfigMesto);
            closePopup(popupUserProfile);
        })
        .catch(error => {
            console.error(`Произошла ошибка при внесении изменений в профиль ${error}`);
        })
        .finally(() => {
            isLoading(formProfile, false);
        });
}

function addNewCard(evt, cardData) {
    evt.preventDefault();
    isLoading(formCard, true);

    postNewCard(cardData)
    .then((data) => {
        placeInput.value = cardData.name;
        linkInput.value = cardData.link;
        const card = createCard(data, deleteCard, togglelikeCard, openPopupCardImage);
        cardsList.prepend(card);
        
        clearValidation(formCard, validationConfigMesto);
        closePopup(popupAddCard);
        evt.target.reset();
    })
    .catch(error => {
            console.error(`Произошла ошибка при создании карточки ${error}`);
        })
    .finally(() => {
        isLoading(formCard, false);
    });
}

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('card__delete-button')) {
        deleteCard(event);
    }
});

function handleAvatarUpdate(evt, userData) {
    evt.preventDefault();
    isLoading(avatarEditForm, true);

    changeUserAvatar(userData)
        .then((data) => {
            avatarInput.value = data.avatar;
            avatarUserProfile.src = data.avatar;
            clearValidation(avatarEditForm, validationConfigMesto);
            closePopup(avatarPopup);
            evt.target.reset();
        })
        .catch((error) => {
            console.error('Ошибка при обновлении аватара:', error);
        })
        .finally(() => {
            isLoading(avatarEditForm, false);
        });
}

avatarPopupOpenButton.addEventListener('click', function() {
    openPopup(avatarPopup) 
});

avatarEditForm.addEventListener('submit', function(evt) {
    handleAvatarUpdate(evt, { avatar: avatarInput.value });
});

cardButton.addEventListener('click', function() {
    openPopup(popupAddCard) 
});

userProfileButton.addEventListener('click', function() {
    getUserInfo()
        .then((userData) => {

            nameInput.value = userData.name;
            jobInput.value = userData.about;
            
            openPopup(popupUserProfile);
    })
        .catch((error) => {
            console.error(`Произошла ошибка при внесении изменений в профиль ${error}`)
    })
    
});

popupCloseButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        closePopup();
    });
});

popups.forEach(function(popup) {
    popup.addEventListener('click', closePopupOnOverlay);
})

formProfile.addEventListener('submit', function(evt) {
    handleFormSubmit(evt, { name: nameInput.value, about: jobInput.value });
});

formCard.addEventListener('submit', function(evt) {
    addNewCard(evt, { name: placeInput.value, link: linkInput.value });
});

Promise.all([getUserInfo(), getCards()])
    .then(([userData, cardsData]) => {

        const currentUserId = userData._id; //сохраняем идентификатор текущего пользователя из данных о пользователе (userData).

        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        avatarUserProfile.src = userData.avatar;


        cardsData.forEach((cardData) => { 
        const cardOwnerId = cardData.owner._id; //получаем идентификатор владельца карточки
        const isMyCard = cardOwnerId === currentUserId; //cравниваем идентификатор владельца карточки с идентификатором текущего пользователя

        const card = createCard(cardData, deleteCard, togglelikeCard, openPopupCardImage, isMyCard);
        const cardDeleterIcon = card.querySelector('.card__delete-button');
        
        if (isMyCard) {
            cardDeleterIcon.addEventListener('click', deleteCard);
          } else {
            cardDeleterIcon.style.display = 'none';
          } 
        cardsList.append(card);
        
        
        })
})
    .catch(error => {
        console.error(`Произошла ошибка при получении данных: ${error}`);
});

enableValidation(validationConfigMesto);
