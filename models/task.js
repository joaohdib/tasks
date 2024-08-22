const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    desc: {
        type: String,
        required: true
    },

    dueDate: {
        type:Date,
    },

    priority: {
        type:Number
    },

    done: {
        type: Number,
        required: true
    }

});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;