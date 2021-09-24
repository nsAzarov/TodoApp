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

    console.log('doc', doc)
    console.log('req.body.done', req.body.done)
    // doc.description = req.body.description
    // doc.timeSpent = req.body.timeSpent
    // doc.timeLeft = req.body.timeLeft
    // doc.importance = req.body.importance
    // doc.status = req.body.status
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

// const Customer = require('./models/Customer')

// app.get('/Customers', (req, res) => {
//     Customer.find({})
//         .then(customers => res.json(customers))
//         .catch(err => console.log(err));
// })

// app.post('/AddCustomer', (req, res) => {
//     if(!req.body) return res.sendStatus(400);

//     var customer = new Customer(req.body);
//     customer._id = mongoose.Types.ObjectId();
//     customer.save((err, customer) => {
//         if (err) return console.error(err);
//         console.log(`Клиент ${customer.firstName} сохранён в коллекцию customers.`);
//     })
// })

// app.post('/EditCustomer', async (req, res) => {
//     if(!req.body) return res.sendStatus(400);

//     let doc = await Customer.findOne({ id: req.body.id})
//     doc.city = req.body.city
//     doc.country = req.body.country
//     doc.email = req.body.email
//     doc.image = req.body.image
//     doc.firstName = req.body.firstName
//     doc.lastName = req.body.lastName
//     doc.phone = req.body.phone
//     doc.orders = req.body.orders
//     doc.date = req.body.date
//     await doc.save();
// })

// app.post('/DeleteCustomer', (req, res) => {
//     if(!req.body) return res.sendStatus(400);

//     Customer.deleteOne({id: req.body.id}, (err, res) => {
//         if (err) return console.error(err);
//         console.log('Клиент успешно удалён');
//     });
// })

// const Product = require('./models/Product')

// app.get('/Products', (req, res) => {
//     Product.find({})
//         .then(products => res.json(products))
//         .catch(err => console.log(err));
// })

// app.post('/AddProduct', (req, res) => {
//     if(!req.body) return res.sendStatus(400);

//     var product = new Product(req.body);
//     product._id = mongoose.Types.ObjectId();
//     product.save((err, product) => {
//         if (err) return console.error(err);
//         console.log("Продукт сохранён в коллекцию products.");
//     })
// })

// app.post('/EditProduct', async (req, res) => {
//     if(!req.body) return res.sendStatus(400);
//     console.log(req.body)

//     let doc = await Product.findOne({ id: req.body.id})
//     doc.description = req.body.description
//     doc.image = req.body.image
//     doc.title = req.body.title
//     doc.amount = req.body.amount
//     doc.purchasePrice = req.body.purchasePrice
//     doc.sellingPrice = req.body.sellingPrice
//     doc.discount = req.body.discount
//     doc.date = req.body.date
//     await doc.save();
// })

// app.post('/DeleteProduct', (req, res) => {
//     if(!req.body) return res.sendStatus(400);

//     Product.deleteOne({id: req.body.id}, (err, res) => {
//         if (err) return console.error(err);
//         console.log('Продукт успешно удалён');
//     });
// })

// const Orders = require('./models/Order')

// app.get('/Orders', (req, res) => {
//     Orders.find({})
//         .then(orders => res.json(orders))
//         .catch(err => console.log(err));
// })

// app.post('/AddOrder', (req, res) => {
//     if(!req.body) return res.sendStatus(400);

//     var order = new Order(req.body);
//     order._id = mongoose.Types.ObjectId();
//     order.save((err, order) => {
//         if (err) return console.error(err);
//         console.log("Заказ сохранён в коллекцию orders.");
//     })
// })

// app.post('/EditOrder', async (req, res) => {
//     if(!req.body) return res.sendStatus(400);
//     console.log(req.body)

//     let doc = await Order.findOne({ id: req.body.id})
//     doc.customerId = req.body.customerId
//     doc.productIds = req.body.productIds
//     doc.date = req.body.date
//     await doc.save();
// })

// app.post('/DeleteOrder', (req, res) => {
//     if(!req.body) return res.sendStatus(400);

//     Orders.deleteOne({id: req.body.id}, (err, res) => {
//         if (err) return console.error(err);
//         console.log('Заказ успешно удалён');
//     });
// })

if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
