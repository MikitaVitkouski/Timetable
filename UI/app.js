document.getElementById('add-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent page reload

    const subject = document.getElementById('subject').value;
    const description = document.getElementById('description').value;
    const author = document.getElementById('author').value;
    const time = document.getElementById('time').value;

    fetch('/api/timetable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, description, author, time })
    })
    .then(response => response.json())
    .then(data => {
        controller.addObj(data);
        alert('Added successfully!');
    })
    .catch(err => alert('Error adding timetable: ' + err));
});

// Function to handle Edit Timetable form submission (Update)
document.getElementById('edit-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent page reload

    const id = document.getElementById('edit-id').value;
    const subject = document.getElementById('edit-subject').value;
    const description = document.getElementById('edit-description').value;
    const author = document.getElementById('edit-author').value;
    const time = document.getElementById('edit-time').value;

    fetch(`/api/timetable/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, description, author, time })
    })
    .then(response => response.json())
    .then(data => {
        alert('Updated successfully!');
        loadTimetable();  // Refresh timetable
    })
    .catch(err => alert('Error updating timetable: ' + err));
});

// Function to handle Search Information form submission (Read)
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Останавливаем перезагрузку страницы

    const subject = document.getElementById('search-subject').value;
    const author = document.getElementById('search-author').value;
    const time = document.getElementById('search-time').value;

    // Создаём объект с фильтром
    const filter = {};
    if (subject) filter.subject = subject;
    if (author) filter.author = author;
    if (time) filter.time = time;

    // Отправляем запрос на сервер для фильтрации
    controller.filterObjs(filter);
});


// Function to handle Delete Timetable (Delete)
function deleteTimetable(id) {
    if (confirm('Are you sure you want to delete this timetable?')) {
        fetch(`/api/timetable/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            alert('Deleted successfully!');
            loadTimetable();  // Refresh timetable
        })
        .catch(err => alert('Error deleting timetable: ' + err));
}

// Function to load timetable (Read all)
function loadTimetable() {
    fetch('/api/timetable')
        .then(response => response.json())
        .then(data => displayTimetable(data))
        .catch(err => alert('Error loading timetable: ' + err));
}

// Function to display timetable data
function displayTimetable(timetables) {
    const timetableList = document.getElementById('timetable-list');
    timetableList.innerHTML = '';  // Clear current list

    timetables.forEach(item => {
        timetableList.innerHTML += `
            <div>
                <h4>${item.subject}</h4>
                <p>${item.description}</p>
                <p>Author: ${item.author}</p>
                <p>Time: ${item.time}</p>
                <p>Created At: ${new Date(item.createdAt).toLocaleString()}</p>
                <button onclick="deleteTimetable(${item.id})">Delete</button>
                <button onclick="editTimetable(${item.id})">Edit</button>
            </div>
        `;
    });
}

// Function to populate Edit form with current timetable data
function editTimetable(id) {
    fetch(`/api/timetable/${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('edit-id').value = data.id;
            document.getElementById('edit-subject').value = data.subject;
            document.getElementById('edit-description').value = data.description;
            document.getElementById('edit-author').value = data.author;
            document.getElementById('edit-time').value = data.time;
        })
        .catch(err => alert('Error fetching timetable data for edit: ' + err));
}