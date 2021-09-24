const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    timeSpent: {
        type: String,
        required: false
    },
    timeLeft: {
        type: String,
        required: false
    },
    importance: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false
    },
}, {
    collection: 'todos'
});

module.exports = Todo = mongoose.model('Todo', TodoSchema);
