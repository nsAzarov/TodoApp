const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const {
    v4: uuidv4
} = require('uuid')

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

const TODOS_PER_PAGE = 10;

mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const Todo = require('./models/Todo')

app.get('/DoneTodosCount', async (req, res) => {
    await Todo.find({
            done: true
        })
        .then(todos => {
            Todo.count().then(count => res.json(todos.length / count))
        })
        .catch(err => console.log(err));
})

app.get('/Todos/:page', async (req, res) => {
    const page = req.params.page;
    await Todo.find({}).limit(TODOS_PER_PAGE).skip(TODOS_PER_PAGE * page)
        .then(todos => res.json(todos))
        .catch(err => console.log(err));
})

app.get('/PagesCount', async (_, res) => {
    await Todo.count({})
        .then(todos => res.json(Math.ceil(todos / TODOS_PER_PAGE)))
        .catch(err => console.log(err));
})

app.post('/CreateTodo', async (req, res) => {
    if (!req.body) return res.sendStatus(400);

    const todo = new Todo(req.body);

    todo._id = mongoose.Types.ObjectId();
    await todo.save((err) => {
        if (err) return console.error(err);
    })
    res.sendStatus(200)
})

app.post('/GenerateTodos', async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    for (let i = 0; i < 10000; i++) {
        const obj = {
            id: uuidv4(),
            type: 'NOTE',
            title: 'Title',
            done: false
        }

        const todo = new Todo(obj);

        todo._id = mongoose.Types.ObjectId();
        await todo.save((err) => {
            if (err) return console.error(err);
        })
    }
    res.sendStatus(200)
})

app.post('/UpdateTodo', async (req, res) => {
    if (!req.body) return res.sendStatus(400);

    let doc = await Todo.findOne({
        id: req.body.id
    })
    doc.title = req.body.title
    doc.done = req.body.done
    doc.description = req.body.description
    doc.timeSpent = req.body.timeSpent
    doc.timeLeft = req.body.timeLeft
    doc.importance = req.body.importance
    doc.status = req.body.status
    await doc.save();

    res.sendStatus(200)
})

app.post('/DeleteTodo/:id', async (req, res) => {
    if (!req.body) return res.sendStatus(400);

    await Todo.deleteOne({
        id: req.params.id
    }, (err) => {
        if (err) return console.error(err);
    });
    res.sendStatus(200)
})

if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
