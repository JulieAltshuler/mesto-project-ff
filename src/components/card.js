import { deleteCardId, postCardLike, deleteCardLike } from './api.js';
import { cardTemplate, currentUserId } from './index.js';

export function deleteCard(cardElement, cardId) {
  deleteCardId(cardId)
    .then(() => {
      cardElement.remove();
      console.log('Карточка успешно удалена');
    })
    .catch((error) => {
      console.error(`Произошла ошибка при удалении карточки: ${error}`);
    });
}

export function toggleLikeCard(
  cardId,
  isLiked,
  cardLikeButton,
  cardLikeCounter
) {
  if (isLiked) {
    deleteCardLike(cardId)
      .then((updatedCardData) => {
        cardLikeButton.classList.remove('card__like-button_is-active');
        cardLikeCounter.textContent = updatedCardData.likes.length;
      })
      .catch((error) => {
        console.error(`Ошибка при удалении лайка: ${error}`);
      });
  } else {
    postCardLike(cardId)
      .then((updatedCardData) => {
        cardLikeButton.classList.add('card__like-button_is-active');
        cardLikeCounter.textContent = updatedCardData.likes.length;
      })
      .catch((error) => {
        console.error(`Ошибка при добавлении лайка: ${error}`);
      });
  }
}

export function createCard(cardData, deleteCard, toggleLikeCard, onImageClick) {
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const cardElement = card.querySelector('.places__item');
  const cardLikeButton = card.querySelector('.card__like-button_img');
  const cardLikeCounter = card.querySelector('.card__like-button_counter');
  const deleteButton = card.querySelector('.card__delete-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  cardElement.dataset.cardId = cardData._id;

  cardImage.addEventListener('click', function () {
    onImageClick(cardData);
  });

  // Проверка наличия лайка текущего пользователя
  const isLikedByCurrentUser = cardData.likes.some(
    (like) => like._id === currentUserId
  );
  if (isLikedByCurrentUser) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }
  cardLikeCounter.textContent = cardData.likes.length;
  cardLikeButton.addEventListener('click', () => {
    const isLiked = cardLikeButton.classList.contains(
      'card__like-button_is-active'
    );
    toggleLikeCard(cardData._id, isLiked, cardLikeButton, cardLikeCounter);
  });
  const cardOwnerId = cardData.owner._id;
  const isMyCard = cardOwnerId === currentUserId; //cравниваем идентификатор владельца карточки с идентификатором текущего пользователя
  if (isMyCard) {
    deleteButton.addEventListener('click', () => {
      deleteCard(cardElement, cardData._id);
      deleteButton.style.display = 'none';
    });
  } else {
    deleteButton.remove();
  }

  return card;
}
