class Controller {
    constructor(view, timetable) {
        this.view = view;
        this.timetable = timetable;
        
        // Восстановление данных при старте
        this.timetable.restore();
        this.view.displayObjs(this.timetable.getObjs());
    }

    addObj(subject, description, time, room, teacher, author) {
        this.timetable.addObj(subject, description, time, room, teacher, author);
        this.view.displayObjs(this.timetable.getObjs());  // Обновление отображения
    }

    deleteObj(id) {
        this.timetable.removeObj(id);
        this.view.displayObjs(this.timetable.getObjs());
    }

    editObj(id, subject, description, time, room, teacher) {
        const newProps = { subject, description, time, room, teacher };
        this.timetable.editObj(id, newProps);
        this.view.displayObjs(this.timetable.getObjs());  // Обновляем отображение
    }

    filterObjs(subjectFilter, roomFilter, teacherFilter) {
        const filteredObjs = this.timetable.getObjs(0, 10, { subject: subjectFilter, room: roomFilter, teacher: teacherFilter });
        this.view.displayObjs(filteredObjs);  // Фильтрация и отображение
    }
}