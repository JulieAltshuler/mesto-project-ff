import '../pages/index.css';
import {
  openPopup,
  closePopup,
  setCloseModalByClickListeners,
} from './modal.js';

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
const popupList = document.querySelectorAll('.popup');
const formProfile = document.forms['edit-profile'];
const nameInput = formProfile.querySelector('.popup__input_type_name');
const jobInput = formProfile.querySelector('.popup__input_type_description');
const profileFormSubmitButton = formProfile.querySelector('.popup__button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const formCard = document.forms['new-place'];
const placeInput = formCard.querySelector('.popup__input_type_card-name');
const linkInput = formCard.querySelector('.popup__input_type_url');
const cardFormSubmitButton = formCard.querySelector('.popup__button');
const popupCardImage = document.querySelector('.popup__type_image');
const popupImageLink = popupCardImage.querySelector('.popup__image');
const popupImageText = popupCardImage.querySelector('.popup__caption');

const avatarPopup = document.querySelector('.popup__type_avatar');
const avatarEditForm = document.forms['avatar-edit'];
const avatarInput = avatarEditForm.querySelector('.popup__input_type_avatar');
const avatarFormSubmitButton = avatarEditForm.querySelector('.popup__button');
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

function handleProfileFormSubmit(evt, userData) {
  evt.preventDefault();
  setIsLoadingButton(true, profileFormSubmitButton);

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
      setIsLoadingButton(false, profileFormSubmitButton);
    });
}

function handleCardFormSubmit(evt, cardData) {
  evt.preventDefault();
  setIsLoadingButton(true, cardFormSubmitButton);

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
      clearValidation(formCard, validationConfigMesto);
    })
    .catch((error) => {
      console.error(`Произошла ошибка при создании карточки ${error}`);
    })
    .finally(() => {
      setIsLoadingButton(false, cardFormSubmitButton);
    });
}

function handleAvatarFormSubmit(evt, userData) {
  evt.preventDefault();
  setIsLoadingButton(true, avatarFormSubmitButton);

  changeUserAvatar(userData)
    .then((data) => {
      avatarUserProfile.src = data.avatar;
      closePopup(avatarPopup);
      evt.target.reset();
      clearValidation(avatarEditForm, validationConfigMesto);
    })
    .catch((error) => {
      console.error('Ошибка при обновлении аватара:', error);
    })
    .finally(() => {
      setIsLoadingButton(false, avatarFormSubmitButton);
    });
}

avatarPopupOpenButton.addEventListener('click', function () {
  openPopup(avatarPopup);
  clearValidation(avatarEditForm, validationConfigMesto);
  avatarEditForm.reset();
});

avatarEditForm.addEventListener('submit', function (evt) {
  handleAvatarFormSubmit(evt, { avatar: avatarInput.value });
});

openAddCardPopupButton.addEventListener('click', function () {
  openPopup(popupAddCard);
});

openEditProfilePopupButton.addEventListener('click', function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupUserProfile);
  clearValidation(formProfile, validationConfigMesto);
});

setCloseModalByClickListeners(popupList);

formProfile.addEventListener('submit', function (evt) {
  handleProfileFormSubmit(evt, {
    name: nameInput.value,
    about: jobInput.value,
  });
});

formCard.addEventListener('submit', function (evt) {
  handleCardFormSubmit(evt, { name: placeInput.value, link: linkInput.value });
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
