const express = require('express');
const app = express();
const port = 3001;

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

