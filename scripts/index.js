const cardsList = document.querySelector('.places__list'); // определяем контейнер, куда добавим карточки
const cardTemplate = document.querySelector('#card-template').content; // получаем содержимое тэга template

function createCard (cardData, cardDeleter) { // функция добавления карточки, параметры - информация одной карточки и функция удаления карточки
    const cardsUser = cardTemplate.cloneNode(true); // создает новый экземпляр шаблона карточки
    const cardImage = cardsUser.querySelector('.card__image'); // определяем класс, отвечающий за отрисовку изображения карточки
    const cardTitle = cardsUser.querySelector('.card__title'); // определяем класс, отвечающий за отрисовку наименования карточки
    cardImage.src = cardData.link; // указываем взаимосвязь константы с классом и поля массива
    cardTitle.textContent = cardData.name; // указываем взаимосвязь константы с классом и поля массива
    
    const cardDeleterIcon = cardsUser.querySelector('.card__delete-button'); // определяем класс, отвечающий за удаление карточки
    cardDeleterIcon.addEventListener('click', function() { // добавляем обработчик клика на кнопку удаления
        cardDeleter(); // вызываем функцию удаления карточки
    })
    return cardsUser; // возвращаем готовую карточку как результат функции
};

function cardDeleter() { // функция удаления карточки
    const card = document.querySelector('.places__item'); // определяем класс, отвечающий за отрисовку карточки
    card.remove(); // удаляем карточку
}

initialCards.forEach(function (cardData) { // перебираем с помощью цикла для каждой карточки массива
    const cardsUser = createCard(cardData, cardDeleter); // создаем карточку функцией createCard, используя данные этой карточки и функцию удаления. добавляем ее в переменную
    cardsList.append(cardsUser); // добавляем карточку в контейнер cardsList, отображается на стратнице
})




