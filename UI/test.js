console.log(timetable.getObjs());

controller.addObj({
    id: '21',
    description: 'Chemistry Lecture - Room 103',
    createdAt: new Date(),
    author: 'Gabasov',
    subject: 'Chemistry',
    time: '11:00 AM'
});

controller.addObj({
    id: '22',
    description: 'MO Practice - Room 105',
    createdAt: new Date(),
    author: 'Alsevich',
    subject: 'MO',
    time: '09:00 AM'
});

allObjects = controller.getObjList();
console.log(allObjects);

controller.removeObj('21');

controller.editObj('22', { description: 'Maths class' });

allObjects = controller.getObjList();
console.log(allObjects);

const filteredData = controller.filterObjs({ author: 'John Doe' });
console.log(filteredData);

timetable.clear();
controller.view.displayObjs([]);