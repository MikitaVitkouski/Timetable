const ObjInf = [
    {
        id: '1',
        description: 'Math Lecture - Room 101',
        createdAt: new Date('2024-01-15T10:00:00'),
        author: 'John Doe',
        subject: 'Math',
        time: '10:00 AM'
    },
    {
        id: '2',
        description: 'Physics Lab - Room 202',
        createdAt: new Date('2024-01-15T12:00:00'),
        author: 'Jane Smith',
        subject: 'Physics',
        time: '12:00 PM'
    },
    {
        id: '3',
        description: 'Chemistry Lecture - Room 303',
        createdAt: new Date('2024-01-16T09:00:00'),
        author: 'Alan Brown',
        subject: 'Chemistry',
        time: '9:00 AM'
    },
    {
        id: '4',
        description: 'History Seminar - Room 104',
        createdAt: new Date('2024-01-16T11:00:00'),
        author: 'Clara White',
        subject: 'History',
        time: '11:00 AM'
    },
    {
        id: '5',
        description: 'English Literature - Room 201',
        createdAt: new Date('2024-01-16T01:00:00'),
        author: 'Emily Green',
        subject: 'English',
        time: '1:00 PM'
    },
    {
        id: '6',
        description: 'Computer Science Lecture - Lab A',
        createdAt: new Date('2024-01-17T10:00:00'),
        author: 'Michael Clark',
        subject: 'Computer Science',
        time: '10:00 AM'
    },
    {
        id: '7',
        description: 'Philosophy Seminar - Room 306',
        createdAt: new Date('2024-01-17T03:00:00'),
        author: 'Sophia Miller',
        subject: 'Philosophy',
        time: '3:00 PM'
    },
    {
        id: '8',
        description: 'Economics Lecture - Room 402',
        createdAt: new Date('2024-01-18T09:00:00'),
        author: 'George Wilson',
        subject: 'Economics',
        time: '9:00 AM'
    },
    {
        id: '9',
        description: 'Music Class - Studio 1',
        createdAt: new Date('2024-01-18T02:00:00'),
        author: 'Emma Harris',
        subject: 'Music',
        time: '2:00 PM'
    },
    {
        id: '10',
        description: 'Art Workshop - Room 103',
        createdAt: new Date('2024-01-19T10:00:00'),
        author: 'Charlotte Lewis',
        subject: 'Art',
        time: '10:00 AM'
    },
    {
        id: '11',
        description: 'Biology Lecture - Room 305',
        createdAt: new Date('2024-01-19T11:00:00'),
        author: 'Liam Thompson',
        subject: 'Biology',
        time: '11:00 AM'
    },
    {
        id: '12',
        description: 'Astronomy Lab - Observatory',
        createdAt: new Date('2024-01-20T08:00:00'),
        author: 'Olivia Martinez',
        subject: 'Astronomy',
        time: '8:00 AM'
    },
    {
        id: '13',
        description: 'Psychology Lecture - Room 204',
        createdAt: new Date('2024-01-20T02:00:00'),
        author: 'Noah Taylor',
        subject: 'Psychology',
        time: '2:00 PM'
    },
    {
        id: '14',
        description: 'Statistics Class - Lab C',
        createdAt: new Date('2024-01-21T09:00:00'),
        author: 'Sophia Davis',
        subject: 'Statistics',
        time: '9:00 AM'
    },
    {
        id: '15',
        description: 'Programming Workshop - Lab D',
        createdAt: new Date('2024-01-21T01:00:00'),
        author: 'James Anderson',
        subject: 'Programming',
        time: '1:00 PM'
    },
    {
        id: '16',
        description: 'Environmental Science - Room 502',
        createdAt: new Date('2024-01-22T11:00:00'),
        author: 'Amelia Garcia',
        subject: 'Environmental Science',
        time: '11:00 AM'
    },
    {
        id: '17',
        description: 'Health Science Lecture - Room 303',
        createdAt: new Date('2024-01-23T08:00:00'),
        author: 'Benjamin Rodriguez',
        subject: 'Health Science',
        time: '8:00 AM'
    },
    {
        id: '18',
        description: 'Geography Seminar - Room 401',
        createdAt: new Date('2024-01-24T03:00:00'),
        author: 'Mia Martinez',
        subject: 'Geography',
        time: '3:00 PM'
    },
    {
        id: '19',
        description: 'French Language Class - Room 202',
        createdAt: new Date('2024-01-25T12:00:00'),
        author: 'William Hernandez',
        subject: 'French',
        time: '12:00 PM'
    },
    {
        id: '20',
        description: 'Robotics Workshop - Lab B',
        createdAt: new Date('2024-01-26T04:00:00'),
        author: 'Elijah Hall',
        subject: 'Robotics',
        time: '4:00 PM'
    }
];

class Timetable {
    #_objs;

    constructor(objs = []) {
        this.#_objs = objs;
    }

    // Метод для получения массива объектов с фильтрацией и пагинацией
    getObjs(skip = 0, top = 10, filterConfig = {}) {
        let filteredObjs = [...this.#_objs];

        // Фильтрация по полям
        if (filterConfig.author) {
            filteredObjs = filteredObjs.filter(obj => obj.author === filterConfig.author);
        }
        if (filterConfig.subject) {
            filteredObjs = filteredObjs.filter(obj => obj.subject === filterConfig.subject);
        }
        if (filterConfig.createdAt) {
            filteredObjs = filteredObjs.filter(obj => 
                new Date(obj.createdAt).toISOString().slice(0, 10) === filterConfig.createdAt);
        }

        // Сортировка по дате
        filteredObjs.sort((a, b) => b.createdAt - a.createdAt);

        // Пагинация
        return filteredObjs.slice(skip, skip + top);
    }

    // Получение объекта по ID
    getObj(id) {
        return this.#_objs.find(obj => obj.id === id) || null;
    }

    // Проверка объекта на валидность
    validateObj(obj) {
        const requiredFields = ['id', 'description', 'createdAt', 'author'];
        if (!obj || typeof obj !== 'object') return false;

        for (const field of requiredFields) {
            if (!obj[field] || (field === 'description' && obj[field].length >= 200)) {
                return false;
            }
        }

        return true;
    }

    // Добавление объекта в коллекцию
    addObj(obj) {
        if (this.validateObj(obj)) {
            this.#_objs.push(obj);
            return true;
        }
        return false;
    }

    // Изменение объекта по ID
    editObj(id, updatedFields) {
        const obj = this.getObj(id);
        if (!obj) return false;

        const allowedFields = ['description', 'subject', 'time'];
        const isValidUpdate = Object.keys(updatedFields).every(
            key => allowedFields.includes(key)
        );

        if (!isValidUpdate) return false;

        Object.assign(obj, updatedFields);
        return true;
    }
}