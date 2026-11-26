// Находим форму на странице по её id
const form = document.getElementById('form');

// Функция показывает ошибку под полем
function showError(id, text) {
    document.getElementById(id + 'Error').textContent = text;
    document.getElementById(id).classList.add('invalid');
}

// Функция убирает ошибку у поля
function clearError(id) {
    document.getElementById(id + 'Error').textContent = '';
    document.getElementById(id).classList.remove('invalid');
}

// Когда пользователь нажимает «Записаться», запускается эта функция
form.addEventListener('submit', function (event) {
    // Отменяем стандартную отправку формы (иначе страница перезагрузится)
    event.preventDefault();

    // Берём значения из полей. trim() убирает пробелы по краям
    const petName = document.getElementById('petName').value.trim();
    const petAge = document.getElementById('petAge').value.trim();
    const ownerName = document.getElementById('ownerName').value.trim();
    const petType = document.getElementById('petType').value;
    const description = document.getElementById('description').value.trim();
    const phone = document.getElementById('phone').value.trim();

    // Шаблон: только русские/английские буквы, пробел и дефис
    const lettersOnly = /^[А-Яа-яЁёA-Za-z\s-]+$/;

    // Флаг: true — ошибок нет. Если найдём ошибку — поставим false
    let isValid = true;

    // 1. Проверка имени питомца
    if (petName === '') {
        showError('petName', 'Введите имя питомца');
        isValid = false;
    } else if (!lettersOnly.test(petName)) {
        showError('petName', 'Имя может содержать только буквы');
        isValid = false;
    } else {
        clearError('petName');
    }

    // 2. Проверка возраста
    if (petAge === '') {
        showError('petAge', 'Введите возраст питомца');
        isValid = false;
    } else if (Number(petAge) < 0 || Number(petAge) > 30) {
        showError('petAge', 'Возраст должен быть от 0 до 30 лет');
        isValid = false;
    } else {
        clearError('petAge');
    }

    // 3. Проверка имени владельца
    if (ownerName === '') {
        showError('ownerName', 'Введите имя владельца');
        isValid = false;
    } else if (!lettersOnly.test(ownerName)) {
        showError('ownerName', 'Имя может содержать только буквы');
        isValid = false;
    } else if (ownerName.length < 2) {
        showError('ownerName', 'Имя слишком короткое');
        isValid = false;
    } else {
        clearError('ownerName');
    }

    // 4. Проверка типа питомца
    if (petType === '') {
        showError('petType', 'Выберите тип питомца');
        isValid = false;
    } else {
        clearError('petType');
    }

    // 5. Проверка описания болезни
    if (description.length < 10) {
        showError('description', 'Опишите болезнь подробнее (минимум 10 символов)');
        isValid = false;
    } else {
        clearError('description');
    }

    // 6. Проверка телефона
    // Убираем пробелы, скобки и дефисы: "+7 (900) 123-45-67" -> "+79001234567"
    const cleanPhone = phone.replace(/[\s()-]/g, '');
    // Номер должен начинаться с +7 или 8, потом ровно 10 цифр
    const phonePattern = /^(\+7|8)\d{10}$/;

    if (phone === '') {
        showError('phone', 'Введите номер телефона');
        isValid = false;
    } else if (!phonePattern.test(cleanPhone)) {
        showError('phone', 'Формат: +7XXXXXXXXXX или 8XXXXXXXXXX');
        isValid = false;
    } else {
        clearError('phone');
    }

    // Если ошибок нет — показываем сообщение и очищаем форму
    const result = document.getElementById('result');
    if (isValid) {
        result.textContent = ownerName + ', ваш питомец ' + petName +
            ' записан к врачу! Мы позвоним вам по номеру ' + phone + '.';
        form.reset();
    } else {
        result.textContent = '';
    }
});
