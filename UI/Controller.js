var user = "Nikita Vitkovskiy";

class Controller {
    constructor(timetable, view) {
        this.timetable = timetable;
        this.view = view;
        this.init();
    }

    init() {
        this.view.displayObjs(this.timetable.getObjs());
    }

    addObj(obj) {
        if (this.timetable.addObj(obj)) {
            this.view.addObjToDOM(obj);
        } else {
            console.error('Invalid object:', obj);
        }
    }

    removeObj(id) {
        if (this.timetable.removeObj(id)) {
            this.view.removeObjFromDOM(id);
        }
    }

    editObj(id, newProps) {
        if (this.timetable.editObj(id, newProps)) {
            this.view.updateObjInDOM(id, newProps);
        }
    }

    filterObjs(filterConfig) {
        const filteredObjs = this.timetable.getObjs(0, 20, filterConfig);
        this.view.displayObjs(filteredObjs);
        return filteredObjs;
    }


    getObjList() {
        return this.timetable.getObjs();
    }
}

const timetable = new Timetable(ObjInf);
const view = new View('obj-container');
const controller = new Controller(timetable, view);