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
            firstName: "Juan",
            paternalLastName: "Perez",
            maternalLastName: "Gonzales",
        },
        isHeadWaiter: false,
        birthDate: new Date(1990, 10, 30),
        startDate: new Date(2019, 5, 2),
        phone: "33-1029-3847",
        adress: "Calle 5 No. 123",
        email: "jperez@gmail.com",
        code: "admin",
        password: "123",
    },
    {
        name: {
            firstName: "Axyoan",
            paternalLastName: "Marcelo",
            maternalLastName: "Castillo",
        },
        isHeadWaiter: false,
        birthDate: new Date(1998, 9, 20),
        startDate: new Date(2018, 4, 16),
        phone: "33-5647-3829",
        adress: "Juarez No. 38",
        email: "correochido@hotmail.com",
        code: "admin",
        password: "123",
    },
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
        code: "admin",
        password: "123",
    },
    {
        name: {
            firstName: "Andrea",
            paternalLastName: "Hernandez",
            maternalLastName: "Fernandez",
        },
        isHeadWaiter: false,
        birthDate: new Date(1995, 20, 11),
        startDate: new Date(2021, 1, 14),
        phone: "33-1927-3441",
        adress: "Chamizal no. 53",
        email: "ahfer@protonmail.com",
        code: "admin",
        password: "123",
    },
]

const seedTables = [
    {
        number: 1,
        code: "AFXZ"
    },
    {
        number: 2,
        code: "QECS"
    },
    {
        number: 3,
        code: "REKT"
    },
    {
        number: 4,
        code: "MERN"
    },
    {
        number: 5,
        code: "UWWU"
    },
    {
        number: 6,
        code: "DOGS"
    },
    {
        number: 7,
        code: "CATS"
    },
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

    Table.insertMany(seedTables)
        .then(res => console.log(res))
        .catch(e => console.log(e));
}

seed();

