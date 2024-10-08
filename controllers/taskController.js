const Task = require('../models/task');

const index = (req, res) => {
    Task.find().sort({done: 1,priority: -1})
        .then(result => {
            res.render('index', { tasks: result });
        })
        .catch(err => {
            console.log(err);
        });
}

const deleteTask = (req, res) => {
    console.log(req.body.id);
    Task.deleteOne({ _id: req.body.id })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
}

const createTaskPage = (req, res) => {
    res.render('create');
}

const createTask = (req, res) => {
    console.log(req.body);
    const task = new Task({
        title: req.body.title,
        desc: req.body.desc,
        done: req.body.done,
        dueDate: req.body.dueDate,
        priority: req.body.priority
    });

    task.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
}

const editTaskPage = (req, res) => {
    Task.findById(req.params.id)
        .then((result) => {
            res.render('edit', { task: result });
        })
        .catch((err) => {
            console.log(err)
        });
}

const editTask = (req, res) => {
    console.log(req.body._id);
    Task.updateOne({ _id: req.body._id }, {
        title: req.body.title,
        desc: req.body.desc,
        done: req.body.done
    })
        .then((result) => {
            res.send(result);
            console.log("foi");
        })
        .catch((err) => {
            console.log(err);
        });
}

module.exports = {
    index,
    deleteTask,
    createTaskPage,
    createTask,
    editTaskPage,
    editTask
}