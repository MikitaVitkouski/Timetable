// Управление видимостью страниц
// Получаем все секции и ссылки навигации
const sections = document.querySelectorAll('main > section');
const navLinks = document.querySelectorAll('header nav a');

// Функция для переключения видимости секций
function switchSection(targetId) {
    sections.forEach(section => section.style.display = 'none');
    const targetSection = document.querySelector(`#${targetId}`);
    if (targetSection) targetSection.style.display = 'block';
}

// Обработчики событий для навигационных ссылок
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1); // Получаем id секции
        switchSection(targetId);  // Переключаем секцию
        window.location.hash = targetId;  // Обновляем хэш в URL
    });
});

// Инициализация: проверяем хэш в URL и показываем нужную секцию
window.addEventListener('load', () => {
    const currentHash = window.location.hash.substring(1);  // Получаем текущий хэш без знака '#'
    if (currentHash) {
        switchSection(currentHash);
    } else {
        switchSection('home'); // Если хэша нет, показываем секцию "home"
    }
});

// Обновление отображения данных из localStorage
function updateLocalStorageDisplay(filteredData = null, section = 'add') {
    const localStorageDisplay = document.getElementById('localStorageDisplay');
    localStorageDisplay.innerHTML = ''; // Очищаем текущий список

    // Если фильтры не применяются, показываем все данные
    const data = filteredData || Object.keys(localStorage).map(key => JSON.parse(localStorage.getItem(key)));

    data.forEach((value, index) => {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('local-storage-entry');

        entryDiv.innerHTML = `
            <strong>${value.subject}</strong><br>
            ${value.description}<br>
            Time: ${value.time}<br>
            Room: ${value.room}<br>
            Teacher: ${value.teacher}<br>
            Created At: ${value.createdAt}  <!-- Показываем дату создания -->
        `;

        // Кнопка удаления
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            const keyToDelete = Object.keys(localStorage)[index]; // Получаем ключ для удаления
            localStorage.removeItem(keyToDelete);
            updateLocalStorageDisplay(); // Обновляем список
        });
        entryDiv.appendChild(deleteButton);

        // Кнопка редактирования
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
            // Заполняем форму для редактирования
            document.getElementById('subject').value = value.subject;
            document.getElementById('description').value = value.description;
            document.getElementById('time').value = value.time;
            document.getElementById('room').value = value.room;
            document.getElementById('teacher').value = value.teacher;

            // Сохраняем ключ объекта для последующего обновления
            document.getElementById('editKey').value = Object.keys(localStorage)[index];

            // Показываем форму редактирования
            document.getElementById('add-form').style.display = 'block';
        });
        entryDiv.appendChild(editButton);

        localStorageDisplay.appendChild(entryDiv);
    });
}


// Слушатель события добавления новой записи
document.getElementById('add-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const subject = document.getElementById('subject').value;
    const description = document.getElementById('description').value;
    const time = document.getElementById('time').value;
    const room = document.getElementById('room').value;
    const teacher = document.getElementById('teacher').value;

    // Добавляем дату создания
    const createdAt = new Date().toLocaleString();  // Получаем текущую дату и время

    // Новый объект без поля 'author' и с датой создания
    const newItem = { subject, description, time, room, teacher, createdAt };
    const keyToUpdate = document.getElementById('editKey').value;

    if (keyToUpdate) {
        // Если существует ключ для редактирования, обновляем запись
        localStorage.setItem(keyToUpdate, JSON.stringify(newItem));
    } else {
        // Если ключа нет, это новая запись
        localStorage.setItem(Date.now(), JSON.stringify(newItem));
    }

    updateLocalStorageDisplay(); // Обновляем отображение
    document.getElementById('add-form').reset(); // Очищаем форму
    document.getElementById('editKey').value = ''; // Сбрасываем ключ редактирования
});

// Слушатель события фильтрации в Add Info
document.getElementById('filter-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Останавливаем перезагрузку страницы

    // Получаем значения фильтров
    const subjectFilter = document.getElementById('filter-subject').value.toLowerCase();
    const roomFilter = document.getElementById('filter-room').value.toLowerCase();
    const teacherFilter = document.getElementById('filter-teacher').value.toLowerCase();

    // Получаем все данные из localStorage
    const allData = Object.keys(localStorage).map(key => JSON.parse(localStorage.getItem(key)));

    // Фильтруем данные
    const filteredData = allData.filter(item => {
        const matchesSubject = subjectFilter ? item.subject.toLowerCase().includes(subjectFilter) : true;
        const matchesRoom = roomFilter ? item.room.toLowerCase().includes(roomFilter) : true;
        const matchesTeacher = teacherFilter ? item.teacher.toLowerCase().includes(teacherFilter) : true;
        return matchesSubject && matchesRoom && matchesTeacher;
    });

    // Обновляем отображение с учетом фильтра
    updateLocalStorageDisplay(filteredData, 'add');
});

// Добавление обработчика для кнопки Cancel
document.getElementById('cancel-button').addEventListener('click', () => {
    // Если мы находимся в режиме редактирования (с выбранным ключом для редактирования)
    if (document.getElementById('editKey').value !== '') {
        // Скрываем только форму редактирования
        document.getElementById('add-form').style.display = 'block';  // Убедимся, что форма добавления открыта
        document.getElementById('editKey').value = ''; // Очищаем скрытое поле ключа редактирования

        // Очищаем поля формы (для редактирования)
        document.getElementById('subject').value = '';
        document.getElementById('description').value = '';
        document.getElementById('time').value = '';
        document.getElementById('room').value = '';
        document.getElementById('teacher').value = '';
    }
    // Если находимся не в режиме редактирования, форма добавления останется открытой
});


// Кнопка редактирования
editButton.addEventListener('click', () => {
    // Заполняем форму для редактирования
    document.getElementById('subject').value = value.subject;
    document.getElementById('description').value = value.description;
    document.getElementById('time').value = value.time;
    document.getElementById('room').value = value.room;
    document.getElementById('teacher').value = value.teacher;

    // Сохраняем ключ объекта для последующего обновления
    document.getElementById('editKey').value = Object.keys(localStorage)[index];

    // Показываем форму редактирования
    document.getElementById('add-form').style.display = 'block';
});