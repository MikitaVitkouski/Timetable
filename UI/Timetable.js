class Timetable {
    #_objs;

    constructor(objs = []) {
        this.#_objs = objs;
    }

    getObjs(skip = 0, top = 10, filterConfig = {}) {
        let filteredObjs = [...this.#_objs];

        if (filterConfig.subject) {
            filteredObjs = filteredObjs.filter(obj => obj.subject.toLowerCase().includes(filterConfig.subject.toLowerCase()));
        }

        if (filterConfig.room) {
            filteredObjs = filteredObjs.filter(obj => obj.room.toLowerCase().includes(filterConfig.room.toLowerCase()));
        }

        if (filterConfig.teacher) {
            filteredObjs = filteredObjs.filter(obj => obj.teacher.toLowerCase().includes(filterConfig.teacher.toLowerCase()));
        }

        return filteredObjs.slice(skip, skip + top);
    }

    addObj(subject, description, time, room, teacher, author) {
        const newObj = {
            id: Date.now().toString(),
            subject,
            description,
            time,
            room,
            teacher,
            createdAt: new Date(),
            author
        };
        this.#_objs.push(newObj);
        this.save();  // Сохраняем изменения в localStorage
    }

    removeObj(id) {
        const index = this.#_objs.findIndex(obj => obj.id === id);
        if (index !== -1) {
            this.#_objs.splice(index, 1);
            this.save();  // Сохраняем изменения в localStorage
        }
    }

    editObj(id, newProps) {
        const obj = this.#_objs.find(obj => obj.id === id);
        if (obj) {
            Object.assign(obj, newProps);
            this.save();  // Сохраняем изменения в localStorage
        }
    }

    // Сохраняем объекты в localStorage
    save() {
        localStorage.setItem('timetable', JSON.stringify(this.#_objs));
    }

    // Восстанавливаем объекты из localStorage
    restore() {
        const savedObjs = JSON.parse(localStorage.getItem('timetable'));
        if (savedObjs) {
            this.#_objs = savedObjs;
        }
    }
}