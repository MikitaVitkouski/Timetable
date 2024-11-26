// Создание экземпляра класса Timetable
const timetable = new Timetable(ObjInf);

// Проверка методов
console.log(timetable.getObjs(0, 5)); // Получить первые 5 записей
console.log(timetable.getObjs(0, 5, { author: 'John Doe' })); // Фильтрация по автору

console.log(timetable.getObj('1')); // Получить объект с id = '1'

console.log(timetable.validateObj({
    id: '21',
    description: 'Chemistry Lecture - Room 103',
    createdAt: new Date(),
    author: 'New Author'
})); // true

console.log(timetable.addObj({
    id: '21',
    description: 'Chemistry Lecture - Room 103',
    createdAt: new Date(),
    author: 'New Author'
})); // true

console.log(timetable.editObj('21', { description: 'Updated Description' })); // true
console.log(timetable.removeObj('21')); // true

console.log(timetable.addAll([
    {
        id: '22',
        description: 'Biology Lecture - Room 104',
        createdAt: new Date(),
        author: 'Another Author'
    },
    {
        id: '23',
        description: 'Invalid Entry Without Author'
    }
])); // Возвращает массив с невалидными объектами

timetable.clear(); // Очистка коллекции
console.log(timetable.getObjs()); // []