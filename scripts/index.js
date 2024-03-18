const cardsList = document.querySelector('.places__list'); // определяем контейнер, куда добавим карточки
const cardTemplate = document.querySelector('#card-template').content; // получаем содержимое тэга template

function createCard (cardData, deleteCard) { // функция добавления карточки, параметры - информация одной карточки и функция удаления карточки
    const card = cardTemplate.cloneNode(true); // создает новый экземпляр шаблона карточки
    const cardImage = card.querySelector('.card__image'); // определяем класс, отвечающий за отрисовку изображения карточки
    const cardTitle = card.querySelector('.card__title'); // определяем класс, отвечающий за отрисовку наименования карточки
    cardImage.src = cardData.link; // указываем взаимосвязь константы с классом и поля массива - ссылка на картинку
    cardImage.alt = cardData.name; // указываем взаимосвязь константы с классом и поля массива - название карточки
    cardTitle.textContent = cardData.name; // указываем взаимосвязь константы с классом и поля массива - оаисание карточки
    
    const cardDeleterIcon = card.querySelector('.card__delete-button'); // определяем класс, отвечающий за удаление карточки
    cardDeleterIcon.addEventListener('click', function() { // добавляем обработчик клика на кнопку удаления
        deleteCard(); // вызываем функцию удаления карточки
    })
    return card; // возвращаем готовую карточку как результат функции
};

function deleteCard() { // функция удаления карточки
    const card = document.querySelector('.places__item'); // определяем класс, отвечающий за отрисовку карточки
    card.remove(); // удаляем карточку
}

initialCards.forEach(function (cardData) { // перебираем с помощью цикла для каждой карточки массива
    const card = createCard(cardData, deleteCard); // создаем карточку функцией createCard, используя данные этой карточки и функцию удаления. добавляем ее в переменную
    cardsList.append(card); // добавляем карточку в контейнер cardsList, отображается на стратнице
})




