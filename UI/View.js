class View {
    constructor(containerId) {
        this.container = document.getElementById(containerId);  // Контейнер для отображения объектов
    }

    displayObjs(objList) {
        this.container.innerHTML = '';  // Очищаем контейнер перед обновлением

        // Отображаем каждый объект на странице
        objList.forEach(obj => this.addObjToDOM(obj));
    }

    addObjToDOM(obj) {
        const objElement = document.createElement('div');
        objElement.classList.add('obj');
        objElement.setAttribute('data-id', obj.id);  // Уникальный идентификатор для объекта

        objElement.innerHTML = `
            <h3>${obj.subject}</h3>
            <p>${obj.description}</p>
            <p>Time: ${obj.time}</p>
            <p>Room: ${obj.room}</p>
            <p>Teacher: ${obj.teacher}</p>
            <p>Author: ${obj.author}</p>
            <p>Created: ${new Date(obj.createdAt).toLocaleString()}</p>
            <button class="delete-btn" data-id="${obj.id}">Delete</button>
            <button class="edit-btn" data-id="${obj.id}">Edit</button>
        `;

        this.container.appendChild(objElement);  // Добавляем объект в контейнер
    }

    removeObjFromDOM(id) {
        const objElement = this.container.querySelector(`[data-id="${id}"]`);
        if (objElement) this.container.removeChild(objElement);  // Удаление объекта из DOM
    }

    updateObjInDOM(id, newProps) {
        const objElement = this.container.querySelector(`[data-id="${id}"]`);
        if (objElement && newProps.description) {
            objElement.querySelector('p:nth-child(2)').textContent = newProps.description;  // Обновление описания
        }
    }
}