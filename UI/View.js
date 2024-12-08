class View {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    displayObjs(objList) {
        this.container.innerHTML = '';
        objList.forEach(obj => this.addObjToDOM(obj));
    }

    addObjToDOM(obj) {
        const objElement = document.createElement('div');
        objElement.classList.add('obj');
        objElement.setAttribute('data-id', obj.id);
        objElement.innerHTML = `
            <h3>${obj.subject}</h3>
            <p>${obj.description}</p>
            <p>Автор: ${obj.author}</p>
            <p>Дата: ${obj.createdAt.toLocaleString()}</p>
            ${user ? `<button class="delete-btn" data-id="${obj.id}">Удалить</button>
                      <button class="edit-btn" data-id="${obj.id}">Редактировать</button>` : ''}
        `;
        this.container.appendChild(objElement);
    }

    removeObjFromDOM(id) {
        const objElement = this.container.querySelector(`[data-id="${id}"]`);
        if (objElement) this.container.removeChild(objElement);
    }

    updateObjInDOM(id, newProps) {
        const objElement = this.container.querySelector(`[data-id="${id}"]`);
        if (objElement && newProps.description) {
            objElement.querySelector('p:nth-child(2)').textContent = newProps.description;
        }
    }
}
