class Timetable {
    constructor(objInf) {
        this.objInf = objInf;  // Инициализация с данными
    }

    async getObjs(filterConfig = {}) {
        // Получение данных с сервера (по умолчанию все объекты)
        const queryParams = new URLSearchParams(filterConfig).toString();
        const response = await fetch(`/api/timetable?${queryParams}`);
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error fetching timetable data');
        }
    }

    async addObj(obj) {
        // Отправляем POST-запрос на добавление нового объекта в расписание
        const response = await fetch('/api/timetable', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj),
        });
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error adding timetable object');
        }
    }

    async removeObj(id) {
        // Отправляем DELETE-запрос на удаление объекта по ID
        const response = await fetch(`/api/timetable/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Error removing timetable object');
        }
    }

    async editObj(id, newProps) {
        // Отправляем PUT-запрос на обновление объекта по ID
        const response = await fetch(`/api/timetable/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProps),
        });
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error editing timetable object');
        }
    }
}