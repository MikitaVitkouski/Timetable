
    // Управление видимостью страниц
    const sections = document.querySelectorAll('main > section');
    const navLinks = document.querySelectorAll('header nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = document.querySelector(link.getAttribute('href'));
            sections.forEach(section => section.style.display = 'none');
            if (targetSection) targetSection.style.display = 'block';
        });
    });

    function updateLocalStorageDisplay(filteredData = null) {
        const localStorageDisplay = document.getElementById('localStorageDisplay');
        localStorageDisplay.innerHTML = '';
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
                Author: ${value.author}
            `;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                const keyToDelete = Object.keys(localStorage)[index]; // Получаем ключ для удаления
                localStorage.removeItem(keyToDelete);
                updateLocalStorageDisplay();
            });

            entryDiv.appendChild(deleteButton);
            localStorageDisplay.appendChild(entryDiv);
        });
    }

    document.getElementById('add-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const subject = document.getElementById('subject').value;
        const description = document.getElementById('description').value;
        const time = document.getElementById('time').value;
        const room = document.getElementById('room').value;
        const teacher = document.getElementById('teacher').value;
        const author = 'Mikita Vitkouski';
        localStorage.setItem(Date.now(), JSON.stringify({ subject, description, time, room, teacher, author }));
        updateLocalStorageDisplay();
    });

    document.getElementById('filter-form').addEventListener('submit', (e) => {
        e.preventDefault(); // Останавливаем перезагрузку страницы
        
        // Получаем значения полей фильтра
        const subjectFilter = document.getElementById('filter-subject').value.toLowerCase();
        const roomFilter = document.getElementById('filter-room').value.toLowerCase();
        const teacherFilter = document.getElementById('filter-teacher').value.toLowerCase();
        
        // Получаем все объекты из localStorage
        const allData = Object.keys(localStorage).map(key => JSON.parse(localStorage.getItem(key)));

        // Применяем фильтры
        const filteredData = allData.filter(item => {
            const matchesSubject = subjectFilter ? item.subject.toLowerCase().includes(subjectFilter) : true;
            const matchesRoom = roomFilter ? item.room.toLowerCase().includes(roomFilter) : true;
            const matchesTeacher = teacherFilter ? item.teacher.toLowerCase().includes(teacherFilter) : true;
            return matchesSubject && matchesRoom && matchesTeacher;
        });

        updateLocalStorageDisplay(filteredData); // Обновляем отображение с учетом фильтра
    });

    // Обновляем отображение при загрузке страницы
    updateLocalStorageDisplay();