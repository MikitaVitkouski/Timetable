const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

// Настройка CORS
app.use(cors());

// Настройка body-parser для обработки JSON-запросов
app.use(bodyParser.json());

// Подключение к базе данных MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // используйте ваше имя пользователя
  password: 'newpassword', // используйте ваш пароль
  database: 'timetable_db'
});

// Подключение к базе данных
db.connect(err => {
  if (err) {
    console.error('Ошибка подключения к базе данных: ' + err.stack);
    return;
  }
  console.log('Подключено к базе данных');
});

// Получить все записи с фильтрацией
app.get('/api/timetable', (req, res) => {
  const { subject, author, time } = req.query;
  let query = 'SELECT * FROM timetable WHERE 1=1'; // Начальная часть запроса

  // Добавляем фильтры, если они присутствуют
  const params = [];
  if (subject) {
    query += ' AND subject LIKE ?';
    params.push(`%${subject}%`);
  }
  if (author) {
    query += ' AND author LIKE ?';
    params.push(`%${author}%`);
  }
  if (time) {
    query += ' AND time = ?';
    params.push(time);
  }

  db.query(query, params, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Ошибка при получении расписания');
      return;
    }
    res.json(result);  // Отправляем результаты фильтрации
  });
});

// Добавить запись
app.post('/api/timetable', (req, res) => {
  const { description, author, subject, time } = req.body;
  const createdAt = new Date(); // Добавляем текущую дату
  const query = 'INSERT INTO timetable (description, createdAt, author, subject, time) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [description, createdAt, author, subject, time], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Ошибка при добавлении записи');
      return;
    }
    res.json({ id: result.insertId, description, createdAt, author, subject, time });
  });
});

// Обновить запись
app.put('/api/timetable/:id', (req, res) => {
  const { description, createdAt, author, subject, time } = req.body;
  const query = 'UPDATE timetable SET description = ?, createdAt = ?, author = ?, subject = ?, time = ? WHERE id = ?';
  db.query(query, [description, createdAt, author, subject, time, req.params.id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Ошибка при обновлении записи');
      return;
    }
    res.json({ message: 'Запись обновлена' });
  });
});

// Удалить запись
app.delete('/api/timetable/:id', (req, res) => {
  const query = 'DELETE FROM timetable WHERE id = ?';
  db.query(query, [req.params.id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Ошибка при удалении записи');
      return;
    }
    res.json({ message: 'Запись удалена' });
  });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});