const express = require('express');
const app = express();
const addModel = require('./model');

app.post('/add-property-data', async(request, response) => {
    const user = new addModel(request.body);

    try {
        await user.save();
        response.send(user);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get('/get-property-data', async(request, response) => {
    const user = await addModel.find({});

    try {
        response.send(user);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.delete('/delete-property-data/:id', async(request, response) => {
    let id = request.params.id;

    const user = await addModel.deleteOne({ "_id": id });

    try {
        response.send(user);
    } catch (error) {
        response.status(500).send(error);
    }
})

module.exports = app;