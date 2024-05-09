import '../pages/index.css';
import { openPopup, closePopup, closePopupOnOverlay } from './modal.js';

import { deleteCard, toggleLikeCard, createCard } from './card.js';

import { enableValidation, clearValidation } from './validation.js';

import {
  getCards,
  getUserInfo,
  changeUserInfo,
  postNewCard,
  changeUserAvatar,
} from './api.js';

export const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');
const openAddCardPopupButton = document.querySelector('.profile__add-button');
const openEditProfilePopupButton = document.querySelector(
  '.profile__edit-button'
);
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

export const validationConfigMesto = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-error_active',
  errorClass: 'popup__input_invalid',
};

export let currentUserId;

function setIsLoadingButton(isLoading, submitButton) {
  if (isLoading) {
    submitButton.textContent = 'Сохранение...';
    submitButton.disabled = true;
  } else {
    submitButton.textContent = 'Сохранить';
    submitButton.disabled = false;
  }
}

function onImageClick(cardData) {
  // функция открытия попапа
  popupImageLink.src = cardData.link;
  popupImageText.textContent = cardData.name;
  popupImageText.alt = cardData.name;
  openPopup(popupCardImage);
}

function handleProfileForm(evt, userData) {
  evt.preventDefault();

  setIsLoadingButton(true, formProfile.querySelector('.popup__button'));

  changeUserInfo(userData)
    .then((data) => {
      nameInput.value = data.name;
      jobInput.value = data.about;
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closePopup(popupUserProfile);
    })
    .catch((error) => {
      console.error(
        `Произошла ошибка при внесении изменений в профиль ${error}`
      );
    })
    .finally(() => {
      setIsLoadingButton(false, formProfile.querySelector('.popup__button'));
    });
}

function handleCardForm(evt, cardData) {
  evt.preventDefault();
  setIsLoadingButton(true, formCard.querySelector('.popup__button'));

  postNewCard(cardData)
    .then((cardData) => {
      const card = createCard(
        cardData,
        deleteCard,
        toggleLikeCard,
        onImageClick,
        currentUserId
      );
      cardsContainer.prepend(card);

      closePopup(popupAddCard);
      evt.target.reset();
    })
    .catch((error) => {
      console.error(`Произошла ошибка при создании карточки ${error}`);
    })
    .finally(() => {
      setIsLoadingButton(false, formCard.querySelector('.popup__button'));
    });
}

function handleAvatarUpdate(evt, userData) {
  evt.preventDefault();
  setIsLoadingButton(true, avatarEditForm.querySelector('.popup__button'));

  changeUserAvatar(userData)
    .then((data) => {
      avatarUserProfile.src = data.avatar;
      closePopup(avatarPopup);
      evt.target.reset();
    })
    .catch((error) => {
      console.error('Ошибка при обновлении аватара:', error);
    })
    .finally(() => {
      setIsLoadingButton(false, avatarEditForm.querySelector('.popup__button'));
    });
}

avatarPopupOpenButton.addEventListener('click', function () {
  openPopup(avatarPopup);
  clearValidation(avatarEditForm, validationConfigMesto);
});

avatarEditForm.addEventListener('submit', function (evt) {
  handleAvatarUpdate(evt, { avatar: avatarInput.value });
});

openAddCardPopupButton.addEventListener('click', function () {
  openPopup(popupAddCard);
  clearValidation(formCard, validationConfigMesto);
});

openEditProfilePopupButton.addEventListener('click', function () {
  getUserInfo()
    .then(() => {
      nameInput.value = profileTitle.textContent;
      jobInput.value = profileDescription.textContent;

      openPopup(popupUserProfile);
      clearValidation(formProfile, validationConfigMesto);
    })
    .catch((error) => {
      console.error(
        `Произошла ошибка при внесении изменений в профиль ${error}`
      );
    });
});

popupCloseButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    const popupElement = document.querySelector('.popup_is-opened');
    closePopup(popupElement);
  });
});

popups.forEach(function (popup) {
  popup.addEventListener('click', closePopupOnOverlay);
});

formProfile.addEventListener('submit', function (evt) {
  handleProfileForm(evt, { name: nameInput.value, about: jobInput.value });
});

formCard.addEventListener('submit', function (evt) {
  handleCardForm(evt, { name: placeInput.value, link: linkInput.value });
});

Promise.all([getUserInfo(), getCards()])
  .then(([userData, cardsData]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    avatarUserProfile.src = userData.avatar;

    currentUserId = userData._id;

    cardsData.forEach((cardData) => {
      const card = createCard(
        cardData,
        deleteCard,
        toggleLikeCard,
        onImageClick,
        currentUserId
      );
      cardsContainer.append(card);
    });
  })
  .catch((error) => {
    console.error(`Произошла ошибка при получении данных: ${error}`);
  });

enableValidation(validationConfigMesto);
