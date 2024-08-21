const express = require('express');
const mongoose = require('mongoose');
const Task = require('./models/task')
const taskController = require('./controllers/taskController');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/tasks')
    .then((result) => app.listen(3000))
    .catch((error) => console.log("error"))


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());

app.get('/', taskController.index)
app.delete('/delete', taskController.deleteTask);
app.get('/create', taskController.createTaskPage);
app.post('/create', taskController.createTask);
app.get('/edit/:id', taskController.editTaskPage);
app.post('/edit', taskController.editTask);




