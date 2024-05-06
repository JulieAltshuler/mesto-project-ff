import { 
  deleteCardId,
  postCardLike,
  deleteCardLike
} from './api.js';


export function deleteCard(event) {
  const cardElement = event.target.closest('.places__item');
    const cardId = cardElement.dataset.cardId;

    deleteCardId(cardId)
        .then(() => {
            cardElement.remove();
            console.log('Карточка успешно удалена');
        })
        .catch(error => {
            console.error(`Произошла ошибка при удалении карточки: ${error}`);
        });
}

export function togglelikeCard(evt) {
  const card = evt.target.closest('.places__item');
  const cardLikeBtn = card.querySelector('.card__like-button_img');
  const cardLikeCounter = card.querySelector('.card__like-button_counter');
  const isLiked = cardLikeBtn.classList.contains('card__like-button_is-active');

  const cardId = card.dataset.cardId;

  if (isLiked) {
      // Убираем лайк
      cardLikeBtn.classList.remove('card__like-button_is-active');
      cardLikeCounter.textContent = parseInt(cardLikeCounter.textContent) - 1;
      // Отправляем запрос на сервер для удаления лайка
      deleteCardLike(cardId)
          .then((updatedCardData) => {
              // Обновляем счетчик лайков
              cardLikeCounter.textContent = updatedCardData.likes.length;
          })
          .catch((error) => {
              console.error(`Ошибка при удалении лайка: ${error}`);
          });
  } else {
      // Ставим лайк
      cardLikeBtn.classList.add('card__like-button_is-active');
      cardLikeCounter.textContent = parseInt(cardLikeCounter.textContent) + 1;
      // Отправляем запрос на сервер для добавления лайка
      postCardLike(cardId)
          .then((updatedCardData) => {
              // Обновляем счетчик лайков
              cardLikeCounter.textContent = updatedCardData.likes.length;
          })
          .catch((error) => {
              console.error(`Ошибка при добавлении лайка: ${error}`);
          });
  }
}

export function createCard (cardData, deleteCard, togglelikeCard, openPopupCardImage, isMyCard) {
  const cardTemplate = document.querySelector('#card-template').content; // получаем содержимое тэга template
  const card = cardTemplate.cloneNode(true); // создает новый экземпляр шаблона карточки
  const cardImage = card.querySelector('.card__image'); // определяем класс, отвечающий за отрисовку изображения карточки
  const cardTitle = card.querySelector('.card__title'); // определяем класс, отвечающий за отрисовку наименования карточки
  cardImage.src = cardData.link; // указываем взаимосвязь константы с классом и поля массива - ссылка на картинку
  cardImage.alt = cardData.name; // указываем взаимосвязь константы с классом и поля массива - название карточки
  cardTitle.textContent = cardData.name; // указываем взаимосвязь константы с классом и поля массива - описание карточки
  const cardElement = card.querySelector('.places__item');
  cardElement.dataset.cardId = cardData._id;

  const cardLikeIcon = card.querySelector('.card__like-button_img'); // определяем класс, отвечающий за удаление карточки
  cardLikeIcon.addEventListener('click', togglelikeCard); // добавляем обработчик клика на кнопку удаления
  const cardLikeCounter = card.querySelector('.card__like-button_counter');
  cardLikeCounter.textContent = cardData.likes.length;
  
  cardImage.addEventListener('click', function() {
      openPopupCardImage(cardData);
  });

  return card; // возвращаем готовую карточку как результат функции
};