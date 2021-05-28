const express = require('express');
const app = express();
const port = 3001;

app.enable("trust proxy");

//May be necesary to put in the bottom-----------------------------
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", `http://localhost:${3000}`);   
})
//-------------------------------------------------------------------

app.use(express.json())


app.get('/test', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", `http://localhost:${3000}`);
    console.log("sending msg");
    return res.json({ msg: "This message comes from Express", num: 7 })
});

app.get("/testNodemon", (req, res) => {
    return res.json("nodemon works");
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

