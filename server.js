const express = require('express');
const mongoose = require('mongoose');
const Task = require('./models/task')

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/tasks')
    .then((result) => app.listen(3000))
    .catch((error) => console.log("error"))


app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.json());

app.get('/', (req, res) => {
    Task.find()
        .then(result => {
            res.render('index', { tasks: result });
        })
        .catch(err => {
            console.log(err);
        });
});

app.delete('/delete', (req,res) => {
    Task.deleteOne({id: req.params.id})
    .then ((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    })
})

app.get('/create', (req, res) => {
    res.render('create');
});

app.post('/create', (req, res) => {
    console.log(req.body);
    const task = new Task({
        title: req.body.title,
        desc: req.body.desc,
        done: req.body.done
    });

    task.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
});

app.get('/edit/:id', (req, res) => {
    Task.findById(req.params.id)
        .then((result) => {
            res.render('edit', { task: result });
        })
        .catch((err) => {
            console.log(err)
        });

});

app.post('/edit', (req, res) => {
    console.log
    Task.updateOne({ id: req.body.id }, {
        title: req.body.title,
        desc: req.body.desc,
        done: req.body.done
      })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });

});

app.get('/edit/:id', (req, res) => {
    Task.findById(req.params.id)
        .then((result) => {
            res.render('edit', { task: result });
        })
        .catch((err) => {
            console.log(err)
        });

});



