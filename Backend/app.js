const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const route = require('./route');

app.get('/', (req, res) => {
    res.send('Hello World');
});

// CORS
const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true, //access-control-allow-credentials: true
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(express.json());

mongoose.connect('mongodb+srv://whiskey2022:whiskey2022@whiskey.wolqdni.mongodb.net/Property-Management-System?retryWrites=true&w=majority');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error: "));
db.once("open", function() {
    console.log("Connected Successfully");
});

app.use(route);
app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
})