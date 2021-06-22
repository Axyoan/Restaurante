const mongoose = require("mongoose");
const Dish = require("./models/dish");
const Waiter = require("./models/waiter");
const Table = require('./models/table');
mongoose.connect("mongodb://localhost:27017/restaurant", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    .then(() => {
        console.log("connection open");
    })
    .catch(err => {
        console.log(err)
    });

const seedDishes = [
    {
        name: 'Guacamole',
        description: 'Acompañado de totopos',
        price: 30.50,
        category: 'entrada',
    },
    {
        name: 'Queso fundido',
        description: 'Viene con tortillas',
        price: 40.50,
        category: 'entrada',
    },
    {
        name: 'Fettuccine Alfredo',
        description: 'Pasta con mantequilla y queso parmesano',
        price: 120.00,
        category: 'pasta',
    },
    {
        name: 'Spaguetti',
        description: 'La pasta que todos conocen',
        price: 110.20,
        category: 'pasta',
    },
    {
        name: 'Ensalada César',
        description: 'Lechuga con crutones, limón y aceite de oliva',
        price: 50.80,
        category: 'ensalada',
    },
    {
        name: 'Gazpacho',
        description: 'Sopa a base de jitomate',
        price: 60.00,
        category: 'sopa',
    },
    {
        name: 'Pozole',
        description: 'Caldo con granos de maiz, carne y verduras',
        price: 170.10,
        category: 'sopa',
    },
]

const seedWaiters = [
    {
        name: {
            firstName: "Adelina Wendolín",
            paternalLastName: "Lopez",
            maternalLastName: "Rojas",
        },
        isHeadWaiter: true,
        birthDate: new Date(1998, 2, 17),
        startDate: new Date(2020, 12, 24),
        phone: "33-5546-1523",
        adress: "Insurgentes no. 1003",
        email: "guen@gmail.com",
        code: "333333",
        password: "password",
    }
]

seed = async () => {
    let msg = await Dish.deleteMany({});
    console.log(msg);
    msg = await Waiter.deleteMany({});
    console.log(msg);
    msg = await Table.deleteMany({});
    console.log(msg);

    Dish.insertMany(seedDishes)
        .then(res => console.log(res))
        .catch(e => console.log(e));

    Waiter.insertMany(seedWaiters)
        .then(res => console.log(res))
        .catch(e => console.log(e));
}

seed();

