class View {
    constructor(containerId) {
        this.containerId = containerId;
    }

    // Отображаем объекты расписания на странице
    displayObjs(objs) {
        const container = document.getElementById(this.containerId);
        container.innerHTML = '';  // Очищаем контейнер перед отображением
        if (objs.length === 0) {
            container.innerHTML = '<p>No records found.</p>';
        }
        objs.forEach(obj => {
            container.innerHTML += `
                <div id="obj-${obj.id}">
                    <h4>${obj.subject}</h4>
                    <p>${obj.description}</p>
                    <p>Автор: ${obj.author}</p>
                    <p>Время: ${obj.time}</p>
                    <p>Дата создания: ${new Date(obj.createdAt).toLocaleString()}</p>
                    <button onclick="controller.removeObj(${obj.id})">Удалить</button>
                    <button onclick="controller.editObj(${obj.id}, ${JSON.stringify(obj)})">Редактировать</button>
                </div>
            `;
        });
    }

    // Показываем уведомление
    showNotification(message) {
        alert(message);
    }
}
