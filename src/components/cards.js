import { cardsList, popupAddCard, popupUserProfile, profileTitle, profileDescription, nameInput, jobInput, placeInput, linkInput } from './index';
import { closePopup, openPopupCardImage } from './modal';

export function deleteCard(event) { // функция удаления карточки
  const card = event.target.closest('.places__item'); // определяем родительский элемент, с помощью метода closest выбираем ближайший элемент
  card.remove(); // удаляем карточку
}

export function likeCard(event) {
  const card = event.target.closest('.places__item'); // определяем родительский элемент, с помощью метода closest выбираем ближайший элемент
  const likeButton = card.querySelector('.card__like-button');
  likeButton.classList.toggle('card__like-button_is-active');
}

export function handleFormSubmit(evt) {
  evt.preventDefault();
  
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  
  closePopup(popupUserProfile);
}

export function addNewCard(evt) {
  evt.preventDefault();
  
  const card = {name: placeInput.value, link: linkInput.value};
  cardsList.prepend(createCard(card, deleteCard, likeCard, openPopupCardImage));
  
  closePopup(popupAddCard);
  
  evt.target.reset();
  
}

export function createCard (cardData, deleteCard, likeCard, openPopupCardImage) { // функция добавления карточки, параметры - информация одной карточки и функция удаления карточки
  const cardTemplate = document.querySelector('#card-template').content; // получаем содержимое тэга template
  const card = cardTemplate.cloneNode(true); // создает новый экземпляр шаблона карточки
  const cardImage = card.querySelector('.card__image'); // определяем класс, отвечающий за отрисовку изображения карточки
  const cardTitle = card.querySelector('.card__title'); // определяем класс, отвечающий за отрисовку наименования карточки
  cardImage.src = cardData.link; // указываем взаимосвязь константы с классом и поля массива - ссылка на картинку
  cardImage.alt = cardData.name; // указываем взаимосвязь константы с классом и поля массива - название карточки
  cardTitle.textContent = cardData.name; // указываем взаимосвязь константы с классом и поля массива - оаисание карточки
  
  const cardDeleterIcon = card.querySelector('.card__delete-button'); // определяем класс, отвечающий за удаление карточки
  cardDeleterIcon.addEventListener('click', deleteCard); // добавляем обработчик клика на кнопку удаления
  
  const cardLikeIcon = card.querySelector('.card__like-button'); // определяем класс, отвечающий за удаление карточки
  cardLikeIcon.addEventListener('click', likeCard); // добавляем обработчик клика на кнопку удаления
  
  cardImage.addEventListener('click', function() {
      openPopupCardImage(cardData);
  });
  
  return card; // возвращаем готовую карточку как результат функции
};