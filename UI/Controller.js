class Controller {
    constructor(timetable, view) {
        this.timetable = timetable;
        this.view = view;
        this.init();
    }

    init() {
        this.loadTimetable();
    }

    async loadTimetable() {
        try {
            const timetables = await this.timetable.getObjs();
            this.view.displayObjs(timetables);
        } catch (error) {
            console.error('Error loading timetable:', error);
            this.view.showNotification('Ошибка загрузки расписания');
        }
    }

    async filterObjs(filterConfig) {
        try {
            const filteredObjs = await this.timetable.getObjs(filterConfig);
            this.view.displayObjs(filteredObjs);
        } catch (error) {
            console.error('Error filtering timetable:', error);
            this.view.showNotification('Ошибка фильтрации расписания');
        }
    }
}
