class View {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    // 1️⃣ Отображает все объекты на странице
    displayObjs(objList) {
        this.container.innerHTML = ''; // Очистка контейнера
        objList.forEach(obj => this.addObjToDOM(obj));
    }

    // 2️⃣ Добавляет один объект на страницу
    addObjToDOM(obj) {
        const objElement = document.createElement('div');
        objElement.classList.add('obj');
        objElement.setAttribute('data-id', obj.id);
        objElement.innerHTML = `
            <h3>${obj.subject}</h3>
            <p>${obj.description}</p>
            <p>Автор: ${obj.author}</p>
            <p>Дата: ${obj.createdAt.toLocaleString()}</p>
            <button onclick="removeObj('${obj.id}')">Удалить</button>
            <button onclick="editObj('${obj.id}', { description: 'Новое описание' })">Редактировать</button>
        `;
        this.container.appendChild(objElement);
    }

    // 3️⃣ Удаляет объект из DOM по ID
    removeObjFromDOM(id) {
        const objElement = this.container.querySelector(`[data-id="${id}"]`);
        if (objElement) this.container.removeChild(objElement);
    }

    // 4️⃣ Обновляет объект на странице
    updateObjInDOM(id, newProps) {
        const objElement = this.container.querySelector(`[data-id="${id}"]`);
        if (objElement && newProps.description) {
            const descriptionElement = objElement.querySelector('p:nth-child(2)');
            descriptionElement.textContent = newProps.description;
        }
    }
}
