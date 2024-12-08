class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
        this.initialize();
    }

    initialize() {
        this.view.displayObjs(this.model.getObjs());

        // Добавление объекта
        document.getElementById('add-form').addEventListener('submit', (e) => this.handleAdd(e));

        // Обработка кликов для удаления и редактирования
        document.getElementById('obj-container').addEventListener('click', (e) => this.handleObjActions(e));

        // Обработка фильтрации
        document.getElementById('filter-form').addEventListener('submit', (e) => this.handleFilter(e));

        this.handleNavigation();
    }

    handleAdd(e) {
        e.preventDefault();
        const subject = document.getElementById('subject').value;
        const description = document.getElementById('description').value;
        const newObj = {
            id: Date.now().toString(),
            subject,
            description,
            createdAt: new Date(),
            author: user
        };

        if (this.model.addObj(newObj)) {
            this.view.addObjToDOM(newObj);
        }
    }

    handleObjActions(e) {
        if (e.target.classList.contains('delete-btn')) {
            const id = e.target.dataset.id;
            this.model.removeObj(id);
            this.view.removeObjFromDOM(id);
        } else if (e.target.classList.contains('edit-btn')) {
            const id = e.target.dataset.id;
            const newDescription = prompt('Введите новое описание:');
            if (newDescription) {
                this.model.editObj(id, { description: newDescription });
                this.view.updateObjInDOM(id, { description: newDescription });
            }
        }
    }

    handleFilter(e) {
        e.preventDefault();
        const author = document.getElementById('filter-author').value;
        const subject = document.getElementById('filter-subject').value;

        const filteredObjs = this.model.getObjs(0, 10, { author, subject });
        this.view.displayObjs(filteredObjs);
    }
}
