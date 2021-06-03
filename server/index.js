const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config()
const dish = require("./routes/dish");
const waiter = require('./routes/waiter');
const table = require('./routes/table');

const port = 3001;
const clientPort = 3000;

mongoose.connect("mongodb://localhost:27017/restaurant", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})
mongoose.set('useFindAndModify', false);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.use(cors({ origin: `http://localhost:${clientPort}` }));

app.use(express.json());

app.use("/dishes", dish);
app.use('/waiters', waiter);
app.use('/tables', table);

app.get('/test', (req, res) => {
    console.log("sending msg");
    return res.json({ msg: "This message comes from Express" })
});


app.all("*", (req, res, next) => {
    console.log("404");
    return res.status(404).send("404 error");
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

